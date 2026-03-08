# Observability

Logger, Tracer, Cost Tracker and Dashboard — all built-in.

## Cost Tracker

**Real-time** cost tracking:

```python
from omniachain import CostTracker

tracker = CostTracker()

# Register automatically
tracker.record(response)

# Metrics
print(f"Total cost: ${tracker.total_cost:.4f}")
print(f"Total tokens: {tracker.total_tokens:,}")

# By provider
for prov, data in tracker.by_provider().items():
    print(f" {prov}: ${data['cost']:.4f} ({data['calls']} calls)")

# Summary
print(tracker.summary())
```

##Logger

Structured logger with colors and JSON format:

```python
from omniachain import get_logger

logger = get_logger("my-agent")

logger.info("Agent started", model="gpt-4o")
logger.warning("Rate limit next", remaining=5)
logger.error("API Failed", provider="openai", error="timeout")
```

Output (text):
```
[2025-01-15 14:30:22] [ INFO] [my-agent] Agent started
  → model='gpt-4o'
```

Output (JSON, via `OMNIA_LOG_FORMAT=json`):
```json
{"timestamp": "2025-01-15 14:30:22", "level": "INFO", "logger": "my-agent", "message": "Agent started", "model": "gpt-4o"}
```

## Tracer

Complete trace of each execution:

```python
from omniachain import Tracer

tracer = Tracer()
tracer.start_trace(metadata={"task": "research"})

with tracer.span("llm_call") as span:
    result = await provider.complete(messages)
    span.attributes["model"] = result.model
    span.attributes["tokens"] = result.usage.total_tokens

with tracer.span("tool_exec") as span:
    await calculator.execute(expression="2+2")
    span.attributes["tool"] = "calculator"

# Export
traces = tracer.export_json()
```

## Dashboard

Visual dashboard in the terminal:

```python
from omniachain.observability.dashboard import Dashboard

dashboard = Dashboard(cost_tracker=tracker, tracer=tracer)
dashboard.show()
```

Displays with Rich:
- 💰 Cost panel
- 🔍 Recent traces table
- 📊 Costs per provider