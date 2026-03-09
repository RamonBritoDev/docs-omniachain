＃ 设置

## Omnia 配置

全局配置由 `OmniaConfig` 类管理：

__代码_块_0__

## 所有变量

|变量|标准|描述 |
|----------|------------|------------|
| `OMNIA_DEFAULT_PROVIDER` | ‘人择’ |默认提供商 |
| `OMNIA_DEFAULT_MODEL` | `克劳德-3-5-十四行诗-20241022` |标准型号|
| `OMNIA_DEFAULT_TIMEOUT` | `30.0` |超时（以秒为单位）|
| `OMNIA_MAX_RETRIES` | `3` |最大重试次数 |
| `OMNIA_MAX_CONCURRENT` | `10` |最大并行调用数|
| `OMNIA_PGVECTOR_DSN` | — | pgvector 的 PostgreSQL DSN |
| `OMNIA_MEMORY_BACKEND` | `缓冲区` |标准内存后端 |
| `OMNIA_SECURITY_ENABLED` | `假` |启用 PGP 安全 |
| `OMNIA_GPG_HOME` | `~/.gnupg` | GPG 目录 |
| `OMNIA_LOG_LEVEL` | `信息` |日志级别|
| `OMNIA_LOG_FORMAT` | `文本` |格式：`text` 或 `json` |
| `OMNIA_TRACE_ENABLED` | `假` |激活追踪 |
| `OMNIA_COST_TRACKING` | `真实` |激活成本跟踪 |

## API 密钥

|供应商|变量|
|----------|----------|
|人择（克劳德）| `ANTHROPIC_API_KEY` |
| OpenAI (GPT) | `OPENAI_API_KEY` |
| Groq（骆驼）| `GROQ_API_KEY` |
|谷歌（双子座）| `GOOGLE_API_KEY` |
|奥拉马（本地）| `OLLAMA_BASE_URL`（默认：`http://localhost:11434`）|