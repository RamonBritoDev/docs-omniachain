#AgenteSupervisor

Coordina **múltiples agentes especializados**: delega subtareas y combina resultados.

## Uso

```pitón
de importación omniachain (
    Antrópico, Groq, OpenAI,
    ReActAgent, PlannerAgent, SupervisorAgent,
    búsqueda_web, calculadora, escritura_archivo,
)

# Agentes especializados
investigador = ReActAgent(proveedor=Anthropic(), herramientas=[web_search], nombre="investigador")
analista = ReActAgent(proveedor=Groq(), herramientas=[calculadora], nombre="analista")
escritor = ReActAgent(proveedor=OpenAI(), herramientas=[file_write], nombre="escritor")

# Coordenadas del supervisor
supervisor = Agente Supervisor(
    proveedor=Antrópico(),
    sub_agents=[investigador, analista, escritor],
)

resultado = esperar supervisor.run(
    "Investigue la IA en 2025, analice los datos y escriba un informe"
)

print(result.metadata["agentes_usados"]) # ["investigador", "analista", "escritor"]
print(result.metadata["delegaciones"]) # ¿Quién hizo qué?
```

## Flujo de ejecución

```sirena
gráfico TD
    S[Supervisor] -->|Analiza tarea| D{Delegado}
    D -->|"buscar IA"| R[Investigador]
    D -->|"analizar datos"| A[Analista]
    D -->|"escribir informe"| W[Escritor]
    R --> C[Combina resultados]
    A --> C
    W --> C
    C --> F[Respuesta final]
```

## Formato de delegación

Supervisor utiliza el formato:
```
DELEGADO: investigador -> Investigar tendencias de IA en 2025
DELEGAR: analista -> Analizar los datos encontrados
DELEGADO: redactor -> Redactar el informe final
```

## Multiproveedor

Cada agente puede utilizar un **proveedor diferente**, optimizando el costo:

| Agente | Proveedor | Razón |
|--------|----------|-------|
| Investigador | Antrópico (Claude) | Lo mejor para la búsqueda |
| Analista | Groq (Llama 3) | Rápido y gratis |
| Escritor | OpenAI (GPT-4o) | Mejor escritura |