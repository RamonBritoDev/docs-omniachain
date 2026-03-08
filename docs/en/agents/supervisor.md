# SupervisorAgent

Coordinates **multiple specialized agents** — delegates sub-tasks and combines results.

## Usage

```python
from omniachain import (
    Anthropic, Groq, OpenAI,
    ReActAgent, PlannerAgent, SupervisorAgent,
    web_search, calculator, file_write,
)

# Specialized agents
researcher = ReActAgent(provider=Anthropic(), tools=[web_search], name="researcher")
analyst = ReActAgent(provider=Groq(), tools=[calculator], name="analyst")
writer = ReActAgent(provider=OpenAI(), tools=[file_write], name="writer")

# Supervisor coordinates
supervisor = SupervisorAgent(
    provider=Anthropic(),
    sub_agents=[researcher, analyst, writer],
)

result = await supervisor.run(
    "Research AI in 2025, analyze the data and write a report"
)

print(result.metadata["agents_used"]) # ["researcher", "analyst", "writer"]
print(result.metadata["delegations"]) # Who did what
```

## Execution Flow

```mermaid
TD graph
    S[Supervisor] -->|Analyzes task| D{Delegate}
    D -->|"search AI"| R[Researcher]
    D -->|"analyze data"| A[Analyst]
    D -->|"write report"| W[Writer]
    R --> C[Combines Results]
    A --> C
    W --> C
    C --> F[Final Answer]
```

## Delegation Format

Supervisor uses the format:
```
DELEGATE: researcher -> Research AI trends in 2025
DELEGATE: analyst -> Analyze the data found
DELEGATE: writer -> Write the final report
```

## Multi-Provider

Each agent can use a **different provider** — optimizing cost:

| Agent | Provider | Reason |
|--------|----------|-------|
| Researcher | Anthropic (Claude) | Best for Search |
| Analyst | Groq (Llama 3) | Fast and free |
| Writer | OpenAI (GPT-4o) | Best Writing |