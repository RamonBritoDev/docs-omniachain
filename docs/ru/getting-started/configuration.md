# Настройки

##ОмнияКонфиг

Глобальная конфигурация управляется классом OmniaConfig:

```python
from omniachain import get_config

config = get_config()
print(config.default_provider)   # "anthropic"
print(config.default_timeout)    # 30.0
print(config.security_enabled)   # False
```

## Все переменные

| Переменная | Стандарт | Описание |
|----------|-----------|-----------|
| `OMNIA_DEFAULT_PROVIDER` | `антропный` | Поставщик по умолчанию |
| `OMNIA_DEFAULT_MODEL` | `Клод-3-5-сонет-20241022` | Стандартная модель |
| `OMNIA_DEFAULT_TIMEOUT` | `30.0` | Тайм-аут в секундах |
| `OMNIA_MAX_RETRIES` | `3` | Максимальное количество повторов |
| `OMNIA_MAX_CONCURRENT` | `10` | Максимальное количество параллельных вызовов |
| `OMNIA_PGVECTOR_DSN` | — | PostgreSQL DSN для pgvector |
| `OMNIA_MEMORY_BACKEND` | `буфер` | Стандартная память |
| `OMNIA_SECURITY_ENABLED` | `ложь` | Включает безопасность PGP |
| `OMNIA_GPG_HOME` | `~/.gnupg` | Каталог GPG |
| `OMNIA_LOG_LEVEL` | `ИНФО` | Уровень журнала |
| `OMNIA_LOG_FORMAT` | `текст` | Формат: `текст` или `json` |
| `OMNIA_TRACE_ENABLED` | `ложь` | Активирует трассировку |
| `OMNIA_COST_TRACKING` | `правда` | Активировать отслеживание затрат |

## Ключи API

| Провайдер | Переменная |
|----------|----------|
| Антропный (Клод) | `ANTHROPIC_API_KEY` |
| OpenAI (GPT) | `OPENAI_API_KEY` |
| Грок (Лама) | `GROQ_API_KEY` |
| Google (Близнецы) | `GOOGLE_API_KEY` |
| Оллама (местный) | `OLLAMA_BASE_URL` (по умолчанию: `http://localhost:11434`) |