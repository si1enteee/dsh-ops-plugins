# @elinpf/dsh-ops-knowledge

## 0.5.0

### Patch Changes

- fe5da2f: 修正 preset 投递机制，适配 dsh 0.2.0：预设不再由 `dsh-ops preset install` 拷贝到 `~/.dsh/.agent-presets/`（dsh ≥ 0.2.0 的 preset registry 既不扫目录也不接受 preset 路径），改为随 bundle 投递的声明行——新增 `packages/ops/presets/ops.patch.yml`（一条 `@deepseek-ai/dsh-agent-preset` insert 行），并把 `packages/ops/package.json` 的 `dsh.bundle.patch` 改为数组同时挂载 host 面补丁与预设补丁；`@elinpf/dsh-ops` 显式补上 preset 引用的 `@deepseek-ai/dsh-*` 依赖以保证解析。`dsh-ops` bin 的 `preset install|remove` 作废（改为失败提示），README/AGENTS.md 同步为 bundle 声明流程。
- Updated dependencies [fe5da2f]
  - @elinpf/dsh-ops-prompts@0.5.0

## 0.4.2

### Patch Changes

- 050b7db: 兼容 DeepSeek Harness 0.2.0-rc.2（含桌面端）。全部 dsh 依赖升到 0.2.0-rc.2 / cordis 4.0.4 / schemastery 3.18.4；适配 API 变更：消息来源不再有通用 `plugin` kind（各插件改用自己的 `MessageSourceMap` 声明）、`ctx.shell.run` 拆为 `resolve` + `execute().result()`；preset 里已下线的 `dsh-workflow-worker-thread` 换成 `dsh-workflow-ptc`，persona 行改用 `prefix`。
- Updated dependencies [050b7db]
  - @elinpf/dsh-ops-prompts@0.4.2

## 0.4.1

### Patch Changes

- @elinpf/dsh-ops-prompts@0.4.1

## 0.4.0

### Minor Changes

- 1015b6b: 新包 `@elinpf/dsh-ops-knowledge` — 排错知识库插件: `knowledge_search` / `knowledge_record` / `knowledge_hit` 三个模型工具(access hub `/cases` 后端), 经 ops-prompts 注册静态 methodology(先搜后沉淀、采用计数纪律) + 每会话一次的病例索引 reminder(按 hitCount 取 top 10)。病例除结论(症状/根因/修复)外还有可选 methodology(排查方法论: 关键判别步骤) 和 difficulty(1-5 难度自评) 字段; `knowledge_search` 支持 query="*" 浏览全量。无 hub 配置时整体 no-op; hub 不可达时工具返回错误结果而非抛出。trace 的 doctrine HELP_TEXT 新增「收口后的知识沉淀」段, ops 部署包的 preset 带上 `tool-ops-knowledge` 行(无 config, 走 `ACCESS_HUB_URL`/`ACCESS_HUB_READ_TOKEN` 环境变量)。

### Patch Changes

- @elinpf/dsh-ops-prompts@0.4.0
