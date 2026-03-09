# MCP-сервер

Создавайте серверы MCP с помощью простых декораторов.

## Базовый сервер

```python
from omniachain import MCPServer

server = MCPServer("meu-servidor", version="1.0.0")

@server.tool
async def consultar_banco(query: str) -> str:
    """Consulta dados no banco."""
    return f"Resultado: {query}"

@server.tool
async def gerar_relatorio(tema: str, formato: str = "markdown") -> str:
    """Gera um relatório."""
    return f"# {tema}\n\nConteúdo..."

@server.resource("docs/{path}")
async def get_doc(path: str) -> str:
    """Retorna conteúdo de um documento."""
    return f"Documento: {path}"

@server.prompt
async def analise_prompt(tema: str) -> str:
    """Template de prompt para análise."""
    return f"Analise '{tema}' considerando aspectos técnicos e práticos."

# Rodar
await server.run(transport="stdio")  # ou transport="http"
```

##Транспорт

=== "stdio (Claude Desktop)"

```python
    await server.run(transport="stdio")
    ```

Для использования с Claude Desktop настройте `claude_desktop_config.json`:
    ```json
    {
        "mcpServers": {
            "meu-servidor": {
                "command": "python",
                "args": ["meu_server.py"]
            }
        }
    }
    ```

=== "HTTP (сеть)"

```python
    await server.run(transport="http", host="0.0.0.0", port=8080)
    ```

## Сервер памяти MCP

Сервер MCP с поддержкой векторной памяти:

```python
from omniachain.memory.mcp_memory import MCPMemoryServer

server = MCPMemoryServer(dsn="postgresql://localhost/omniachain")
await server.run(transport="stdio")
```