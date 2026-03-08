# Memoria

OmniaChain ofrece **4 tipos de memoria** para diferentes necesidades.

## Comparación

| Tipo | Persistente | Semántica | Resumen | Lo mejor para |
|------|:-----------:|:---------:|:------:|-------------|
| `Memoria Búfer` | ❌ | ❌ | ❌ | Charla sencilla |
| `ResumenMemoria` | ❌ | ❌ | ✅ | Largas conversaciones |
| `Memoria persistente` | ✅ | ❌ | ❌ | Datos duraderos |
| `MemoriaVector` | ✅ | ✅ | ❌ | Búsqueda inteligente |

##Memoria de búfer

Mantiene los últimos N mensajes en la RAM:

```pitón
del agente de importación omniachain, OpenAI, BufferMemory

agente = Agente(
    proveedor=OpenAI(),
    memoria=MemoriaBuffer(max_messages=50),
)
```

## ResumenMemoria

Reanudar automáticamente mensajes antiguos usando LLM:

```pitón
desde omniachain importar SummaryMemory

memoria = MemoriaResumen(max_messages=20)
# Cuando superas los 20, los más antiguos se convierten en un resumen
```

## Memoria persistente

Persiste en **SQLite** — sobrevive a los reinicios:

```pitón
desde omniachain importar PersistentMemory

memoria = MemoriaPersistente("mi_agente.db")
espera memoria.inicializar()

# Almacén de valores clave
aguarde memoria.set("preferencias", {"tema": "oscuro"})
datos = espera memoria.get("preferencias")
```

##MemoriaVector

Búsqueda **semántica** con pgvector (PostgreSQL):

```pitón
desde omniachain importar VectorMemory

memoria = VectorMemory(dsn="postgresql://localhost/omniachain")
espera memoria.inicializar()

# Almacenar con incrustación
await Memory.store("Python es fantástico para la IA", metadata={"topic": "tech"})

# Búsqueda semántica
resultados = espera memoria.búsqueda("lenguaje de programación", límite=5)
```

!!! información "Reserva"
    ¿Sin PostgreSQL? VectorMemory utiliza un índice **en memoria** automáticamente.

## Servidor de memoria MCP

Expone la memoria vectorial a través de MCP a otros agentes:

```pitón
desde omniachain.memory.mcp_memory importar MCPMemoryServer

servidor = MCPMemoryServer(dsn="postgresql://localhost/omniachain")
espera server.run(transport="stdio")

# Herramientas expuestas a través de MCP:
# - Memory_store: almacena con incrustación
# - memoria_search: búsqueda semántica
# - Memory_delete: eliminar por ID
```