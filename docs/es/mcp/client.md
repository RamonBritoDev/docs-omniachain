# Cliente MCPC

Conéctese a servidores MCP para utilizar herramientas remotas.

## Uso

```pitón
desde omniachain importar MCPClient

cliente = MCPClient("http://localhost:8080")

# Listar herramientas disponibles
herramientas = esperar client.list_tools()
para t en herramientas:
    print(f"{t['nombre']}: {t['descripción']}")

# Llamar a una herramienta
resultado = await client.call_tool("consultar_banco", {"consulta": "SELECCIONAR * DE usuarios"})
imprimir (resultado)

# Leer un recurso
doc = espera client.read_resource("docs/api")
imprimir(doc)

# Obtener aviso
Prompt = await client.get_prompt("analise_prompt", {"theme": "IA generativa"})
imprimir (aviso)
```

## Descubrimiento del servidor

```pitón
desde omniachain.mcp.registry importar MCPRegistry

registro = MCPRegistry()
registro.register("memoria", "http://localhost:8080")
registro.register("buscar", "http://localhost:8081")

# Descubrir servidor por capacidad
server_url = registro.find("memoria")
cliente = MCPClient(servidor_url)
```