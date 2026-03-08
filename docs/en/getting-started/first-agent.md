# First Agent

Create your first AI agent in **3 lines**.

## Basic Agent

```python
import asyncio
from omniachain import Agent, OpenAI, calculator

async def main():
    agent = Agent(
        provider=OpenAI("gpt-4o-mini"),
        tools=[calculator],
    )

result = await agent.run("What is 2^10 + 42?")
    print(result.content) # "1066"
    print(result.usage.cost) # $0.000015

asyncio.run(main())
```

!!! note "Result"
    The agent **decides alone** when to use the calculator — that's the power of tool calling!

---

## Agent with Web Search

```python
from omniachain import Agent, Anthropic, web_search, calculator

agent = Agent(
    provider=Anthropic(),
    tools=[web_search, calculator],
    system_prompt="You are a researcher. Reply in Portuguese.",
)

result = await agent.run("What is the population of Brazil and how much is divided by 27?")
```

The agent will:
1. Use `web_search` to find the population
2. Use `calculator` to divide by 27
3. Match and respond

---

##Streaming

```python
async for token in agent.stream("Tell a short story"):
    print(token, end="", flush=True)
```

---

## Memory

The agent **remembers** previous conversations automatically:

```python
agent = Agent(provider=OpenAI(), memory="buffer")

await agent.run("My name is John")
result = await agent.run("What is my name?")
print(result.content) # "His name is João"
```

Memory types:

| Type | Usage |
|------|-----|
| `"buffer"` | Last N messages in RAM |
| `"summary"` | Resume old messages with LLM |
| `BufferMemory()` | Manual configuration |
| `PersistentMemory("db.sqlite")` | Persists on disk |

---

## Cost and Tokens

```python
result = await agent.run("Explain IA")

print(f"Tokens: {result.usage.total_tokens}")
print(f"Cost: ${result.usage.cost:.4f}")
print(f"Model: {result.model}")
```

---

!!! tip "Next steps"
    - [Create your own tools](../tools/creating-tools.md)
    - [Specialized agents](../agents/overview.md) (ReAct, Planner, Supervisor)
    - [PGP Security](../security/pgp.md) for access control