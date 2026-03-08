#Proveedores

Soporte nativo para **5 proveedores de IA**: la misma API para todos.

## Proveedores disponibles

| Proveedor | Clase | Modelos | Visión | Herramientas | STT | ETT | Generación de imágenes |
|----------|--------|---------|:-----:|:-----:|:---:|:---:|:------:|
| **Antrópico** | `Antrópico()` | Claude 3.5, 3, Haiku | ✅ | ✅ | ❌ | ❌ | ❌ |
| **OpenAI** | `OpenAI()` | GPT-4o, 4, 3,5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Groq** | `Groq()` | Llama 3, Mixtral | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Google** | `Google()` | Géminis Pro, Flash | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Ollama** | `Ollama()` | Cualquier ubicación | ❌ | ❌ | ❌ | ❌ | ❌ |

## Uso

```pitón
desde omniachain importe Anthropic, OpenAI, Groq, Google, Ollama

# ¡Todos siguen la misma API!
proveedor = Antrópico("claude-3-5-sonnet-20241022")
proveedor = OpenAI ("gpt-4o-mini")
proveedor = Groq("llama-3.1-70b-versátil")
proveedor = Google("gemini-pro")
proveedor = Ollama("llama3")

# Misma llamada a cualquier proveedor
resultado = esperar proveedor.completo([Message.user("¡Hola!")])
```

## Grupo de proveedores

Gestione múltiples proveedores con estrategias automáticas:

```pitón
desde omniachain importar ProviderPool

grupo = GrupoProveedor()
pool.add(Antrópico())
grupo.add(OpenAI())
grupo.add(Groq())

# Estrategias
proveedor = await pool.get(strategy="fallback") # Pruebe en orden
proveedor = await pool.get(strategy="round_robin") # Alternar
proveedor = await pool.get(strategy="más barato") # Más barato
proveedor = await pool.get(strategy="más rápido") # Más rápido
```

## Costos

| Modelo | Entrada/1K | Salida/1K |
|-----------|----------|-----------|
| claude-3-5-soneto | $0,003 | $0,015 |
| gpt-4o | $0,005 | $0,015 |
| gpt-4o-mini | $0,00015 | $0,0006 |
| llama-3.1 (Groq) | $0,00059 | $0,00079 |
| geminis-pro | $0,00025 | $0,0005 |
| Hola | **Gratis** | **Gratis** |