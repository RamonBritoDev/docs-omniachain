# СупервизорАгент

Координирует **несколько специализированных агентов** — делегирует подзадачи и объединяет результаты.

## Использование

```python
from omniachain import (
    Anthropic, Groq, OpenAI,
    ReActAgent, PlannerAgent, SupervisorAgent,
    web_search, calculator, file_write,
)

# Agentes especializados
researcher = ReActAgent(provider=Anthropic(), tools=[web_search], name="researcher")
analyst = ReActAgent(provider=Groq(), tools=[calculator], name="analyst")
writer = ReActAgent(provider=OpenAI(), tools=[file_write], name="writer")

# Supervisor coordena
supervisor = SupervisorAgent(
    provider=Anthropic(),
    sub_agents=[researcher, analyst, writer],
)

result = await supervisor.run(
    "Pesquise IA em 2025, analise os dados e escreva um relatório"
)

print(result.metadata["agents_used"])   # ["researcher", "analyst", "writer"]
print(result.metadata["delegations"])   # Quem fez o quê
```

## Поток выполнения

```mermaid
graph TD
    S[Supervisor] -->|Analisa tarefa| D{Delega}
    D -->|"pesquise IA"| R[Researcher]
    D -->|"analise dados"| A[Analyst]
    D -->|"escreva relatório"| W[Writer]
    R --> C[Combina Resultados]
    A --> C
    W --> C
    C --> F[Resposta Final]
```

## Формат делегирования

Супервизор использует формат:
```
DELEGATE: researcher -> Pesquise as tendências de IA em 2025
DELEGATE: analyst -> Analise os dados encontrados
DELEGATE: writer -> Escreva o relatório final
```

## Мультипровайдер

Каждый агент может использовать **разного поставщика** — это оптимизирует затраты:

| Агент | Провайдер | Причина |
|--------|----------|-------|
| Исследователь | Антропный (Клод) | Лучшее для поиска |
| Аналитик | Грок (Лама 3) | Быстро и бесплатно |
| Писатель | OpenAI (GPT-4o) | Лучшее письмо |