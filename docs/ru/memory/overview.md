# Память

OmniaChain предлагает **4 типа памяти** для различных нужд.

## Сравнение

| Тип | Стойкий | Семантика | Резюме | Лучшее для |
|------|:-----------:|:---------:|:------:|-------------|
| `Буферная память` | ❌ | ❌ | ❌ | Простой чат |
| `Своднаяпамять` | ❌ | ❌ | ✅ | Длинные разговоры |
| `Постоянная память` | ✅ | ❌ | ❌ | Надежные данные |
| `Векторная память` | ✅ | ✅ | ❌ | Умный поиск |

##Буферная память

Сохраняет последние N сообщений в оперативной памяти:

```python
from omniachain import Agent, OpenAI, BufferMemory

agent = Agent(
    provider=OpenAI(),
    memory=BufferMemory(max_messages=50),
)
```

## Сводная память

Автоматически возобновлять старые сообщения с помощью LLM:

```python
from omniachain import SummaryMemory

memory = SummaryMemory(max_messages=20)
# Quando passa de 20, as mais antigas viram resumo
```

## Постоянная память

Сохраняется в **SQLite** — сохраняется при перезапуске:

```python
from omniachain import PersistentMemory

memory = PersistentMemory("meu_agente.db")
await memory.initialize()

# Key-value store
await memory.set("preferencias", {"tema": "dark"})
dados = await memory.get("preferencias")
```

##Векторная память

**семантический** поиск с помощью pgvector (PostgreSQL):

```python
from omniachain import VectorMemory

memory = VectorMemory(dsn="postgresql://localhost/omniachain")
await memory.initialize()

# Armazenar com embedding
await memory.store("Python é ótimo para IA", metadata={"topic": "tech"})

# Busca semântica
results = await memory.search("linguagem de programação", limit=5)
```

!!! информация «Резервный вариант»
    Нет PostgreSQL? VectorMemory автоматически использует индекс **в памяти**.

## Сервер памяти MCP

Предоставляет векторную память через MCP другим агентам:

```python
from omniachain.memory.mcp_memory import MCPMemoryServer

server = MCPMemoryServer(dsn="postgresql://localhost/omniachain")
await server.run(transport="stdio")

# Tools expostas via MCP:
# - memory_store: armazena com embedding
# - memory_search: busca semântica
# - memory_delete: remove por ID
```