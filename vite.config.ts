import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

// Multi-page (MPA) build: portfolio top + case study + 3 sample landing pages.
export default defineConfig({
  // 相対パス出力 → GitHub Pages / Netlify / 任意サブディレクトリにそのまま置ける
  base: './',
  // cwd に依存せず、常にこの設定ファイルのあるディレクトリを基準にする
  root,
  build: {
    target: 'es2020',
    outDir: 'dist',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        strawberry: resolve(root, 'works/strawberry.html'),
        cafe: resolve(root, 'samples/cafe.html'),
        saas: resolve(root, 'samples/saas.html'),
        clinic: resolve(root, 'samples/clinic.html'),
        corporate: resolve(root, 'samples/corporate.html'),
        corporateNews: resolve(root, 'samples/corporate-news.html'),
        ec: resolve(root, 'samples/ec.html'),
        recruit: resolve(root, 'samples/recruit.html'),
        notfound: resolve(root, '404.html'),
      },
    },
  },
  server: {
    host: true, // 全インターフェースで待受（IPv4 127.0.0.1 でも到達可能に）
    port: 5174,
    open: false,
  },
  preview: {
    host: true,
    port: 4173,
  },
})
