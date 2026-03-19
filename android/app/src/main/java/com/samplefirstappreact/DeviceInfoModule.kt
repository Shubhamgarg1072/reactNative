package com.samplefirstappreact

import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableNativeMap

/**
 * Native module that exposes device hardware info, OS details, and build config
 * to the React Native JavaScript layer.
 *
 * Accessed in JS via: NativeModules.DeviceInfo.getDeviceInfo()
 */
class DeviceInfoModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = NAME

    /**
     * Returns a map containing device metadata, app version, build config, and battery level.
     * Resolves the promise on success; rejects on any unexpected error.
     */
    @ReactMethod
    fun getDeviceInfo(promise: Promise) {
        try {
            val map = WritableNativeMap().apply {
                putString("model", Build.MODEL)
                putString("brand", Build.BRAND)
                putString("manufacturer", Build.MANUFACTURER)
                putString("osVersion", Build.VERSION.RELEASE)
                putInt("sdkVersion", Build.VERSION.SDK_INT)
                putString("appVersion", BuildConfig.VERSION_NAME)
                putInt("buildCode", BuildConfig.VERSION_CODE)
                putString("buildType", BuildConfig.BUILD_TYPE)
                putString("environment", BuildConfig.APP_ENVIRONMENT)
                putString("apiBaseUrl", BuildConfig.API_BASE_URL)
                putString("appId", BuildConfig.APPLICATION_ID)
                putDouble("batteryLevel", getBatteryLevel())
            }
            promise.resolve(map)
        } catch (e: Exception) {
            promise.reject(ERROR_CODE, e.message ?: "Failed to retrieve device info", e)
        }
    }

    /**
     * Reads battery level from the system broadcast. Returns a value from 0–100,
     * or -1 if the information is unavailable.
     */
    private fun getBatteryLevel(): Double {
        val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        val intent: Intent? = reactContext.registerReceiver(null, filter)
        val level = intent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: return -1.0
        val scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
        if (level < 0 || scale <= 0) return -1.0
        return (level.toDouble() / scale.toDouble()) * 100.0
    }

    companion object {
        const val NAME = "DeviceInfo"
        private const val ERROR_CODE = "DEVICE_INFO_ERROR"
    }
}
