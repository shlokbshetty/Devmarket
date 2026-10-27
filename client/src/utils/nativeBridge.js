import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { App } from '@capacitor/app';

/**
 * Native bridge utilities for Capacitor & Web
 * Provides unified access to Haptics, Status Bar, and Native App lifecycle.
 */

export const isNative = Capacitor.isNativePlatform();
export const platform = Capacitor.getPlatform();

/**
 * Configure Status Bar to match dark / light mode
 */
export async function updateStatusBar(isDark) {
  if (!isNative) return;
  try {
    await StatusBar.setStyle({
      style: isDark ? Style.Dark : Style.Light,
    });
    // On Android, set background color
    if (platform === 'android') {
      await StatusBar.setBackgroundColor({
        color: isDark ? '#0e0e0e' : '#ffffff',
      });
      await StatusBar.setOverlaysWebView({ overlay: false });
    }
  } catch (err) {
    console.debug('StatusBar configuration not supported:', err);
  }
}

/**
 * Light tactile feedback (for navigation tabs, button taps)
 */
export async function hapticLight() {
  try {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Light });
    } else if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }
  } catch (err) {
    // Ignore in unsupported environments
  }
}

/**
 * Medium tactile feedback (for primary actions like submit, install)
 */
export async function hapticMedium() {
  try {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } else if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(35);
    }
  } catch (err) {
    // Ignore in unsupported environments
  }
}

/**
 * Success tactile feedback (for completed downloads, logins)
 */
export async function hapticSuccess() {
  try {
    if (isNative) {
      await Haptics.notification({ type: NotificationType.Success });
    } else if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([20, 50, 20]);
    }
  } catch (err) {
    // Ignore in unsupported environments
  }
}

/**
 * Register Android hardware back button handler
 * @param {Function} onBack - callback return true if handled, false to delegate
 */
export function setupBackButtonListener(navigate, isSidebarOpen, closeSidebar) {
  if (!isNative) return () => {};

  const listenerPromise = App.addListener('backButton', ({ canGoBack }) => {
    if (isSidebarOpen) {
      closeSidebar();
      return;
    }

    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '') {
      App.exitApp();
    } else {
      navigate(-1);
    }
  });

  return () => {
    listenerPromise.then(handler => handler.remove?.());
  };
}
