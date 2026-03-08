#ReActAgent

**ReAct** (Razón + Actuar) sigue un ciclo de razonamiento:

```
Pensamiento → Acción → Observación → Pensamiento → ... → Respuesta
```

## Uso

```pitón
desde omniachain importe ReActAgent, Anthropic, web_search, calculadora

agente = ReActAgent(
    proveedor=Antrópico(),
    herramientas=[búsqueda_web, calculadora],
    nombre="investigador",
)

resultado = await agent.run("¿Cuál es la población de Brasil dividida entre 27 estados?")
```

El agente:

1. **Pensamiento**: "Necesito conocer la población de Brasil"
2. **Acción**: `web_search("población Brasil 2024")`
3. **Observación**: "~215 millones"
4. **Pensamiento**: "Ahora divide entre 27"
5. **Acción**: `calculadora("215000000/27")`
6. **Observación**: "~7.963.000"
7. **Respuesta**: "Aproximadamente 7,9 millones por estado"

## Cuándo usar

- ✅ Búsqueda de varios pasos
- ✅ Razonamiento que necesita datos externos.
- ✅ Cálculos basados en información dinámica
- ❌ Tareas simples sin herramientas (use `Agente`)