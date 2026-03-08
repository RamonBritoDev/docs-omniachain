# MCPClient

Connect to MCP servers to use remote tools.

## Usage

```python
from omniachain import MCPClient

client = MCPClient("http://localhost:8080")

# List available tools
tools = await client.list_tools()
for t in tools:
    print(f"{t['name']}: {t['description']}")

# Call a tool
result = await client.call_tool("consultar_banco", {"query": "SELECT * FROM users"})
print(result)

# Read a resource
doc = await client.read_resource("docs/api")
print(doc)

# Get prompt
prompt = await client.get_prompt("analise_prompt", {"theme": "Generative AI"})
print(prompt)
```

## Server Discovery

```python
from omniachain.mcp.registry import MCPRegistry

registry = MCPRegistry()
registry.register("memory", "http://localhost:8080")
registry.register("search", "http://localhost:8081")

# Discover server by capacity
server_url = registry.find("memory")
client = MCPClient(server_url)
```