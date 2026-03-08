# Memoria vectorial (pgvector)

Búsqueda semántica usando **pgvector** con PostgreSQL: encuentre información por **significado**, no por palabras clave.

## Configuración

```golpecito
# PostgreSQL con pgvector
ventana acoplable ejecutar -d -p 5432:5432 \
  -e POSTGRES_PASSWORD=contraseña\
  ankane/pgvector

pip instalar omniachain [vector]
```

```golpecito
exportar OMNIA_PGVECTOR_DSN="postgresql://postgres:pass@localhost/omniachain"
```

## Uso

```pitón
desde omniachain importar VectorMemory

memoria = VectorMemory() # Usar OMNIA_PGVECTOR_DSN
espera memoria.inicializar()

# Tienda
espera memoria.store(
    "Python es el mejor lenguaje para la IA y el aprendizaje automático",
    metadatos={"tema": "tecnología", "autor": "admin"},
)

espera memoria.store(
    "Brasil tiene 215 millones de habitantes",
    metadatos={"tema": "geo"},
)

# Búsqueda semántica
resultados = espera memoria.búsqueda ("lenguaje de programación", límite = 3)
para r en resultados:
    print(f"Puntuación: {r['puntuación']:.2f} | {r['contenido'][:50]}")
```

## Cómo funciona

```sirena
gráfico LR
    A[Texto] --> B[Modelo de incrustación]
    B --> C[Vector 1536D]
    C --> D[pgvector INSERT]
    E[Consulta] --> F[Modelo de incrustación]
    F --> G[Vector 1536D]
    G --> H[pgvector: similitud coseno]
    D --> H
    H --> I [Resultados Top-K]
```

## Servidor de memoria MCP

Exponer la memoria vectorial a **cualquier agente MCP**:

```pitón
desde omniachain.memory.mcp_memory importar MCPMemoryServer

servidor = MCPMemoryServer(
    dsn="postgresql://localhost/omniachain",
    nombre="servidor-de-memoria",
)
espera server.run(transport="stdio")
```

Otros agentes pueden llamar:
- `memory_store(contenido, espacio de nombres, metadatos)`
- `memory_search(consulta, límite, espacio de nombres)`
- `memory_delete(id)`