# Установка

## Требования

- Питон **3.11+**
- пип или поэзия

## Базовая установка

```bash
pip install omniachain
```

## Установка с дополнительными функциями

#### Все дополнительные услуги

```bash
pip install omniachain[all]
```

#### Вектор (pgvector)

```bash
pip install omniachain[vector]
```

#### Браузер (Драматург)

```bash
pip install omniachain[browser]
playwright install chromium
```

#### Аудио (шепот)

```bash
pip install omniachain[audio]
```

## Местное развитие

```bash
# Clone o repositório oficial
git clone https://github.com/RamonBritoDev/omniachain.git
cd omniachain

# Instale em modo editável com todas as dependências de desenvolvimento
pip install -e ".[all]"

# Rode a suíte de testes
pytest tests/ -v
```

## Системные зависимости

!!! информация «FFmpeg (для видео и аудио)»
    `VideoLoader` и `AudioLoader` нуждаются в ffmpeg:

=== "Окна"
        ```bash
        winget install Gyan.FFmpeg
        ```

=== "macOS"
        ```bash
        brew install ffmpeg
        ```

=== "Линукс"
        ```bash
        sudo apt install ffmpeg
        ```

## Переменные среды

Создайте `.env` или экспортируйте:

```bash
# API Keys (pelo menos um)
export ANTHROPIC_API_KEY="sk-..."
export OPENAI_API_KEY="sk-..."
export GROQ_API_KEY="gsk_..."
export GOOGLE_API_KEY="..."

# Configuração opcional
export OMNIA_DEFAULT_PROVIDER="anthropic"
export OMNIA_DEFAULT_MODEL="claude-3-5-sonnet-20241022"
export OMNIA_PGVECTOR_DSN="postgresql://user:pass@localhost/omniachain"
export OMNIA_SECURITY_ENABLED="true"
```

!!! успех «Готов!»
    Теперь перейдите в [Первый агент](first-agent.md) →