


# Cloudflare Pages Functionsによるアクセス制限の実装計画

Cloudflare PagesのFunctions機能（Middleware）を使用して、特定のパスへのアクセスをReact Nativeアプリからのリクエストのみに制限します。

## ユーザーレビューが必要な事項

- **環境変数の設定**: Cloudflare Pagesのダッシュボードで認証用トークン（`APP_SECRET_TOKEN`など）を設定する必要があります。
- **保護するパス**: どのパスを保護するか（例: `/app-only/*` なのか、特定のHTMLファイルなのか）を決める必要があります。ここでは例として `/protected` 以下の全ルートを対象とします。

## 提案される変更

### Functions

#### [NEW] [functions/_middleware.ts](file:///c:/Users/IKUO/Documents/GitHub/Astrology-i18n/functions/_middleware.ts)
- Cloudflare Pages Functionsのミドルウェアを作成します。
- リクエストURLが保護対象のパス（例: `/protected/`）で始まるか確認します。
- `x-app-token` ヘッダー（または `Authorization` ヘッダー）の値が、環境変数 `APP_SECRET_TOKEN` と一致するか検証します。
- 一致しない場合は 401 Unauthorized を返します。

### Astro Project
- 現状のAstroプロジェクト構成（SSG）を変更する必要はありません。`functions` ディレクトリはCloudflare Pagesが自動的に認識します。

## 検証計画

### 自動テスト (ローカル)
- `wrangler pages dev` コマンドを使用して、ローカルでCloudflare Pages環境をエミュレートし、動作確認を行います。
    - ⚠️ **注意**: ユーザーの環境に `wrangler` がインストールされているか不明なため、インストールされていない場合は `npx wrangler pages dev` を提案します。
- `curl` コマンドでヘッダー有りと無しのリクエストを送り、レスポンスコードを確認します。

### 手動検証
1. 変更をGitHubにプッシュし、Cloudflare Pagesにデプロイされるのを待ちます。
2. Cloudflare Pagesのダッシュボードで環境変数 `APP_SECRET_TOKEN` を設定し、再デプロイ（またはリトライ）します。
3. ブラウザで保護されたURLにアクセスし、アクセス拒否（または401）されることを確認します。
4. React Nativeアプリ（またはcurl/Postman）から正しいヘッダーを付与してアクセスし、表示されることを確認します。
