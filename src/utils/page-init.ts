/**
 * グローバルページ初期化マネージャー
 * 
 * Astro View Transitions のページ初期化ロジックを統一管理し、
 * ページ読み込み時およびナビゲーション時にコンポーネントが正しく初期化されることを保証します。
 * 
 * @example
 * ```typescript
 * import { registerPageInit } from '@/utils/page-init';
 * 
 * // 初期化関数を登録
 * registerPageInit('themeSwitcher', () => {
 *   const buttons = document.querySelectorAll('[data-theme]');
 *   // ... 初期化ロジック
 * });
 * ```
 */

type InitFunction = () => void | (() => void);
type CleanupFunction = () => void;

interface InitHandler {
    init: InitFunction;
    cleanup?: CleanupFunction;
}

class PageInitManager {
    private handlers: Map<string, InitHandler> = new Map();
    private cleanupFunctions: Map<string, CleanupFunction> = new Map();
    private initialized = false;

    constructor() {
        this.setup();
    }

    private setup(): void {
        if (typeof window === 'undefined') return;

        // 初回読み込み時の初期化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.runAllInits());
        } else {
            this.runAllInits();
        }

        // Astro ビュー遷移時の再初期化
        document.addEventListener('astro:page-load', () => {
            this.runAllInits();
        });

        // ページ切り替え前のクリーンアップ
        document.addEventListener('astro:before-preparation', () => {
            this.runAllCleanups();
        });
    }

    /**
     * ページ初期化関数を登録
     * 
     * @param name - 一意の識別子
     * @param init - 初期化関数、オプションでクリーンアップ関数を返す
     * @param options - 設定オプション
     */
    register(
        name: string,
        init: InitFunction,
        options?: {
            /** 直ちに実行するかどうか（ページが既に読み込まれている場合） */
            immediate?: boolean;
        }
    ): void {
        const cleanup = this.cleanupFunctions.get(name);
        if (cleanup) {
            cleanup();
            this.cleanupFunctions.delete(name);
        }

        this.handlers.set(name, { init });

        // ページが既に初期化されており、かつ即時実行が設定されている場合は、直ちに実行する
        if (this.initialized && options?.immediate) {
            this.runInit(name);
        }
    }

    /**
     * 初期化関数の登録解除
     * 
     * @param name - 削除するハンドラ名
     */
    unregister(name: string): void {
        const cleanup = this.cleanupFunctions.get(name);
        if (cleanup) {
            cleanup();
            this.cleanupFunctions.delete(name);
        }
        this.handlers.delete(name);
    }

    private runInit(name: string): void {
        const handler = this.handlers.get(name);
        if (!handler) return;

        try {
            // 以前のインスタンスがあれば先にクリーンアップする
            const existingCleanup = this.cleanupFunctions.get(name);
            if (existingCleanup) {
                existingCleanup();
                this.cleanupFunctions.delete(name);
            }

            // 初期化を実行
            const result = handler.init();

            // クリーンアップ関数が返された場合は保存する
            if (typeof result === 'function') {
                this.cleanupFunctions.set(name, result);
            }
        } catch (error) {
            console.error(`[PageInit] Error initializing "${name}":`, error);
        }
    }

    private runAllInits(): void {
        this.handlers.forEach((_, name) => {
            this.runInit(name);
        });
        this.initialized = true;
    }

    private runAllCleanups(): void {
        this.cleanupFunctions.forEach((cleanup, name) => {
            try {
                cleanup();
            } catch (error) {
                console.error(`[PageInit] Error cleaning up "${name}":`, error);
            }
        });
        this.cleanupFunctions.clear();
    }

    /**
     * 登録されているすべてのハンドラ名を取得
     */
    getRegisteredHandlers(): string[] {
        return Array.from(this.handlers.keys());
    }
}

// グローバルシングルトンを作成
const pageInitManager = new PageInitManager();

/**
 * ページ初期化関数の登録
 * 
 * この関数は以下のタイミングで実行されます：
 * 1. ページの初回読み込み完了時（DOMContentLoaded）
 * 2. Astro ビュー遷移後（astro:page-load）
 * 
 * @param name - 管理およびデバッグ用の一意の識別子
 * @param init - 初期化関数、オプションでクリーンアップ関数を返す
 * @param options - 設定オプション
 * 
 * @example
 * ```typescript
 * // 基本的な使用法
 * registerPageInit('myComponent', () => {
 *   const element = document.querySelector('#my-element');
 *   element?.addEventListener('click', handleClick);
 * });
 * 
 * // クリーンアップ関数付き
 * registerPageInit('myComponent', () => {
 *   const element = document.querySelector('#my-element');
 *   const handler = () => console.log('clicked');
 *   element?.addEventListener('click', handler);
 *   
 *   // クリーンアップ関数を返す
 *   return () => {
 *     element?.removeEventListener('click', handler);
 *   };
 * });
 * ```
 */
export function registerPageInit(
    name: string,
    init: InitFunction,
    options?: { immediate?: boolean }
): void {
    pageInitManager.register(name, init, options);
}

/**
 * ページ初期化関数の登録解除
 * 
 * @param name - 削除するハンドラ名
 */
export function unregisterPageInit(name: string): void {
    pageInitManager.unregister(name);
}

/**
 * 登録されているすべての初期化ハンドラ名を取得
 */
export function getRegisteredInits(): string[] {
    return pageInitManager.getRegisteredHandlers();
}

// 外部で使用するために型をエクスポート
export type { InitFunction, CleanupFunction };
