#ReActAgent

**ReAct** (Разум + Действие) следует циклу рассуждений:

```
Thought → Action → Observation → Thought → ... → Answer
```

## Использование

```python
from omniachain import ReActAgent, Anthropic, web_search, calculator

agent = ReActAgent(
    provider=Anthropic(),
    tools=[web_search, calculator],
    name="researcher",
)

result = await agent.run("Qual a população do Brasil dividida por 27 estados?")
```

Агент будет:

1. **Мысль**: «Мне нужно знать население Бразилии»
2. **Действие**: `web_search("Население Бразилии в 2024 г.")`
3. **Наблюдение**: «~215 миллионов»
4. **Мысль**: «Теперь раздели на 27».
5. **Действие**: `калькулятор("215000000 / 27")`
6. **Наблюдение**: «~7 963 000»
7. **Ответ**: «Приблизительно 7,9 миллиона на штат».

## Когда использовать

- ✅ Многошаговый поиск
- ✅ Рассуждения, требующие внешних данных
- ✅ Расчеты на основе динамической информации
- ❌ Простые задачи без инструментов (используйте `Агент`)