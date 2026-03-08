# Observabilidad

Registrador, rastreador, rastreador de costos y panel, todo integrado.

## Rastreador de costos

**Seguimiento de costos en tiempo real**:

```pitón
de la importación omniachain CostTracker

rastreador = rastreador de costos()

# Regístrate automáticamente
tracker.record(respuesta)

# Métricas
print(f"Costo total: ${tracker.total_cost:.4f}")
print(f"Total de tokens: {tracker.total_tokens:,}")

# Por proveedor
para prov, datos en tracker.by_provider().items():
    print(f" {prov}: ${datos['costo']:.4f} ({datos['llamadas']} llamadas)")

# Resumen
imprimir(rastreador.summary())
```

##Registrador

Registrador estructurado con colores y formato JSON:

```pitón
desde omniachain importar get_logger

logger = get_logger("mi-agente")

logger.info("Agente iniciado", modelo="gpt-4o")
logger.warning("Límite de velocidad siguiente", restante=5)
logger.error("API falló", proveedor="openai", error="timeout")
```

Salida (texto):
```
[2025-01-15 14:30:22] [INFORMACIÓN] [mi-agente] Agente iniciado
  → modelo = 'gpt-4o'
```

Salida (JSON, a través de `OMNIA_LOG_FORMAT=json`):
```json
{"marca de tiempo": "2025-01-15 14:30:22", "nivel": "INFO", "logger": "mi-agente", "mensaje": "Agente iniciado", "modelo": "gpt-4o"}
```

## rastreador

Seguimiento completo de cada ejecución:

```pitón
de la importación omniachain Tracer

rastreador = rastreador()
tracer.start_trace(metadatos={"tarea": "investigación"})

con tracer.span("llm_call") como intervalo:
    resultado = esperar proveedor.completo (mensajes)
    span.attributes["modelo"] = resultado.modelo
    span.attributes["tokens"] = resultado.usage.total_tokens

con tracer.span("tool_exec") como intervalo:
    espera calculadora.execute(expresión="2+2")
    span.attributes["herramienta"] = "calculadora"

# Exportar
rastros = trazador.export_json()
```

## Panel

Panel visual en la terminal:

```pitón
desde omniachain.observability.dashboard importar panel

panel = Panel(cost_tracker=rastreador, rastreador=rastreador)
tablero.mostrar()
```

Muestra con ricos:
- 💰 Panel de costos
- 🔍 Tabla de seguimientos recientes
- 📊 Costos por proveedor