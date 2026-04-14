import React from 'react';
import { Platform, Pressable, StatusBar as RNStatusBar, StyleSheet, Text, View } from 'react-native';

import { showActionFeedback } from '../utils/feedback';

export type RouteName = '/' | '/plans' | '/calendar' | '/dashboard' | '/negotiation';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  currentRoute?: RouteName;
  onNavigate?: (route: RouteName) => void;
  onBack?: () => void;
  userLabel?: string;
  onLogout?: () => void;
};

const navItems: Array<{ label: string; path: RouteName }> = [
  { label: 'Discover', path: '/' },
  { label: 'Plans', path: '/plans' },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Offers', path: '/negotiation' },
  { label: 'Dashboard', path: '/dashboard' },
];

export function TopAppBar({ title = 'Togomo', showBack = false, onBack, userLabel, onLogout }: Pick<LayoutProps, 'title' | 'showBack' | 'onBack' | 'userLabel' | 'onLogout'>) {
  const topInset = Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 0) : 0;

  return (
    <View style={[styles.topBar, { paddingTop: topInset > 0 ? topInset + 8 : 8, minHeight: 72 + topInset }] }>
      <View style={styles.topBarLeft}>
        {showBack ? (
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>T</Text>
          </View>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          {userLabel ? <Text style={styles.userLabel}>{userLabel}</Text> : null}
        </View>
      </View>
      <View style={styles.topBarActions}>
        <Pressable onPress={() => showActionFeedback('Notifications', 'Notification center is ready to connect.')} style={styles.bellButton}>
          <Text style={styles.bellButtonText}>•</Text>
        </Pressable>
        {onLogout ? (
          <Pressable onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export function BottomNavBar({ currentRoute = '/', onNavigate }: Pick<LayoutProps, 'currentRoute' | 'onNavigate'>) {
  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const active = item.path === currentRoute;
        return (
          <Pressable
            key={item.path}
            onPress={() => onNavigate?.(item.path)}
            style={[styles.navItem, active && styles.navItemActive]}
          >
            <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Layout({ children, title, showBack, currentRoute, onNavigate, onBack, userLabel, onLogout }: LayoutProps) {
  return (
    <View style={styles.layout}>
      <TopAppBar title={title} showBack={showBack} onBack={onBack} userLabel={userLabel} onLogout={onLogout} />
      <View style={styles.content}>{children}</View>
      <BottomNavBar currentRoute={currentRoute} onNavigate={onNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e3e5',
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: '#003526',
    fontSize: 20,
    fontWeight: '800',
  },
  userLabel: {
    color: '#404944',
    fontSize: 11,
    marginTop: 1,
    fontWeight: '600',
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eceef0',
  },
  backButtonText: {
    color: '#003526',
    fontSize: 26,
    lineHeight: 26,
    fontWeight: '300',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003526',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eceef0',
  },
  bellButtonText: {
    color: '#003526',
    fontSize: 22,
    fontWeight: '800',
  },
  logoutButton: {
    borderRadius: 14,
    backgroundColor: '#003526',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#e0e3e5',
  },
  navItem: {
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: 'transparent',
  },
  navItemActive: {
    backgroundColor: '#003526',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#404944',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  navLabelActive: {
    color: '#ffffff',
  },
});