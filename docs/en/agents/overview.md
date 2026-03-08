# Agents

OmniaChain offers **6 types of specialized agents**, all with tool calling and memory.

## Overview

```mermaid
TD graph
    A[Agent Base] --> B[ReAct Agent]
    A --> C[Multimodal Agent]
    A --> D[Planner Agent]
    A --> E[Supervisor Agent]
    A --> F[Voice Agent]
    A --> G[Artist Agent]
    E --> B
    E --> C
    E --> D
```

| Agent | Specialty | When to use |
|--------|--------------|-------------|
| `Agent` | General | Simple tasks |
| `ReActAgent` | Reason + Act | Search, chained reasoning |
| `MultimodalAgent` | Any input | PDF, image, audio, video |
| `PlannerAgent` | Plan → Execute → Review | Complex tasks in steps |
| `SupervisorAgent` | Coordinates sub-agents | Multi-agent with delegation |
| `VoiceAgent` | STT → LLM → TTS | Voice Chat |
| `ArtistAgent` | Generates images | Image Creation with Optimized Prompts |

##AgentBase

The simplest agent — works for 80% of cases:

```python
from omniachain import Agent, OpenAI, calculator, web_search

agent = Agent(
    provider=OpenAI("gpt-4o-mini"),
    tools=[calculator, web_search],
    memory="buffer", # Remember conversation
    system_prompt="Reply in PT-BR.",
    max_iterations=10, # Max reasoning loops
)

result = await agent.run("How much is 15% of R$320?")
```

### Parameters

| Stop | Type | Description |
|-------|------|-----------|
| `provider` | `BaseProvider` | AI Provider |
| `tools` | `list[Tool]` | Tools available |
| `memory` | `str \| Memory` | `"buffer"`, `"summary"`, or instance |
| `system_prompt` | `str` | System prompt |
| `max_iterations` | `int` | Max tool calling cycles |
| `keypair` | `KeyPair` | Agent PGP Key |
| `permissions` | `Permissions` | Access rules |

---

!!! type "Next"
    See the specialized agents: [ReAct](react.md) · [Multimodal](multimodal.md) · [Planner](planner.md) · [Supervisor](supervisor.md) · [Voice](voice.md) · [Artist](artist.md)