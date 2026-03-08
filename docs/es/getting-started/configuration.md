# Ajustes

## OmniaConfig

La configuración global es gestionada por la clase `OmniaConfig`:

```pitón
desde omniachain importar get_config

configuración = get_config()
print(config.default_provider) # "antrópico"
imprimir (config.default_timeout) # 30.0
print(config.security_enabled) # Falso
```

## Todas las variables

| Variables | Estándar | Descripción |
|----------|-----------|-----------|
| `OMNIA_DEFAULT_PROVIDER` | `antrópico` | Proveedor predeterminado |
| `OMNIA_DEFAULT_MODEL` | `claude-3-5-soneto-20241022` | Modelo estándar |
| `OMNIA_DEFAULT_TIMEOUT` | `30.0` | Tiempo de espera en segundos |
| `OMNIA_MAX_RETRIES` | `3` | Reintentos máximos |
| `OMNIA_MAX_CONCURRENT` | `10` | Llamadas paralelas máximas |
| `OMNIA_PGVECTOR_DSN` | — | DSN de PostgreSQL para pgvector |
| `OMNIA_MEMORY_BACKEND` | `búfer` | Backend de memoria estándar |
| `OMNIA_SECURITY_ENABLED` | `falso` | Habilita la seguridad PGP |
| `OMNIA_GPG_HOME` | `~/.gnupg` | Directorio GPG |
| `OMNIA_LOG_LEVEL` | `INFORMACIÓN` | Nivel de registro |
| `OMNIA_LOG_FORMAT` | `texto` | Formato: `texto` o `json` |
| `OMNIA_TRACE_ENABLED` | `falso` | Activa el rastreo |
| `OMNIA_COST_TRACKING` | `verdadero` | Activar seguimiento de costes |

## Claves API

| Proveedor | Variables |
|----------|----------|
| Antrópico (Claude) | `ANTHROPIC_API_KEY` |
| OpenAI (GPT) | `OPENAI_API_KEY` |
| Groq (Llama) | `GROQ_API_KEY` |
| Google (Géminis) | `GOOGLE_API_KEY` |
| Ollama (local) | `OLLAMA_BASE_URL` (predeterminado: `http://localhost:11434`) |