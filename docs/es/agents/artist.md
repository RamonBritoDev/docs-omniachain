# ArtistaAgente

Agente especializado en **generar y editar imágenes** con indicaciones optimizadas por LLM.

## Cómo funciona

```sirena
gráfico LR
    A[Descripción] -->|LLM optimiza| B[Mensaje detallado]
    B -->|Servicio de fondo| C[🎨 Imagen]
```

`ArtistAgent` utiliza LLM para transformar descripciones simples en indicaciones detalladas y optimizadas antes de generar la imagen.

## Uso

```pitón
desde omniachain importar ArtistAgent, OpenAI, Google

# Con DALL-E 3
artista = ArtistAgent(proveedor=OpenAI(), image_backend="openai")

# Con Google Nano Plátano
artista = ArtistAgent(proveedor=Google(), image_backend="google")

# Con difusión estable local
artista = ArtistAgent(proveedor=OpenAI(), image_backend="comfyui")
```

## Generar imagen

```pitón
# LLM optimiza el mensaje automáticamente
await artista.create("Logotipo de mi cafetería", "logo.png")

# Sin optimización (mensaje directo)
espera artista.create(
    "Un logo minimalista para cafetería, diseño plano, tonos cálidos",
    "logotipo.png",
    optimizar_prompt=Falso,
)
```

## Variaciones

```pitón
rutas = esperar artista.create_variations(
    "Retrato de gato con gafas",
    salida_dir="./gatos",
    n=4,
)
# → gatos/imagen_1.png, imagen_2.png, imagen_3.png, imagen_4.png
```

## Editar imágenes

```pitón
espera artista.edit_image(
    "foto.png",
    "Cambia el fondo a una playa al atardecer",
    salida_path="foto_praia.png",
)
```

## Parámetros

| Detener | Tipo | Predeterminado | Descripción |
|-------|------|---------|-----------|
| `proveedor` | `Proveedor base` | — | Proveedor LLM |
| `image_backend` | `cadena` | `"automático"` | Backend de generación |
| `herramientas` | `lista[Herramienta]` | `[]` | Herramientas adicionales |
| `sistema_prompt` | `cadena` | — | Aviso del sistema |

!!! información "Optimización rápida"
    Cuando `optimize_prompt=True` (predeterminado), el agente usa LLM para crear indicaciones en inglés optimizadas para el backend, incluidos detalles de estilo, iluminación, composición y técnica artística.