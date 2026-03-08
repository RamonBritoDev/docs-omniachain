# Native Tools

Tools included in OmniaChain, ready to use.

##Calculator

```python
from omniachain import calculator

result = await calculator.execute(expression="sqrt(144) + 2^10")
# → 1036.0
```

Supports: `+`, `-`, `*`, `/`, `**`, `sqrt`, `sin`, `cos`, `abs`, `log`, `pi`, `e`

##WebSearch

```python
from omniachain import web_search

result = await web_search.execute(query="Python 3.12 new", num_results=5)
```

Uses DuckDuckGo (without API key). Returns title + snippet of results.

## HTTP Request

```python
from omniachain import http_request

result = await http_request.execute(
    url="https://api.github.com/repos/python/cpython",
    method="GET",
)
```

Supports all HTTP methods with automatic retry.

## File Read/Write

```python
from omniachain import file_read, file_write

# Read
content = await file_read.execute(path="dados.txt")

# Write
await file_write.execute(path="output.txt", content="Result...")
```

## Code Exec

```python
from omniachain import code_exec

result = await code_exec.execute(code="print(sum(range(100)))")
# → "4950"
```

!!! warning "Security"
    Executes in subprocess with timeout. For production, use with `Permissions` to control access.

## Browser Navigate

```python
from omniachain.tools.browser import browser_navigate

result = await browser_navigate.execute(
    url="https://example.com",
    action="read", # or "screenshot"
)
```

!!! note "Requirement"
    Need Playwright: `pip install omniachain[browser] && playwright install chromium`

## Speech-to-Text

```python
from omniachain import speech_to_text

result = await speech_to_text.execute(
    file_path="audio.mp3",
    language="en",
    backend="auto",
)
```

Transcribes audio using the best backend available. See [STT](../media/stt.md).

## Text-to-Speech

```python
from omniachain import text_to_speech

result = await text_to_speech.execute(
    text="Hello world!",
    output_path="output.mp3",
    voice="pt-BR-AntonioNeural",
    backend="edge",
)
```

Converts text to audio. Edge TTS is free. See [TTS](../media/tts.md).

## Generate Image

```python
from omniachain import generate_image

result = await generate_image.execute(
    prompt="An astronaut cat",
    output_path="gato.png",
    backend="openai",
)
```

Generate images with DALL-E, Nano Banana, Stability or ComfyUI. See [Image Generation](../media/image-gen.md).