# Трубопроводы

Выполняйте шаги последовательно, параллельно или с условной логикой.

## Типы

| Трубопровод | Исполнение | Когда использовать |
|----------|----------|-------------|
| `Последовательный конвейер` | Один за другим | Линейный поток |
| `Параллельный трубопровод` | Все одновременно | Самостоятельные шаги |
| `Условный конвейер` | На основе условий | Ветвление |
| `Маршрутизатор` | По намерению | Классификация входов |

## Последовательный

```python
from omniachain import SequentialPipeline, Context

pipe = SequentialPipeline("processar-dados")

async def carregar(ctx: Context) -> None:
    ctx.set("dados", [1, 2, 3, 4, 5])

async def processar(ctx: Context) -> None:
    dados = ctx.get("dados")
    ctx.set("soma", sum(dados))

async def salvar(ctx: Context) -> None:
    print(f"Resultado: {ctx.get('soma')}")

pipe.add(carregar)
pipe.add(processar)
pipe.add(salvar)

await pipe.run(Context())
```

## Параллельно

```python
from omniachain import ParallelPipeline

parallel = ParallelPipeline("buscar-tudo", max_concurrent=5)

async def buscar_api_a(ctx: Context) -> None:
    ctx.set("api_a", "dados A")

async def buscar_api_b(ctx: Context) -> None:
    ctx.set("api_b", "dados B")

parallel.add(buscar_api_a)
parallel.add(buscar_api_b)

await parallel.run(Context())  # Ambos executam ao mesmo tempo!
```

##Условное

```python
from omniachain.pipeline.conditional import ConditionalPipeline

pipe = ConditionalPipeline("verificar")

async def rota_premium(ctx: Context) -> None:
    ctx.set("result", "Processamento premium")

async def rota_basica(ctx: Context) -> None:
    ctx.set("result", "Processamento básico")

pipe.add_branch(
    condition=lambda ctx: ctx.get("plano") == "premium",
    step=rota_premium,
    else_step=rota_basica,
)
```

## Маршрутизатор

```python
from omniachain.pipeline.router import RouterPipeline

router = RouterPipeline("classificar")

router.add_route("suporte", suporte_handler, keywords=["ajuda", "problema", "erro"])
router.add_route("vendas", vendas_handler, keywords=["comprar", "preço", "plano"])
router.add_route("default", default_handler)

await router.run(Context(variables={"input": "Preciso de ajuda com erro"}))
# → Executa suporte_handler
```