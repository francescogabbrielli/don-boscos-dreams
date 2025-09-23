# -------------------------------
# IMPORT POSTS FROM WORDPRESS XML
# -------------------------------

import xml.etree.ElementTree as ET
import json
import re
from sys import argv


def load_latin():
    """Carica il file di traduzioni latine in un dizionario"""
    try:
        with open("./latin_translations.json", "r", encoding="utf-8") as f:
            data = json.load(f)   
            return list(data.items())
    except FileNotFoundError:
        print("File latin_translations.json non trovato. Le traduzioni latine non saranno applicate.")  
        return None

def match_case(original: str, translation: str) -> str:
    """Adatta il case della traduzione in base al testo originale."""
    if original.isupper():
        return translation.upper()
    elif original.islower():
        return translation.lower()
    elif original[0].isupper():
        return translation.capitalize()
    else:
        return translation  # fallback
    
def latin_replacer(translation):   
    def replacer(match):
        original = match.group(0)
        adjusted = match_case(original, translation)
        return f"<span lang='la'>{original}</span><span lang='en'>{adjusted}</span>"
    return replacer

def clean_tags(html_content, latin_translations=None):
    
    if not html_content:
        return ""

    # remove WordPress <!-- wp:... --> tags
    stripped_wp = re.sub(r'<!--\s*\/?wp:[^>]*-->', '', html_content).strip()

    # remove subtitle
    stripped_h4 = re.sub(r'<h4(?!h4).+</h4>', '', stripped_wp).replace("\n", "")

    # fix internal references
    fix_href = re.sub(r'(a href=")(.+/[0-9]+/[0-9]+/[0-9]+/)([0-9]{3}[-a-z]+/")', '\\1/dream/\\3', stripped_h4)
    
    # add latin translation to em tags
    with_latin_tr = fix_href
    def em_replacer(match):
        content = match.group(1)
        for latin, translation in latin_translations:
            pattern = re.compile(rf"\b{re.escape(latin)}\b", re.IGNORECASE)
            content = pattern.sub(latin_replacer(translation), content) if not "<span lang='la'>" in content else content
        return f"<em>{content}</em>"
    
    return re.sub(r"<em>(.*?)</em>", em_replacer, with_latin_tr, flags=re.DOTALL) if latin_translations else with_latin_tr

def wordpress_xml_to_posts_json(input_file, output_file):
    """Converte un file WordPress XML (WXR) in una lista JSON di post puliti"""
    ns = {
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'dc': 'http://purl.org/dc/elements/1.1/',
        'wp': 'http://wordpress.org/export/1.2/'
    }

    latin_translations = load_latin()

    tree = ET.parse(input_file)
    root = tree.getroot()

    posts = []
    for item in root.findall("./channel/item"):
        post_id = item.find('wp:post_name', ns).text if item.find('wp:post_name', ns) is not None else None
        title = item.find('title').text.replace("&#039;", "'") if item.find('title') is not None else None
        date = item.find('wp:post_date', ns).text.split(" ")[0] if item.find('wp:post_date', ns) is not None else None
        content = item.find('content:encoded', ns).text if item.find('content:encoded', ns) is not None else None

        # Pulisci i tag wp dal contenuto
        content_cleaned = clean_tags(content, latin_translations)

        # Estrai categorie e imposta il tipo
        categories = [c.text for c in item.findall('category') if c.text is not None and c.attrib["domain"] == "category"]
        tags = [c.text for c in item.findall('category') if c.text is not None and not c.text.startswith("[Date]") and c.attrib["domain"] == "post_tag"]
        type_value = "Dream"
        if "Vision" in tags:
            type_value = "Vision"
            tags.remove("Vision")

        # Numero estratto dall'id se contiene cifre iniziali
        try:
            number_value = int(''.join([ch for ch in post_id if ch.isdigit()][:3])) if post_id else None
        except:
            number_value = None

        posts.append({
            "id": post_id,
            "number": number_value,
            "title": title,
            "type": type_value,
            "main": "Main" in categories,
            "showcase": "Showcase" in categories,
            "date": date,
            "content": content_cleaned,
            "tags": tags,
        })

    # Salva il JSON finale
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)

    print(f"Conversione completata. File salvato in: {output_file}")


# EXAMPLE USAGE: 
# wordpress_xml_to_posts_json("input.xml", "output.json")
#
if __name__ == "__main__":
    wordpress_xml_to_posts_json(argv[1], "donboscodreams.json")
