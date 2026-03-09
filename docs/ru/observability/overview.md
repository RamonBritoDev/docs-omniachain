# Наблюдаемость

Logger, Tracer, Cost Tracker и Dashboard — все встроено.

## Трекер затрат

**Отслеживание затрат в режиме реального времени**:

```python
from omniachain import CostTracker

tracker = CostTracker()

# Registra automaticamente
tracker.record(response)

# Métricas
print(f"Custo total:  ${tracker.total_cost:.4f}")
print(f"Total tokens: {tracker.total_tokens:,}")

# Por provider
for prov, data in tracker.by_provider().items():
    print(f"  {prov}: ${data['cost']:.4f} ({data['calls']} chamadas)")

# Resumo
print(tracker.summary())
```

##Регистратор

Структурированный регистратор с цветами и форматом JSON:

```python
from omniachain import get_logger

logger = get_logger("meu-agente")

logger.info("Agente iniciado", model="gpt-4o")
logger.warning("Rate limit próximo", remaining=5)
logger.error("Falha na API", provider="openai", error="timeout")
```

Вывод (текст):
```
[2025-01-15 14:30:22] [    INFO] [meu-agente] Agente iniciado
  → model='gpt-4o'
```

Вывод (JSON, через `OMNIA_LOG_FORMAT=json`):
```json
{"timestamp": "2025-01-15 14:30:22", "level": "INFO", "logger": "meu-agente", "message": "Agente iniciado", "model": "gpt-4o"}
```

## Трейсер

Полная трассировка каждого выполнения:

```python
from omniachain import Tracer

tracer = Tracer()
tracer.start_trace(metadata={"task": "pesquisa"})

with tracer.span("llm_call") as span:
    result = await provider.complete(messages)
    span.attributes["model"] = result.model
    span.attributes["tokens"] = result.usage.total_tokens

with tracer.span("tool_exec") as span:
    await calculator.execute(expression="2+2")
    span.attributes["tool"] = "calculator"

# Exportar
traces = tracer.export_json()
```

## Панель управления

Визуальная панель управления в терминале:

```python
from omniachain.observability.dashboard import Dashboard

dashboard = Dashboard(cost_tracker=tracker, tracer=tracer)
dashboard.show()
```

Дисплеи с Rich:
- 💰 Панель стоимости
- 🔍 Таблица последних следов
- 📊 Затраты на одного провайдера