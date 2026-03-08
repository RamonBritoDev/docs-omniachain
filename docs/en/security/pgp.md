# PGP Security

OmniaChain implements access control with **PGP keys** — each agent has a cryptographic identity.

## Architecture

```mermaid
TD graph
    A[Agent] -->|KeyPair| B{SecurityGuard}
    B -->|Check Permission| C[Permissions]
    C -->|ALLOW| D[Execute Tool]
    C -->|DENY| E[Block ❌]
    B -->|Validate Subscription| F[Middleware]
    F -->|Log| G[Audit]
```

## 1. Generate Keys

```python
from omniachain import KeyPair

keys = await KeyPair.generate(agent_name="admin")
print(keys.fingerprint) # "a1b2c3d4e5f6..."
print(keys.public_key) # Public key
print(keys.private_key) # Private key
```

!!! info "GPG vs HMAC"
    If `python-gnupg` is installed, it uses **real GPG**. Otherwise, use **HMAC-SHA256** as a safe fallback.

## 2. Configure Permissions

```python
from omniachain import Permissions

perms = Permissions()

# Admin accesses everything
perms.grant(admin_keys.fingerprint, all_resources=True)

# Analyst can only use calculator and web_search
perms.grant(analyst_keys.fingerprint, tools=["calculator", "web_search"])
perms.deny(analyst_keys.fingerprint, tools=["code_exec", "file_write"])

# Check
perms.can_access(analyst_keys.fingerprint, "tool", "calculator") # True
perms.can_access(analyst_keys.fingerprint, "tool", "code_exec") # False
```

### Access Rules

| Method | Effect |
|--------|--------|
| `grant(fp, tools=[...])` | Allows specific tools |
| `grant(fp, memory=[...])` | Allows memory operations |
| `grant(fp, all_resources=True)` | Allows **everything** |
| `deny(fp, tools=[...])` | Blocks tools (priority!) |

!!! warning "DENY > ALLOW"
    `deny` rules **always** have priority over `grant`.

## 3. Agent with Security

```python
agent = Agent(
    provider=OpenAI(),
    tools=[calculator, web_search, code_exec],
    keypair=analyst_keys,
    permissions=perms,
)

# The agent can ONLY use calculator and web_search
# If you try code_exec → "Access denied"
```

## 4. Middleware (API)

To validate external requests:

```python
from omniachain.security.middleware import SecurityMiddleware

middleware = SecurityMiddleware(permissions=perms)

# Validates: signature + permission + timestamp
req = await middleware.validate_request(
    keypair=agent_keys,
    resource_type="tool",
    resource_name="web_search",
)

# Audit log
for entry in middleware.get_audit_log():
    print(f"[{entry['decision']}] {entry['agent']} → {entry['resource']}")
```