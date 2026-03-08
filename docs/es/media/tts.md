# Texto a voz (TTS)

Síntesis de voz con múltiples backends, incluidas opciones 100 % gratuitas.

## Servidores

| Servidor | Tipo | Requiere | Costo | Calidad |
|---------|------|--------|:-----:|:---------:|
| `borde` ⭐ | Gratis | `pip instalar borde-tts` | **Gratis** | ⭐⭐⭐⭐ |
| `openai` | API | `OPENAI_API_KEY` | $0,015/1K caracteres | ⭐⭐⭐⭐⭐ |
| `coquí` | Ubicación | `pip instalar TTS` | **Gratis** | ⭐⭐⭐ |
| `google` | API | `pip instala google-cloud-texttospeech` | 4 dólares/1 millón de caracteres | ⭐⭐⭐⭐ |
| `auto` | — | Detecta automáticamente | — | — |

!!! consejo "Recomendación"
    **Edge TTS** es la mejor opción para empezar: excelente calidad, gratis, sin clave API, voces en PT-BR.

## Uso básico

```pitón
desde omniachain importar TextToSpeech

# Borde TTS (gratis)
tts = TextToSpeech(backend="borde", voz="pt-BR-AntonioNeural")
await tts.speak_to_file("Hola, ¿cómo estás?", "saida.mp3")

# OpenAI TTS
tts = TextToSpeech(backend="openai", voz="nova")
audio_bytes = await tts.speak ("¡Hola mundo!")

# Detección automática (Edge TTS por defecto)
tts = TextoAVoz()
await tts.speak_to_file("Prueba", "prueba.mp3")
```

## Voces disponibles

### Borde TTS (pt-BR)

| Voz | Género | identificación |
|-----|--------|-----|
| Antonio | Masculino | `pt-BR-AntonioNeural` |
| Francisca | Mujer | `pt-BR-FranciscaNeural` |

### IA abierta

| Voz | Estilo |
|-----|--------|
| `aleación` | Neutro |
| `eco` | Masculino |
| `fábula` | británico |
| `ónix` | Registro |
| `nuevo` | Mujer |
| `brillante` | Suave |

### Listar voces mediante programación

```pitón
tts = TextToSpeech(backend="borde")
voces = esperan tts.list_voices()

# Filtrar voces pt-BR
para v en voces:
    si "pt-BR" en v.idioma:
        print(f"{v.nombre} ({v.id}) — {v.género}")
```

## Guardar en archivo

```pitón
tts = TextToSpeech(backend="borde")

# Guardar MP3
ruta = await tts.speak_to_file("Texto aquí", "audio.mp3")
print(f"Guardado en: {ruta}")

# Crear directorios automáticamente
await tts.speak_to_file("Teste", "audios/output/teste.mp3")
```

## Obtener bytes

```pitón
tts = TextToSpeech(backend="openai", voz="nova")

# Devuelve bytes de audio
audio = await tts.speak ("¡Hola mundo!")

# Usar con otro servicio
importar base64
b64 = base64.b64encode(audio).decodificar()
```

## Servidor personalizado

```pitón
desde omniachain.media.tts importe TTSBackend, TextToSpeech, Voice

clase ElevenLabsTTS(TTSBackend):
    async def sintetizar(self, texto, voz=Ninguno, formato="mp3", **kw):
        respuesta = espera once_labs_api.generate(texto=texto, voice_id=voz)
        devolver respuesta.audio

asíncrono def list_voices(yo):
        voces = esperan once_labs_api.list_voices()
        devolver [Voice(id=v.id, nombre=v.name, backend="elevenlabs") para v en voces]

TextToSpeech.register_backend("elevenlabs", ElevenLabsTTS)
tts = TextToSpeech(backend="elevenlabs", voz="Rachel")
```

## Parámetros

| Detener | Tipo | Predeterminado | Descripción |
|-------|------|---------|-----------|
| `backend` | `cadena` | `"automático"` | Backend para usar |
| `voz` | `cadena` | `Ninguno` | Voz específica |
| `api_key` | `cadena` | `Ninguno` | Clave API (o mediante env var) |
| `lenguaje` | `cadena` | `"pt-BR"` | Idioma |

!!! nota "Instalación"
    ```golpecito
    # Edge TTS (recomendado, gratuito)
    instalación de pipas edge-tts

# Coqui TTS (local, fuera de línea)
    instalación de pips TTS
    ```