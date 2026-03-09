# Instalación

## Requisitos

- Pitón **3.11+**
- pip o poesía

## Instalación básica

```bash
pip install omniachain
```

## Instalación con Extras

#### Todos los extras

```bash
pip install omniachain[all]
```

#### Vector (pgvector)

```bash
pip install omniachain[vector]
```

#### Navegador (Playwright)

```bash
pip install omniachain[browser]
playwright install chromium
```

#### Audio (Whisper)

```bash
pip install omniachain[audio]
```

## Desarrollo Local

```bash
# Clona el repositorio oficial
git clone https://github.com/RamonBritoDev/omniachain.git
cd omniachain

# Instala en modo editable con todas las dependencias
pip install -e ".[all]"

# Ejecuta la suite de pruebas
pytest tests/ -v
```

## Dependencias del sistema

!!! información "FFmpeg (para vídeo y audio)"
    `VideoLoader` y `AudioLoader` necesitan ffmpeg:

=== "Windows"
        ```bash
        winget install Gyan.FFmpeg
        ```

=== "macOS"
        ```bash
        brew install ffmpeg
        ```

=== "Linux"
        ```bash
        sudo apt install ffmpeg
        ```

## Variables de entorno

Cree un `.env` o exporte:

```bash
# Claves API (al menos una)
export ANTHROPIC_API_KEY="sk-..."
export OPENAI_API_KEY="sk-..."
export GROQ_API_KEY="gsk_..."
export GOOGLE_API_KEY="..."

# Configuración opcional
export OMNIA_DEFAULT_PROVIDER="anthropic"
export OMNIA_DEFAULT_MODEL="claude-3-5-sonnet-20241022"
export OMNIA_PGVECTOR_DSN="postgresql://user:pass@localhost/omniachain"
export OMNIA_SECURITY_ENABLED="true"
```

!!! éxito "¡Listo!"
    Ahora ve a [Primer agente] (first-agent.md) →