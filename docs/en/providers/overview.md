#Providers

Native support for **5 AI providers** — same API for all.

## Available Providers

| Provider | Class | Models | Vision | Tools | STT | TTS | ImageGen |
|----------|--------|---------|:-----:|:-----:|:---:|:---:|:------:|
| **Anthropic** | `Anthropic()` | Claude 3.5, 3, Haiku | ✅ | ✅ | ❌ | ❌ | ❌ |
| **OpenAI** | `OpenAI()` | GPT-4o, 4, 3.5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Groq** | `Groq()` | Llama 3, Mixtral | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Google** | `Google()` | Gemini Pro, Flash | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Ollama** | `Ollama()` | Any location | ❌ | ❌ | ❌ | ❌ | ❌ |

## Usage

```python
from omniachain import Anthropic, OpenAI, Groq, Google, Ollama

# Everyone follows the same API!
provider = Anthropic("claude-3-5-sonnet-20241022")
provider = OpenAI("gpt-4o-mini")
provider = Groq("llama-3.1-70b-versatile")
provider = Google("gemini-pro")
provider = Ollama("llama3")

# Same call to any provider
result = await provider.complete([Message.user("Hello!")])
```

## Provider Pool

Manage multiple providers with automatic strategies:

```python
from omniachain import ProviderPool

pool = ProviderPool()
pool.add(Anthropic())
pool.add(OpenAI())
pool.add(Groq())

# Strategies
provider = await pool.get(strategy="fallback") # Try in order
provider = await pool.get(strategy="round_robin") # Toggle
provider = await pool.get(strategy="cheapest") # Cheapest
provider = await pool.get(strategy="fastest") # Fastest
```

## Costs

| Model | Input/1K | Output/1K |
|-----------|----------|-----------|
| claude-3-5-sonnet | $0.003 | $0.015 |
| gpt-4o | $0.005 | $0.015 |
| gpt-4o-mini | $0.00015 | $0.0006 |
| llama-3.1 (Groq) | $0.00059 | $0.00079 |
| gemini-pro | $0.00025 | $0.0005 |
| Hello | **Free** | **Free** |