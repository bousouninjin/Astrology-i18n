/**
 * 画像パスを解決するユーティリティ
 * `/images/` で始まるパスを `src/assets/images/` からの動的インポートに変換
 */

// src/assets/images 配下の全画像を事前にインポート
const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/images/**/*.{jpg,jpeg,png,gif,webp,avif,svg}',
    { eager: true }
);

/**
 * 画像パスを解決する
 * @param src - 画像パス（例: "/images/articles/example.jpg"）
 * @returns ImageMetadata または undefined
 */
export function resolveImage(src: string): ImageMetadata | undefined {
    if (typeof src !== 'string' || !src.startsWith('/images/')) {
        return undefined;
    }

    // /images/xxx を /src/assets/images/xxx に変換
    const assetPath = src.replace('/images/', '/src/assets/images/');

    const imageModule = images[assetPath];
    if (imageModule) {
        return imageModule.default;
    }

    // 見つからない場合はログを出力
    console.warn(`[image-loader] Image not found: ${assetPath}`);
    return undefined;
}

/**
 * 画像パスがローカルアセットかどうかを判定
 */
export function isLocalAssetPath(src: string): boolean {
    return typeof src === 'string' && src.startsWith('/images/');
}
