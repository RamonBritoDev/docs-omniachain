# MCPServer

Cree servidores MCP con decoradores simples.

## Servidor básico

```pitón
desde omniachain importar MCPServer

servidor = MCPServer("mi-servidor", versión="1.0.0")

@servidor.herramienta
asíncrono def consult_banco(consulta: str) -> str:
    """Consultar datos en el banco."""
    devolver f"Resultado: {consulta}"

@servidor.herramienta
async def generate_report(tema: str, formato: str = "markdown") -> str:
    """Genera un informe."""
    return f"# {tema}\n\nContenido..."

@servidor.resource("docs/{ruta}")
async def get_doc(ruta: str) -> str:
    """Devuelve el contenido de un documento."""
    devolver f"Documento: {ruta}"

@servidor.prompt
async def analizar_prompt (tema: str) -> str:
    """Solicitar plantilla para revisión."""
    return f"Analizar '{tema}' considerando aspectos técnicos y prácticos."

# Girar
await server.run(transport="stdio") # o transporte="http"
```

##Transportes

=== "stdio (Escritorio Claude)"

```pitón
    espera server.run(transport="stdio")
    ```

Para usar con Claude Desktop, configure `claude_desktop_config.json`:
    ```json
    {
        "mcpServers": {
            "mi-servidor": {
                "comando": "pitón",
                "args": ["mi_servidor.py"]
            }
        }
    }
    ```

=== "HTTP (red)"

```pitón
    espera server.run(transport="http", host="0.0.0.0", puerto=8080)
    ```

## Servidor de memoria MCP

Servidor MCP preparado para memoria vectorial:

```pitón
desde omniachain.memory.mcp_memory importar MCPMemoryServer

servidor = MCPMemoryServer(dsn="postgresql://localhost/omniachain")
espera server.run(transport="stdio")
```