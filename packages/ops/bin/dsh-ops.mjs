#!/usr/bin/env node
// @elinpf/dsh-ops — deployment helper for the ops plugin suite.
//
// DEPRECATED since dsh 0.2.0. Through dsh 0.1.x the harness discovered agent
// presets by scanning `<agents-home>/.agent-presets/`, so this helper
// materialized the preset by copying `presets/ops/` into that directory.
//
// dsh >= 0.2.0 removed directory discovery: the preset registry "neither scans
// directories nor accepts preset paths". A preset is now an ordinary
// `@deepseek-ai/dsh-agent-preset` plugin row, delivered as a bundle patch. The
// ops preset ships as `presets/ops.patch.yml`, declared in this package's
// `dsh.bundle.patch` array — it mounts automatically when the bundle joins a
// profile, with NO copy step.
//
// This binary is kept only to fail loudly (rather than silently no-op) for
// anyone still running the old command.

console.error(
  [
    'dsh-ops: `preset install`/`preset remove` are DISABLED.',
    '',
    'Since dsh 0.2.0 the harness no longer discovers presets from',
    '<agents-home>/.agent-presets/. The ops preset now ships as a bundle patch',
    '(`@elinpf/dsh-ops/presets/ops.patch.yml`, declared in this package\'s',
    '`dsh.bundle.patch`) and mounts automatically when the bundle joins a profile.',
    '',
    'Nothing to do: add @elinpf/dsh-ops to the profile\'s dsh.profile.bundles',
    'and restart the profile. Delete any stale ~/.dsh/.agent-presets/ops/ copy.',
  ].join('\n'),
)
process.exit(2)
