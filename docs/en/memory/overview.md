# Memory

OmniaChain offers **4 memory types** for different needs.

## Comparison

| Type | Persistent | Semantics | Summary | Best for |
|------|:-----------:|:---------:|:------:|-------------|
| `BufferMemory` | ❌ | ❌ | ❌ | Simple chat |
| `SummaryMemory` | ❌ | ❌ | ✅ | Long conversations |
| `PersistentMemory` | ✅ | ❌ | ❌ | Durable data |
| `VectorMemory` | ✅ | ✅ | ❌ | Smart search |

##BufferMemory

Keeps the last N messages in RAM:

```python
from omniachain import Agent, OpenAI, BufferMemory

agent = Agent(
    provider=OpenAI(),
    memory=BufferMemory(max_messages=50),
)
```

## SummaryMemory

Automatically resume old messages using LLM:

```python
from omniachain import SummaryMemory

memory = SummaryMemory(max_messages=20)
# When you exceed 20, the oldest ones become a summary
```

## PersistentMemory

Persists in **SQLite** — survives restarts:

```python
from omniachain import PersistentMemory

memory = PersistentMemory("my_agent.db")
await memory.initialize()

# Key-value store
await memory.set("preferences", {"theme": "dark"})
data = await memory.get("preferences")
```

##VectorMemory

**semantic** search with pgvector (PostgreSQL):

```python
from omniachain import VectorMemory

memory = VectorMemory(dsn="postgresql://localhost/omniachain")
await memory.initialize()

# Store with embedding
await memory.store("Python is great for AI", metadata={"topic": "tech"})

# Semantic search
results = await memory.search("programming language", limit=5)
```

!!! info "Fallback"
    No PostgreSQL? VectorMemory uses an **in-memory** index automatically.

## MCP Memory Server

Exposes vector memory via MCP to other agents:

```python
from omniachain.memory.mcp_memory import MCPMemoryServer

server = MCPMemoryServer(dsn="postgresql://localhost/omniachain")
await server.run(transport="stdio")

# Tools exposed via MCP:
# - memory_store: stores with embedding
# - memory_search: semantic search
# - memory_delete: remove by ID
```