---
title: Participate in Development
title_zh-CN: 参与开发
categories:
  - dev
end: false
---

- `create-valaxy`
- `create-valaxy-theme`

## Todo

- [ ] create-valaxy
  - select theme to init (default: valaxy-theme-yun)
- [ ] Debug component.

## Dev

You must use [pnpm](https://pnpm.io/). Because we use its workspace.

```bash
git clone https://github.com/YunYouJun/valaxy
cd valaxy

pnpm i
# esbuild watch valaxy cli & valaxy-theme-yun
# and run demo

# build node cli
pnpm run build

# pnpm dev = pnpm dev:lib + pnpm demo
pnpm dev
```

If you want to display info better in two terminal (**Recommended**), follow below.

### Node

```bash
# watch valaxy & valaxy-theme-yun
pnpm dev:lib
```

### Client

If you only want to develop client.

- Docs: `pnpm docs:dev`
- Demo(theme-yun): `pnpm demo`
