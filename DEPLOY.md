# LUCY.NET — Cloudflare Pages deployment

This repository is a static site. No build step is required.

## Cloudflare Pages settings

- Repository: `purplehirerecruiting-cmd/lucy-net`
- Production branch: `main`
- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`
- Root directory: `/`

After the first deployment Cloudflare will assign a temporary `*.pages.dev` address. A custom domain can be attached later without changing the site code or QR strategy.

## Important

The existing `lk-digital-yandex` Worker is a separate project and must not be changed or reused for LUCY.NET.
