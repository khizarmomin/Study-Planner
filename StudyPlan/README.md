# StudyPlan Android App

## Build in 3 steps

1. **Open in Android Studio**  
   File → Open → select this folder

2. **(Optional) Add DM Sans fonts offline**  
   Download DM Sans from fonts.google.com and place the two .woff2 files  
   in `app/src/main/assets/fonts/` (see the README there)

3. **Build APK**  
   - Debug (sideload):   Build → Build APK(s) → `app/build/outputs/apk/debug/`
   - Release (signed):   Build → Generate Signed Bundle/APK

## Features
- ✅ 120 Hz support (all Android refresh rates)
- ✅ Edge-to-edge with safe area insets (notch/punch-hole safe)
- ✅ Button navigation AND gesture navigation (swipe-back)
- ✅ Dark/light mode with Android status bar sync
- ✅ Fully offline (localStorage, no server needed)
- ✅ Compatible Android 5.0+ (minSdk 21, ~99% of devices)
- ✅ Hardware-accelerated WebView with smooth fling scroll
- ✅ Touch optimised (no tap highlight, native long-press UX)

## Requirements
- Android Studio Ladybug (2024.2) or newer
- Android SDK 35 (auto-installed by Studio)
