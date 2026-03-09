# Первый агент

Создайте своего первого ИИ-агента за **3 строки**.

## Базовый агент

```python
import asyncio
from omniachain import Agent, OpenAI, calculator

async def main():
    agent = Agent(
        provider=OpenAI("gpt-4o-mini"),
        tools=[calculator],
    )

    result = await agent.run("Quanto é 2^10 + 42?")
    print(result.content)    # "1066"
    print(result.usage.cost) # $0.000015

asyncio.run(main())
```

!!! отметить «Результат»
    Агент **сам решает**, когда использовать калькулятор — в этом сила вызова инструментов!

---

## Агент с веб-поиском

```python
from omniachain import Agent, Anthropic, web_search, calculator

agent = Agent(
    provider=Anthropic(),
    tools=[web_search, calculator],
    system_prompt="Você é um pesquisador. Responda em português.",
)

result = await agent.run("Qual a população do Brasil e quanto é dividido por 27?")
```

Агент будет:
1. Используйте `web_search`, чтобы найти население.
2. Используйте калькулятор, чтобы разделить на 27.
3. Сопоставьте и ответьте

---

##Потоковое вещание

```python
async for token in agent.stream("Conte uma história curta"):
    print(token, end="", flush=True)
```

---

## Память

Агент **запоминает** автоматически предыдущие разговоры:

```python
agent = Agent(provider=OpenAI(), memory="buffer")

await agent.run("Meu nome é João")
result = await agent.run("Qual é meu nome?")
print(result.content)  # "Seu nome é João"
```

Типы памяти:

| Тип | Использование |
|------|-----|
| `"буфер"` | Последние N сообщений в оперативной памяти |
| `"резюме"` | Возобновить старые сообщения с LLM |
| `BufferMemory()` | Ручная настройка |
| `PersistentMemory("db.sqlite")` | Сохраняется на диске |

---

## Стоимость и жетоны

```python
result = await agent.run("Explique IA")

print(f"Tokens: {result.usage.total_tokens}")
print(f"Custo:  ${result.usage.cost:.4f}")
print(f"Modelo: {result.model}")
```

---

!!! подсказка «Дальнейшие шаги»
    - [Создавайте свои собственные инструменты](../tools/creating-tools.md)
    - [Специализированные агенты](../agents/overview.md) (ReAct, Planner, Supervisor)
    - [PGP Security](../security/pgp.md) для контроля доступа.