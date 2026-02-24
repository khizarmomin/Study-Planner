package com.studyplan.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.Display;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private WindowInsetsControllerCompat insetsController;
    private boolean isDarkMode = false;

    // ── Background colours matching the CSS theme ─────────────────────────────
    private static final int BG_LIGHT = 0xFFF7F7F5;
    private static final int BG_DARK  = 0xFF0F0F11;

    @SuppressLint({"SetJavaScriptEnabled", "RequiresFeature"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // ── Read saved theme preference ───────────────────────────────────────
        SharedPreferences prefs = getSharedPreferences("studyplan", Context.MODE_PRIVATE);
        isDarkMode = prefs.getBoolean("dark_mode", false);

        // ── Edge-to-edge: draw behind system bars ─────────────────────────────
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        // ── 120 Hz / high refresh rate ────────────────────────────────────────
        requestHighRefreshRate();

        // ── System bar colours (transparent, icon tint matches theme) ─────────
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            getWindow().setNavigationBarContrastEnforced(false);
        }

        // ── Root container ────────────────────────────────────────────────────
        FrameLayout container = new FrameLayout(this);
        container.setLayoutParams(new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT));
        container.setBackgroundColor(isDarkMode ? BG_DARK : BG_LIGHT);
        setContentView(container);

        // ── WebView setup ─────────────────────────────────────────────────────
        webView = new WebView(this);
        webView.setLayoutParams(new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT));
        webView.setBackgroundColor(isDarkMode ? BG_DARK : BG_LIGHT);
        container.addView(webView);

        configureWebSettings(webView.getSettings());

        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);

        // ── Insets controller for status/nav bar icon tint ────────────────────
        insetsController = WindowCompat.getInsetsController(getWindow(), webView);
        applyThemeSystemBars(isDarkMode);

        // ── Expose a Java bridge so JS can notify us of theme changes ─────────
        webView.addJavascriptInterface(new ThemeBridge(), "AndroidBridge");

        // ── WebChromeClient: allows console.log in Logcat ─────────────────────
        webView.setWebChromeClient(new WebChromeClient());

        // ── WebViewClient ─────────────────────────────────────────────────────
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                // Keep all navigation in-app (assets + allowed CDN via network security)
                return false;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                // Restore theme after page load
                String theme = isDarkMode ? "dark" : "light";
                view.evaluateJavascript(
                    "(function(){ " +
                    "  var t = localStorage.getItem('studyplan_theme') || '" + theme + "';" +
                    "  document.documentElement.setAttribute('data-theme', t);" +
                    "  if (t === 'dark') document.getElementById('theme-meta') && " +
                    "    document.getElementById('theme-meta').setAttribute('content','#0f0f11');" +
                    "})()", null);
            }
        });

        // ── Swipe / button back handling ──────────────────────────────────────
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView != null && webView.canGoBack()) {
                    webView.goBack();
                } else {
                    setEnabled(false);
                    getOnBackPressedDispatcher().onBackPressed();
                }
            }
        });

        // ── Load app ──────────────────────────────────────────────────────────
        webView.loadUrl("file:///android_asset/index.html");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 120 Hz: request the highest available refresh rate
    // ─────────────────────────────────────────────────────────────────────────
    private void requestHighRefreshRate() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            // Android 11+: use preferred refresh rate range
            Window window = getWindow();
            WindowManager.LayoutParams lp = window.getAttributes();
            lp.preferredRefreshRate = 120f;           // request 120 Hz
            lp.preferredDisplayModeId = 0;             // system picks best mode
            window.setAttributes(lp);

            // Also set min/max display refresh for proper scheduling
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                window.setFrameRateBoostOnTouchEnabled(true);
            }
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            // Android 6–10: iterate display modes and pick highest refresh rate
            Display display = getWindowManager().getDefaultDisplay();
            Display.Mode[] modes = display.getSupportedModes();
            Display.Mode bestMode = display.getMode();
            float bestRate = bestMode.getRefreshRate();

            for (Display.Mode mode : modes) {
                float rate = mode.getRefreshRate();
                if (mode.getPhysicalWidth()  == bestMode.getPhysicalWidth() &&
                    mode.getPhysicalHeight() == bestMode.getPhysicalHeight() &&
                    rate > bestRate) {
                    bestMode = mode;
                    bestRate = rate;
                }
            }

            WindowManager.LayoutParams lp = getWindow().getAttributes();
            lp.preferredDisplayModeId = bestMode.getModeId();
            getWindow().setAttributes(lp);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Apply light/dark tint to status bar + nav bar icons
    // ─────────────────────────────────────────────────────────────────────────
    private void applyThemeSystemBars(boolean dark) {
        if (insetsController == null) return;
        // Light icons on dark bg, dark icons on light bg
        insetsController.setAppearanceLightStatusBars(!dark);
        insetsController.setAppearanceLightNavigationBars(!dark);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // JavaScript bridge — JS calls AndroidBridge.onThemeChanged('dark'/'light')
    // ─────────────────────────────────────────────────────────────────────────
    private class ThemeBridge {
        @JavascriptInterface
        public void onThemeChanged(final String theme) {
            boolean dark = "dark".equals(theme);
            isDarkMode = dark;

            // Persist preference
            getSharedPreferences("studyplan", Context.MODE_PRIVATE)
                .edit().putBoolean("dark_mode", dark).apply();

            // UI updates must run on main thread
            runOnUiThread(() -> {
                int bg = dark ? BG_DARK : BG_LIGHT;
                webView.setBackgroundColor(bg);
                getWindow().getDecorView().setBackgroundColor(bg);
                applyThemeSystemBars(dark);

                // Update theme-color meta for status bar tint
                String metaColor = dark ? "#0f0f11" : "#f7f7f5";
                webView.evaluateJavascript(
                    "document.getElementById('theme-meta') && " +
                    "document.getElementById('theme-meta').setAttribute('content','" + metaColor + "')",
                    null);
            });
        }

        @JavascriptInterface
        public String getStoredTheme() {
            SharedPreferences prefs = getSharedPreferences("studyplan", Context.MODE_PRIVATE);
            return prefs.getBoolean("dark_mode", false) ? "dark" : "light";
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // WebSettings — optimised for performance & offline use
    // ─────────────────────────────────────────────────────────────────────────
    @SuppressLint("SetJavaScriptEnabled")
    private void configureWebSettings(WebSettings s) {
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);        // localStorage for app data
        s.setDatabaseEnabled(true);
        s.setAllowFileAccessFromFileURLs(true);
        s.setAllowUniversalAccessFromFileURLs(true);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setTextZoom(100);                  // prevent system font-size scaling
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        s.setSupportZoom(false);
        // Offline-first: serve assets, allow network only for font CDN fallback
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        // Smooth scrolling in WebView (hardware-accelerated fling)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            s.setForceDark(WebSettings.FORCE_DARK_OFF); // We handle dark mode ourselves
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Lifecycle
    // ─────────────────────────────────────────────────────────────────────────
    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) webView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (webView != null) webView.onPause();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.clearHistory();
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}
