# Image Generation

Generate images with any API — DALL-E, Google Nano Banana, Stability AI, local Stable Diffusion, or any custom backend.

## Backends

| Backend | Type | Requires | Models |
|---------|------|--------|---------|
| `openai` | API | `OPENAI_API_KEY` | DALL-E 3, DALL-E 2 |
| `google` / `nano-banana` | API | `GOOGLE_API_KEY` | Gemini Image (Nano Banana) |
| `stability` | API | `STABILITY_API_KEY` | SDXL, SD3 |
| `comfyui` | Location | ComfyUI running | Any .safetensors model |
| `auto` | — | Automatically detects | — |

## Basic Usage

```python
from omniachain import ImageGenerator

#DALL-E 3
gen = ImageGenerator(backend="openai")
await gen.generate_to_file("An astronaut cat in space", "gato.png")

# Google Nano Banana
gen = ImageGenerator(backend="nano-banana")
await gen.generate_to_file("Cyberpunk landscape", "city.png")

#StabilityAI
gen = ImageGenerator(backend="stability")
await gen.generate_to_file("Minimalist logo", "logo.png")

# ComfyUI (Local Stable Diffusion — free)
gen = ImageGenerator(backend="comfyui")
await gen.generate_to_file("Anime style portrait", "anime.png")
```

## Multiple Images

```python
gen = ImageGenerator(backend="openai")

# Generate a list of bytes
images = await gen.generate("A programming cat", n=3)

# Or save directly to directory
paths = await gen.generate_multiple(
    "Variations of a logo",
    output_dir="./logos",
    n=4,
)
```

## Edit Images

```python
gen = ImageGenerator(backend="openai")

# Edit from bytes
with open("foto.png", "rb") as f:
    edited = await gen.edit(f.read(), "Add a cowboy hat")

# Edit direct file
await gen.edit_file("foto.png", "Change the background to beach", output_path="foto_praia.png")
```

!!! note
    Edition available on `openai` and `google` backends. Other backends may not support it.

## Supported Sizes

| Backend | Sizes |
|---------|----------|
| DALL-E 3 | `1024x1024`, `1792x1024`, `1024x1792` |
| Nano Banana | Flexible |
| Stability | `1024x1024`, `512x512`, `768x768` |
| ComfyUI | Any resolution |

## ArtistAgent

Agent that automatically optimizes prompts before generating:

```python
from omniachain import ArtistAgent, OpenAI

artist = ArtistAgent(provider=OpenAI(), image_backend="openai")

# LLM optimizes the prompt before generating
await artist.create("Logo for my coffee shop", "logo.png")

# Multiple variations
await artist.create_variations("Photo-realistic cat with glasses", "gatos/", n=4)

#Edit
await artist.edit_image("foto.png", "Make it more vibrant", "foto_v2.png")
```

## Custom Backend

Connect **any imaging API**:

```python
from omniachain.media.image_gen import ImageBackend, ImageGenerator

class ReplicateBackend(ImageBackend):
    async def generate(self, prompt, size="1024x1024", n=1, **kw):
        import replicate
        output = replicate.run("stability-ai/sdxl", input={"prompt": prompt})
        # Download the image
        import httpx
        async with httpx.AsyncClient() as client:
            resp = await client.get(output[0])
            return [resp.content]

ImageGenerator.register_backend("replicate", ReplicateBackend)
gen = ImageGenerator(backend="replicate")
await gen.generate_to_file("Ocean sunset", "sunset.png")
```

### Examples of backends you can create:

- **Midjourney** (via Discord API or proxy)
- **Leonardo AI**
- **Flux** (via Replicate or local)
- **Ideogram**
- **Fooocus** (local Gradio interface)

## Parameters

| Stop | Type | Default | Description |
|-------|------|---------|-----------|
| `backend` | `str` | `"auto"` | Backend to use |
| `model` | `str` | `None` | Specific model |
| `api_key` | `str` | `None` | API key |
| `base_url` | `str` | `None` | Base URL (for ComfyUI, etc.) |

!!! warning "API Keys"
    Configure via environment variables:
    ```bash
    export OPENAI_API_KEY="sk-..."
    export GOOGLE_API_KEY="AIza..."
    export STABILITY_API_KEY="sk-..."
    ```