import json
import google.generativeai as genai
import time

# 1. Configurazione API
genai.configure(api_key="AIzaSyA9NxH8kV2Pe6yKtKTu3faZofUi4uxPKVA")
model = genai.GenerativeModel('models/gemini-2.0-flash')

def summarize_text(text):
    if not text:
        return ""
    
    prompt = f"Summarize the following story in one concise sentence, keeping the focus on the spiritual meaning or main message: {text}"
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Errore durante la generazione: {e}")
        return ""

# 2. Caricamento del file JSON
file_path = 'donboscodreams.json'
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Inizio elaborazione di {len(data)} elementi...")

# 3. Ciclo di aggiornamento
for index, item in enumerate(data):
    content_html = item.get('content', '')
    
    # Rimuoviamo i tag HTML base per pulire il testo
    import re
    clean_text = re.sub('<[^<]+?>', '', content_html)
    
    print(f"[{index + 1}/{len(data)}] Riassumendo: {item.get('title')}...")
    
    # Aggiungiamo il nuovo campo
    item['summary'] = summarize_text(clean_text)
    
    # Piccola pausa per non superare i limiti di quota della versione free
    time.sleep(15) 

# 4. Salvataggio del nuovo file
output_path = 'donboscodreams_with_summary.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\nFatto! Il file aggiornato è stato salvato come: {output_path}")