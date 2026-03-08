# Medios: STT, TTS e imágenes

OmniaChain ofrece **3 servicios de medios** con backends conectables: API pagas y alternativas 100 % gratuitas/locales.

## Descripción general

```sirena
gráfico LR
    A[🎙️ STT] -->|Audio → Texto| B[Agente/LLM]
    B -->|Texto → Audio| C[°TTS]
    B -->|Mensaje → Imagen| D[🎨 Generación de imágenes]
```

| Servicio | Clase | Servidores integrados |
|---------|--------|-------------------|
| **Voz a texto** | `SpeechToText` | `openai`, `whisper-local`, `faster-whisper`, `google` |
| **Texto a voz** | `TextToSpeech` | `openai`, `edge` ⭐, `coqui`, `google` |
| **Generación de imágenes** | `Generador de imágenes` | `openai`, `google`/`nano-banana`, `stability`, `comfyui` |

!!! consejo "Gratis"
    - **Edge TTS**: TTS gratuito de Microsoft, sin clave API, voces PT-BR de alta calidad
    - **Local Whisper**: STT funcionando 100 % sin conexión
    - **ComfyUI** — Difusión local estable, sin cargo

## Inicio rápido

```pitón
desde omniachain importe SpeechToText, TextToSpeech, ImageGenerator

# STT: transcribir audio
stt = VozATexto(backend="auto")
texto = espera stt.transcribe("audio.mp3")

# TTS: sintetizar voz (Edge TTS = gratis)
tts = TextToSpeech(backend="borde", voz="pt-BR-AntonioNeural")
await tts.speak_to_file("¡Hola mundo!", "saida.mp3")

# Generar imagen (DALL-E, Nano Banana, etc.)
gen = ImageGenerator(backend="openai")
await gen.generate_to_file("Un gato astronauta", "gato.png")
```

## Servidor personalizado

Conecte **cualquier API** en 3 líneas:

```pitón
desde omniachain.media.image_gen importar ImageBackend, ImageGenerator

clase MidjourneyBackend(ImageBackend):
    async def generar(self, solicitud, tamaño="1024x1024", n=1, **kw):
        # llama a tu API aquí
        devolver [imagen_bytes]

ImageGenerator.register_backend("a mitad del viaje", a mitad del viajeBackend)
gen = ImageGenerator(backend="mitad del viaje")
```

El mismo patrón funciona para `STTBackend` y `TTSBackend`.

## Agentes Especializados

| Agente | Clase | ¿Qué hace?
|--------|--------|-----------|
| **Agente de voz** | `Agente de Voz` | STT → LLM → TTS (chat de voz) |
| **ArtistaAgente** | `ArtistaAgente` | Genera imágenes con indicaciones optimizadas para LLM |

```pitón
desde omniachain importe VoiceAgent, ArtistAgent, OpenAI

# Agente de voz
voz = VoiceAgent(proveedor=OpenAI(), tts_backend="borde")
audio = espera voz.escuchar_y_responder("pregunta.mp3")
await voice.chat() # Modo interactivo en la terminal

# artista agente
artista = ArtistAgent(proveedor=OpenAI(), image_backend="openai")
await artista.create("Logotipo para cafetería minimalista", "logo.png")
```

##Herramientas

Cualquier agente puede utilizar las herramientas multimedia:

```pitón
del agente de importación omniachain, Groq, Speech_to_text, text_to_speech, generate_image

agente = Agente(
    proveedor=Groq(),
    herramientas=[voz_a_texto, texto_a_voz, generar_imagen],
)

resultado = await agent.run ("Transcribe el archivo audio.mp3 y luego lee el texto en voz alta")
```

---

!!! información "Siguiente"
    Ver detalle de cada servicio: [STT](stt.md) · [TTS](tts.md) · [Image Generation](image-gen.md)