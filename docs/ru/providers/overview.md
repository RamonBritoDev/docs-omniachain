#Поставщики

Встроенная поддержка **5 поставщиков ИИ** — один и тот же API для всех.

## Доступные провайдеры

| Провайдер | Класс | Модели | Видение | Инструменты | СТТ | ТТС | Генератор изображений |
|----------|--------|---------|:-----:|:-----:|:---:|:---:|:------:|
| **Антропный** | `Антропный()` | Клод 3.5, 3, Хайку | ✅ | ✅ | ❌ | ❌ | ❌ |
| **ОпенАИ** | `OpenAI()` | ГПТ-4о, 4, 3,5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Грок** | `Грок()` | Лама 3, Микстраль | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Google** | `Google()` | Близнецы Про, Флэш | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Оллама** | `Оллама()` | Любое место | ❌ | ❌ | ❌ | ❌ | ❌ |

## Использование

```python
from omniachain import Anthropic, OpenAI, Groq, Google, Ollama

# Todos seguem a mesma API!
provider = Anthropic("claude-3-5-sonnet-20241022")
provider = OpenAI("gpt-4o-mini")
provider = Groq("llama-3.1-70b-versatile")
provider = Google("gemini-pro")
provider = Ollama("llama3")

# Mesma chamada para qualquer provider
result = await provider.complete([Message.user("Olá!")])
```

## Пул провайдеров

Управляйте несколькими поставщиками с помощью автоматических стратегий:

```python
from omniachain import ProviderPool

pool = ProviderPool()
pool.add(Anthropic())
pool.add(OpenAI())
pool.add(Groq())

# Estratégias
provider = await pool.get(strategy="fallback")      # Tenta em ordem
provider = await pool.get(strategy="round_robin")    # Alterna
provider = await pool.get(strategy="cheapest")       # Mais barato
provider = await pool.get(strategy="fastest")        # Mais rápido
```

## Затраты

| Модель | Ввод/1К | Выход/1К |
|-----------|----------|-----------|
| Клод-3-5-сонет | $0,003 | $0,015 |
| гпт-4о | $0,005 | $0,015 |
| gpt-4o-мини | $0,00015 | $0,0006 |
| лама-3.1 (Грок) | $0,00059 | $0,00079 |
| близнецы-про | $0,00025 | $0,0005 |
| Привет | **Бесплатно** | **Бесплатно** |