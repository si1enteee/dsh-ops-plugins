# @elinpf/dsh-ops-trace-ui

## 0.4.2

### Patch Changes

- 050b7db: 兼容 DeepSeek Harness 0.2.0-rc.2（含桌面端）。全部 dsh 依赖升到 0.2.0-rc.2 / cordis 4.0.4 / schemastery 3.18.4；适配 API 变更：消息来源不再有通用 `plugin` kind（各插件改用自己的 `MessageSourceMap` 声明）、`ctx.shell.run` 拆为 `resolve` + `execute().result()`；preset 里已下线的 `dsh-workflow-worker-thread` 换成 `dsh-workflow-ptc`，persona 行改用 `prefix`。
- Updated dependencies [050b7db]
  - @elinpf/dsh-ops-tool-trace@0.4.2

## 0.4.1

### Patch Changes

- Updated dependencies [66a49cb]
  - @elinpf/dsh-ops-tool-trace@0.4.1

## 0.4.0

### Patch Changes

- Updated dependencies [1015b6b]
  - @elinpf/dsh-ops-tool-trace@0.4.0

## 0.3.0

### Patch Changes

- @elinpf/dsh-ops-tool-trace@0.3.0

## 0.2.1

### Patch Changes

- 4d28c14: 修复 0.2.0 发布物缺文件:`files` 白名单漏掉了 access-hub 新增的 `lib/backend.js`/`lib/hub-backend.js`(导致 npm 安装下 ops preset 挂载失败、所有 ops-access 路由 404)和 access-ui 的 `lib/candidates.js`(@ access 候选模块缺失、客户端插件加载失败)。ops-panel 顺带补上 `lib/types.js`。四个包的 `files` 统一改为 `lib/**/*.js` + `lib/**/*.d.ts` 通配,并新增 `scripts/check-pack-files.mjs` 打包覆盖检查接入 CI,防再犯。
- @elinpf/dsh-ops-tool-trace@0.2.1

## 0.2.0

### Patch Changes

- Updated dependencies [bf99896]
  - @elinpf/dsh-ops-tool-trace@0.2.0

## 0.1.7

### Patch Changes

- e004cd5: Fix the trace panel never appearing under dsh ≥0.1.1: the session-projection contract changed (`stateSchema` + `wire.{viewSchema,view}`, wire-less units silently dropped from baselines and push frames), and `traceProjection` still carried only the ≤0.1.0-rc.8 shape (`schema` + top-level `view`). The definition now carries both shapes, so the `trace` projection is wire-visible on both contracts; peer range widened to `^0.1.0-rc.8 || ^0.1.1-rc.1`. No state-format change (`stateVersion` stays 5).
- Updated dependencies [e004cd5]
  - @elinpf/dsh-ops-tool-trace@0.1.7

## 0.1.6

### Patch Changes

- @elinpf/dsh-ops-tool-trace@0.1.6

## 0.1.5

### Patch Changes

- @elinpf/dsh-ops-tool-trace@0.1.5

## 0.1.4

### Patch Changes

- @elinpf/dsh-ops-tool-trace@0.1.4

## 0.1.3

### Patch Changes

- @elinpf/dsh-ops-tool-trace@0.1.3

## 0.1.2

### Patch Changes

- Updated dependencies [ad9ff60]
  - @elinpf/dsh-ops-tool-trace@0.1.2

## 0.1.1

### Patch Changes

- @elinpf/dsh-ops-tool-trace@0.1.1
