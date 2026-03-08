# Crear herramientas

Cree herramientas personalizadas con el decorador `@tool`: esquema JSON generado automáticamente.

## Herramienta sencilla

```pitón
de la herramienta de importación omniachain

@herramienta
async def fetch_weather(ciudad: str) -> str:
    """Buscar el clima actual de una ciudad."""
    # Tu lógica aquí
    return f"Soleado en {ciudad}, 28°C"
```

¡Listo! OmniaChain genera automáticamente:
- Nombre: `search_clima`
- Descripción: `"Busca el clima actual de una ciudad."`
- Esquema JSON de parámetros.

## Herramienta con opciones

```pitón
@tool(caché=Verdadero, reintentos=3, tiempo de espera=10.0)
async def consult_api(punto final: str, método: str = "GET") -> dict:
    """Consulta una API REST.

Argumentos:
        punto final: URL de API.
        método: método HTTP (GET, POST, PUT, DELETE).
    """
    importar httpx
    async con httpx.AsyncClient() como cliente:
        r = esperar cliente.request(método, punto final)
        devolver r.json()
```

### Opciones disponibles

| Opción | Tipo | Descripción |
|-------|------|-----------|
| `caché` | `bool` | Caché de resultados idénticos |
| `reintentos` | `int` | Reintentos automáticos en caso de error |
| `tiempo de espera` | `flotar` | Tiempo de espera en segundos |

## Esquema generado

```pitón
imprimir(buscar_clima.esquema)
```
```json
{
    "tipo": "objeto",
    "propiedades": {
        "ciudad": {
            "tipo": "cadena",
            "description": "La ciudad para buscar el clima"
        }
    },
    "obligatorio": ["ciudad"]
}
```

## Ejecutar manualmente

```pitón
# A través de Tool.execute (con metadatos)
resultado = await fetch_clima.execute(ciudad="São Paulo")
imprimir (resultado.éxito) # Verdadero
print(resultado.resultado) # "Soleado en São Paulo, 28°C"
print(resultado.cached) # Falso (primera vez)

# Llamada directa
resultado = esperar fetch_clima(ciudad="Río")
print(resultado) # "Soleado en Río, 28°C"
```

## Usar con agente

```pitón
agente = Agente(
    proveedor=OpenAI(),
    herramientas=[buscar_clima, consulta_api, calculadora],
)

resultado = await agent.run("¿Cómo está el clima en São Paulo?")
# ¡El agente decide por sí solo utilizar fetch_clima!
```