# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# ----- Capacitor / Ionic WebView -----
# Keep all Capacitor bridge classes so the JS<->Native bridge works
-keep class com.getcapacitor.** { *; }
-keep class com.capacitorjs.** { *; }
-keepclassmembers class * {
    @com.getcapacitor.annotation.CapacitorPlugin *;
}

# Keep WebView JavaScript interface methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# ----- Preserve stack traces (readable crashes in Play Console) -----
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# ----- AndroidX / AppCompat -----
-keep class androidx.** { *; }
-dontwarn androidx.**
