# Создать инструменты

Создавайте собственные инструменты с помощью декоратора @tool — автоматически генерируемой схемы JSON.

## Простой инструмент

```python
from omniachain import tool

@tool
async def buscar_clima(cidade: str) -> str:
    """Busca o clima atual de uma cidade."""
    # Sua lógica aqui
    return f"Ensolarado em {cidade}, 28°C"
```

Готовый! OmniaChain автоматически генерирует:
- Имя: `search_clima`
- Описание: `"Определяет текущий климат города."`
- Схема параметров JSON

## Инструмент с опциями

```python
@tool(cache=True, retries=3, timeout=10.0)
async def consultar_api(endpoint: str, metodo: str = "GET") -> dict:
    """Consulta uma API REST.

    Args:
        endpoint: URL da API.
        metodo: Método HTTP (GET, POST, PUT, DELETE).
    """
    import httpx
    async with httpx.AsyncClient() as client:
        r = await client.request(metodo, endpoint)
        return r.json()
```

### Доступные параметры

| Вариант | Тип | Описание |
|-------|------|-----------|
| `кэш` | `бул` | Кэш одинаковых результатов |
| `повторные попытки` | `интервал` | Автоматические повторные попытки в случае ошибки |
| `тайм-аут` | `плавать` | Тайм-аут в секундах |

## Сгенерированная схема

```python
print(buscar_clima.schema)
```
```json
{
    "type": "object",
    "properties": {
        "cidade": {
            "type": "string",
            "description": "A cidade para buscar o clima"
        }
    },
    "required": ["cidade"]
}
```

## Запуск вручную

```python
# Via Tool.execute (com metadata)
result = await buscar_clima.execute(cidade="São Paulo")
print(result.success)   # True
print(result.result)    # "Ensolarado em São Paulo, 28°C"
print(result.cached)    # False (primeira vez)

# Chamada direta
resultado = await buscar_clima(cidade="Rio")
print(resultado)        # "Ensolarado em Rio, 28°C"
```

## Использование с агентом

```python
agent = Agent(
    provider=OpenAI(),
    tools=[buscar_clima, consultar_api, calculator],
)

result = await agent.run("Como está o clima em São Paulo?")
# O agente decide sozinho usar buscar_clima!
```