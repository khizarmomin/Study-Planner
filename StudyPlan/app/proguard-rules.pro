# StudyPlan ProGuard rules
# WebView JS interface (if added later)
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep MainActivity
-keep class com.studyplan.app.** { *; }
