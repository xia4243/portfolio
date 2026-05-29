# デザインシステム / Design System

このポートフォリオの視覚言語をまとめた仕様書です。すべて CSS カスタムプロパティ
（`src/styles/tokens.css`）として実装されており、Figma で再構築する際のハンドオフ資料
としても利用できます。

---

## 1. コンセプト

> **朱（vermilion） × 墨（ink） × 紙（paper）**

日本の伝統色「朱」をアクセントに、和の余白感とモダンなレイアウトを両立。
情報を詰め込みすぎず、余白とタイポグラフィで「上質さ」と「読みやすさ」を表現します。

設計原則：

1. **余白優先** — セクション上下は `clamp(4rem, 9rem)` で大きく取る
2. **1アクセント** — 朱色は CTA・強調のみに使い、主張を一点に集中
3. **流体タイポ** — `clamp()` で画面幅に応じ無段階にスケール
4. **アクセシビリティ** — コントラスト確保 / `prefers-reduced-motion` 対応 / フォーカス可視

---

## 2. カラートークン

| トークン | 値 | 用途 |
|---|---|---|
| `--c-ink` | `#16130f` | 見出し・本文 |
| `--c-ink-2` | `#403a33` | 副次テキスト |
| `--c-ink-3` | `#74695f` | 補助・キャプション |
| `--c-paper` | `#f7f4ee` | 背景ベース |
| `--c-paper-2` | `#efe9df` | 交互セクション背景 |
| `--c-accent` | `#df4d2f` | ブランドアクセント（朱） |
| `--c-accent-d` | `#bd3a1f` | hover 時の濃い朱 |
| `--c-accent-l` | `#f6e7e1` | 朱の極淡（面） |

### LP 別テーマ（`body.theme-*` で上書き）

| テーマ | アクセント | 背景 | 印象 |
|---|---|---|---|
| `theme-cafe` | `#b5793f`（珈琲） | クリーム | 温かみ・手仕事 |
| `theme-saas` | `#5b6fe0`（ブルー） | ライトグレー | 先進・信頼 |
| `theme-clinic` | `#e58a8a`（ブラッシュ）+ `#3f9a8f`（ティール） | 淡いミント | 清潔・やさしさ |

---

## 3. タイポグラフィ

| 用途 | フォント |
|---|---|
| 本文・UI | Noto Sans JP（400 / 500 / 700 / 900） |
| 見出しアクセント・数値 | Shippori Mincho B1（明朝、500 / 700） |
| コード・ラベル | monospace |

### スケール（流体）

| トークン | clamp |
|---|---|
| `--fs-display` | `clamp(2.75rem, 6rem)` |
| `--fs-h1` | `clamp(2rem, 3.5rem)` |
| `--fs-h2` | `clamp(1.6rem, 2.6rem)` |
| `--fs-h3` | `clamp(1.25rem, 1.6rem)` |
| `--fs-lead` | `clamp(1.05rem, 1.25rem)` |

行間：本文 `1.85`（日本語向けに広め） / 見出し `1.18`。
約物詰め `font-feature-settings: "palt" 1`。

---

## 4. スペーシング（8px ベース）

`--sp-1`(4px) → `--sp-2`(8) → `--sp-3`(12) → `--sp-4`(16) → `--sp-5`(24) →
`--sp-6`(32) → `--sp-7`(48) → `--sp-8`(64) → `--sp-9`(96) → `--sp-10`(128)

セクション余白：`--section-y = clamp(4rem, 9rem)`
コンテナ幅：`--container = 1200px` / `--container-narrow = 820px`

---

## 5. 角丸・影・モーション

- **Radius**：`--r-sm`(6) / `--r-md`(12) / `--r-lg`(20) / `--r-xl`(32) / `--r-pill`(999)
- **Shadow**：`--sh-sm` / `--sh-md` / `--sh-lg` / `--sh-accent`（朱の影）
- **Motion**：`--ease: cubic-bezier(.22,1,.36,1)` / `--t-fast`(.18s) / `--t-base`(.32s) / `--t-slow`(.6s)
  - `prefers-reduced-motion: reduce` で全アニメーションを無効化

---

## 6. コンポーネント

| 名称 | クラス | 説明 |
|---|---|---|
| ボタン | `.btn` / `.btn--accent` / `.btn--ghost` / `.btn--lg` | hover で浮き上がり + 矢印移動 |
| テキストリンク | `.link` | 下線スイープアニメーション |
| タグ | `.tag` / `.tag--accent` | 角丸ピル |
| カード | `.card` | hover で浮上 + 影 |
| ヘッダー | `.site-header` | スクロールで半透明 + blur |
| モバイルドロワー | `.drawer` | 全画面オーバーレイ |
| 数値 | `.stat` + `[data-count]` | スクロールでカウントアップ |
| 表示アニメ | `.reveal` + `[data-delay]` | IntersectionObserver でフェードイン |

---

## 7. 拡張方法

新しい業種の LP を追加する場合：

1. `samples/<industry>.html` を複製（既存 LP がテンプレート）
2. `<body class="theme-<industry>">` を付け、`<style>` 内で `body.theme-<industry> { --c-accent: ...; }` を定義
3. `vite.config.ts` の `build.rollupOptions.input` にエントリを追加
4. `index.html` の Works セクションにカードを追加

`body.theme-*`（詳細度 0,1,1）は `:root`（0,1,0）より強いため、JS で注入される共通 CSS より確実に上書きされます。
