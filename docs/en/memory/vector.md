# Vector Memory (pgvector)

Semantic search using **pgvector** with PostgreSQL — find information by **meaning**, not keywords.

## Setup

```bash
# PostgreSQL with pgvector
docker run -d -p 5432:5432 \
  -e POSTGRES_PASSWORD=pass \
  ankane/pgvector

pip install omniachain[vector]
```

```bash
export OMNIA_PGVECTOR_DSN="postgresql://postgres:pass@localhost/omniachain"
```

## Usage

```python
from omniachain import VectorMemory

memory = VectorMemory() # Use OMNIA_PGVECTOR_DSN
await memory.initialize()

# Store
await memory.store(
    "Python is the best language for AI and machine learning",
    metadata={"topic": "tech", "author": "admin"},
)

await memory.store(
    "Brazil has 215 million inhabitants",
    metadata={"topic": "geo"},
)

# Semantic search
results = await memory.search("programming language", limit=3)
for r in results:
    print(f"Score: {r['score']:.2f} | {r['content'][:50]}")
```

## How it works

```mermaid
graph LR
    A[Text] --> B[Embedding Model]
    B --> C[Vector 1536D]
    C --> D[pgvector INSERT]
    E[Query] --> F[Embedding Model]
    F --> G[Vector 1536D]
    G --> H[pgvector: cosine similarity]
    D --> H
    H --> I[Top-K results]
```

## MCP Memory Server

Expose vector memory to **any MCP agent**:

```python
from omniachain.memory.mcp_memory import MCPMemoryServer

server = MCPMemoryServer(
    dsn="postgresql://localhost/omniachain",
    name="memory-server",
)
await server.run(transport="stdio")
```

Other agents may call:
- `memory_store(content, namespace, metadata)`
- `memory_search(query, limit, namespace)`
- `memory_delete(id)`