# PlannerAgent

Follow the **Plan → Execute → Review** cycle for complex tasks.

## Usage

```python
from omniachain import PlannerAgent, Anthropic, web_search, file_write

agent = PlannerAgent(
    provider=Anthropic(),
    tools=[web_search, file_write],
)

result = await agent.run("Create a report on AI trends in 2025")
print(result.metadata["plan"]) # The plan created
print(result.metadata["review"]) # The result review
```

## Execution Cycle

```mermaid
TD graph
    A[Task] --> B[Plan]
    B --> C[Run with Tools]
    C --> D[Review]
    D -->|Satisfactory| E[Final Answer]
    D -->|Insufficient| B
```

1. **Plan**: LLM creates detailed plan with numbered steps
2. **Execute**: Run BaseAgent with tools for each step
3. **Review**: LLM evaluates whether the result meets the objective

## When to use

- ✅ Long reports and surveys
- ✅ Tasks with multiple dependent steps
- ✅ When the quality of the result matters more than speed
- ❌ Simple questions (use `Agent`)