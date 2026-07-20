# Dr. Manuel Espinoza VPS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the static Next.js export to the DigitalOcean VPS through GitHub Actions with isolated SSH credentials, atomic releases, health checks, and automatic rollback.

**Architecture:** GitHub Actions builds and tests the project on a GitHub-hosted macOS runner because the existing contract test uses `sips`. Only the generated `out/` directory is streamed to `/srv/www/dr-manuel-espinoza/releases/<SHA>`. Nginx serves the atomic `current` symlink; the deployment restores the previous symlink if the local HTTP health check fails.

**Tech Stack:** Next.js 16 static export, GitHub Actions, OpenSSH, tar, Nginx, Ubuntu 24.04.

## Global Constraints

- Do not change DNS during this plan.
- Do not modify or remove the user's personal SSH key.
- The `deploy` account must not have sudo access.
- Use a repository-specific Ed25519 key and keep `StrictHostKeyChecking=yes`.
- Build on GitHub Actions, not on the VPS.
- Transfer only the compiled `out/` content.
- Never print the private deployment key.
- Do not delete old releases until the user explicitly approves destructive pruning.
- Do not inspect or modify `gestion-medica` or `gestor-tickets`.

---

### Task 1: Restore a trustworthy test baseline

**Files:**
- Modify: `tests/site-contract.sh`

**Interfaces:**
- Consumes: the current component tree on `main`
- Produces: a contract test that inspects only tracked files

- [ ] **Step 1: Reproduce the failing test**

Run:

```bash
bash tests/site-contract.sh
```

Expected: failure because `components/CarePath.tsx` does not exist.

- [ ] **Step 2: Confirm the stale references**

Run:

```bash
git log --all --name-status -- components/CarePath.tsx
rg -n 'CarePath' tests/site-contract.sh app components
```

Expected: no tracked history for `components/CarePath.tsx`; only obsolete absence checks and the valid `app/page.tsx` absence check.

- [ ] **Step 3: Remove only the invalid file assertions**

Delete these two lines from `tests/site-contract.sh`:

```bash
assert_absent "components/CarePath.tsx" "max-w-md border-l border-white/30"
assert_absent "components/CarePath.tsx" "-left-32 top-1/2"
```

- [ ] **Step 4: Verify test, lint, and build**

Run:

```bash
bash tests/site-contract.sh
npm run lint
npm run build
test -f out/index.html
```

Expected: every command exits with status 0 and `out/index.html` exists.

### Task 2: Add the production deployment workflow

**Files:**
- Create: `.github/workflows/deploy-production.yml`
- Create: `docs/deployment-vps.md`

**Interfaces:**
- Consumes GitHub Environment secrets: `VPS_HOST`, `VPS_PORT`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_KNOWN_HOSTS`, `DEPLOY_PATH`
- Produces release directory: `/srv/www/dr-manuel-espinoza/releases/<GITHUB_SHA>`
- Produces atomic symlink: `/srv/www/dr-manuel-espinoza/current`

- [ ] **Step 1: Create a workflow contract check**

Run after creating the workflow:

```bash
rg -n 'environment: production|StrictHostKeyChecking=yes|GITHUB_SHA|current.next|health check|rollback' .github/workflows/deploy-production.yml
```

Expected: all deployment safety controls are present.

- [ ] **Step 2: Create `.github/workflows/deploy-production.yml`**

The workflow must:

1. Trigger on pushes to `main` and manual dispatch.
2. Use `macos-latest`, Node.js 24, `npm ci`, the contract test, lint, and build.
3. Write the SSH key and `known_hosts` into `$RUNNER_TEMP` with mode `600`.
4. Connect with `StrictHostKeyChecking=yes`.
5. Stream `out/` into `releases/.incoming-<SHA>`.
6. Rename the incoming directory to `releases/<SHA>`.
7. Save the previous `current` target.
8. Create `current.next` and atomically rename it to `current`.
9. Run `curl -fsS -H 'Host: drmanuelespinoza.com' http://127.0.0.1/`.
10. Restore the previous symlink if the check fails.
11. List releases older than the newest five without deleting them.

- [ ] **Step 3: Document setup and rollback**

`docs/deployment-vps.md` must document:

- Environment and secret names.
- VPS paths and ownership.
- Manual health-check command.
- Manual rollback using `ln -sfn` plus `mv -Tf`.
- The fact that DNS and SSL remain pending.
- The disabled destructive cleanup policy.

- [ ] **Step 4: Validate workflow syntax and repository build**

Run:

```bash
ruby -e "require 'yaml'; YAML.load_file('.github/workflows/deploy-production.yml')"
npm run build
```

Expected: parseable workflow YAML and successful static export.

### Task 3: Prepare the VPS deployment boundary

**Files on VPS:**
- Create: `/home/deploy/.ssh/authorized_keys`
- Create: `/srv/www/dr-manuel-espinoza/releases/`
- Create: `/srv/www/dr-manuel-espinoza/shared/`

**Interfaces:**
- Consumes: repository-specific public SSH key
- Produces: non-sudo `deploy` account with write access only to the site directory

- [ ] **Step 1: Audit the current account and directory state**

Run remotely:

```bash
id deploy
sudo -n true
getent group sudo
namei -l /srv/www/dr-manuel-espinoza
```

Expected: determine whether `deploy` or the site path already exists before mutation.

- [ ] **Step 2: Generate the isolated key locally**

Run:

