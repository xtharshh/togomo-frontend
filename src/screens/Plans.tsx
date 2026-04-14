import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { Layout, type RouteName } from '../components/Navigation';
import { showActionFeedback } from '../utils/feedback';

type PlansProps = {
  currentRoute: RouteName;
  onNavigate: (route: RouteName) => void;
  onBack: () => void;
  userLabel: string;
  onLogout: () => void;
};

export function Plans({ currentRoute, onNavigate, onBack, userLabel, onLogout }: PlansProps) {
  const { width } = useWindowDimensions();
  const compact = width < 920;

  const plans = [
    { id: '1', name: 'Per-day', desc: 'Flexibility at its best. Order when you feel like it.', price: '$18', highlight: false },
    { id: '2', name: 'Monthly', desc: 'Complete peace of mind. Your health journey, automated.', price: '$12', highlight: true, badge: 'Best Value' },
    { id: '3', name: 'Weekly', desc: 'Perfect for the busy work week balance.', price: '$15', highlight: false },
  ];

  const menuItems = [
    { id: '1', day: 'Monday', name: 'Paneer Tikka + Dal Tadka', desc: 'Smokey grilled paneer cubes served with a comforting yellow lentil soup tempered with garlic and cumin.', calories: '650 kcal', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZejicjFlQthmwcD6G73Vcaip2SIsCaVwW0ETBgSy3h140p3lci98_CD-JAqmG1QClPIlIu5vUIf7ajtWo1f6HCMCPA0XieRlj5qGWxP11Sev5NxEGQuubDdY5zH-mXZCMQ0nky0zFiZSuuepHGy72FCZY868ibMFu1HRJC4yvclgLUp03tyMyR26IKdzRF56741Rb0nJ4o_mMxai2jVEwzFXDFp4rE7y_UQH1yjkMvQbwBMP3CdpThfrpDfHadeEEWo0Gk6apRA' },
    { id: '2', day: 'Tuesday', name: 'Mediterranean Mezze Bowl', desc: 'Crispy falafels, creamy hummus, and quinoa tabouleh with a zesty lemon-tahini drizzle.', calories: '580 kcal', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFPISsi2Nb7ixLRW-4zQSjHHnUfahyLnbe_MZ98fz4MAcRKOpZm6bEgfOT9oA393feKL8KTRVczEIuQEEB2uPSPhHe5hxUXOD49r5FlI4-gppwteUkzu0yYZzgBxArlUu77uPQ7iFAmosPkaj7MtAHlIarwNp1WZXyq1GwbkGv0zwMTI4P55MYggMA7HnqUsVeEZcdl0mC9puhyFHjyrX367bWq19kiFT3slswoIT00COBKlFcUFqsOB_lRtpNO1P9qie96a4NNw' },
  ];

  return (
    <Layout currentRoute={currentRoute} onNavigate={onNavigate} title="Plans" showBack onBack={onBack} userLabel={userLabel} onLogout={onLogout}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, compact && styles.heroCompact]}>
          <View style={styles.heroText}>
            <View style={styles.pillRow}>
              <Text style={styles.pill}>High Protein</Text>
              <Text style={styles.pillAlt}>Eco-Conscious</Text>
            </View>
            <Text style={styles.heroTitle}>The Green Kitchen</Text>
            <Text style={styles.heroSubtitle}>Experience the art of artisanal plant-based nourishment. Curated daily menus designed to energize your body and soul.</Text>
            <View style={styles.statsRow}>
              <Text style={styles.stat}>★ 4.9 (120+ Reviews)</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.stat}>25-35 min delivery</Text>
            </View>
          </View>
          <View style={[styles.heroImageWrap, compact && styles.heroImageWrapCompact]}>
            <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjY3_pv4k6CwBZILkY5Jt-A8wir4N_MstKv5JrCAkOekJtx7K6_qNh2Gv1zwjGQko9tGBuJFCNnmzZFgXdqQjUTtc1IJyFU4LqwwIzcdWwsw1T52-5JOHg0n-Nu1eCtfzNfROFsluOyNvqT33HZfNCme7rlT2PKIXANoCC60aPUXT9cy4YTeqfF1i365H_Po4uSzJ5_xFcdUDGHqxz6oz47rHDnM_bVPDsurljyE0YIeaLcg4_7Cl5pJjlHXByagnu_P2ILFz8xQ' }} style={styles.heroImage} />
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Choose Your Ritual</Text>
          <View style={[styles.planGrid, compact && styles.planGridCompact]}>
            {plans.map((plan) => (
              <Pressable key={plan.id} onPress={() => showActionFeedback('Plan selected', `${plan.name} plan selected.`)} style={[styles.planCard, plan.highlight && styles.planCardHighlight]}>
                {plan.badge ? <Text style={styles.planBadge}>{plan.badge}</Text> : null}
                <Text style={[styles.planName, plan.highlight && styles.planNameHighlight]}>{plan.name}</Text>
                <Text style={[styles.planDesc, plan.highlight && styles.planDescHighlight]}>{plan.desc}</Text>
                <Text style={[styles.planPrice, plan.highlight && styles.planPriceHighlight]}>{plan.price}<Text style={styles.perMeal}>/meal</Text></Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.menuSection}>
          <View style={styles.menuHeader}>
            <View>
              <Text style={styles.sectionTitle}>Weekly Menu</Text>
              <Text style={styles.menuSubtitle}>A preview of what our chefs are preparing this week.</Text>
            </View>
            <Pressable onPress={() => showActionFeedback('Weekly menu', 'Opened full weekly menu preview.')}><Text style={styles.menuAction}>Full Menu →</Text></Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuRow}>
            {menuItems.map((item) => (
              <View key={item.id} style={styles.menuCard}>
                <Image source={{ uri: item.image }} style={styles.menuImage} />
                <View style={styles.menuMetaRow}><Text style={styles.menuDay}>{item.day}</Text><Text style={styles.menuCalories}>{item.calories}</Text></View>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuDesc}>{item.desc}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready for a Nourishment Revolution?</Text>
          <Text style={styles.ctaSubtitle}>Join over 2,000 members who have transformed their relationship with food. Start your curated meal journey today.</Text>
          <View style={styles.ctaButtons}>
            <Pressable onPress={() => showActionFeedback('Purchase flow', 'Subscription checkout flow started.')} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Buy Subscription</Text></Pressable>
            <Pressable onPress={() => onNavigate('/negotiation')} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Request Better Offer</Text></Pressable>
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
  hero: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  heroCompact: {
    flexDirection: 'column',
  },
  heroText: {
    flex: 1,
    gap: 12,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#a6f2d1',
    color: '#002116',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  pillAlt: {
    backgroundColor: '#ffdbca',
    color: '#331200',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#003526',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 44,
  },
  heroSubtitle: {
    color: '#404944',
    fontSize: 15,
    lineHeight: 21,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  stat: {
    color: '#003526',
    fontSize: 13,
    fontWeight: '700',
  },
  dot: {
    color: '#bfc9c3',
  },
  heroImageWrap: {
    width: 160,
    height: 220,
    borderRadius: 34,
    overflow: 'hidden',
  },
  heroImageWrapCompact: {
    width: '100%',
    height: 220,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    color: '#191c1e',
    fontSize: 22,
    fontWeight: '900',
  },
  planGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  planGridCompact: {
    flexDirection: 'column',
  },
  planCard: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: '#eceef0',
    padding: 18,
    gap: 10,
    minHeight: 180,
  },
  planCardHighlight: {
    backgroundColor: '#003526',
    transform: [{ scale: 1.02 }],
  },
  planBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fd8a42',
    color: '#682c00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  planName: {
    color: '#191c1e',
    fontSize: 18,
    fontWeight: '900',
  },
  planNameHighlight: {
    color: '#ffffff',
  },
  planDesc: {
    color: '#404944',
    fontSize: 12,
    lineHeight: 17,
  },
  planDescHighlight: {
    color: '#d8f6e9',
  },
  planPrice: {
    color: '#003526',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 'auto',
  },
  planPriceHighlight: {
    color: '#ffffff',
  },
  perMeal: {
    color: '#707974',
    fontSize: 10,
    fontWeight: '700',
  },
  menuSection: {
    backgroundColor: 'rgba(236,238,240,0.5)',
    borderRadius: 28,
    paddingVertical: 18,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  menuSubtitle: {
    color: '#404944',
    fontSize: 13,
  },
  menuAction: {
    color: '#003526',
    fontSize: 13,
    fontWeight: '800',
  },
  menuRow: {
    gap: 14,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  menuCard: {
    width: 270,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 12,
    gap: 10,
  },
  menuImage: {
    width: '100%',
    height: 160,
    borderRadius: 18,
  },
  menuMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuDay: {
    color: '#9b4500',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  menuCalories: {
    color: '#707974',
    fontSize: 11,
  },
  menuName: {
    color: '#191c1e',
    fontSize: 17,
    fontWeight: '800',
  },
  menuDesc: {
    color: '#404944',
    fontSize: 12,
    lineHeight: 17,
  },
  ctaCard: {
    backgroundColor: '#003526',
    borderRadius: 34,
    padding: 20,
    gap: 16,
    alignItems: 'center',
  },
  ctaTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  ctaSubtitle: {
    color: '#d8f6e9',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 21,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#9b4500',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '900',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontWeight: '900',
  },
});