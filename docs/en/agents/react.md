#ReActAgent

**ReAct** (Reason + Act) follows a cycle of reasoning:

```
Thought → Action → Observation → Thought → ... → Answer
```

## Usage

```python
from omniachain import ReActAgent, Anthropic, web_search, calculator

agent = ReActAgent(
    provider=Anthropic(),
    tools=[web_search, calculator],
    name="researcher",
)

result = await agent.run("What is the population of Brazil divided by 27 states?")
```

The agent will:

1. **Thought**: "I need to know the population of Brazil"
2. **Action**: `web_search("population Brazil 2024")`
3. **Observation**: "~215 million"
4. **Thought**: "Now divide by 27"
5. **Action**: `calculator("215000000 / 27")`
6. **Observation**: "~7,963,000"
7. **Answer**: "Approximately 7.9 million per state"

## When to use

- ✅ Multi-step search
- ✅ Reasoning that needs external data
- ✅ Calculations based on dynamic information
- ❌ Simple tasks without tools (use `Agent`)