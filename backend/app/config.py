import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = "gemini-2.5-flash"

# ElevenLabs Config
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
# Choice: "Bella" (ExaV...) is great for a professional mentor vibe
VOICE_ID = "21m00Tcm4TlvDq8ikWAM"