# MCPServer

Create MCP servers with simple decorators.

## Basic Server

```python
from omniachain import MCPServer

server = MCPServer("my-server", version="1.0.0")

@server.tool
async def consult_banco(query: str) -> str:
    """Check data in the bank."""
    return f"Result: {query}"

@server.tool
async def generate_report(theme: str, format: str = "markdown") -> str:
    """Generates a report."""
    return f"# {theme}\n\nContent..."

@server.resource("docs/{path}")
async def get_doc(path: str) -> str:
    """Returns content of a document."""
    return f"Document: {path}"

@server.prompt
async def analyze_prompt(theme: str) -> str:
    """Prompt template for review."""
    return f"Analyze '{theme}' considering technical and practical aspects."

# Rotate
await server.run(transport="stdio") # or transport="http"
```

##Transports

=== "stdio (Claude Desktop)"

```python
    await server.run(transport="stdio")
    ```

To use with Claude Desktop, configure `claude_desktop_config.json`:
    ```json
    {
        "mcpServers": {
            "my-server": {
                "command": "python",
                "args": ["my_server.py"]
            }
        }
    }
    ```

=== "HTTP (network)"

```python
    await server.run(transport="http", host="0.0.0.0", port=8080)
    ```

## MCP Memory Server

Vector Memory Ready MCP Server:

```python
from omniachain.memory.mcp_memory import MCPMemoryServer

server = MCPMemoryServer(dsn="postgresql://localhost/omniachain")
await server.run(transport="stdio")
```