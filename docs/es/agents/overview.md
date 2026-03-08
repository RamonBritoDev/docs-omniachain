# Agentes

OmniaChain ofrece **6 tipos de agentes especializados**, todos con herramientas de llamada y memoria.

## Descripción general

```sirena
gráfico TD
    A[Base de agentes] --> B[Agente ReAct]
    A --> C[Agente multimodal]
    A --> D[Agente planificador]
    A --> E[Agente supervisor]
    A --> F[Agente de voz]
    A --> G[Artista Agente]
    mi -> B
    mi -> C
    mi -> re
```

| Agente | Especialidad | Cuándo utilizar |
|--------|--------------|-------------|
| `Agente` | Generalidades | Tareas sencillas |
| `ReActAgente` | Razón + Acto | Búsqueda, razonamiento encadenado |
| `Agente Multimodal` | Cualquier entrada | PDF, imagen, audio, vídeo |
| `PlannerAgent` | Planificar → Ejecutar → Revisar | Tareas complejas en pasos |
| `SupervisorAgente` | Coordina subagentes | Multiagente con delegación |
| `Agente de Voz` | STT → LLM → TTS | Chat de voz |
| `ArtistaAgente` | Genera imágenes | Creación de imágenes con indicaciones optimizadas |

##Base de agentes

El remedio más simple — funciona en 80 % de los casos:

```pitón
del agente de importación omniachain, OpenAI, calculadora, web_search

agente = Agente(
    proveedor=OpenAI("gpt-4o-mini"),
    herramientas=[calculadora, búsqueda_web],
    memoria="buffer", # Recordar conversación
    system_prompt="Respuesta en PT-BR.",
    max_iterations=10, # máximo de bucles de razonamiento
)

resultado = await agent.run("¿Cuánto es el 15% de R$320?")
```

### Parámetros

| Detener | Tipo | Descripción |
|-------|------|-----------|
| `proveedor` | `Proveedor base` | Proveedor de IA |
| `herramientas` | `lista[Herramienta]` | Herramientas disponibles |
| `memoria` | `cadena\| Memoria` | `"búfer"`, `"resumen"` o instancia |
| `sistema_prompt` | `cadena` | Aviso del sistema |
| `max_iterations` | `int` | Ciclos máximos de llamada de herramientas |
| `par de claves` | `Par de claves` | Clave PGP del agente |
| `permisos` | `Permisos` | Reglas de acceso |

---

!!! escribe "Siguiente"
    Ver los agentes especializados: [ReAct](react.md) · [Multimodal](multimodal.md) · [Planner](planner.md) · [Supervisor](supervisor.md) · [Voice](voice.md) · [Artist](artist.md)