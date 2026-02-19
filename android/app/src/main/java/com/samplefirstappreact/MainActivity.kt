package com.samplefirstappreact

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "sampleFirstAppReact"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        try {
            // asking for 'reactInstanceManager' throws if the app isn't ready yet.
            // We catch that error to prevent the crash.
            if (reactInstanceManager.currentReactContext == null) {
                return
            }
            super.onWindowFocusChanged(hasFocus)
        } catch (e: Exception) {
            // If we get here, it means the React Native Host wasn't ready.
            // It's safe to ignore this event during startup.
        }
    }


}
