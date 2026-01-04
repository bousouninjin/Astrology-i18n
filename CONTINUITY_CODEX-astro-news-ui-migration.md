Goal (incl. success criteria):
- astro-news風UIをAstrology-i18nに反映。/[lang]/のホーム/記事/共通UIがastro-newsに近い見た目になること。i18n維持、/は変更なし。

Constraints/Assumptions:
- DaisyUI + Tailwind v4、Astroコンポーネントのみ、ルーティング/i18n変更なし、既存コンテンツ維持。
- 日本語で回答。

Key decisions:
- Header/Nav/Footersはastro-newsに寄せて中央寄せ/ドロップダウン/縦並び調整。
- PostLayoutをastro-news風ヘッダー+シェアUIに刷新、Shareは新規コンポーネントで実装。
- HomeはshowHeader無効化しmain余白を制御。

State:
- Done: header z-index/ドロップダウン改善、footer縦並び、PostLayoutヘッダー/シェア追加、MainLayout/LandingLayout拡張、Latest News/View all文言更新、サブヘッドライン(2〜5件)画像サイズ調整、Dividerコンポーネントでカテゴリ/日付の区切り線をastro-news寄せ、Latest Newsカードに本文抜粋表示＋gridレスポンシブ調整。
- Now: 最新Homeの見た目（Latest News/サブヘッドライン/カード区切り線）をastro-newsと比較確認。
- Next: 必要なら他ページのカード表示へ拡張。

Open questions (UNCONFIRMED if needed):
- UNCONFIRMED: Latest News以外のカード/一覧にも本文表示を広げるか。
- UNCONFIRMED: npm install未実行（node未検出）のままpackage-lock更新が必要か。

Working set (files/ids/commands):
- src/pages/[lang]/index.astro
- src/pages/[lang]/[page].astro
- src/components/cards/PostCardCover.astro
- src/components/cards/PostCardDescription.astro
- src/components/ui/SkeletonCardDescription.astro
- src/components/ui/Divider.astro
- src/i18n/*.json
- src/layouts/MainLayout.astro
- src/layouts/LandingLayout.astro
- src/layouts/PostLayout.astro
- src/components/features/Share.astro
