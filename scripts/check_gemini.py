import google.genai as genai
from os import environ

genai.configure(api_key=environ.get("GEMINI_API_KEY"))

print("--- Modelli disponibili per il tuo account ---")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Nome modello: {m.name}")
    
    # Test di generazione
    model = genai.GenerativeModel('models/gemini-1.5-flash')
    response = model.generate_content("Ciao!")
    print(f"\nTest successo: {response.text}")

except Exception as e:
    print(f"\nErrore riscontrato: {e}")