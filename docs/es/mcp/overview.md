# MCP: protocolo de contexto modelo

OmniaChain tiene soporte **nativo** para MCP de Anthropic: servidor, cliente y transportes.

## ¿Qué es MCP?

MCP es un protocolo estandarizado para exponer herramientas, recursos y avisos a través de JSON-RPC. Permite que **cualquier agente** acceda a herramientas desde **cualquier servidor**.

```sirena
gráfico LR
    A[Agente 1] -->|JSON-RPC| S[Servidor MCP]
    B[Agente 2] -->|JSON-RPC| S
    C[Escritorio Claude] -->|JSON-RPC| S
    S --> T1[Herramienta: fetch_data]
    S --> T2[Herramienta: búsqueda_memoria]
    S --> R1[Recurso: docs/api]
```

## Cuándo usar

| Escenario | Solución |
|---------|---------|
| Herramientas en el mismo proceso | decorador `@tool` |
| Herramientas compartidas entre agentes | **Servidor MCP** |
| Conéctese con Claude Desktop | **Servidor MCP (estándar)** |
| Acceder a herramientas de servidor externo | **Cliente MCP** |

!!! escribe "Siguiente"
    - [Crear servidor MCP] (server.md)
    - [Usar cliente MCP] (client.md)