```bash
ssh-keygen -t ed25519 -a 100 -C github-actions-dr-manuel-espinoza -f <temporary-private-path> -N ''
```

Never print the private key. Record only the public key fingerprint.

- [ ] **Step 3: Create or validate the deployment account**

Run remotely only when needed:

```bash
sudo useradd --create-home --shell /bin/bash deploy
sudo gpasswd --delete deploy sudo
sudo install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
sudo install -d -m 755 -o deploy -g deploy /srv/www/dr-manuel-espinoza
sudo install -d -m 755 -o deploy -g deploy /srv/www/dr-manuel-espinoza/releases
sudo install -d -m 755 -o deploy -g deploy /srv/www/dr-manuel-espinoza/shared
```

Append the repository public key to `authorized_keys` without replacing existing keys, then set mode `600`.

- [ ] **Step 4: Verify the permission boundary**

Run:

```bash
id deploy
sudo -l -U deploy
sudo -u deploy test -w /srv/www/dr-manuel-espinoza/releases
sudo -u deploy test ! -w /etc/nginx
```

Expected: `deploy` can write the site release directory, cannot write Nginx configuration, and has no sudo commands.

### Task 4: Configure Nginx and publish the first release

**Files on VPS:**
- Create: `/etc/nginx/sites-available/drmanuelespinoza.com`
- Create symlink: `/etc/nginx/sites-enabled/drmanuelespinoza.com`
- Create: `/srv/www/dr-manuel-espinoza/releases/<SHA>/`
- Create symlink: `/srv/www/dr-manuel-espinoza/current`

**Interfaces:**
- Consumes: static `out/` artifact
- Produces: HTTP virtual host for `drmanuelespinoza.com`

- [ ] **Step 1: Transfer the first compiled release**

Stream the local `out/` directory over SSH into an incoming release directory, rename it to the full commit SHA, and create the atomic `current` symlink.

- [ ] **Step 2: Create the Nginx server block**

Use:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name drmanuelespinoza.com www.drmanuelespinoza.com;

    root /srv/www/dr-manuel-espinoza/current;
    index index.html;

    access_log /var/log/nginx/drmanuelespinoza.com.access.log;
    error_log /var/log/nginx/drmanuelespinoza.com.error.log;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    location ~* \.(?:css|js|jpg|jpeg|png|gif|svg|webp|ico|woff2?)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
}
```

- [ ] **Step 3: Validate before reload**

Run:

```bash
sudo nginx -t
curl -fsS -H 'Host: drmanuelespinoza.com' http://127.0.0.1/
```

Expected: valid Nginx configuration and an HTTP 200 response containing the site HTML.

- [ ] **Step 4: Verify services and resources**

Run:

```bash
systemctl --failed --no-pager
systemctl is-active nginx
ss -lntp
free -h
swapon --show
df -h /
```

Expected: Nginx active, no newly failed service, ports 80/443/22 as planned, and healthy memory/disk state.

### Task 5: Configure GitHub production secrets and perform a controlled deployment

**GitHub resources:**
- Create Environment: `production`
- Create secrets: `VPS_HOST`, `VPS_PORT`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_KNOWN_HOSTS`, `DEPLOY_PATH`

**Interfaces:**
- Consumes: private repository-specific SSH key and actual VPS host key
- Produces: a controlled Actions deployment to the VPS

- [ ] **Step 1: Capture the real host key**

Use the already trusted administrative SSH connection to compare the server's public host-key fingerprint with a fresh `ssh-keyscan` result. Store the matching public host-key line as `VPS_KNOWN_HOSTS`.

- [ ] **Step 2: Create the Environment and secrets**

Use GitHub authenticated tooling without printing secret values. Values:

```text
VPS_HOST=45.55.90.164
VPS_PORT=22
VPS_USER=deploy
VPS_SSH_KEY=<repository-specific private key>
VPS_KNOWN_HOSTS=<verified host-key line>
DEPLOY_PATH=/srv/www/dr-manuel-espinoza
```

- [ ] **Step 3: Commit and push the deployment branch**

Run:

```bash
git add tests/site-contract.sh .github/workflows/deploy-production.yml docs/deployment-vps.md docs/superpowers/plans/2026-07-19-dr-manuel-espinoza-vps-migration.md
git commit -m "ci(deploy): add atomic VPS deployment"
git push -u origin ci/vps-deployment
```

- [ ] **Step 4: Merge only after review**

Create a pull request targeting `main`. The push-to-main trigger must not run until the reviewed branch is merged.

- [ ] **Step 5: Verify the controlled deployment**

After merging or an explicitly approved manual dispatch:

```bash
gh run watch --exit-status
```

Then verify on the VPS:

```bash
readlink -f /srv/www/dr-manuel-espinoza/current
curl -fsS -H 'Host: drmanuelespinoza.com' http://127.0.0.1/
```

Expected: `current` resolves to the workflow commit SHA and HTTP returns 200.

### Task 6: Present the DNS and SSL checkpoint

**Files:** None.

**Interfaces:**
- Consumes: validated HTTP deployment
- Produces: exact proposed DNS records, without changing them

- [ ] **Step 1: Report proposed DNS records**

```text
A  @    45.55.90.164
A  www  45.55.90.164
```

- [ ] **Step 2: Wait for explicit DNS approval**

Do not change DNS, request Certbot certificates, disable Vercel deployment, or delete Vercel resources during this plan.
