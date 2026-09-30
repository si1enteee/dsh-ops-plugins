# @elinpf/dsh-ops-tool-environment

## 0.4.2

### Patch Changes

- 050b7db: 兼容 DeepSeek Harness 0.2.0-rc.2（含桌面端）。全部 dsh 依赖升到 0.2.0-rc.2 / cordis 4.0.4 / schemastery 3.18.4；适配 API 变更：消息来源不再有通用 `plugin` kind（各插件改用自己的 `MessageSourceMap` 声明）、`ctx.shell.run` 拆为 `resolve` + `execute().result()`；preset 里已下线的 `dsh-workflow-worker-thread` 换成 `dsh-workflow-ptc`，persona 行改用 `prefix`。
- Updated dependencies [050b7db]
  - @elinpf/dsh-ops-access@0.4.2
  - @elinpf/dsh-ops-prompts@0.4.2

## 0.4.1

### Patch Changes

- @elinpf/dsh-ops-access@0.4.1
  - @elinpf/dsh-ops-prompts@0.4.1

## 0.4.0

### Patch Changes

- Updated dependencies [5d1a604]
- Updated dependencies [34bc97e]
  - @elinpf/dsh-ops-access@0.4.0
  - @elinpf/dsh-ops-prompts@0.4.0

## 0.3.0

### Patch Changes

- Updated dependencies [8583b23]
  - @elinpf/dsh-ops-access@0.3.0
  - @elinpf/dsh-ops-prompts@0.3.0

## 0.2.1

### Patch Changes

- Updated dependencies [4d28c14]
  - @elinpf/dsh-ops-access@0.2.1
  - @elinpf/dsh-ops-prompts@0.2.1

## 0.2.0

### Patch Changes

- Updated dependencies [67c6abe]
- Updated dependencies [b8bb955]
- Updated dependencies [bf99896]
- Updated dependencies [401a8a7]
  - @elinpf/dsh-ops-access@0.2.0
  - @elinpf/dsh-ops-prompts@0.2.0

## 0.1.7

### Patch Changes

- @elinpf/dsh-ops-access@0.1.7
  - @elinpf/dsh-ops-prompts@0.1.7

## 0.1.6

### Patch Changes

- @elinpf/dsh-ops-access@0.1.6
  - @elinpf/dsh-ops-prompts@0.1.6

## 0.1.5

### Patch Changes

- @elinpf/dsh-ops-access@0.1.5
  - @elinpf/dsh-ops-prompts@0.1.5

## 0.1.4

### Patch Changes

- @elinpf/dsh-ops-access@0.1.4
  - @elinpf/dsh-ops-prompts@0.1.4

## 0.1.3

### Patch Changes

- Updated dependencies [e6aa27b]
  - @elinpf/dsh-ops-access@0.1.3
  - @elinpf/dsh-ops-prompts@0.1.3

## 0.1.2

### Patch Changes

- @elinpf/dsh-ops-access@0.1.2
  - @elinpf/dsh-ops-prompts@0.1.2

## 0.1.1

### Patch Changes

- @elinpf/dsh-ops-access@0.1.1
  - @elinpf/dsh-ops-prompts@0.1.1
