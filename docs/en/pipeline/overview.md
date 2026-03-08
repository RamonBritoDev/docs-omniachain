# Pipelines

Execute steps in sequence, parallel, or with conditional logic.

## Types

| Pipeline | Execution | When to use |
|----------|----------|-------------|
| `SequentialPipeline` | One after another | Linear flow |
| `ParallelPipeline` | All at the same time | Independent steps |
| `ConditionalPipeline` | Condition-based | Branching |
| `RouterPipeline` | By intent | Input Classification |

## Sequential

```python
from omniachain import SequentialPipeline, Context

pipe = SequentialPipeline("process-data")

async def load(ctx: Context) -> None:
    ctx.set("data", [1, 2, 3, 4, 5])

async def process(ctx: Context) -> None:
    data = ctx.get("data")
    ctx.set("sum", sum(data))

async def save(ctx: Context) -> None:
    print(f"Result: {ctx.get('sum')}")

pipe.add(load)
pipe.add(process)
pipe.add(save)

await pipe.run(Context())
```

## Parallel

```python
from omniachain import ParallelPipeline

parallel = ParallelPipeline("fetch-all", max_concurrent=5)

async def fetch_api_a(ctx: Context) -> None:
    ctx.set("api_a", "data A")

async def fetch_api_b(ctx: Context) -> None:
    ctx.set("api_b", "data B")

parallel.add(search_api_a)
parallel.add(search_api_b)

await parallel.run(Context()) # Both run at the same time!
```

##Conditional

```python
from omniachain.pipeline.conditional import ConditionalPipeline

pipe = ConditionalPipeline("check")

async def rota_premium(ctx: Context) -> None:
    ctx.set("result", "Premium processing")

async def rota_basica(ctx: Context) -> None:
    ctx.set("result", "Basic processing")

pipe.add_branch(
    condition=lambda ctx: ctx.get("plan") == "premium",
    step=premium_route,
    else_step=basic_route,
)
```

## Router

```python
from omniachain.pipeline.router import RouterPipeline

router = RouterPipeline("sort")

router.add_route("support", support_handler, keywords=["help", "problem", "error"])
router.add_route("sales", sales_handler, keywords=["buy", "price", "plan"])
router.add_route("default", default_handler)

await router.run(Context(variables={"input": "I need help with error"}))
# → Runs support_handler
```