# VoiceAgent

Agent that chats via voice — **STT → LLM → TTS** in an automated pipeline.

## How it works

```mermaid
graph LR
    A[🎙️ Audio] -->|STT| B[Text]
    B -->|LLM| C[Answer]
    C -->|TTS| D[🔊 Audio]
```

## Usage

```python
from omniachain import VoiceAgent, OpenAI, Groq

# Basic configuration
agent = VoiceAgent(provider=OpenAI())

# Complete configuration
agent = VoiceAgent(
    provider=Groq(),
    stt_backend="whisper-local", # STT local
    tts_backend="edge", # Free TTS
    tts_voice="pt-BR-AntonioNeural", # Voice pt-BR
    language="en",
    system_prompt="Reply in a short and direct way.",
)
```

## Process Audio

```python
# Input audio → response audio
audio_response = await agent.listen_and_respond("question.mp3")

# Save response to file
audio = await agent.listen_and_respond(
    "question.mp3",
    output_path="response.mp3",
)

# Text only (no TTS)
text = await agent.listen_and_respond_text("question.mp3")
```

## Interactive Chat

Terminal mode where the user types and the agent responds:

```python
await agent.chat()
```

```
🎙️ VoiceAgent — Interactive Mode

You: What is the capital of Brazil?
🤖 Agent: The capital of Brazil is Brasília.

You: ^C
Conversation ended.
```

## Parameters

| Stop | Type | Default | Description |
|-------|------|---------|-----------|
| `provider` | `BaseProvider` | — | AI Provider (LLM) |
| `tools` | `list[Tool]` | `[]` | Tools available |
| `stt_backend` | `str` | `"auto"` | STT Backend |
| `tts_backend` | `str` | `"auto"` | TTS Backend |
| `tts_voice` | `str` | `None` | Voice for TTS |
| `language` | `str` | `"PT"` | Language |
| `system_prompt` | `str` | — | System prompt |

!!! tip "Tip"
    Use `stt_backend="whisper-local"` + `tts_backend="edge"` for a 100% free agent (except LLM).