# Primer Agente

Crea tu primer agente de IA en **3 líneas**.

## Agente básico

```pitón
importar asincio
del agente de importación omniachain, OpenAI, calculadora

asíncrono de definición principal():
    agente = Agente(
        proveedor=OpenAI("gpt-4o-mini"),
        herramientas=[calculadora],
    )

resultado = await agent.run("¿Cuánto es 2^10 + 42?")
    imprimir(resultado.contenido) # "1066"
    imprimir(resultado.uso.costo) # $0.000015

asyncio.run(principal())
```

!!! nota "Resultado"
    El agente **decide solo** cuándo usar la calculadora: ¡ese es el poder de la llamada de herramientas!

---

## Agente con búsqueda web

```pitón
del agente de importación omniachain, antrópico, web_search, calculadora

agente = Agente(
    proveedor=Antrópico(),
    herramientas=[búsqueda_web, calculadora],
    system_prompt="Eres investigador. Responde en portugués.",
)

resultado = await agent.run("¿Cuál es la población de Brasil y cuánto se divide entre 27?")
```

El agente:
1. Utilice `web_search` para encontrar la población.
2. Usa la "calculadora" para dividir entre 27
3. Empareja y responde

---

##Transmisión

```pitón
async para token en agent.stream("Contar una historia corta"):
    imprimir(token, end="", color=Verdadero)
```

---

## Memoria

El agente **recuerda** conversaciones anteriores automáticamente:

```pitón
agente = Agente(proveedor=OpenAI(), memoria="búfer")

await agent.run("Mi nombre es John")
resultado = esperar agente.run ("¿Cuál es mi nombre?")
print(resultado.content) # "Su nombre es João"
```

Tipos de memoria:

| Tipo | Uso |
|------|-----|
| `"búfer"` | Últimos N mensajes en RAM |
| `"resumen"` | Reanudar mensajes antiguos con LLM |
| `Memoria Búfer()` | Configuración manual |
| `MemoriaPersistente("db.sqlite")` | Persiste en el disco |

---

## Costo y tokens

```pitón
resultado = esperar agente.run ("Explicar IA")

print(f"Tokens: {resultado.usage.total_tokens}")
print(f"Costo: ${resultado.uso.costo:.4f}")
print(f"Modelo: {resultado.modelo}")
```

---

!!! consejo "Próximos pasos"
    - [Crea tus propias herramientas](../tools/creating-tools.md)
    - [Agentes especializados](../agents/overview.md) (ReAct, Planificador, Supervisor)
    - [Seguridad PGP](../security/pgp.md) para control de acceso