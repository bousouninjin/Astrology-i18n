# 実装計画: 未翻訳コンテンツのローカライズとブランディング更新

## 概要
サイト全体の多言語対応を強化するため、欠落していたページ、著者プロフィール、記事コンテンツを作成し、各言語のi18n設定（翻訳ファイル）を更新します。また、サイト名を「Relately News」に統一します。

## 提案される変更点

### 1. 固定ページ (`src/content/pages`)
- **アクション**: 欠落している言語（de, es, fr, id, ko, pt, ru）の `about.md` を作成。
- **内容**: 英語版または日本語版をベースに翻訳。

### 2. 著者プロフィール (`src/content/authors`)
- **アクション**: 全言語で `default.md` と `ito-san.md` を整備。
- **詳細**: `default.md` は名前を "Matsushita" にし bio を空にする（英語・中国語含む）。`ito-san.md` は新規作成。

### 3. 記事コンテンツ (`src/content/posts`)
- **アクション**: 記事が存在しない言語（de, es, fr, id, ko, pt, ru, zh, en）に対して、サンプル記事 `3-unhappy-marriage-health-risks.md` を翻訳して配置。
- **目的**: 記事一覧ページが空にならないようにする。

### 4. i18n設定 (`src/i18n/*.json`)
- **アクション**: `de.json`, `es.json`, `fr.json`, `id.json`, `ko.json`, `pt.json`, `ru.json`, `zh.json`, `en.json` を更新。
- **詳細**:
    - `categories` と `tags` の翻訳を追加・補完。
    - `site.name` を "Relately News" に更新。
    - `site.description` を新しいブランドメッセージ "Expand your love maps..." の翻訳版に更新。
    - `headings` 内のテキストを翻訳・更新。

## 検証計画
### 自動テスト
- 現状、自動テストはありませんが、ビルド (`npm run build`) が通ることを確認します。

### 手動テスト
- ローカルサーバー (`npm run dev`) を起動。
- 各言語のエンドポイント（例: `/de/`, `/fr/`）にアクセス。
- ホームページ、Aboutページ、記事一覧ページが表示されるか確認。
- 記事のタグやカテゴリが正しく翻訳されて表示されているか確認。
- サイト名が「Relately News」になっているか確認。
