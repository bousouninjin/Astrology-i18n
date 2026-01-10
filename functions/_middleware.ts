interface Env {
    APP_SECRET_TOKEN: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const { request, env, next } = context;
    const url = new URL(request.url);

    // 保護対象のパス（例: /protected/ で始まるパス）
    // 必要に応じて変更してください
    const PROTECTED_PATH = '/protected/';

    // 全ページに対してGoogle等のインデックスを拒否するヘッダーを追加
    // これにより、検索結果に表示されなくなります
    const response = await next();
    response.headers.set('X-Robots-Tag', 'noindex');

    if (url.pathname.startsWith(PROTECTED_PATH)) {
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
    }

    return response;
};
