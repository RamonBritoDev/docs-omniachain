# Create Tools

Create custom tools with the `@tool` decorator — automatically generated JSON schema.

## Simple Tool

```python
from omniachain import tool

@tool
async def fetch_weather(city: str) -> str:
    """Search the current climate of a city."""
    # Your logic here
    return f"Sunny in {city}, 28°C"
```

Ready! OmniaChain automatically generates:
- Name: `search_clima`
- Description: `"Searches the current climate of a city."`
- JSON schema of parameters

## Tool with Options

```python
@tool(cache=True, retries=3, timeout=10.0)
async def consult_api(endpoint: str, method: str = "GET") -> dict:
    """Queries a REST API.

Args:
        endpoint: API URL.
        method: HTTP method (GET, POST, PUT, DELETE).
    """
    import httpx
    async with httpx.AsyncClient() as client:
        r = await client.request(method, endpoint)
        return r.json()
```

### Available Options

| Option | Type | Description |
|-------|------|-----------|
| `cache` | `bool` | Cache of identical results |
| `retries` | `int` | Automatic retries on error |
| `timeout` | `float` | Timeout in seconds |

## Generated Schema

```python
print(buscar_clima.schema)
```
```json
{
    "type": "object",
    "properties": {
        "city": {
            "type": "string",
            "description": "The city to seek the climate"
        }
    },
    "required": ["city"]
}
```

## Run Manually

```python
# Via Tool.execute (with metadata)
result = await fetch_clima.execute(city="São Paulo")
print(result.success) # True
print(result.result) # "Sunny in São Paulo, 28°C"
print(result.cached) # False (first time)

# Direct call
result = await fetch_clima(city="Rio")
print(result) # "Sunny in Rio, 28°C"
```

## Use with Agent

```python
agent = Agent(
    provider=OpenAI(),
    tools=[buscar_clima, consulta_api, calculator],
)

result = await agent.run("How is the weather in São Paulo?")
# The agent decides on its own to use fetch_clima!
```