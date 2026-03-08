# Instalación

## Requisitos

- Pitón **3.11+**
- pip o poesía

## Instalación básica

```golpecito
pip instalar omniachain
```

## Instalación con Extras

=== "Todos los extras"

```golpecito
    pip instalar omniachain[todos]
    ```

=== "Vector (pgvector)"

```golpecito
    pip instalar omniachain [vector]
    ```

=== "Navegador (Dramaturgo)"

```golpecito
    pip instalar omniachain [navegador]
    dramaturgo instala cromo
    ```

=== "Audio (Susurro)"

```golpecito
    pip instala omniachain [audio]
    ```

## Desarrollo Local

```golpecito
clon de git https://github.com/omniachain/omniachain.git
cd omnicadena
instalación de pip -e ".[todos]"
pruebas de pytest/ -v
```

## Dependencias del sistema

!!! información "FFmpeg (para vídeo y audio)"
    `VideoLoader` y `AudioLoader` necesitan ffmpeg:

=== "ventanas"
        ```golpecito
        instalación de alas Gyan.FFmpeg
        ```

=== "macOS"
        ```golpecito
        instalar cerveza ffmpeg
        ```

=== "Linux"
        ```golpecito
        sudo apto instalar ffmpeg
        ```

## Variables de entorno

Cree un `.env` o exporte:

```golpecito
# Claves API (al menos una)
exportar ANTHROPIC_API_KEY="sk-..."
exportar OPENAI_API_KEY="sk-..."
exportar GROQ_API_KEY="gsk_..."
exportar GOOGLE_API_KEY="..."

# Configuración opcional
exportar OMNIA_DEFAULT_PROVIDER="antrópico"
exportar OMNIA_DEFAULT_MODEL="claude-3-5-sonnet-20241022"
exportar OMNIA_PGVECTOR_DSN="postgresql://usuario:pass@localhost/omniachain"
exportar OMNIA_SECURITY_ENABLED="verdadero"
```

!!! éxito "¡Listo!"
    Ahora ve a [Primer agente] (first-agent.md) →