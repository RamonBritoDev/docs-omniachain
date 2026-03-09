# Векторная память (pgvector)

Семантический поиск с использованием **pgvector** в PostgreSQL — находите информацию по **значению**, а не по ключевым словам.

## Настраивать

```bash
# PostgreSQL com pgvector
docker run -d -p 5432:5432 \
  -e POSTGRES_PASSWORD=pass \
  ankane/pgvector

pip install omniachain[vector]
```

```bash
export OMNIA_PGVECTOR_DSN="postgresql://postgres:pass@localhost/omniachain"
```

## Использование

```python
from omniachain import VectorMemory

memory = VectorMemory()  # Usa OMNIA_PGVECTOR_DSN
await memory.initialize()

# Armazenar
await memory.store(
    "Python é a melhor linguagem para IA e machine learning",
    metadata={"topic": "tech", "author": "admin"},
)

await memory.store(
    "O Brasil tem 215 milhões de habitantes",
    metadata={"topic": "geo"},
)

# Busca semântica
results = await memory.search("linguagem de programação", limit=3)
for r in results:
    print(f"Score: {r['score']:.2f} | {r['content'][:50]}")
```

## Как это работает

```mermaid
graph LR
    A[Texto] --> B[Embedding Model]
    B --> C[Vetor 1536D]
    C --> D[pgvector INSERT]
    E[Query] --> F[Embedding Model]
    F --> G[Vetor 1536D]
    G --> H[pgvector: cosine similarity]
    D --> H
    H --> I[Top-K resultados]
```

## Сервер памяти MCP

Предоставьте векторную память **любому агенту MCP**:

```python
from omniachain.memory.mcp_memory import MCPMemoryServer

server = MCPMemoryServer(
    dsn="postgresql://localhost/omniachain",
    name="memory-server",
)
await server.run(transport="stdio")
```

Другие агенты могут позвонить:
- `memory_store(содержание, пространство имен, метаданные)`
- `memory_search(запрос, предел, пространство имен)`
- `memory_delete(id)`