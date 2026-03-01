import requests
import base64
from app.config import ELEVENLABS_API_KEY, VOICE_ID

def generate_voiceover(text: str):
    """
    Converts text to speech and returns a base64 string for the frontend.
    """
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
    }
    
    data = {
        "text": text,
        "model_id": "eleven_flash_v2_5",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        if response.status_code == 200:
            # Encode binary audio to base64 string so it can stay in JSON
            audio_base64 = base64.b64encode(response.content).decode('utf-8')
            return audio_base64
        else:
            print(f"ElevenLabs Error: {response.text}")
            return None
    except Exception as e:
        print(f"Voice Service Failed: {e}")
        return None