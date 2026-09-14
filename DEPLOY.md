# ЛЮСИ.НЕТ — deployment

Текущий production-хостинг: **GitHub Pages**.

## Production

- Repository: `purplehirerecruiting-cmd/lucy-net`
- Production branch: `main`
- Source: `Deploy from a branch`
- Folder: `/(root)`
- Custom domain: `lusy.space`
- Production URL: `https://lusy.space/`
- DNS check: successful
- Enforce HTTPS: enabled

Сайт статический. Build step не требуется.

## DNS

Корневой домен `lusy.space` направлен на GitHub Pages A-records.

`www.lusy.space` используется как CNAME на GitHub Pages host.

DNS уже настроен и без необходимости не меняется.

## Важно

- Не переключать production на Cloudflare Pages без отдельного решения.
- Не удалять custom domain в GitHub Pages.
- Не нажимать Unpublish site без явной необходимости.
- Не менять проект `lk-digital-yandex`: он отдельный и не относится к ЛЮСИ.НЕТ.
- Постоянная QR-точка входа для будущих PDF: `https://lusy.space/`.
