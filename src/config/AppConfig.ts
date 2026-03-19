import { getDeviceInfo } from '../native/DeviceInfo';

export type Environment = 'development' | 'staging' | 'production';

export interface AppConfig {
    environment: Environment;
    apiBaseUrl: string;
    appVersion: string;
    buildCode: number;
    isDev: boolean;
    isProduction: boolean;
}

let _config: AppConfig | null = null;

/**
 * Call once at app startup (e.g. inside App.tsx useEffect or index.js).
 * Reads build-time constants injected by Gradle productFlavors into BuildConfig,
 * which the DeviceInfo native module then forwards to JS.
 */
export const initAppConfig = async (): Promise<AppConfig> => {
    const info = await getDeviceInfo();
    const env = (info.environment as Environment) ?? 'development';

    _config = {
        environment: env,
        apiBaseUrl: info.apiBaseUrl,
        appVersion: info.appVersion,
        buildCode: info.buildCode,
        isDev: env === 'development',
        isProduction: env === 'production',
    };

    return _config;
};

/**
 * Synchronous accessor after initAppConfig() has resolved.
 * Returns a development stub if called before initialisation.
 */
export const getAppConfig = (): AppConfig => {
    if (_config) return _config;

    // Safe fallback — only hits in dev before init resolves.
    return {
        environment: 'development',
        apiBaseUrl: 'https://dev-api.example.com',
        appVersion: '1.0.0',
        buildCode: 1,
        isDev: __DEV__,
        isProduction: false,
    };
};
