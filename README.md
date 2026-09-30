# dsh-ops-plugins

English | [中文](README.zh.md)

An ops plugin suite for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (dsh): it turns a dsh agent into a production-incident investigator — one that resolves kubectl / ceph / ssh credentials by name, runs read-only commands against your clusters, and organizes the investigation as a tree.

It installs as a single npm package, `@elinpf/dsh-ops`; the granular `@elinpf/dsh-ops-*` packages arrive as its dependencies, all published in lockstep versions.

## Features

- Credentials register paths only; the agent sees profile names — secrets never enter model context
- Read-only by default; read-write needs a per-session grant with human approval, fully audit-logged
- Honest tool output — sensitive paths are scrubbed before anything reaches the model
- The `trace` tool structures investigations as trees, rendered git-graph-style in the web UI
- Environment inventory scanning, so the agent reasons over what actually exists
- A few methodology lines in the system prompt; full docs pulled on demand

## Requirements

- DeepSeek Harness ≥ 0.2.0-rc.2 (verified on 0.2.0-rc.2, including the desktop build)
- pnpm ≥ 10
- `kubectl` on the host with cluster network reachability; `ceph` / `ssh` as needed; `sshpass` too when using password-auth ssh profiles (network devices & co.)

## Installation

1. Install the package (dependencies and host-plane rows mount automatically):

   ```sh
   dsh plugin --profile ops add @elinpf/dsh-ops
   ```

2. For the web UI, edit `~/.dsh/profiles/ops/package.json` and add the web host to the bundles:

   ```json
   "dsh": {
     "profile": {
       "bundles": [
         "@deepseek-ai/dsh-base",
         "@deepseek-ai/dsh-web-app",
         "@elinpf/dsh-ops"
       ]
     }
   }
   ```

   `@deepseek-ai/dsh-web-app` resolves through the dsh installation; it cannot be installed via `dsh plugin add`.

If the install fails with a `minimumReleaseAge` error, add a name-pattern exclusion to the profile's `pnpm-workspace.yaml` — plain `@elinpf/*`, with NO version qualifier, so upgrades never need the list edited again:

```yaml
minimumReleaseAgeExclude:
  - '@elinpf/*'
```

## Deployment

1. The ops preset ships as a bundle patch and mounts automatically once `@elinpf/dsh-ops` is in the profile's `dsh.profile.bundles` (step 2 of Installation). No extra install step is required — since dsh 0.2.0 a preset is an ordinary `@deepseek-ai/dsh-agent-preset` row; the harness no longer discovers presets from `~/.dsh/.agent-presets/`.

2. Edit `~/.dsh/profiles/ops/cordis.patch.yml`, replacing the top-level array with:

   ```yaml
   - id: agent-preset-registry
     config:
       default: ops
   - id: session-reference
     disabled: true
   ```

3. Start (`--no-open` skips opening a browser; flags match `dsh web`):

   ```sh
   dsh --profile ops --no-open
   ```

4. Register credentials in `~/.dsh-ops/access.yaml` — paths and connection parameters only, never secrets. `list_access` with `help: true` pulls the format docs; the web admin UI also covers registration.

Verify:

```sh
dsh --profile ops --dump-config | grep -B2 -A8 'id: preset-ops'     # the ops preset declaration row
dsh --profile ops --dump-config | grep -A2 'id: session-reference'  # should carry disabled: true
```

Then start an ops session in the web UI: `list_access` lists your profiles, `kubectl` resolves them, the trace panel renders, rw credential use raises an approval request.

## Central credential hub (optional)

By default credentials live in a local YAML registry on the dsh host. For a centralized store — one place to register, rotate, and audit credentials — run `@elinpf/dsh-ops-access-hub`, a standalone service (not a dsh plugin) that keeps every credential in a single AES-256-GCM-encrypted document and serves it over a small token-authenticated HTTP API with a built-in web UI.

