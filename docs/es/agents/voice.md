#Agente de voz

Agente que chatea por voz: **STT → LLM → TTS** en un proceso automatizado.

## Cómo funciona

```sirena
gráfico LR
    A[🎙️ Audio] -->|STT| B[Texto]
    B -->|LLM| C[Respuesta]
    C -->|TTS| D[🔊Audio]
```

## Uso

```pitón
desde omniachain importe VoiceAgent, OpenAI, Groq

# Configuración básica
agente = VoiceAgent (proveedor = OpenAI ())

# Configuración completa
agente = Agente de Voz(
    proveedor=Groq(),
    stt_backend="susurro-local", # STT local
    tts_backend="borde", # TTS gratuito
    tts_voice="pt-BR-AntonioNeural", # Voz pt-BR
    idioma="es",
    system_prompt="Responder de forma breve y directa.",
)
```

## Procesar audio

```pitón
# Entrada de audio → audio de respuesta
audio_response = espera agente.escuchar_y_responder("pregunta.mp3")

# Guardar respuesta en archivo
audio = esperar agente.escuchar_y_responder(
    "pregunta.mp3",
    salida_path="respuesta.mp3",
)

# Solo texto (sin TTS)
texto = espera agente.escuchar_y_responder_text("pregunta.mp3")
```

## Chat interactivo

Modo terminal donde el usuario escribe y el agente responde:

```pitón
espera agente.chat()
```

```
🎙️ VoiceAgent - Modo interactivo

Tú: ¿Cuál es la capital de Brasil?
🤖 Agente: La capital de Brasil es Brasilia.

Tú: ^C
La conversación terminó.
```

## Parámetros

| Detener | Tipo | Predeterminado | Descripción |
|-------|------|---------|-----------|
| `proveedor` | `Proveedor base` | — | Proveedor de IA (LLM) |
| `herramientas` | `lista[Herramienta]` | `[]` | Herramientas disponibles |
| `stt_backend` | `cadena` | `"automático"` | Parte trasera de STT |
| `tts_backend` | `cadena` | `"automático"` | Servidor TTS |
| `tts_voz` | `cadena` | `Ninguno` | Voz para TTS |
| `lenguaje` | `cadena` | `"PT"` | Idioma |
| `sistema_prompt` | `cadena` | — | Aviso del sistema |

!!! consejo "consejo"
    Utilice `stt_backend="whisper-local"` + `tts_backend="edge"` para un agente 100% gratuito (excepto LLM).