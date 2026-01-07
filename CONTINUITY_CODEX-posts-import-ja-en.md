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
- `category` は当面「夫婦関係」に固定、`description` は title を転用。`heroImage` は `public/images/articles/` の画像を `https://raw.githubusercontent.com/idimilabs/Astrology-i18n/main/public/images/articles/<file>` で指定、`heroImageAlt` は内容に即した簡易説明。

## State:
- `post` collectionの必須フィールド（title/description/category/tags/pubDate/heroImage/heroImageAlt/locales 等）を確認済み。
- `heroImage` を記事用画像(absolute URL)に置換済み。
- 非jaのpostsは `20180302-cac-2018.md` のみ残し、それ以外を削除済み。
- `npm run build` は成功。警告: [glob-loader] duplicate id (ja/* 全件) が報告。CSS @property 警告と GitHubActivityCalendar fallback は従前どおり。

## Done:
- Ledgerファイルの存在を確認し、今回の作業に流用する方針を確定。
- `post` collection スキーマ確認を実施。
- `src/content/posts` を `archive-posts/posts-20260105-02` にバックアップ。
- `記事/*.md` の (id, title) を `archive-posts/articles-ja-list-20260105.tsv` に保存。
- `記事/*.md` を frontmatter付きで `src/content/posts/ja` に取り込み（slug=章番号+IDまたはID、pubDate=2026-01-05、category=夫婦関係、tags=[]、heroImage=placeholder、locales=ja）。欠損画像リンクはプレースホルダに置換。
- `public/images/articles` に記事用画像を配置し、ja記事の `heroImage`/`heroImageAlt` を記事用画像に更新（absolute URL使用）。
- 非ja言語のpostsを `20180302-cac-2018.md` のみ残して削除。
- `npm run build` 実行済み（成功、duplicate id等の警告のみ）。

## Now:
- Duplicate id 警告の要否を確認し、必要なら解消方針を検討。

## Next:
- （必要なら）jaのduplicate id警告解消と、en版取り込みの設計。

## Open questions (UNCONFIRMED if needed):
- `記事/` の対象範囲: 直下のみで良いか、サブフォルダも取り込むか。
- category/tags の命名方針（日本語/英語、固定/記事ごと）。
- duplicate id 警告を許容するか、解消するか。

## Working set (files/ids/commands):
- [src/content.config.ts](src/content.config.ts)
- `src/content/posts/**`
- `記事/*.md`
- `archive-posts/`
- `npm run build`
