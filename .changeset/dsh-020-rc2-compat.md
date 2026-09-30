---
"@elinpf/dsh-ops": patch
"@elinpf/dsh-ops-access": patch
"@elinpf/dsh-ops-access-ceph": patch
"@elinpf/dsh-ops-access-gate": patch
"@elinpf/dsh-ops-access-k8s": patch
"@elinpf/dsh-ops-access-prometheus": patch
"@elinpf/dsh-ops-access-ssh": patch
"@elinpf/dsh-ops-access-ui": patch
"@elinpf/dsh-ops-knowledge": patch
"@elinpf/dsh-ops-panel": patch
"@elinpf/dsh-ops-prompts": patch
"@elinpf/dsh-ops-shell-tool": patch
"@elinpf/dsh-ops-tool-ceph": patch
"@elinpf/dsh-ops-tool-environment": patch
"@elinpf/dsh-ops-tool-kubectl": patch
"@elinpf/dsh-ops-tool-prometheus": patch
"@elinpf/dsh-ops-tool-ssh": patch
"@elinpf/dsh-ops-tool-trace": patch
"@elinpf/dsh-ops-trace-ui": patch
---

兼容 DeepSeek Harness 0.2.0-rc.2（含桌面端）。全部 dsh 依赖升到 0.2.0-rc.2 / cordis 4.0.4 / schemastery 3.18.4；适配 API 变更：消息来源不再有通用 `plugin` kind（各插件改用自己的 `MessageSourceMap` 声明）、`ctx.shell.run` 拆为 `resolve` + `execute().result()`；preset 里已下线的 `dsh-workflow-worker-thread` 换成 `dsh-workflow-ptc`，persona 行改用 `prefix`。
