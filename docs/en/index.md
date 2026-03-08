<div align="center">
  <h1>OmniaChain</h1>
</div>

Python framework for AI agents — async-first, multi-modal, native MCP.

<div class="grid cards" markdown>

- :rocket: **Async-first** — `asyncio` on everything, zero blocking
- :art: **Multi-modal** — Text, PDF, image, audio, video, CSV, URL
- :robot: **5 Providers** — Anthropic, OpenAI, Groq, Ollama, Google
- :shield: **PGP Security** — Access control with cryptographic keys
- :jigsaw: **Native MCP** — Model Context Protocol by Anthropic
- :busts_in_silhouette: **Multi-agent** — Supervisor, ReAct, Planner

</div>

---

## Quick Start

```python
from omniachain import Agent, Anthropic, calculator, web_search

agent = Agent(
    provider=Anthropic(),
    tools=[calculator, web_search],
)

result = await agent.run("What is 1547 × 32 + √144?")
print(result.content) # "49,516"
```

**3 lines. No boilerplate. Ready.**

---

## Why OmniaChain?

| vs LangChain | OmniaChain |
|---|---|
| Mixed sync/async | **100% async** |
| ~20 lines for one agent | **3 lines** |
| No MCP support | **Native MCP** |
| No security | **Full PGP** |
| No video analysis | **Frames + Transcription** |

---

## Navigation

Explore the wiki via the **sidebar on the left** :material-arrow-left: or use the **search** :material-magnify: at the top.

!!! tip "Recommendation"
    Start with [Installation](getting-started/installation.md) → [First Agent](getting-started/first-agent.md)