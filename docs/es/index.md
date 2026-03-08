<div align="center">
  <h1>Cadena Omnia</h1>
</div>

Marco de Python para agentes de IA: MCP nativo, multimodal y asíncrono.

<div class="rebaja de tarjetas de cuadrícula">

- :rocket: **Async-first** — `asyncio` en todo, bloqueo cero
- :art: **Multimodal** — Texto, PDF, imagen, audio, vídeo, CSV, URL
- :robot: **5 proveedores**: Anthropic, OpenAI, Groq, Ollama, Google
- :shield: **PGP Security** — Control de acceso con claves criptográficas
- :jigsaw: **MCP nativo** — Protocolo de contexto modelo de Anthropic
- :busts_in_silhouette: **Multiagente** — Supervisor, ReAct, Planificador

</div>

---

## Inicio rápido

```pitón
del agente de importación omniachain, antrópico, calculadora, web_search

agente = Agente(
    proveedor=Antrópico(),
    herramientas=[calculadora, búsqueda_web],
)

resultado = await agent.run("¿Qué es 1547 × 32 + √144?")
imprimir(resultado.contenido) # "49,516"
```

**3 líneas. Sin texto repetitivo. Listo.**

---

## ¿Por qué OmniaChain?

| frente a LangChain | Cadena Omnia |
|---|---|
| Sincronización mixta/asincrónica | **100% asíncrono** |
| ~20 líneas para un agente | **3 líneas** |
| Sin soporte MCP | **MCP nativo** |
| Sin seguridad | **PGP completo** |
| Sin análisis de vídeo | **Cuadros + Transcripción** |

---

## Navegación

Explora la wiki a través de la **barra lateral de la izquierda** :material-arrow-left: o usa la **búsqueda** :material-magnify: en la parte superior.

!!! consejo "Recomendación"
    Comience con [Instalación](introducción/instalación.md) → [Primer agente](introducción/primer-agente.md)