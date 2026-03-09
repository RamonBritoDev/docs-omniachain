# Преобразование речи в текст (STT)

Транскрипция аудио с использованием нескольких бэкэндов — локальных API и моделей.

## Бэкэнды

| Бэкэнд | Тип | Требуется | Скорость |
|---------|------|--------|:----------:|
| `опенай` | API | `OPENAI_API_KEY` | ⚡⚡⚡ |
| `шепчущий-местный` | Расположение | `pip install openai-whisper` | ⚡⚡ |
| `быстрый шепот` | Расположение | `pip install fast-whisper` | ⚡⚡⚡ |
| `гугл` | API | `pip install google-cloud-speech` | ⚡⚡⚡ |
| `авто` | — | Автоматически обнаруживает | — |

## Базовое использование

```python
from omniachain import SpeechToText

# Auto-detecta o melhor backend disponível
stt = SpeechToText()
texto = await stt.transcribe("audio.mp3")

# Backend específico
stt = SpeechToText(backend="openai", language="pt")
stt = SpeechToText(backend="whisper-local", model="large")
stt = SpeechToText(backend="faster-whisper", model="medium")
```

## Полная расшифровка

Возвращает текст + сегменты с метками времени:

```python
result = await stt.transcribe_full("audio.mp3")

print(result.text)            # Texto completo
print(result.language)        # "pt"
print(result.backend_used)    # "faster-whisper"

for seg in result.segments:
    print(f"[{seg.start:.1f}s → {seg.end:.1f}s] {seg.text}")
```

## принимает несколько входов

```python
# Arquivo
texto = await stt.transcribe("audio.mp3")
texto = await stt.transcribe("podcast.wav")
texto = await stt.transcribe("musica.flac")

# Bytes
with open("audio.mp3", "rb") as f:
    texto = await stt.transcribe(f.read())

# Path
from pathlib import Path
texto = await stt.transcribe(Path("audio.mp3"))
```

## Пользовательский бэкэнд

```python
from omniachain.media.stt import STTBackend, SpeechToText

class MinhaAPISTT(STTBackend):
    async def transcribe(self, audio_data, format="mp3", language="pt", **kw):
        # Chamar sua API aqui
        response = await minha_api.transcribe(audio_data)
        return response.text

SpeechToText.register_backend("minha-api", MinhaAPISTT)
stt = SpeechToText(backend="minha-api")
```

## Параметры

| Стоп | Тип | По умолчанию | Описание |
|-------|------|---------|-----------|
| `бэкэнд` | `ул` | `"авто"` | Серверная часть для использования |
| `модель` | `ул` | `Нет` | Модель (например, «большой» для Whisper) |
| `api_key` | `ул` | `Нет` | Ключ API (или через env var) |
| `язык` | `ул` | `"ПТ"` | Язык аудио |

!!! обратите внимание «Установка»
    ```bash
    # Whisper local (offline)
    pip install openai-whisper

    # Faster-Whisper (~4x mais rápido)
    pip install faster-whisper
    ```