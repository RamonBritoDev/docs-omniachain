# Преобразование текста в речь (TTS)

Синтез речи с помощью нескольких серверов, включая 100% бесплатные опции.

## Бэкэнды

| Бэкэнд | Тип | Требуется | Стоимость | Качество |
|---------|------|--------|:-----:|:---------:|
| `край` ⭐ | Бесплатно | `pip install Edge-tts` | **Бесплатно** | ⭐⭐⭐⭐ |
| `опенай` | API | `OPENAI_API_KEY` | 0,015 доллара США/1 тыс. символов | ⭐⭐⭐⭐⭐ |
| `коки` | Расположение | `pip install TTS` | **Бесплатно** | ⭐⭐⭐ |
| `гугл` | API | `pip install google-cloud-texttospeech` | символы $4/1 млн | ⭐⭐⭐⭐ |
| `авто` | — | Автоматически обнаруживает | — | — |

!!! совет "Рекомендация"
    **Edge TTS** — лучший вариант для начала — отличное качество, бесплатно, без ключа API, голоса в формате PT-BR.

## Базовое использование

```python
from omniachain import TextToSpeech

# Edge TTS (grátis)
tts = TextToSpeech(backend="edge", voice="pt-BR-AntonioNeural")
await tts.speak_to_file("Olá, como vai?", "saida.mp3")

# OpenAI TTS
tts = TextToSpeech(backend="openai", voice="nova")
audio_bytes = await tts.speak("Olá mundo!")

# Auto-detecta (Edge TTS por padrão)
tts = TextToSpeech()
await tts.speak_to_file("Teste", "teste.mp3")
```

## Доступные голоса

### Edge TTS (pt-BR)

| Голос | Пол | удостоверение личности |
|-----|--------|-----|
| Антонио | Мужской | `pt-BR-AntonioNeural` |
| Франциска | Женский | `pt-BR-FranciscaNeural` |

### OpenAI

| Голос | Стиль |
|-----|--------|
| `сплав` | Нейтральный |
| `эхо` | Мужской |
| `басня` | Британский |
| `оникс` | Запись |
| `новый` | Женский |
| `мерцание` | Мягкий |

### Список голосов программно

```python
tts = TextToSpeech(backend="edge")
voices = await tts.list_voices()

# Filtrar vozes pt-BR
for v in voices:
    if "pt-BR" in v.language:
        print(f"{v.name} ({v.id}) — {v.gender}")
```

## Сохранить в файл

```python
tts = TextToSpeech(backend="edge")

# Salva MP3
path = await tts.speak_to_file("Texto aqui", "audio.mp3")
print(f"Salvo em: {path}")

# Cria diretórios automaticamente
await tts.speak_to_file("Teste", "audios/output/teste.mp3")
```

## Получить байты

```python
tts = TextToSpeech(backend="openai", voice="nova")

# Retorna bytes do áudio
audio = await tts.speak("Olá mundo!")

# Usar com outro serviço
import base64
b64 = base64.b64encode(audio).decode()
```

## Пользовательский бэкэнд

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

## Параметры

| Стоп | Тип | По умолчанию | Описание |
|-------|------|---------|-----------|
| `бэкэнд` | `ул` | `"авто"` | Серверная часть для использования |
| `голос` | `ул` | `Нет` | Конкретный голос |
| `api_key` | `ул` | `Нет` | Ключ API (или через env var) |
| `язык` | `ул` | `"pt-BR"` | Язык |

!!! обратите внимание «Установка»
    ```bash
    # Edge TTS (recomendado, grátis)
    pip install edge-tts

    # Coqui TTS (local, offline)
    pip install TTS
    ```