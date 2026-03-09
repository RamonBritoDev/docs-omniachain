# Генерация изображения

Создавайте изображения с помощью любого API — DALL-E, Google Nano Banana, Stability AI, локального Stable Diffusion или любого пользовательского бэкэнда.

## Бэкэнды

| Бэкэнд | Тип | Требуется | Модели |
|---------|------|--------|---------|
| `опенай` | API | `OPENAI_API_KEY` | ДАЛЛ-И 3, ДАЛЛ-И 2 |
| `google` / `нано-банан` | API | `GOOGLE_API_KEY` | Изображение Близнецов (Нано Банан) |
| `стабильность` | API | `STABILITY_API_KEY` | SDXL, SD3 |
| `комфьюи` | Расположение | ComfyUI работает | Любая модель .safetensors |
| `авто` | — | Автоматически обнаруживает | — |

## Базовое использование

```python
from omniachain import ImageGenerator

# DALL-E 3
gen = ImageGenerator(backend="openai")
await gen.generate_to_file("Um gato astronauta no espaço", "gato.png")

# Google Nano Banana
gen = ImageGenerator(backend="nano-banana")
await gen.generate_to_file("Paisagem cyberpunk", "cidade.png")

# Stability AI
gen = ImageGenerator(backend="stability")
await gen.generate_to_file("Logo minimalista", "logo.png")

# ComfyUI (Stable Diffusion local — grátis)
gen = ImageGenerator(backend="comfyui")
await gen.generate_to_file("Retrato estilo anime", "anime.png")
```

## Несколько изображений

```python
gen = ImageGenerator(backend="openai")

# Gerar uma lista de bytes
images = await gen.generate("Um gato programador", n=3)

# Ou salvar direto em diretório
paths = await gen.generate_multiple(
    "Variações de um logo",
    output_dir="./logos",
    n=4,
)
```

## Редактировать изображения

```python
gen = ImageGenerator(backend="openai")

# Editar a partir de bytes
with open("foto.png", "rb") as f:
    editada = await gen.edit(f.read(), "Adicione um chapéu de cowboy")

# Editar arquivo direto
await gen.edit_file("foto.png", "Mude o fundo para praia", output_path="foto_praia.png")
```

!!! Примечание
    Версия доступна на серверных платформах openai и google. Другие бэкэнды могут его не поддерживать.

## Поддерживаемые размеры

| Бэкэнд | Размеры |
|---------|----------|
| ДАЛЛ-И 3 | `1024x1024`, `1792x1024`, `1024x1792` |
| Нано Банан | Гибкий |
| Стабильность | `1024x1024`, `512x512`, `768x768` |
| Удобный интерфейс | Любое разрешение |

## ArtistAgent

Агент, который автоматически оптимизирует подсказки перед созданием:

```python
from omniachain import ArtistAgent, OpenAI

artist = ArtistAgent(provider=OpenAI(), image_backend="openai")

# O LLM otimiza o prompt antes de gerar
await artist.create("Logo para minha cafeteria", "logo.png")

# Múltiplas variações
await artist.create_variations("Photo-realistic cat with glasses", "gatos/", n=4)

# Editar
await artist.edit_image("foto.png", "Torne mais vibrante", "foto_v2.png")
```

## Пользовательский бэкэнд

Подключите **любой API обработки изображений**:

```python
from omniachain.media.image_gen import ImageBackend, ImageGenerator

class ReplicateBackend(ImageBackend):
    async def generate(self, prompt, size="1024x1024", n=1, **kw):
        import replicate
        output = replicate.run("stability-ai/sdxl", input={"prompt": prompt})
        # Baixar a imagem
        import httpx
        async with httpx.AsyncClient() as client:
            resp = await client.get(output[0])
            return [resp.content]

ImageGenerator.register_backend("replicate", ReplicateBackend)
gen = ImageGenerator(backend="replicate")
await gen.generate_to_file("Ocean sunset", "sunset.png")
```

### Примеры бэкэндов, которые вы можете создать:

- **В середине пути** (через Discord API или прокси)
- **Леонардо А.И.**
- **Flux** (через репликацию или локально)
- **Идеограмма**
- **Foocus** (локальный интерфейс Gradio)

## Параметры

| Стоп | Тип | По умолчанию | Описание |
|-------|------|---------|-----------|
| `бэкэнд` | `ул` | `"авто"` | Серверная часть для использования |
| `модель` | `ул` | `Нет` | Конкретная модель |
| `api_key` | `ул` | `Нет` | API-ключ |
| `base_url` | `ул` | `Нет` | Базовый URL-адрес (для ComfyUI и т. д.) |

!!! предупреждение «Ключи API»
    Настройте через переменные среды:
    ```bash
    export OPENAI_API_KEY="sk-..."
    export GOOGLE_API_KEY="AIza..."
    export STABILITY_API_KEY="sk-..."
    ```