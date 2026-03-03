import json
from os import environ
import re
import time
import google.generativeai as genai
from google.api_core import exceptions

# 1. Configurazione API
genai.configure(api_key=environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel('models/gemini-2.5-flash')

def clean_html(raw_html):
    if not raw_html: return ""
    return re.sub('<.*?>', '', raw_html)

def get_summary_with_retry(text, retries=3):
    """Prova a generare il contenuto e se riceve 429 aspetta e riprova."""    
    prompt = f"Summarize the following story in one concise sentence, keeping the focus on the spiritual meaning or main message: {text}"
    
    for i in range(retries):
        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except exceptions.ResourceExhausted as e:
            wait_time = (i + 1) * 10  # Aspetta 10s, poi 20s...
            print(f"  ⚠️ Limite raggiunto. Attendo {wait_time} secondi... {e}")
            time.sleep(wait_time)
        except Exception as e:
            print(f"  ❌ Errore imprevisto: {e}")
            break
    return None

# 2. Caricamento
input_file = 'donboscodreams_progressivo.json'
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Inizio elaborazione di {len(data)} elementi...")

# 3. Ciclo con salvataggio continuo
for i, item in enumerate(data):
    # Salta se ha già il riassunto (così puoi riprendere da dove avevi interrotto)
    if 'summary' in item and item['summary'] != "Riassunto non generato.":
        continue

    print(f"[{i+1}/{len(data)}] Elaborazione: {item.get('title')}")
    
    clean_text = clean_html(item.get('content', ''))
    summary = get_summary_with_retry(clean_text)
    
    item['summary'] = summary if summary else "Riassunto non generato."
    
    # Pausa cautelativa fissa tra una richiesta e l'altra
    time.sleep(5) 

    # Salva il progresso ogni volta per non perdere dati
    with open('donboscodreams_progressivo.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("\n✅ Operazione completata!")