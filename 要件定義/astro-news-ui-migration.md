# Astro News UI移植 要件定義（絞り込み）

## 背景
- ベース: Astrology-i18n
- 参照UI: astro-news (astro-newsフォルダにクローン済み)
- CMS: Keystaticは使わない
- DaisyUI: 導入する

## 目的
- Astrology-i18nをベースに、astro-newsのUIトーンに全体を寄せる
- /[lang]/ のホーム画面「body > main」のUIを中心に、共通UIもastro-newsに近づける
- 既存のi18nルーティングは維持する
- ルートランディング (/) は現状維持

## 対象範囲 (実装対象)
- /[lang]/ のホームページ内の main コンテンツ
  - 見出し/ヘッドライン領域
  - 最新記事グリッド
  - 著者セクション (astro-newsの構成に合わせる)
- グローバルテーマ/フォント/色の調整 (DaisyUIテーマ含む)
  - src/styles/global.css
- カード系の見た目
  - src/components/cards/PostCardCover.astro
  - src/components/cards/PostCardDescription.astro
  - src/components/cards/PostCardHorizontal.astro
  - src/components/cards/PostCardText.astro
- タグ/バッジUI
  - src/components/cards/PostCardText.astro
  - src/pages/[lang]/tags/index.astro
  - src/components/ui/MainNav.astro
- ページ内の余白/コンテナ幅
  - src/layouts/LandingLayout.astro
  - src/layouts/MainLayout.astro
- ページネーションのボタンUI
  - src/components/features/Pagination.astro
- 記事本文タイポ
  - src/components/features/Prose.astro
- ヘッダー/フッター/モバイルナビのUI調整
  - src/components/ui/Header.astro
  - src/components/ui/Footer.astro
  - src/components/ui/MobileNav.astro
- DaisyUIを使用したスタイル実装

## 対象外
- ページ構造の大幅変更や新規ページの追加
- ルーティングやi18n設計の変更、CMS追加

## 制約
- UI文字列は src/utils/translations.ts + src/i18n/*.json を使用
- 既存のコンテンツコレクション (src/content) を利用
- Astroコンポーネントのみ (Reactは使わない)

## 成果物
- ホームページのmain UIと共通UIのAstroコンポーネント更新
- DaisyUIテーマ/ユーティリティを含むスタイル追加
- 追加した翻訳キーの反映

## 受け入れ条件
- /[lang]/ の main UIがastro-newsのホーム画面に近い構成と見た目になる
- グローバルなテーマ/フォント/色がastro-newsのトーンに寄る
- カード/タグ/バッジ/ページネーションの見た目がastro-newsに近い
- ヘッダー/フッター/モバイルナビがastro-newsの雰囲気に近づく
- i18nルーティングが従来通り動作する
