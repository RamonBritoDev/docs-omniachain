# Seguridad PGP

OmniaChain implementa control de acceso con **claves PGP**: cada agente tiene una identidad criptográfica.

## Arquitectura

```sirena
gráfico TD
    A[Agente] -->|Par de claves| B{Guardia de seguridad}
    B -->|Verificar permiso| C[Permisos]
    C -->|PERMITIR| D[Herramienta de ejecución]
    C -->|NEGAR| E[Bloquear ❌]
    B -->|Validar suscripción| F[Middleware]
    F -->|Registro| G[Auditoría]
```

## 1. Generar claves

```pitón
desde omniachain importar KeyPair

claves = espera KeyPair.generate(agent_name="admin")
print(teclas.huella digital) # "a1b2c3d4e5f6..."
print(keys.public_key) # Clave pública
print(keys.private_key) # Clave privada
```

!!! información "GPG frente a HMAC"
    Si está instalado `python-gnupg`, utiliza **GPG real**. De lo contrario, utilice **HMAC-SHA256** como alternativa segura.

## 2. Configurar permisos

```pitón
de permisos de importación omniachain

permisos = Permisos()

# El administrador accede a todo
perms.grant(admin_keys.fingerprint, all_resources=True)

# El analista solo puede usar calculadora y web_search
perms.grant(analyst_keys.fingerprint, tools=["calculadora", "web_search"])
perms.deny(analyst_keys.fingerprint, herramientas=["code_exec", "file_write"])

# comprobar
perms.can_access(analyst_keys.fingerprint, "herramienta", "calculadora") # Verdadero
perms.can_access(analyst_keys.fingerprint, "tool", "code_exec") # Falso
```

### Reglas de acceso

| Método | Efecto |
|--------|--------|
| `grant(fp, herramientas=[...])` | Permite herramientas específicas |
| `conceder(fp, memoria=[...])` | Permite operaciones de memoria |
| `grant(fp, all_resources=True)` | Permite **todo** |
| `denegar(fp, herramientas=[...])` | Herramientas de bloques (¡prioridad!) |

!!! advertencia "NEGAR > PERMITIR"
    Las reglas de "denegar" **siempre** tienen prioridad sobre las de "conceder".

## 3. Agente con Seguridad

```pitón
agente = Agente(
    proveedor=OpenAI(),
    herramientas=[calculadora, web_search, code_exec],
    par de claves = claves_analista,
    permisos = permanentes,
)

# El agente SÓLO puede usar calculadora y web_search
# Si intentas code_exec → "Acceso denegado"
```

## 4. Middleware (API)

Para validar solicitudes externas:

```pitón
desde omniachain.security.middleware importar SecurityMiddleware

middleware = SeguridadMiddleware(permisos=permisos)

# Valida: firma + permiso + marca de tiempo
req = esperar middleware.validate_request(
    par de claves = claves_agente,
    recurso_tipo="herramienta",
    nombre_recurso="búsqueda_web",
)

# Registro de auditoría
para ingresar en middleware.get_audit_log():
    print(f"[{entrada['decisión']}] {entrada['agente']} → {entrada['recurso']}")
```