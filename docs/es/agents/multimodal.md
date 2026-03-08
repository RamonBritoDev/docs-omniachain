# Agente multimodal

Procesa **cualquier tipo de entrada**: texto, PDF, imagen, audio, vídeo, CSV, URL.

## Uso

```pitón
desde omniachain importar MultimodalAgent, OpenAI

agente = Agente Multimodal (proveedor = OpenAI ("gpt-4o"))

resultado = esperar agente.ejecutar(
    "Analizar todos estos datos y generar un resumen ejecutivo",
    entradas=[
        "relatorio.pdf", # PDF → texto extraído
        "grafico_vendas.png", # Imagen → base64 (ver)
        "data.csv", # CSV → tabla + estadísticas
        "intervista.mp3", # Audio → Transcripción susurro
        "presentacao.mp4", # Vídeo → fotogramas + audio
        "https://ejemplo.com", # URL → raspado
    ],
)
```

## Cómo funciona internamente

```sirena
gráfico LR
    A[entradas] --> B[Autocargador]
    B --> C{Tipo de detección}
    C -->|.pdf| D[Cargador de PDF]
    C -->|.png/.jpg| E[Cargador de imágenes]
    C -->|.mp3/.wav| F[cargador de audio]
    C -->|.mp4/YouTube| G[Cargador de vídeos]
    C -->|.csv/.xlsx| H[cargador CSV]
    C -->|http://| Yo[cargador de URL]
    D & E & F & G & H & I --> J[Contenido del mensaje]
    J --> K[Proveedor con visión]
```

## Tipos admitidos

| Ampliación | Cargador | ¿Qué hace?
|----------|-----------|-----------|
| `.pdf` | Cargador de PDF | Extraer texto con PyPDF |
| `.png/.jpg/.webp` | Cargador de imágenes | Base64 para vista nativa |
| `.mp3/.wav/.ogg` | Cargador de audio | Transcribe con Whisper |
| `.mp4/.avi/.mkv` | Cargador de vídeos | **Cuadros + transcripción** |
| `.csv/.xlsx` | Cargador CSV | Pandas: datos + estadísticas |
| `.py/.js/.ts` | Cargador de código | Código con sintaxis de información |
| `http://...` | Cargador de URL | Raspado con BeautifulSoup |
| URL de YouTube | Cargador de vídeos | Descargar + fotogramas + audio |

## Vídeo: 3 capas

`VideoLoader` es único; ningún marco hace esto:

1. **📸 Fotogramas clave**: Extrae N fotogramas distribuidos → base64 → ve el modelo
2. **🎵 Audio**: Extraer pista → Transcripción Whisper
3. **📊 Metadatos**: Duración, resolución, códec, FPS

```pitón
desde omniachain.loaders.video importar VideoLoader

cargador = VideoLoader (num_frames=6, transcribe_audio=True)
contenido = espera loader.load("video.mp4")
# → [resumen, cuadro1, cuadro2, ..., cuadro6, transcripción]
```

!!! advertencia "Requisito"
    VideoLoader y AudioLoader necesitan **ffmpeg** instalado en el sistema.