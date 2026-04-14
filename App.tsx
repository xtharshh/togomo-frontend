import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { AuthProvider, roleLabel, useAuth } from './src/auth/AuthContext';
import { AuthScreen } from './src/screens/AuthScreen';
import { Calendar } from './src/screens/Calendar';
import { Dashboard } from './src/screens/Dashboard';
import { Discover } from './src/screens/Discover';
import { Negotiation } from './src/screens/Negotiation';
import { Plans } from './src/screens/Plans';
import type { RouteName } from './src/components/Navigation';

function SignedInApp() {
  const { me, signOut } = useAuth();
  const [route, setRoute] = useState<RouteName>('/');
  const goBack = () => setRoute('/');

  const userLabel = me ? `${me.user.username} (${roleLabel(me.role)})` : 'Signed in';

  let screen: React.ReactElement;
  switch (route) {
    case '/plans':
      screen = <Plans currentRoute={route} onNavigate={setRoute} onBack={goBack} userLabel={userLabel} onLogout={signOut} />;
      break;
    case '/calendar':
      screen = <Calendar currentRoute={route} onNavigate={setRoute} onBack={goBack} userLabel={userLabel} onLogout={signOut} />;
      break;
    case '/dashboard':
      screen = <Dashboard currentRoute={route} onNavigate={setRoute} onBack={goBack} userLabel={userLabel} onLogout={signOut} />;
      break;
    case '/negotiation':
      screen = <Negotiation currentRoute={route} onNavigate={setRoute} onBack={goBack} userLabel={userLabel} onLogout={signOut} />;
      break;
    case '/':
    default:
      screen = <Discover currentRoute={route} onNavigate={setRoute} userLabel={userLabel} onLogout={signOut} />;
      break;
  }

  return <View style={styles.screenWrap}>{screen}</View>;
}

function AppContent() {
  const { status, error, signIn, signUp } = useAuth();

  if (status === 'loading') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingWrap}>
          <ActivityIndicator color="#003526" />
          <Text style={styles.loadingText}>Restoring session</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'signed-out') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#f7f9fb" />
        <AuthScreen loading={false} error={error} onLogin={signIn} onRegister={signUp} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f9fb" />
      <SignedInApp />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  screenWrap: {
    flex: 1,
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loadingText: {
    color: '#404944',
    fontSize: 14,
    fontWeight: '700',
  },
});
