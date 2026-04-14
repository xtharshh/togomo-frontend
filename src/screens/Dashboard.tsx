import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { Layout, type RouteName } from '../components/Navigation';
import { showActionFeedback } from '../utils/feedback';

type DashboardProps = {
  currentRoute: RouteName;
  onNavigate: (route: RouteName) => void;
  onBack: () => void;
  userLabel: string;
  onLogout: () => void;
};

export function Dashboard({ currentRoute, onNavigate, onBack, userLabel, onLogout }: DashboardProps) {
  const { width } = useWindowDimensions();
  const compact = width < 920;

  return (
    <Layout currentRoute={currentRoute} onNavigate={onNavigate} title="Dashboard" showBack onBack={onBack} userLabel={userLabel} onLogout={onLogout}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroText}>
            <Text style={styles.heroTag}>Today's Meal</Text>
            <Text style={styles.heroTitle}>Packed & Assigned</Text>
            <Text style={styles.heroSubtitle}>Your lunch is being prepped for dispatch.</Text>
            <View style={styles.agentCard}>
              <View style={styles.agentIcon}><Text style={styles.agentIconText}>🚲</Text></View>
              <View>
                <Text style={styles.metaLabel}>Delivery Agent</Text>
                <Text style={styles.metaValue}>Rahul</Text>
              </View>
              <View style={styles.etaBlock}>
                <Text style={styles.metaLabel}>ETA</Text>
                <Text style={styles.etaValue}>12:45 PM</Text>
              </View>
            </View>
            <View style={styles.contactRow}>
              <Pressable onPress={() => showActionFeedback('Calling agent', 'Opening delivery agent contact channel.')} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Contact Agent</Text></Pressable>
              <Pressable onPress={() => showActionFeedback('Share', 'Tracking details copied for sharing.')} style={styles.iconButton}><Text style={styles.iconButtonText}>↗</Text></Pressable>
            </View>
          </View>
          <View style={styles.mapCard}>
            <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1r6PXiV-7R4hm3KskKJeMQ6YvPxGfljAlDPwbBKbrAGNdbzmQa8OwlX7qOwlX7qOwXuvMu4ACTzSLwOV2i_wQHmnVT6c7k01BBCsyCuQlx9H9bhiBSuLb_jhqYl9Jbtp_M5ewAvIk75OnkB2DIkG4kBojio-k2k1WNon7gvYCBFm4qN5RHeRw5q4b_jjiW0MffR0cbqpy7rb7PqdEG06W03FvNAJMYfWn8lzQUIBlYAq4_7OIGS79g8vI1qnAvDnTGnpM0dr8MMfJT7iA' }} style={styles.mapImage} />
            <View style={styles.mapMarker}><Text style={styles.mapMarkerText}>🚲</Text></View>
          </View>
        </View>

        <View style={[styles.bentoGrid, compact && styles.bentoGridCompact]}>
          <View style={[styles.panel, styles.planPanel]}>
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.panelBadge}>Active Plan</Text>
                <Text style={styles.panelTitle}>Monthly Premium</Text>
              </View>
              <View style={styles.renewalBlock}>
                <Text style={styles.metaLabel}>Renews in</Text>
                <Text style={styles.renewalValue}>12 Days</Text>
              </View>
            </View>
            <View style={styles.grid2}>
              <View style={styles.miniCard}><Text style={styles.miniIcon}>🌿</Text><Text style={styles.miniLabel}>Meals/Week</Text><Text style={styles.miniValue}>5 Days (M-F)</Text></View>
              <View style={styles.miniCard}><Text style={styles.miniIcon}>⚡</Text><Text style={styles.miniLabel}>Nutrient Focus</Text><Text style={styles.miniValue}>High Protein</Text></View>
            </View>
            <View style={styles.footerButtons}>
              <Pressable onPress={() => showActionFeedback('Schedule', 'Subscription schedule editor opened.')} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Modify Schedule</Text></Pressable>
              <Pressable onPress={() => showActionFeedback('Subscription paused', 'Your subscription was paused.')} style={styles.tertiaryButton}><Text style={styles.tertiaryButtonText}>Pause Subscription</Text></Pressable>
            </View>
          </View>

          <View style={[styles.panel, styles.financePanel]}>
            <Text style={styles.financeTitle}>Financials</Text>
            <View style={styles.financeItem}><Text style={styles.financeItemLabel}>Last Invoice</Text><Text style={styles.financeItemValue}>Oct 12, 2023</Text></View>
            <View style={styles.financeItem}><Text style={styles.financeItemLabel}>Amount Paid</Text><Text style={styles.financeItemValue}>$349.00</Text></View>
            <Pressable onPress={() => showActionFeedback('Invoices', 'Navigating to invoice history.')} style={styles.invoiceButton}><Text style={styles.invoiceButtonText}>View All Invoices</Text></Pressable>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Quick Settings</Text>
          <View style={styles.quickSettingsGrid}>
            {[
              { label: 'Change Address', icon: '⌂' },
              { label: 'Dietary Profile', icon: '◫' },
              { label: 'Billing Method', icon: '◉' },
              { label: 'Help Center', icon: '?' },
            ].map((item) => (
              <Pressable key={item.label} onPress={() => showActionFeedback(item.label, `${item.label} panel opened.`)} style={[styles.quickSettingCard, compact && styles.quickSettingCardCompact]}>
                <Text style={styles.quickIcon}>{item.icon}</Text>
                <Text style={styles.quickLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 120,
  },
  heroCard: {
    borderRadius: 34,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#003526',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  heroText: {
    padding: 18,
    gap: 12,
  },
  heroTag: {
    color: '#9b4500',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: '#191c1e',
    fontSize: 34,
    fontWeight: '900',
  },
  heroSubtitle: {
    color: '#404944',
    fontSize: 15,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f2f4f6',
    borderRadius: 20,
    padding: 14,
  },
  agentIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#003526',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentIconText: {
    fontSize: 22,
  },
  metaLabel: {
    color: '#707974',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  metaValue: {
    color: '#191c1e',
    fontSize: 16,
    fontWeight: '800',
  },
  etaBlock: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  etaValue: {
    color: '#9b4500',
    fontSize: 16,
    fontWeight: '900',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#003526',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  iconButton: {
    width: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f4f6',
  },
  iconButtonText: {
    color: '#003526',
    fontSize: 22,
  },
  mapCard: {
    position: 'relative',
    minHeight: 330,
    margin: 8,
    borderRadius: 30,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 54,
    height: 54,
    marginLeft: -27,
    marginTop: -27,
    borderRadius: 27,
    backgroundColor: '#9b4500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapMarkerText: {
    color: '#ffffff',
    fontSize: 22,
  },
  bentoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  bentoGridCompact: {
    flexDirection: 'column',
  },
  panel: {
    borderRadius: 28,
    padding: 18,
  },
  planPanel: {
    flex: 2,
    backgroundColor: '#eceef0',
  },
  financePanel: {
    flex: 1,
    backgroundColor: '#003526',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  panelBadge: {
    backgroundColor: '#a6f2d1',
    color: '#002116',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  panelTitle: {
    color: '#191c1e',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 10,
  },
  renewalBlock: {
    alignItems: 'flex-end',
  },
  renewalValue: {
    color: '#191c1e',
    fontSize: 18,
    fontWeight: '900',
  },
  grid2: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  miniCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    gap: 6,
  },
  miniIcon: {
    fontSize: 20,
  },
  miniLabel: {
    color: '#707974',
    fontSize: 11,
    fontWeight: '800',
  },
  miniValue: {
    color: '#191c1e',
    fontSize: 16,
    fontWeight: '800',
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  secondaryButton: {
    backgroundColor: '#9b4500',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
  },
  tertiaryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    color: '#191c1e',
    fontWeight: '800',
    fontSize: 12,
  },
  financeTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  financeItem: {
    marginBottom: 14,
  },
  financeItemLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  financeItemValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  invoiceButton: {
    marginTop: 'auto',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  invoiceButtonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  sectionTitle: {
    color: '#191c1e',
    fontSize: 20,
    fontWeight: '900',
  },
  quickSettingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  quickSettingCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickSettingCardCompact: {
    width: '100%',
  },
  quickIcon: {
    fontSize: 20,
    color: '#003526',
  },
  quickLabel: {
    color: '#191c1e',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});