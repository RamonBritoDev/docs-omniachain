# Voz a texto (STT)

Transcripción de audio con múltiples backends: API y modelos locales.

## Servidores

| Servidor | Tipo | Requiere | Velocidad |
|---------|------|--------|:----------:|
| `openai` | API | `OPENAI_API_KEY` | ⚡⚡⚡ |
| `susurro-local` | Ubicación | `pip instalar openai-whisper` | ⚡⚡ |
| `más rápido-susurro` | Ubicación | `pip instala más rápido-susurro` | ⚡⚡⚡ |
| `google` | API | `pip instala google-cloud-speech` | ⚡⚡⚡ |
| `auto` | — | Detecta automáticamente | — |

## Uso básico

```pitón
desde omniachain importar SpeechToText

# Detecta automáticamente el mejor backend disponible
stt = VozATexto()
texto = espera stt.transcribe("audio.mp3")

# backend específico
stt = SpeechToText(backend="openai", idioma="pt")
stt = SpeechToText(backend="susurro-local", modelo="grande")
stt = SpeechToText(backend="susurro más rápido", modelo="medio")
```

## Transcripción completa

Devuelve texto + segmentos con marcas de tiempo:

```pitón
resultado = esperar stt.transcribe_full("audio.mp3")

imprimir(resultado.texto) # Texto completo
imprimir(resultado.idioma) # "pt"
print(result.backend_used) # "susurro más rápido"

para seg en resultados.segmentos:
    print(f"[{seg.start:.1f}s → {seg.end:.1f}s] {seg.text}")
```

## Acepta múltiples entradas

```pitón
# Archivo
texto = espera stt.transcribe("audio.mp3")
texto = espera stt.transcribe("podcast.wav")
texto = espera stt.transcribe("musica.flac")

# bytes
con open("audio.mp3", "rb") como f:
    texto = espera stt.transcribe(f.read())

#Camino
desde pathlib importar ruta
texto = espera stt.transcribe(Ruta("audio.mp3"))
```

## Servidor personalizado

```pitón
desde omniachain.media.stt importe STTBackend, SpeechToText

clase MiAPISTT(STTBackend):
    async def transcribe(self, audio_data, format="mp3", language="pt", **kw):
        # Llama a tu API aquí
        respuesta = esperar my_api.transcribe(audio_data)
        devolver respuesta.texto

SpeechToText.register_backend("mi-api", MiAPISTT)
stt = SpeechToText(backend="mi-api")
```

## Parámetros

| Detener | Tipo | Predeterminado | Descripción |
|-------|------|---------|-----------|
| `backend` | `cadena` | `"automático"` | Backend para usar |
| `modelo` | `cadena` | `Ninguno` | Modelo (por ejemplo, `"grande"` para Whisper) |
| `api_key` | `cadena` | `Ninguno` | Clave API (o mediante env var) |
| `lenguaje` | `cadena` | `"PT"` | Idioma de audio |

!!! nota "Instalación"
    ```golpecito
    # Susurro local (sin conexión)
    instalación de pip en openai-whisper

# Susurro más rápido (~4 veces más rápido)
    pip instala más rápido-susurro
    ```