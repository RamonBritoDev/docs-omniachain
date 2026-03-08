# Settings

## OmniaConfig

Global configuration is managed by the `OmniaConfig` class:

```python
from omniachain import get_config

config = get_config()
print(config.default_provider) # "anthropic"
print(config.default_timeout) # 30.0
print(config.security_enabled) # False
```

## All Variables

| Variable | Standard | Description |
|----------|-----------|-----------|
| `OMNIA_DEFAULT_PROVIDER` | `anthropic` | Default Provider |
| `OMNIA_DEFAULT_MODEL` | `claude-3-5-sonnet-20241022` | Standard model |
| `OMNIA_DEFAULT_TIMEOUT` | `30.0` | Timeout in seconds |
| `OMNIA_MAX_RETRIES` | `3` | Maximum retries |
| `OMNIA_MAX_CONCURRENT` | `10` | Maximum parallel calls |
| `OMNIA_PGVECTOR_DSN` | — | PostgreSQL DSN for pgvector |
| `OMNIA_MEMORY_BACKEND` | `buffer` | Standard memory backend |
| `OMNIA_SECURITY_ENABLED` | `false` | Enables PGP security |
| `OMNIA_GPG_HOME` | `~/.gnupg` | GPG Directory |
| `OMNIA_LOG_LEVEL` | `INFO` | Log level |
| `OMNIA_LOG_FORMAT` | `text` | Format: `text` or `json` |
| `OMNIA_TRACE_ENABLED` | `false` | Activates tracing |
| `OMNIA_COST_TRACKING` | `true` | Activate cost tracking |

## API Keys

| Provider | Variable |
|----------|----------|
| Anthropic (Claude) | `ANTHROPIC_API_KEY` |
| OpenAI (GPT) | `OPENAI_API_KEY` |
| Groq (Llama) | `GROQ_API_KEY` |
| Google (Gemini) | `GOOGLE_API_KEY` |
| Ollama (local) | `OLLAMA_BASE_URL` (default: `http://localhost:11434`) |