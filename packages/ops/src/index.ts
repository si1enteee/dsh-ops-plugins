/**
 * Deployment metadata for the ops suite meta bundle. The package itself is
 * never mounted as a plugin row — its `cordis.patch.yml` carries the
 * host-plane rows and `presets/ops.patch.yml` the agent preset (a declarative
 * `@deepseek-ai/dsh-agent-preset` row, dsh >= 0.2.0), both applied when the
 * bundle joins a profile's `dsh.profile.bundles` — there is no copy step.
 * @module @elinpf/dsh-ops
 */

/** The preset id this bundle ships. */
export const PRESET_ID = 'ops'

/** The granular packages this bundle deploys, in mount order. */
export const PACKAGES: readonly string[] = [
  '@elinpf/dsh-ops-access',
  '@elinpf/dsh-ops-access-ceph',
  '@elinpf/dsh-ops-access-gate',
  '@elinpf/dsh-ops-access-k8s',
  '@elinpf/dsh-ops-access-ssh',
  '@elinpf/dsh-ops-access-ui',
  '@elinpf/dsh-ops-panel',
  '@elinpf/dsh-ops-prompts',
  '@elinpf/dsh-ops-tool-ceph',
  '@elinpf/dsh-ops-tool-environment',
  '@elinpf/dsh-ops-tool-kubectl',
  '@elinpf/dsh-ops-tool-ssh',
  '@elinpf/dsh-ops-tool-trace',
  '@elinpf/dsh-ops-trace-ui',
]
