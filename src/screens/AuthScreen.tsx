import React, { useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StatusBar as RNStatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

import { getTogomoApiBaseUrl, type TogomoRegisterInput, type TogomoRole } from '../api/togomo';

type Props = {
  loading: boolean;
  error: string | null;
  onLogin: (username: string, password: string) => Promise<void>;
  onRegister: (input: TogomoRegisterInput) => Promise<void>;
};

const demoAccounts = [
  { label: 'Customer', username: 'customer', password: 'customer123' },
  { label: 'Restaurant', username: 'owner', password: 'owner123' },
  { label: 'Admin', username: 'adminops', password: 'admin123' },
];

export function AuthScreen({ loading, error, onLogin, onRegister }: Props) {
  const topInset = Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 0) : 0;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('customer');
  const [password, setPassword] = useState('customer123');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<TogomoRole>('customer');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      setLocalError('Username and password are required.');
      return;
    }
    setSubmitting(true);
    setLocalError(null);
    try {
      if (mode === 'login') {
        await onLogin(username.trim(), password);
      } else {
        if (!email.trim()) {
          setLocalError('Email is required for registration.');
          setSubmitting(false);
          return;
        }
        if (!phoneNumber.trim()) {
          setLocalError('Mobile number is required for registration.');
          setSubmitting(false);
          return;
        }
        await onRegister({
          username: username.trim(),
          password,
          email: email.trim(),
          phone_number: phoneNumber.trim(),
          role,
        });
      }
    } catch (submitError) {
      setLocalError(submitError instanceof Error ? submitError.message : mode === 'login' ? 'Login failed.' : 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const busy = loading || submitting;
  const displayedError = localError || error;

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: topInset + 12 }]} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>TOGOMO ACCESS</Text>
        <Text style={styles.title}>{mode === 'login' ? 'Login to your account' : 'Create your account'}</Text>
        <Text style={styles.subtitle}>Use Customer, Restaurant, or Admin credentials. You can also register with your own email and mobile number.</Text>
      </View>

      <View style={styles.modeRow}>
        <Pressable onPress={() => setMode('login')} style={[styles.modePill, mode === 'login' && styles.modePillActive]}>
          <Text style={[styles.modePillText, mode === 'login' && styles.modePillTextActive]}>Login</Text>
        </Pressable>
        <Pressable onPress={() => setMode('register')} style={[styles.modePill, mode === 'register' && styles.modePillActive]}>
          <Text style={[styles.modePillText, mode === 'register' && styles.modePillTextActive]}>Register</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{mode === 'login' ? 'Sign in' : 'Sign up'}</Text>
        <TextInput value={username} onChangeText={setUsername} autoCapitalize="none" placeholder="Username" placeholderTextColor="#707974" style={styles.input} />
        <TextInput value={password} onChangeText={setPassword} autoCapitalize="none" secureTextEntry placeholder="Password" placeholderTextColor="#707974" style={styles.input} />

        {mode === 'register' ? (
          <>
            <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="Email address" placeholderTextColor="#707974" style={styles.input} />
            <TextInput value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" placeholder="Mobile number" placeholderTextColor="#707974" style={styles.input} />
            <View style={styles.roleRow}>
              {([
                { key: 'customer', label: 'Customer' },
                { key: 'restaurant_owner', label: 'Restaurant' },
                { key: 'admin', label: 'Admin' },
              ] as Array<{ key: TogomoRole; label: string }>).map((option) => (
                <Pressable key={option.key} onPress={() => setRole(option.key)} style={[styles.rolePill, role === option.key && styles.rolePillActive]}>
                  <Text style={[styles.rolePillText, role === option.key && styles.rolePillTextActive]}>{option.label}</Text>
                </Pressable>
              ))}
            </View>
          </>
        ) : null}

        {displayedError ? <Text style={styles.errorText}>{displayedError}</Text> : null}

        <Pressable onPress={() => void handleSubmit()} disabled={busy} style={[styles.primaryButton, busy && styles.primaryButtonDisabled]}>
          {busy ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryButtonText}>{mode === 'login' ? 'Login' : 'Register'}</Text>}
        </Pressable>


      </View>

      {mode === 'login' ? (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick role logins</Text>
        <View style={styles.demoGrid}>
          {demoAccounts.map((account) => (
            <Pressable
              key={account.username}
              onPress={() => {
                setUsername(account.username);
                setPassword(account.password);
              }}
              style={styles.demoButton}
            >
              <Text style={styles.demoButtonTitle}>{account.label}</Text>
              <Text style={styles.demoButtonMeta}>{account.username}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    gap: 12,
    paddingBottom: 36,
  },
  hero: {
    borderRadius: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    gap: 8,
  },
  kicker: {
    color: '#003526',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: {
    color: '#191c1e',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '900',
  },
  subtitle: {
    color: '#404944',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 10,
  },
  cardTitle: {
    color: '#191c1e',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900',
  },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  modePill: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#e0e3e5',
  },
  modePillActive: {
    backgroundColor: '#003526',
  },
  modePillText: {
    color: '#404944',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  modePillTextActive: {
    color: '#ffffff',
  },
  input: {
    borderRadius: 16,
    backgroundColor: '#f2f4f6',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#191c1e',
    fontSize: 14,
  },
  errorText: {
    color: '#8f1d1d',
    fontSize: 13,
    fontWeight: '700',
  },
  helpText: {
    color: '#404944',
    fontSize: 11,
    lineHeight: 16,
  },
  primaryButton: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#003526',
    marginTop: 4,
  },
  primaryButtonDisabled: {
    opacity: 0.8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  demoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  demoButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#f2f4f6',
    padding: 12,
    gap: 2,
  },
  demoButtonTitle: {
    color: '#191c1e',
    fontSize: 13,
    fontWeight: '800',
  },
  demoButtonMeta: {
    color: '#404944',
    fontSize: 11,
  },
  roleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rolePill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#e0e3e5',
  },
  rolePillActive: {
    backgroundColor: '#003526',
  },
  rolePillText: {
    color: '#404944',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  rolePillTextActive: {
    color: '#ffffff',
  },
});
