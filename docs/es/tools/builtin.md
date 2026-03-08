# Herramientas nativas

Herramientas incluidas en OmniaChain, listas para usar.

##Calculadora

```pitón
de la calculadora de importación omniachain

resultado = espera calculadora.execute(expresión="sqrt(144) + 2^10")
# → 1036.0
```

Soporta: `+`, `-`, `*`, `/`, `**`, `sqrt`, `sin`, `cos`, `abs`, `log`, `pi`, `e`

##Búsqueda web

```pitón
desde omniachain importar web_search

resultado = esperar web_search.execute(consulta="Python 3.12 nuevo", num_results=5)
```

Utiliza DuckDuckGo (sin clave API). Devuelve título + fragmento de resultados.

## Solicitud HTTP

```pitón
desde omniachain importar http_request

resultado = esperar http_request.execute(
    url="https://api.github.com/repos/python/cpython",
    método="OBTENER",
)
```

Admite todos los métodos HTTP con reintento automático.

## Lectura/escritura de archivos

```pitón
desde omniachain importar file_read, file_write

# Leer
contenido = espera file_read.execute(ruta="dados.txt")

# escribir
await file_write.execute(ruta="salida.txt", contenido="Resultado...")
```

## Ejecutivo de código

```pitón
desde omniachain importar code_exec

resultado = espera code_exec.execute(código="imprimir(suma(rango(100)))")
# → "4950"
```

!!! advertencia "Seguridad"
    Se ejecuta en subproceso con tiempo de espera. Para producción, utilícelo con "Permisos" para controlar el acceso.

## Navegación del navegador

```pitón
desde omniachain.tools.browser importar browser_navigate

resultado = esperar browser_navigate.execute(
    url="https://ejemplo.com",
    acción="leer", # o "captura de pantalla"
)
```

!!! nota "Requisito"
    Necesita dramaturgo: `pip install omniachain[navegador] && dramaturgo instala chromium`

## Voz a texto

```pitón
desde omniachain importar voz_a_texto

resultado = esperar discurso_a_texto.execute(
    file_path="audio.mp3",
    idioma="es",
    backend="automático",
)
```

Transcribe audio utilizando el mejor backend disponible. Consulte [STT](../media/stt.md).

## Texto a voz

```pitón
desde omniachain importar text_to_speech

resultado = esperar text_to_speech.execute(
    text="¡Hola mundo!",
    salida_path="salida.mp3",
    voz="pt-BR-AntonioNeural",
    backend="borde",
)
```

Convierte texto a audio. Edge TTS es gratuito. Consulte [TTS](../media/tts.md).

## Generar imagen

```pitón
desde omniachain importar generate_image

resultado = espera generar_imagen.execute(
    inmediato="Un gato astronauta",
    salida_path="gato.png",
    backend="openai",
)
```

Genere imágenes con DALL-E, Nano Banana, Stability o ComfyUI. Consulte [Generación de imágenes](../media/image-gen.md).