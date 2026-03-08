# Installation

## Requirements

- Python **3.11+**
- pip or poetry

## Basic Installation

```bash
pip install omniachain
```

## Installation with Extras

=== "All extras"

```bash
    pip install omniachain[all]
    ```

=== "Vector (pgvector)"

```bash
    pip install omniachain[vector]
    ```

=== "Browser (Playwright)"

```bash
    pip install omniachain[browser]
    playwright install chromium
    ```

=== "Audio (Whisper)"

```bash
    pip install omniachain[audio]
    ```

## Local Development

```bash
git clone https://github.com/omniachain/omniachain.git
cd omniachain
pip install -e ".[all]"
pytest tests/ -v
```

## System Dependencies

!!! info "FFmpeg (for video and audio)"
    `VideoLoader` and `AudioLoader` need ffmpeg:

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

## Environment Variables

Create a `.env` or export:

```bash
# API Keys (at least one)
export ANTHROPIC_API_KEY="sk-..."
export OPENAI_API_KEY="sk-..."
export GROQ_API_KEY="gsk_..."
export GOOGLE_API_KEY="..."

# Optional configuration
export OMNIA_DEFAULT_PROVIDER="anthropic"
export OMNIA_DEFAULT_MODEL="claude-3-5-sonnet-20241022"
export OMNIA_PGVECTOR_DSN="postgresql://user:pass@localhost/omniachain"
export OMNIA_SECURITY_ENABLED="true"
```

!!! success "Ready!"
    Now go to [First Agent](first-agent.md) →