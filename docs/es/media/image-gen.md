# Generación de imágenes

Genere imágenes con cualquier API: DALL-E, Google Nano Banana, Stability AI, Stable Diffusion local o cualquier backend personalizado.

## Servidores

| Servidor | Tipo | Requiere | Modelos |
|---------|------|--------|---------|
| `openai` | API | `OPENAI_API_KEY` | DALL-E 3, DALL-E 2 |
| `google` / `nano-plátano` | API | `GOOGLE_API_KEY` | Imagen de Géminis (Nano Banana) |
| `estabilidad` | API | `STABILITY_API_KEY` | SDXL, SD3 |
| `cómodo` | Ubicación | ComfyUI en ejecución | Cualquier modelo .safetensors |
| `auto` | — | Detecta automáticamente | — |

## Uso básico

```pitón
desde omniachain importar ImageGenerator

#DALL-E 3
gen = ImageGenerator(backend="openai")
await gen.generate_to_file("Un gato astronauta en el espacio", "gato.png")

# Google Nano Plátano
gen = ImageGenerator(backend="nano-banana")
await gen.generate_to_file("paisaje Cyberpunk", "ciudad.png")

#EstabilidadAI
gen = ImageGenerator(backend="estabilidad")
await gen.generate_to_file("Logotipo minimalista", "logo.png")

# ComfyUI (Difusión local estable, gratis)
gen = ImageGenerator(backend="comfyui")
await gen.generate_to_file("Retrato estilo anime", "anime.png")
```

## Múltiples imágenes

```pitón
gen = ImageGenerator(backend="openai")

# Generar una lista de bytes
imágenes = await gen.generate("Un gato programador", n=3)

# O guardar directamente en el directorio
rutas = esperar gen.generate_multiple(
    "Variaciones de un logo",
    salida_dir="./logotipos",
    n=4,
)
```

## Editar imágenes

```pitón
gen = ImageGenerator(backend="openai")

# Editar desde bytes
con open("foto.png", "rb") como f:
    editado = await gen.edit(f.read(), "Agregar un sombrero de vaquero")

# Editar archivo directo
await gen.edit_file("foto.png", "Cambiar el fondo a playa", output_path="foto_praia.png")
```

!!! nota
    Edición disponible en backends `openai` y `google`. Es posible que otros servidores no lo admitan.

## Tamaños admitidos

| Servidor | Tallas |
|---------|----------|
| DALL-E 3 | `1024x1024`, `1792x1024`, `1024x1792` |
| Nanoplátano | Flexibles |
| Estabilidad | `1024x1024`, `512x512`, `768x768` |
| Interfaz de usuario cómoda | Cualquier resolución |

## ArtistaAgente

Agente que optimiza automáticamente los mensajes antes de generar:

```pitón
de omniachain importar ArtistAgent, OpenAI

artista = ArtistAgent(proveedor=OpenAI(), image_backend="openai")

# LLM optimiza el mensaje antes de generar
await artista.create("Logotipo de mi cafetería", "logo.png")

# Múltiples variaciones
await artista.create_variations("Gato fotorrealista con gafas", "gatos/", n=4)

#Editar
await artista.edit_image("foto.png", "Hazlo más vibrante", "foto_v2.png")
```

## Servidor personalizado

Conecte **cualquier API de imágenes**:

```pitón
desde omniachain.media.image_gen importar ImageBackend, ImageGenerator

clase ReplicateBackend (ImageBackend):
    async def generar(self, solicitud, tamaño="1024x1024", n=1, **kw):
        importar replicar
        salida = replicate.run ("estabilidad-ai/sdxl", entrada = {"prompt": Prompt})
        # Descargar la imagen
        importar httpx
        async con httpx.AsyncClient() como cliente:
            resp = esperar cliente.get(salida[0])
            devolver [resp.contenido]

ImageGenerator.register_backend("replicar", ReplicarBackend)
gen = ImageGenerator(backend="replicar")
await gen.generate_to_file("Atardecer en el océano", "atardecer.png")
```

### Ejemplos de backends que puedes crear:

- **Midjourney** (a través de Discord API o proxy)
- **Leonardo AI**
- **Flux** (a través de réplica o local)
- **Ideograma**
- **Fooocus** (interfaz local de Gradio)

## Parámetros

| Detener | Tipo | Predeterminado | Descripción |
|-------|------|---------|-----------|
| `backend` | `cadena` | `"automático"` | Backend para usar |
| `modelo` | `cadena` | `Ninguno` | Modelo específico |
| `api_key` | `cadena` | `Ninguno` | Clave API |
| `base_url` | `cadena` | `Ninguno` | URL base (para ComfyUI, etc.) |

!!! advertencia "Claves API"
    Configurar a través de variables de entorno:
    ```golpecito
    exportar OPENAI_API_KEY="sk-..."
    export GOOGLE_API_KEY="AIza..."
    exportar STABILITY_API_KEY="sk-..."
    ```