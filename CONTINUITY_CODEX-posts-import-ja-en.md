# CONTINUITY LEDGER

## Goal (incl. success criteria):
- 既存の `src/content/posts` をバックアップした上で、ルートの `記事/` 配下のMarkdownを Astro Content Collections の posts として導入する。
- 日本語(`locales: ja`)のpostsを生成し、ビルドが通る（必須frontmatter: title/description/category/tags/pubDate/heroImage/heroImageAlt/locales 等を満たす）。
- （次段）英語版(`locales: en`)も同一slug方針で導入できる土台を作る。

## Constraints/Assumptions:
- 回答は日本語。
- postsのスキーマは [src/content.config.ts](src/content.config.ts) の `post` collection に準拠。
- `heroImage` はURL必須のため、暫定で共通のダミーURLを使用する（後で差し替え可能）。
- `記事/` 内には不要なサブフォルダ（例: ゴミ箱）がある可能性があるため、原則「直下の .md」のみ対象にする（UNCONFIRMED）。

## Key decisions:
- slugは日本語ローマ字化を避け、ファイル名末尾の32桁ID（または先頭の章番号＋ID）を元にURL安全なslugを作る。
- pubDateは、日付情報が無い記事は実行日(2026-01-05)を採用（後で調整可能）。

## State:

## Done:
- `post` collectionの必須frontmatterを確認。

## Now:
- `src/content/posts` を `archive-posts/` に丸ごとバックアップ。
- `記事/` 直下の.mdを列挙し、(title,id)を抽出して一覧ファイルに保存。

## Next:
- 抽出結果から slug/pubDate を確定し、`src/content/posts/ja/` にfrontmatter付きで取り込み。
- `npm run build` で検証。

## Open questions (UNCONFIRMED if needed):
- `記事/` の対象範囲: 直下のみで良いか、サブフォルダも取り込むか。
- category/tags の命名方針（日本語/英語、固定/記事ごと）。

## Working set (files/ids/commands):
- [src/content.config.ts](src/content.config.ts)
- `src/content/posts/**`
- `記事/*.md`
- `archive-posts/`
- `npm run build`
