package ph.thundr.app
import expo.modules.ReactActivityDelegateWrapper

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle
import com.zoontek.rnbootsplash.RNBootSplash
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.ContentResolver
import android.media.AudioAttributes
import android.net.Uri
import android.os.Build

import androidx.core.app.NotificationCompat

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Thundr"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))

  override fun onCreate(savedInstanceState: Bundle?) {
     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
         val notificationChannel = NotificationChannel(
             "default_channel",
             "Thundr",
             NotificationManager.IMPORTANCE_HIGH
         ).apply {
             setShowBadge(true)
             description = ""
             val audioAttributes = AudioAttributes.Builder()
                 .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                 .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                 .build()
             setSound(
                 Uri.parse("${ContentResolver.SCHEME_ANDROID_RESOURCE}://${packageName}/raw/thundr"),
                 audioAttributes
             )
             enableVibration(true)
             vibrationPattern = longArrayOf(400, 400)
             lockscreenVisibility = NotificationCompat.VISIBILITY_PUBLIC
         }

         val notificationManager = getSystemService(NotificationManager::class.java)
         notificationManager.createNotificationChannel(notificationChannel)
     }

    RNBootSplash.init(this, R.style.BootTheme)
    super.onCreate(savedInstanceState)
  }
}
