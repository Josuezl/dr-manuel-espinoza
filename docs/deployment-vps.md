# VPS deployment

Production is built by GitHub Actions and deployed as a static release. The
VPS never installs Node.js dependencies and never compiles the application.

## GitHub Environment

Create an Environment named `production` with these secrets:

| Secret | Value |
| --- | --- |
| `VPS_HOST` | `45.55.90.164` |
| `VPS_PORT` | `22` |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | Repository-specific private Ed25519 key |
| `VPS_KNOWN_HOSTS` | Verified public host-key line for the VPS |
| `DEPLOY_PATH` | `/srv/www/dr-manuel-espinoza` |

The private deployment key must never be copied from a personal key or printed
in logs. The workflow enforces `StrictHostKeyChecking=yes`.

## Filesystem layout

```text
/srv/www/dr-manuel-espinoza/
├── releases/
│   └── <full-commit-sha>/
├── current -> releases/<full-commit-sha>
└── shared/
```

The `deploy` account owns this site directory, has no sudo access, and cannot
modify Nginx configuration.

## Health check

Before DNS points to the VPS, verify the virtual host locally:

```bash
curl -fsS -o /dev/null -H 'Host: drmanuelespinoza.com' http://127.0.0.1/
```

The workflow runs the same check after atomically changing `current`.

## Manual rollback

List available releases and the current target:

```bash
readlink /srv/www/dr-manuel-espinoza/current
find /srv/www/dr-manuel-espinoza/releases -mindepth 1 -maxdepth 1 -type d
```

Select a known-good SHA and switch atomically:

```bash
ln -sfn "releases/<KNOWN_GOOD_SHA>" /srv/www/dr-manuel-espinoza/current.rollback
mv -Tf /srv/www/dr-manuel-espinoza/current.rollback /srv/www/dr-manuel-espinoza/current
curl -fsS -o /dev/null -H 'Host: drmanuelespinoza.com' http://127.0.0.1/
```

## Release retention

The workflow reports releases older than the newest five but does not delete
them. Destructive pruning remains disabled until it receives explicit approval.

## Pending cutover

DNS, Certbot, HTTPS redirection, and disabling Vercel deployments are separate
checkpoints. They must not be changed until the HTTP deployment has been
validated and each action is explicitly approved.

