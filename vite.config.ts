import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

const MIME: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
}

function isInsideRoot(root: string, target: string): boolean {
  const relative = path.relative(root, target)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

function isAllowedConteudo(relativePath: string): boolean {
  const normalized = relativePath.replace(/\\/g, '/')
  return (
    normalized === 'catalogo.json' ||
    normalized.startsWith('marcas/') ||
    normalized.startsWith('_modelo/')
  )
}

function serveConteudo(): Plugin {
  const mount = '/conteudo'

  const attach = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use((req, res, next) => {
      const url = req.url?.split('?')[0] ?? ''
      if (!url.startsWith(mount)) {
        next()
        return
      }

      const relativePath = decodeURIComponent(url.slice(mount.length)).replace(/^\/+/, '')
      if (!isAllowedConteudo(relativePath)) {
        res.statusCode = 404
        res.end('Not found')
        return
      }

      const absolutePath = path.resolve(rootDir, relativePath)
      if (!isInsideRoot(rootDir, absolutePath)) {
        res.statusCode = 403
        res.end('Forbidden')
        return
      }

      if (!fs.existsSync(absolutePath) || fs.statSync(absolutePath).isDirectory()) {
        res.statusCode = 404
        res.end('Not found')
        return
      }

      const ext = path.extname(absolutePath).toLowerCase()
      res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream')
      fs.createReadStream(absolutePath).pipe(res)
    })
  }

  return {
    name: 'serve-conteudo-livros',
    configureServer(server) {
      attach(server)
    },
    configurePreviewServer(server) {
      attach(server)
    },
  }
}

export default defineConfig({
  plugins: [react(), serveConteudo()],
  base: '/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
  },
})
