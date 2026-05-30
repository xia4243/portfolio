# Web制作・フロントエンド ポートフォリオ

フリーランスの Web 制作／フロントエンド案件に応募するための **ポートフォリオサイト** です。
設計・デザイン・実装を一気通貫で行えることを示すため、サイト自体を手書きの HTML / CSS /
TypeScript（Vite）で構築しています。実案件のケーススタディ1件と、業種別のサンプル LP 3件を収録。

> 🎯 用途：Anycrew 等の Web デザイナー／Web 制作 業務委託案件への応募作品

---

## 📁 構成（ページ）

| ページ | パス | 内容 |
|---|---|---|
| ポートフォリオ TOP | `index.html` | Hero / About / Services / Works / Process / Contact |
| ケーススタディ | `works/strawberry.html` | イチゴ熟度検出システム（Vue + Spring Boot + YOLOv8） |
| サンプル ① コーポレート | `samples/corporate.html` | 株式会社ノルド（架空 B2B 企業／ネイビー × スレートブルー） |
| サンプル LP ② | `samples/cafe.html` | カフェ／ベーカリー（珈琲色 × クリーム） |
| サンプル LP ③ | `samples/saas.html` | SaaS／スタートアップ（インディゴ × ブルー） |
| サンプル LP ④ | `samples/clinic.html` | 美容クリニック（ティール × ブラッシュ） |
| サンプル LP ⑤ | `samples/ec.html` | 通販／D2C ボタニカル美容液（セージグリーン × クリーム） |
| サンプル LP ⑥ | `samples/recruit.html` | 採用／求人（テラコッタ × アイボリー） |

各サンプル LP はそれぞれ独立した配色テーマを持ち、「幅広い業種に対応できる」ことを示します。

---

## 🛠 技術スタック

- **Vite 6** … 高速な開発サーバ / マルチページ（MPA）ビルド
- **TypeScript** … 共通インタラクション（`src/main.ts`, `src/contact.ts`）
- **素の HTML / CSS** … フレームワーク非依存。CSS カスタムプロパティでデザインシステムを構築
- **Google Fonts** … Noto Sans JP / Shippori Mincho B1

依存は `vite` と `typescript` のみ。軽量・高速・デプロイ容易。

---

## 🚀 セットアップ

```bash
# 依存インストール
npm install

# 開発サーバ（http://localhost:5174）
npm run dev

# 本番ビルド（dist/ に出力）
npm run build

# ビルド結果のプレビュー（http://localhost:4173）
npm run preview

# 型チェック
npm run typecheck
```

---

## ✏️ カスタマイズ状況

氏名・ロゴ・連絡先・GitHub は設定済みです。写真と公開ドメインは任意で差し替えてください。

| 項目 | 状態 | 変更箇所 |
|---|---|---|
| 氏名 `夏目崎子` / `NATSUME SAKIKO` | ✅ 設定済み | — |
| ロゴ `N` / `NATSUME.` | ✅ 設定済み | `.brand__mark` |
| メール `xia4243@gmail.com` | ✅ 設定済み | `index.html` Contact / JSON-LD |
| GitHub `github.com/xia4243` | ✅ 設定済み | — |
| プロフィール写真 | 🔲 任意 | `index.html` の `.about__photo` に `<img>` を配置 |
| 各 LP の写真 | 🔲 任意 | `.photo-ph` 枠を実画像に置換 |
| 公開ドメイン | 🔲 任意 | JSON-LD の `url` / `<link rel=canonical>` / `robots.txt` の Sitemap 行 |

### お問い合わせフォームを実際に動かす

`src/contact.ts` はデモ動作（送信されません）。実運用では以下のいずれかに接続します。

- **Formspree** … `<form action="https://formspree.io/f/xxxx" method="POST">` に変更
- **Netlify Forms** … `<form netlify>` を付与してホスティング

---

## 🌐 デプロイ

ビルド出力（`dist/`）は静的ファイルなので、どこにでも置けます。`base: './'` 設定済みのため
サブディレクトリ配信でもパスが壊れません。

- **GitHub Pages** … `dist/` を `gh-pages` ブランチに公開、または Actions で自動化
- **Netlify** … ビルドコマンド `npm run build` / 公開ディレクトリ `dist`
- **Vercel** … フレームワーク「Vite」で自動検出

---

## 📐 デザインシステム

配色・タイポグラフィ・余白などの設計指針は [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) を参照。
Figma で再構築する際のハンドオフ仕様としても使えます。

---

## ⚠️ 注記

- サンプル（株式会社ノルド / 木ノ実 / Flowte / そらクリニック）は **すべて架空** です。実在の企業・店舗・サービスとは関係ありません。
- ケーススタディの数値は、開発したシステムの実測に基づく概算値です。
- OGP 画像は `public/og.svg`（1200×630）を使用しています。X（Twitter）・Facebook・LINE など一部の SNS は **SVG の OGP を表示しません**。確実にカードを表示したい場合は、同じデザインを **PNG（`og.png`）に書き出して** `og:image` を差し替えてください。
- 公開時は各ページの `<link rel="canonical">`（`index.html` にコメントで雛形あり）と JSON-LD / OGP の `url` を、実際のドメインに差し替えてください。

---

© NATSUME SAKIKO — このリポジトリはポートフォリオ用途です。
