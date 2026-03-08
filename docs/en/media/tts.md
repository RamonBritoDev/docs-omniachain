# Text-to-Speech (TTS)

Speech synthesis with multiple backends — including 100% free options.

## Backends

| Backend | Type | Requires | Cost | Quality |
|---------|------|--------|:-----:|:---------:|
| `edge` ⭐ | Free | `pip install edge-tts` | **Free** | ⭐⭐⭐⭐ |
| `openai` | API | `OPENAI_API_KEY` | $0.015/1K chars | ⭐⭐⭐⭐⭐ |
| `coqui` | Location | `pip install TTS` | **Free** | ⭐⭐⭐ |
| `google` | API | `pip install google-cloud-texttospeech` | $4/1M chars | ⭐⭐⭐⭐ |
| `auto` | — | Automatically detects | — | — |

!!! tip "Recommendation"
    **Edge TTS** is the best option to start with — excellent quality, free, no API key, voices in PT-BR.

## Basic Usage

```python
from omniachain import TextToSpeech

# Edge TTS (free)
tts = TextToSpeech(backend="edge", voice="pt-BR-AntonioNeural")
await tts.speak_to_file("Hello, how are you?", "saida.mp3")

# OpenAI TTS
tts = TextToSpeech(backend="openai", voice="nova")
audio_bytes = await tts.speak("Hello world!")

# Auto-detect (Edge TTS by default)
tts = TextToSpeech()
await tts.speak_to_file("Test", "test.mp3")
```

## Available Voices

### Edge TTS (pt-BR)

| Voice | Gender | ID |
|-----|--------|-----|
| Antonio | Male | `pt-BR-AntonioNeural` |
| Francisca | Female | `pt-BR-FranciscaNeural` |

### OpenAI

| Voice | Style |
|-----|--------|
| `alloy` | Neutral |
| `echo` | Male |
| `fable` | British |
| `onyx` | Record |
| `new` | Female |
| `shimmer` | Soft |

### List Voices Programmatically

```python
tts = TextToSpeech(backend="edge")
voices = await tts.list_voices()

# Filter voices pt-BR
for v in voices:
    if "pt-BR" in v.language:
        print(f"{v.name} ({v.id}) — {v.gender}")
```

## Save to File

```python
tts = TextToSpeech(backend="edge")

# Save MP3
path = await tts.speak_to_file("Text here", "audio.mp3")
print(f"Saved in: {path}")

# Create directories automatically
await tts.speak_to_file("Teste", "audios/output/teste.mp3")
```

## Get Bytes

```python
tts = TextToSpeech(backend="openai", voice="nova")

# Returns audio bytes
audio = await tts.speak("Hello world!")

# Use with another service
import base64
b64 = base64.b64encode(audio).decode()
```

## Custom Backend

```python
from omniachain.media.tts import TTSBackend, TextToSpeech, Voice

class ElevenLabsTTS(TTSBackend):
    async def synthesize(self, text, voice=None, format="mp3", **kw):
        response = await eleven_labs_api.generate(text=text, voice_id=voice)
        return response.audio

async def list_voices(self):
        voices = await eleven_labs_api.list_voices()
        return [Voice(id=v.id, name=v.name, backend="elevenlabs") for v in voices]

TextToSpeech.register_backend("elevenlabs", ElevenLabsTTS)
tts = TextToSpeech(backend="elevenlabs", voice="Rachel")
```

## Parameters

| Stop | Type | Default | Description |
|-------|------|---------|-----------|
| `backend` | `str` | `"auto"` | Backend to use |
| `voice` | `str` | `None` | Specific voice |
| `api_key` | `str` | `None` | API key (or via env var) |
| `language` | `str` | `"pt-BR"` | Language |

!!! note "Installation"
    ```bash
    # Edge TTS (recommended, free)
    pip install edge-tts

# Coqui TTS (local, offline)
    pip install TTS
    ```