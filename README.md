# cms_v2

Netlify production build for the WIN100% frontend.

## Production

Netlify builds from `frontend/` using the repo-root `netlify.toml`:

```toml
[build]
base = "frontend"
command = "npm run generate"
publish = ".output/public"
```

## Preserved Versions

- Netlify latest production: tag `keep/netlify-production-latest-2026-06-29`
- Figma React version: branch `backup/figma-react-version`, tag `keep/figma-react-version-2026-06-29`

The old GitHub Pages static export and prototype folders were removed from `main`
to keep the production branch focused on the Netlify app.
