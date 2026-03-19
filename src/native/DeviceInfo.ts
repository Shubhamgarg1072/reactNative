import { NativeModules, Platform } from 'react-native';

export interface DeviceInfoResult {
    model: string;
    brand: string;
    manufacturer: string;
    osVersion: string;
    sdkVersion: number;
    appVersion: string;
    buildCode: number;
    /** 'debug' | 'release' */
    buildType: string;
    /** 'development' | 'staging' | 'production' */
    environment: string;
    apiBaseUrl: string;
    appId: string;
    /** Battery percentage 0–100, or -1 if unavailable */
    batteryLevel: number;
}

const { DeviceInfo: NativeDeviceInfo } = NativeModules;

if (__DEV__ && Platform.OS === 'android' && !NativeDeviceInfo) {
    console.warn(
        '[DeviceInfo] Native module not found. ' +
        'Did you forget to run `npx react-native run-android`?',
    );
}

/**
 * Fetches device hardware and build configuration from the Android native layer.
 * On non-Android platforms returns safe stub values so shared code compiles.
 */
export const getDeviceInfo = (): Promise<DeviceInfoResult> => {
    if (Platform.OS !== 'android' || !NativeDeviceInfo) {
        return Promise.resolve({
            model: 'Unknown',
            brand: 'Unknown',
            manufacturer: 'Unknown',
            osVersion: 'Unknown',
            sdkVersion: 0,
            appVersion: '1.0.0',
            buildCode: 1,
            buildType: 'debug',
            environment: 'development',
            apiBaseUrl: 'https://dev-api.example.com',
            appId: 'com.samplefirstappreact',
            batteryLevel: -1,
        });
    }
    return NativeDeviceInfo.getDeviceInfo();
};
