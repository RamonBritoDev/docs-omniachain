# Tuberías

Ejecute pasos en secuencia, en paralelo o con lógica condicional.

## Tipos

| Tubería | Ejecución | Cuándo utilizar |
|----------|----------|-------------|
| `SequentialPipeline` | Uno tras otro | Flujo lineal |
| `ParallelPipeline` | Todo al mismo tiempo | Pasos independientes |
| `CondicionalPipeline` | Basado en condiciones | Ramificación |
| `RouterPipeline` | Por intención | Clasificación de entrada |

## Secuencial

```pitón
desde omniachain importar SequentialPipeline, Contexto

tubería = SequentialPipeline ("datos de proceso")

carga asíncrona def (ctx: contexto) -> Ninguno:
    ctx.set("datos", [1, 2, 3, 4, 5])

proceso asíncrono def (ctx: Contexto) -> Ninguno:
    datos = ctx.get("datos")
    ctx.set("suma", suma(datos))

async def save(ctx: Contexto) -> Ninguno:
    print(f"Resultado: {ctx.get('suma')}")

tubería.agregar(cargar)
tubería.add(proceso)
tubería.añadir(guardar)

esperar pipe.run (Contexto())
```

## Paralelo

```pitón
de omniachain importar ParallelPipeline

paralelo = ParallelPipeline("buscar-todo", max_concurrent=5)

async def fetch_api_a(ctx: Contexto) -> Ninguno:
    ctx.set("api_a", "datos A")

async def fetch_api_b(ctx: Contexto) -> Ninguno:
    ctx.set("api_b", "datos B")

paralelo.add(search_api_a)
paralelo.add(search_api_b)

await paralelo.run(Context()) # ¡Ambos se ejecutan al mismo tiempo!
```

##Condicional

```pitón
de omniachain.pipeline.conditional importar ConditionalPipeline

tubería = ConditionalPipeline("verificar")

async def rota_premium(ctx: Contexto) -> Ninguno:
    ctx.set("resultado", "Procesamiento premium")

async def rota_basica(ctx: Contexto) -> Ninguno:
    ctx.set("resultado", "Procesamiento básico")

tubería.add_branch(
    condición=lambda ctx: ctx.get("plan") == "prima",
    paso=ruta_premium,
    else_step=ruta_básica,
)
```

## Enrutador

```pitón
desde omniachain.pipeline.router importar RouterPipeline

enrutador = RouterPipeline ("ordenar")

router.add_route("soporte", support_handler, palabras clave=["ayuda", "problema", "error"])
router.add_route("ventas", sales_handler, palabras clave=["comprar", "precio", "plan"])
router.add_route("predeterminado", default_handler)

await router.run(Context(variables={"input": "Necesito ayuda con el error"}))
# → Ejecuta support_handler
```