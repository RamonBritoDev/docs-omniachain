#AgentePlanificador

Siga el ciclo **Planificar → Ejecutar → Revisar** para tareas complejas.

## Uso

```pitón
desde omniachain import PlannerAgent, Anthropic, web_search, file_write

agente = Agente Planificador (
    proveedor=Antrópico(),
    herramientas=[búsqueda_web, escritura_archivo],
)

resultado = await agent.run("Crear un informe sobre las tendencias de la IA en 2025")
print(result.metadata["plan"]) # El plan creado
print(result.metadata["review"]) # La revisión del resultado
```

## Ciclo de ejecución

```sirena
gráfico TD
    A[Tarea] --> B[Plan]
    B --> C[Ejecutar con Herramientas]
    C --> D[Revisión]
    D -->|Satisfactorio| E[Respuesta final]
    D -->|Insuficiente| b
```

1. **Plan**: LLM crea un plan detallado con pasos numerados
2. **Ejecutar**: Ejecute BaseAgent con herramientas para cada paso
3. **Revisión**: LLM evalúa si el resultado cumple con el objetivo

## Cuándo usar

- ✅ Informes largos y encuestas
- ✅ Tareas con múltiples pasos dependientes
- ✅ Cuando importa más la calidad del resultado que la velocidad
- ❌ Preguntas simples (use `Agente`)