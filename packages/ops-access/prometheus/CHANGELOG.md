# @elinpf/dsh-ops-access-prometheus

## 0.5.0

### Patch Changes

- fe5da2f: 修正 preset 投递机制，适配 dsh 0.2.0：预设不再由 `dsh-ops preset install` 拷贝到 `~/.dsh/.agent-presets/`（dsh ≥ 0.2.0 的 preset registry 既不扫目录也不接受 preset 路径），改为随 bundle 投递的声明行——新增 `packages/ops/presets/ops.patch.yml`（一条 `@deepseek-ai/dsh-agent-preset` insert 行），并把 `packages/ops/package.json` 的 `dsh.bundle.patch` 改为数组同时挂载 host 面补丁与预设补丁；`@elinpf/dsh-ops` 显式补上 preset 引用的 `@deepseek-ai/dsh-*` 依赖以保证解析。`dsh-ops` bin 的 `preset install|remove` 作废（改为失败提示），README/AGENTS.md 同步为 bundle 声明流程。
- Updated dependencies [fe5da2f]
  - @elinpf/dsh-ops-access@0.5.0

## 0.4.2

### Patch Changes

- 050b7db: 兼容 DeepSeek Harness 0.2.0-rc.2（含桌面端）。全部 dsh 依赖升到 0.2.0-rc.2 / cordis 4.0.4 / schemastery 3.18.4；适配 API 变更：消息来源不再有通用 `plugin` kind（各插件改用自己的 `MessageSourceMap` 声明）、`ctx.shell.run` 拆为 `resolve` + `execute().result()`；preset 里已下线的 `dsh-workflow-worker-thread` 换成 `dsh-workflow-ptc`，persona 行改用 `prefix`。
- Updated dependencies [050b7db]
  - @elinpf/dsh-ops-access@0.4.2

## 0.4.1

### Patch Changes

- @elinpf/dsh-ops-access@0.4.1

## 0.4.0

### Patch Changes

- 34bc97e: 内部去重清理(code-review 坏味项,无行为变化):expandHome 归位 core/backend.ts(消除 hub-backend 重复实现);单行粘贴守卫提取为 core 导出的 hasSingleLineBody(ssh/prometheus 两 provider 共用);ops-shell-tool 导出 shellToolOutput 契约,ops-tool-prometheus 复用替代逐字拷贝;hub-backend.listRequests 去掉从未使用的 status 参数;access-ui badge 的 pendingRequestCount 内联。另新增私有 test-support 包,合并三份逐字相同的 tests/tmpdir.ts。
- Updated dependencies [5d1a604]
- Updated dependencies [34bc97e]
  - @elinpf/dsh-ops-access@0.4.0

## 0.3.0

### Patch Changes

- Updated dependencies [8583b23]
  - @elinpf/dsh-ops-access@0.3.0

## 0.2.1

### Patch Changes

- Updated dependencies [4d28c14]
  - @elinpf/dsh-ops-access@0.2.1

## 0.2.0

### Minor Changes

- bf99896: 新增 Prometheus 查询能力,两个包:
  
  - `@elinpf/dsh-ops-access-prometheus` — `prometheus` 凭证 kind 的 provider:条目 schema `{ url, token? }`(url 仅 http(s);token 是敏感字段,声明为 fileField,粘贴内容落受管文件、注册表只存路径),process 展开 token 路径的 `~` 并剥掉 url 末尾斜杠,保存时校验 token 必须单行。API 天然只读,无 probe;`knownLimits` 提示与同集群 k8s 档案配对。
  - `@elinpf/dsh-ops-tool-prometheus` — `prometheus` 模型工具:按档案名解析后直接打 Prometheus HTTP API(`GET /api/v1/query` / `/api/v1/query_range`,参数 URL 编码,不走 ctx.shell);instant(可带 `time`)与 range(`start`+`end`+`step` 三缺一即拒,与 `time` 互斥);token 存在时带 `Authorization: Bearer`,token 绝不回显(所有返回字符串防御性擦除);默认 30s 超时,`timeoutSec`(1–600)可单次覆盖。失败分级:PromQL 被拒 exitCode=1(stderr 放 errorType+error),连接失败/超时/HTTP 状态 exitCode=-1 且写明首因。大小护栏:100 series / 每 series 50 点(均匀抽样)/ stdout ~100KB 截断,均注明。
  
  动机:一次真实排查会话里 agent 手写 curl/heredoc 查 Prometheus 约 15 次、写错 5 次——固化为工具后凭证注入、编码、超时、截断全部由工具承担。
  
  接线注意:两包已加入 changesets fixed 组(随套件锁步发版);`ops` 部署包依赖与 `ops-preset.yml` 挂载行的接线留给套件级改动。

### Patch Changes

- Updated dependencies [67c6abe]
- Updated dependencies [b8bb955]
- Updated dependencies [bf99896]
- Updated dependencies [401a8a7]
  - @elinpf/dsh-ops-access@0.2.0
