interface Env {
    APP_SECRET_TOKEN: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const { request, env, next } = context;
    const url = new URL(request.url);

    // 保護対象のパス（例: /protected/ で始まるパス）
    // 必要に応じて変更してください
    const PROTECTED_PATH = '/protected/';

    if (url.pathname.startsWith(PROTECTED_PATH)) {
        // レスポンスを取得
        const response = await next();

        // Google等のインデックスを拒否するヘッダーを追加
        // これにより、検索結果に表示されなくなります
        response.headers.set('X-Robots-Tag', 'noindex');

        // トークン検証
        const authHeader = request.headers.get('Authorization');
        const appTokenHeader = request.headers.get('x-app-token');

        // Authorization: Bearer <token> または x-app-token: <token> をチェック
        let token = appTokenHeader;
        if (!token && authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }

        if (token !== env.APP_SECRET_TOKEN) {
            return new Response('Unauthorized', { status: 401 });
        }

        return response;
    }

    // 保護対象外のパスはそのまま通過＆インデックス拒否ヘッダーは付けない（必要なら付けることも可能）
    return next();
};
