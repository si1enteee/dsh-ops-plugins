---
"@elinpf/dsh-ops": minor
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

修正 preset 投递机制，适配 dsh 0.2.0：预设不再由 `dsh-ops preset install` 拷贝到 `~/.dsh/.agent-presets/`（dsh ≥ 0.2.0 的 preset registry 既不扫目录也不接受 preset 路径），改为随 bundle 投递的声明行——新增 `packages/ops/presets/ops.patch.yml`（一条 `@deepseek-ai/dsh-agent-preset` insert 行），并把 `packages/ops/package.json` 的 `dsh.bundle.patch` 改为数组同时挂载 host 面补丁与预设补丁；`@elinpf/dsh-ops` 显式补上 preset 引用的 `@deepseek-ai/dsh-*` 依赖以保证解析。`dsh-ops` bin 的 `preset install|remove` 作废（改为失败提示），README/AGENTS.md 同步为 bundle 声明流程。
