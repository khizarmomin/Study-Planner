# gradle-wrapper.jar is missing

Android Studio will automatically recreate this file when you open the project.

**Steps:**
1. Open the project in Android Studio
2. If prompted "Gradle wrapper is missing", click **OK** or **Download Gradle**
3. Android Studio handles the rest automatically

Alternatively, run this once inside the project folder:
```
gradle wrapper --gradle-version 8.4
```
(Requires Gradle to be installed: https://gradle.org/install/)
