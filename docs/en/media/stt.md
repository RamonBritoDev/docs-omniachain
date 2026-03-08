# Speech-to-Text (STT)

Audio transcription with multiple backends — local APIs and models.

## Backends

| Backend | Type | Requires | Speed ​​|
|---------|------|--------|:----------:|
| `openai` | API | `OPENAI_API_KEY` | ⚡⚡⚡ |
| `whisper-local` | Location | `pip install openai-whisper` | ⚡⚡ |
| `faster-whisper` | Location | `pip install faster-whisper` | ⚡⚡⚡ |
| `google` | API | `pip install google-cloud-speech` | ⚡⚡⚡ |
| `auto` | — | Automatically detects | — |

## Basic Usage

```python
from omniachain import SpeechToText

# Auto-detects the best available backend
stt = SpeechToText()
text = await stt.transcribe("audio.mp3")

# Specific backend
stt = SpeechToText(backend="openai", language="pt")
stt = SpeechToText(backend="whisper-local", model="large")
stt = SpeechToText(backend="faster-whisper", model="medium")
```

## Full Transcript

Returns text + segments with timestamps:

```python
result = await stt.transcribe_full("audio.mp3")

print(result.text) # Full text
print(result.language) # "pt"
print(result.backend_used) # "faster-whisper"

for seg in result.segments:
    print(f"[{seg.start:.1f}s → {seg.end:.1f}s] {seg.text}")
```

## Accepts Multiple Inputs

```python
# File
text = await stt.transcribe("audio.mp3")
text = await stt.transcribe("podcast.wav")
text = await stt.transcribe("musica.flac")

# Bytes
with open("audio.mp3", "rb") as f:
    text = await stt.transcribe(f.read())

#Path
from pathlib import Path
text = await stt.transcribe(Path("audio.mp3"))
```

## Custom Backend

```python
from omniachain.media.stt import STTBackend, SpeechToText

class MyAPISTT(STTBackend):
    async def transcribe(self, audio_data, format="mp3", language="pt", **kw):
        # Call your API here
        response = await my_api.transcribe(audio_data)
        return response.text

SpeechToText.register_backend("my-api", MyAPISTT)
stt = SpeechToText(backend="my-api")
```

## Parameters

| Stop | Type | Default | Description |
|-------|------|---------|-----------|
| `backend` | `str` | `"auto"` | Backend to use |
| `model` | `str` | `None` | Model (e.g. `"large"` for Whisper) |
| `api_key` | `str` | `None` | API key (or via env var) |
| `language` | `str` | `"PT"` | Audio language |

!!! note "Installation"
    ```bash
    # Local Whisper (offline)
    pip install openai-whisper

# Faster-Whisper (~4x faster)
    pip install faster-whisper
    ```