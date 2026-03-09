# Родные инструменты

Инструменты, включенные в OmniaChain, готовы к использованию.

##Калькулятор

```python
from omniachain import calculator

result = await calculator.execute(expression="sqrt(144) + 2^10")
# → 1036.0
```

Поддерживает: `+`, `-`, `*`, `/`, `**`, `sqrt`, `sin`, `cos`, `abs`, `log`, `pi`, `e`

##Веб-поиск

```python
from omniachain import web_search

result = await web_search.execute(query="Python 3.12 novidades", num_results=5)
```

Использует DuckDuckGo (без ключа API). Возвращает заголовок + фрагмент результатов.

## HTTP-запрос

```python
from omniachain import http_request

result = await http_request.execute(
    url="https://api.github.com/repos/python/cpython",
    method="GET",
)
```

Поддерживает все методы HTTP с автоматической повторной попыткой.

## Чтение/запись файла

```python
from omniachain import file_read, file_write

# Ler
content = await file_read.execute(path="dados.txt")

# Escrever
await file_write.execute(path="output.txt", content="Resultado...")
```

## Выполнение кода

```python
from omniachain import code_exec

result = await code_exec.execute(code="print(sum(range(100)))")
# → "4950"
```

!!! предупреждение «Безопасность»
    Выполняется в подпроцессе с таймаутом. Для производства используйте «Разрешения» для управления доступом.

## Навигация через браузер

```python
from omniachain.tools.browser import browser_navigate

result = await browser_navigate.execute(
    url="https://example.com",
    action="read",  # ou "screenshot"
)
```

!!! обратите внимание «Требование»
    Нужен драматург: `pip install omniachain[browser] && playwright install chromium`

## Преобразование речи в текст

```python
from omniachain import speech_to_text

result = await speech_to_text.execute(
    file_path="audio.mp3",
    language="pt",
    backend="auto",
)
```

Транскрибирует аудио, используя лучший доступный бэкэнд. См. [STT](../media/stt.md).

## Преобразование текста в речь

```python
from omniachain import text_to_speech

result = await text_to_speech.execute(
    text="Olá mundo!",
    output_path="saida.mp3",
    voice="pt-BR-AntonioNeural",
    backend="edge",
)
```

Преобразует текст в аудио. Edge TTS бесплатен. См. [TTS](../media/tts.md).

## Создать изображение

```python
from omniachain import generate_image

result = await generate_image.execute(
    prompt="Um gato astronauta",
    output_path="gato.png",
    backend="openai",
)
```

Создавайте изображения с помощью DALL-E, Nano Banana, Stability или ComfyUI. См. [Создание изображения](../media/image-gen.md).