1. Run the hub:

   ```sh
   npx @elinpf/dsh-ops-access-hub serve
   ```

   Options (flag / env / default): `--port` / `ACCESS_HUB_PORT` / `3090`; `--host` / `ACCESS_HUB_HOST` / `127.0.0.1`; `--data-dir` / `ACCESS_HUB_DATA_DIR` / `~/.dsh-ops-hub`; `--key-file` / `ACCESS_HUB_KEY_FILE` / `<data-dir>/hub.key`; `--admin-token` / `ACCESS_HUB_ADMIN_TOKEN` and `--read-token` / `ACCESS_HUB_READ_TOKEN` / generated and printed once on first start when unset. The master key comes from `ACCESS_HUB_KEY` (base64/hex) or the key file (auto-generated, mode 0600).

2. Migrate an existing YAML registry into the hub (path-shaped field values are inlined as file content):

   ```sh
   npx @elinpf/dsh-ops-access-hub import ~/.dsh-ops/access.yaml \
     --url http://127.0.0.1:3090 --admin-token <admin token>
   ```

   Offline alternative: `--data-dir <dir>` instead of `--url` writes the hub's data file directly.

3. Point ops-access at the hub via the dsh service's **process environment** — this is the upgrade-proof seam. The access core lives in the agent preset plane: the profile's `cordis.patch.yml` only patches the host plane. With systemd:

   ```ini
   # /etc/systemd/system/<your-dsh-unit>.service
   Environment=ACCESS_HUB_URL=http://127.0.0.1:3090
   Environment=ACCESS_HUB_READ_TOKEN=<read token>
   Environment=ACCESS_HUB_ADMIN_TOKEN=<admin token>
   ```

   `ACCESS_HUB_URL` alone flips the source to hub mode; the tokens already had env fallbacks. An explicit `source`/`hubUrl` in the preset's ops-access entry wins over the env when present (useful for temporary experiments — just remember it is dropped on the next `@elinpf/dsh-ops` upgrade).

   Restart the service afterwards. File-field contents are pulled from the hub per resolve and materialized to TTL-bound cache files under `~/.dsh-ops/hub-cache` (mode 0600, swept on expiry and at startup); profiles still carry only paths, and the access gate, probes, admin UI, and tools behave exactly as in YAML mode.

Security notes: v1 speaks plain HTTP — keep the default loopback bind or put the hub behind a TLS-terminating reverse proxy. The hub is a single point of custody: back up both the data file and the master key. The local YAML mode remains available as a fallback at any time.

## Having an agent install it

Paste this into any dsh session and let the agent run the installation and deployment for you:

```text
Read the README at https://github.com/Elinpf/dsh-ops-plugins,
install and deploy the @elinpf/dsh-ops plugin suite into the ops profile,
then confirm with the verification steps in the README.
```

## Updating

```sh
dsh plugin --profile ops add @elinpf/dsh-ops@latest
dsh --profile ops --no-open   # restart; the preset ships in the bundle, no re-copy
```

Use `add @latest`, not `update` — `update` does not cross minors. The preset ships as a bundle patch, so it refreshes with the package automatically.

## Uninstall

1. Remove the package:

   ```sh
   dsh plugin --profile ops remove @elinpf/dsh-ops
   ```

2. Restart the profile:

   ```sh
   dsh --profile ops --no-open
   ```

3. Optionally delete `~/.dsh-ops/` — the credential registry, environment inventory, and referenced credential files. (A stale `~/.dsh/.agent-presets/ops/` from an older install can be deleted too.)

Uninstalling never touches your clusters: credentials are read-only references to files you own.

## Security

- Secrets never enter services, logs, errors, or model context
- The access gate's threat model is "prevent mistakes, not malice"
- Design decisions live in [`docs/adr/`](docs/adr/); the domain glossary (Chinese) is [`CONTEXT.md`](CONTEXT.md)
