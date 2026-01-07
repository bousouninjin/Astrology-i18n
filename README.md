<div align="center">

# Astrology i18n — 多言語 Astro ブログテーマ

[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node](https://img.shields.io/badge/Node-%E2%89%A5%2020-339933?logo=node.js)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Astro 5 で構築された多言語対応の「写真と散文」テーマです。10言語対応、ロケールごとのルートと辞書、SEO / JSON-LD、ロケールごとのRSS、サイト内検索、レスポンシブ画像、自動ダーク/ライトテーマ切り替えを搭載し、グローバルなストーリーテリングに対応しています。

<img src="public/screenshot.webp" alt="Astrology-i18n" />

[ライブデモ](https://astrology-i18n.vercel.app/)

</div>

## Lighthouse

<p align="center">
  <a href="https://pagespeed.web.dev/analysis/https-astrology-yo7bu6q1-edgeone-app/nij513nbyr?form_factor=mobile">
    <img width="510" alt="Astrology-i18n Lighthouse" src="public/astrology-i18n-lighthouse-score.svg">
  </a>
  <br/>
スコアはコンテンツやネットワーク状況によって変わります。目安としてご確認ください。
  
</p>

## ショーケース

- [**iDiMi**](https://idimi.com) — 投資、起業家精神、そして人生についてのブログ。
- テーマを使用していますか？あなたのサイトURLとスクリーンショットを添えて "Showcase Submission" というタイトルのIssueを開いてください。

## 特徴

- 🌐 **国際化**: 言語プレフィックス付きルート `/[lang]/` (デフォルトの `zh` もプレフィックス付き)、`src/i18n/*.json` での集中管理された UI 辞書、hreflang および多言語サイトマップ。
- 🗂️ **コンテンツコレクション**: `src/content.config.ts` での投稿/ページ/著者コレクション定義、フロントマターのバリデーション、Git からの最終更新日時取得。
- ✍️ **MDX サポート**: コンテンツやページ全体で `@astrojs/mdx` を有効化。
- 🖼️ **画像とパフォーマンス**: `astro:assets` によるローカルアセットの最適化。リモート画像はデフォルトでサイズを推論しません（`width`/`height` を渡すか、ローカルアセットを使用してください）。
- ⚡ **パフォーマンス**: リンクのプリフェッチを有効化 (`prefetch.defaultStrategy = 'viewport'`)。
- 🔎 **検索**: `astro-pagefind` によるサイト内検索 (`/[lang]/search`)。
- 📈 **SEO**: `astro-seo` + JSON‑LD。`/[lang]/rss.xml` での言語ごとの RSS、`robots.txt`、`@astrojs/sitemap`。
- 🎨 **スタイリングとコンポーネント**: Tailwind CSS v4 (+ Typography)、複数のカード/レイアウト、ライト/ダーク切り替えと自動検出、`astro-icon` によるアイコンシステム（Lucide セット込み）。
- 📊 **アナリティクス対応**: `dataLayer.push` を転送する Partytown 統合（デフォルトではサードパーティスクリプトは無効）。
- 🧩 **組み込み機能**: ページネーション、タグ＆カテゴリーページ、著者ページ、404ページ。

## クイックスタート

要件: Node.js 20以上、pnpm または npm。

```bash
# インストール
npm install

# 開発環境の起動 (http://localhost:4321)
npm run dev

# ビルド & プレビュー
npm run build
npm run preview
```

## プロジェクト構造

```text
.
├─ astro.config.mjs               # サイト、画像、i18n、インテグレーション設定
├─ package.json                   # スクリプトと依存関係 (Astro, Tailwind, MDX など)
├─ tsconfig.json
├─ public/                        # 静的アセット
├─ src/
│  ├─ pages/
│  │  ├─ index.astro              # ルートランディング
│  │  ├─ robots.txt.ts
│  │  ├─ rss.xml.ts               # ルート RSS
│  │  └─ [lang]/
│  │     ├─ index.astro           # ホーム
│  │     ├─ about.astro           # 概要ページ
│  │     ├─ author.astro          # 著者ページ
│  │     ├─ 404.astro             # ローカライズされた404
│  │     ├─ search.astro          # サイト内検索
│  │     ├─ posts/
│  │     │  ├─ index.astro        # リスト
│  │     │  └─ [...slug].astro    # 詳細
│  │     ├─ tags/
│  │     │  ├─ index.astro
│  │     │  └─ [slug]/[page].astro
│  │     └─ category/
│  │        ├─ index.astro
│  │        └─ [slug]/[page].astro
│  ├─ content/
│  │  ├─ posts/<lang>/...         # Markdown/MDX 投稿
│  │  ├─ pages/<lang>/...         # 静的ページ
│  │  └─ authors/<lang>/...       # 著者データ
│  ├─ i18n/*.json                 # UI 辞書
│  ├─ components/
│  │  ├─ analytics/               # Partytown/GTM スロット
│  │  ├─ widgets/
│  │  ├─ features/
│  │  ├─ cards/
│  │  └─ ui/                      # ヘッダー/フッター/ナビゲーション
│  ├─ layouts/                    # メイン/投稿/ランディング
│  ├─ utils/                      # i18n, rss, date, remark
│  ├─ styles/                     # global.css
│  ├─ icons/                      # svg アイコン
│  └─ content.config.ts           # コンテンツコレクション
```

## コンテンツの執筆 (Frontmatter)

`src/content/posts/<lang>/` 配下に `.md`/`.mdx` を作成してください。例:

```yaml
---
title: 投稿タイトル
description: 短い概要
category: カテゴリ
tags: [タグ1, タグ2]
pubDate: 2024-08-01
updatedDate: 2024-08-15 # オプション; Gitからも自動注入されます
author: Astro
heroImage: /path/or/https... # ローカルアセットを推奨、もしくは寸法を指定
heroImageAlt: カバー画像の代替テキスト
locales: zh # zh/en/fr/es/ru/ja/ko/pt/de/id のいずれか
draft: false
featured: false
---
```

ルーティング: 言語と拡張子を除いた後、投稿は `/{lang}/posts/<slug>/` にマッピングされます。

## 国際化

- デフォルト言語: `zh` (サポート: `zh, en, fr, es, ru, ja, ko, pt, de, id`)。
- ルーティングルール: デフォルトロケールもプレフィックスが付きます（`/zh/...`）。デフォルトロケールへの自動リダイレクトはありません。欠けているページは `fallbackType: 'rewrite'` を使用します（リクエストされたロケールのURLを維持したまま、フォールバックコンテンツを提供）。
- フォールバックマップ: `en→zh`, `fr→zh`, `es→zh`, `ru→zh`, `ja→zh`, `ko→zh`, `pt→zh`, `de→zh`, `id→zh`。
- 新しい言語の追加:
  1. `src/utils/i18n.ts` と `src/content.config.ts` にコードを追加。
  2. `src/i18n/<lang>.json` を作成。
  3. オプションで `astro.config.mjs` の `i18n.locales` と `i18n.fallback` を更新。

## 組み込みページ

- ルートランディング: `/` (言語に依存しないランディングページ)
- ホーム: `/<lang>/` (例: `/en/`, `/zh/`)
- 投稿リスト: `/<lang>/posts/` (ページネーション付き `/<lang>/posts/<page>/`)
- 投稿詳細: `/<lang>/posts/<slug>/` (`src/content/posts/<lang>/*` から)
- タグ: リスト `/<lang>/tags/`、タグページ `/<lang>/tags/<slug>/` (+ ページネーション)
- カテゴリ: リスト `/<lang>/category/`、カテゴリページ `/<lang>/category/<slug>/` (+ ページネーション)
- 検索: `/<lang>/search` (Pagefind UI)
- 概要: `/<lang>/about`
- 著者: `/<lang>/author`
- 404: `/<lang>/404`
- RSS: 言語ごとのフィード `/<lang>/rss.xml`、ルートフィード `/rss.xml`
- Robots: `/robots.txt`

## GitHub アクティビティカレンダー (プライベート貢献込み)

著者ページの執筆アクティビティカレンダーは、GitHub のコントリビューションデータを使用しています。`src/components/widgets/GitHubActivityCalendar.astro` ウィジェットは、トークンが提供された場合、GitHub GraphQL を介してパブリックおよびプライベートのコントリビューションを取得します。トークンがない場合は、パブリック API にフォールバックし、パブリックなコントリビューションのみをカウントします。

- 環境変数: `GITHUB_TOKEN`
- スコープ: サーバーサイドのみ (`astro:env/server` → `getSecret('GITHUB_TOKEN')` 経由で読み取り)
- フォールバック: `GITHUB_TOKEN` が設定されていない場合、パブリックコントリビューション API を使用

ローカル開発

- プロジェクトルートに `.env` または `.env.local` を作成
- 以下を追加:

```env
GITHUB_TOKEN=your_github_token
```

本番環境

- ホスティングプラットフォーム (Vercel / Netlify / Cloudflare / Dokploy / etc.) に環境変数を追加:
  - キー: `GITHUB_TOKEN`
  - 値: GitHub トークン (read-only で十分です)。プライベートコントリビューション数を含めるために表示される GitHub ユーザーと同じユーザーのものである必要があります。
- 反映させるために再デプロイ

使用方法

- 著者ページは、ソーシャルリンクから GitHub ユーザー名を自動的に抽出し、「最新の投稿」セクションの上にコントリビューションカレンダーを表示します。
- コンポーネントがサポートする期間:
  - `year="last"`: 直近の52週間 (GitHub プロフィールビューと同様)
  - `year={2024}`: 固定の暦年 (1月1日 – 12月31日)
- 注意: GitHub のプロフィールビューはローカルタイムでレンダリングされますが、GraphQL やビルドステップは多くの場合 UTC を使用するため、境界の日付がわずかに異なる場合があります。

## サイトマップ & RSS

- サイトマップ: i18n 有効化状態で `@astrojs/sitemap` によって生成されます。ロケールコードは BCP-47 タグにマッピングされます (`zh→zh-CN`, `en→en-US`, `fr→fr-FR`, `es→es-ES`, `ru→ru-RU`, `ja→ja-JP`, `ko→ko-KR`, `pt→pt-PT`, `de→de-DE`, `id→id-ID`)。ローカライズされたルートには代替の `hreflang` リンクが含まれます。
- RSS: 言語ごとに `/<lang>/rss.xml` (例: `/en/rss.xml`, `/zh/rss.xml`) にフィードが生成されます。`src/utils/rss.ts` のヘルパーを使用して `src/pages/[lang]/rss.xml.ts` で実装されています。

## デプロイ

- 静的出力は `dist/` に書き込まれ、任意の静的ホスト (Vercel/Netlify/Cloudflare Pages など) にデプロイできます。
- 正しい絶対リンク (OG, sitemap, RSS) を確保するために、`astro.config.mjs` の `site` を本番 URL に設定してください。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 設定のヒント

- リモート画像はデフォルトでは寸法を推論しません。`astro:assets` の処理のためには、明示的な `width`/`height` を渡すか、ローカル画像を使用してください。
- `trailingSlash: 'always'`。Partytown は `dataLayer.push` を転送します。デフォルトではサードパーティスクリプトは有効になっていません。
- 言語ごとの RSS: `src/pages/[lang]/rss.xml.ts` + `src/utils/rss.ts`。最終更新日時: `src/utils/remark-modified-time.mjs`。
- リモート画像の許可リストには `image.remotePatterns` 経由で `*.unsplash.com` が含まれています。

## FAQ

- なぜリモート画像のサイズが推論されないのですか？
  - ビルド時のネットワークフェッチ失敗によるビルドエラーを避けるためです。`width`/`height` を指定するか、ローカルアセットを使用してください。
- 新しい言語を安全に追加するにはどうすればよいですか？
  - 設定にコードを追加し、ロケール JSON を作成し、`npm run build` を実行してすべてのローカライズされたルートを検証してください。
- pnpm の代わりに npm を使用できますか？
  - はい。`pnpm` を `npm` に置き換えてください (例: `npm run dev`)。
- 検索インデックスはどこで構築されますか？
  - `npm run build` の実行中に `astro-pagefind` によって構築されます。

## 比較

| 機能 | Astrology i18n | Astro Blog Template | 一般的なテーマ |
| -------------------------- | ---------------------- | ------------------- | ------------- |
| 組み込み i18n ルート | あり (`/[lang]/...`) | なし | 場合による |
| 言語ごとの RSS | あり | なし | まれ |
| サイト内検索 | あり (`astro-pagefind`) | なし | 場合による |
| SEO & JSON-LD | あり (`astro-seo`) | 基本 | 場合による |
| Tailwind v4 | あり | オプション | 場合による |
| MD/MDX コンテンツコレクション | あり | 基本 | 場合による |

## 貢献

- コミット前にフォーマットしてください: `npx prettier -w .` (Astro + Tailwind プラグイン有効)。
- Conventional Commits を推奨: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`。
- PR: 簡潔な説明、関連 Issue、(UI変更がある場合は) Before/After のスクリーンショット、i18n への影響 (どのロケールに影響するか) を含めてください。

## ライセンス

このプロジェクトは [MIT License](LICENSE.txt) の下でライセンスされています。
