# MCPClient

Подключитесь к серверам MCP, чтобы использовать удаленные инструменты.

## Использование

```python
from omniachain import MCPClient

client = MCPClient("http://localhost:8080")

# Listar tools disponíveis
tools = await client.list_tools()
for t in tools:
    print(f"{t['name']}: {t['description']}")

# Chamar uma tool
result = await client.call_tool("consultar_banco", {"query": "SELECT * FROM users"})
print(result)

# Ler um resource
doc = await client.read_resource("docs/api")
print(doc)

# Obter prompt
prompt = await client.get_prompt("analise_prompt", {"tema": "IA Generativa"})
print(prompt)
```

## Обнаружение сервера

```python
from omniachain.mcp.registry import MCPRegistry

registry = MCPRegistry()
registry.register("memory", "http://localhost:8080")
registry.register("search", "http://localhost:8081")

# Descobrir servidor por capacidade
server_url = registry.find("memory")
client = MCPClient(server_url)
```