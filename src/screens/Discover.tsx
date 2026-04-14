import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';

import { Layout, type RouteName } from '../components/Navigation';
import type { Kitchen, SubscriptionPlan } from '../types';
import { showActionFeedback } from '../utils/feedback';

type DiscoverProps = {
  currentRoute: RouteName;
  onNavigate: (route: RouteName) => void;
  userLabel: string;
  onLogout: () => void;
};

const kitchens: Kitchen[] = [
  {
    id: '1',
    name: 'The Green Table',
    cuisine: 'Organic',
    distance: '1.2 km',
    deliveryTime: '25-30 min',
    rating: 4.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6DZf-KMzIOKA6LOoCZ3TPVmVuwghQELeRWCd9Zfa2xtz3MlOXz8mSw9G7RE917F5ZKfIvc-XzyqbLEEqUcLFZkXXuuw4q_yMr1mvQtinabDTQAvhS6vlanhDvxPuxKubdTQx5TQCtgOXDz3mfK61GHNmYN5RfxrkyeRZjfmXcha340TfohPvUTYA_pktImMOJqVRczODqQ9bzWisqCJ8ZqnFTLYTYnfUFwrhyL3dXzB1jaLgblRLgjjaVoPiFCYhVJx9xr7ZdjQ',
  },
  {
    id: '2',
    name: 'Roots & Grain',
    cuisine: 'Vegan',
    distance: '2.4 km',
    deliveryTime: '40-45 min',
    rating: 4.6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI2Yq9rmeLTenoMpd37eAX2Q7rOikuWBEw3t5IhUlXvHcVjmU_dnK5fALN86EZ7bCRyH34O5TzH779DnBVWbGvwptv5EaLEVJbiaF67h3V_0l_GRWgropg4s0F3Hd1K22r8Wo5NUf7OM4oqKt5e_iXZIanBmkz6E7UglX6BC1YX2sjkBXyRV6S2lsvCvWroTaYMVICyVab03ZjeKFTp7e6kE5e50tFqRBQTHtV6cAgbC_4mgZuDeAuGO8EvbrwHZgIoC9zrQBd4Q',
  },
  {
    id: '3',
    name: 'Zenith Bowls',
    cuisine: 'Asian',
    distance: '0.8 km',
    deliveryTime: '15-20 min',
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_1Nzy0egH3Vil_4kntBSqElS04st0LS2-FXT4_Ndkxa0a9mdnZhUgChM3tLxQcNzNwHN6dsDtwYRC3_5l57NIUyL2TDooIsbYX_MSMPHkThPeHgHk-cKcdy6pmj_utawHnW7mJyPHtsXX8x5yUcrCWT8kTZdmrGFZyQga6MOLnSIBvgXKqYyKm14BlZEDJq4aIIKn00u15uaxvwYVp-drcQGVrmxUqAhWVifpkQw34cZGF4Sn6wLQ7pzCudFdrXLZp_OWldseBA',
  },
];

const subscriptions: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Keto Power Lunch',
    description: 'High-fat, low-carb seasonal mains from top nutritionists.',
    pricePerMeal: 249,
    icon: 'K',
  },
  {
    id: '2',
    name: 'Plant-Based Vitality',
    description: 'Whole-food recipes focusing on immunity and energy.',
    pricePerMeal: 199,
    bestValue: true,
    icon: 'P',
  },
];

export function Discover({ currentRoute, onNavigate, userLabel, onLogout }: DiscoverProps) {
  const { width } = useWindowDimensions();
  const compact = width < 860;

  return (
    <Layout currentRoute={currentRoute} onNavigate={onNavigate} title="Discover" userLabel={userLabel} onLogout={onLogout}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.locationBlock}>
          <Text style={styles.locationLabel}>Current Location</Text>
          <Text style={styles.locationValue}>Home (Indiranagar)</Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput placeholder="Search kitchens..." placeholderTextColor="#707974" style={styles.searchInput} />
          </View>
          <Pressable onPress={() => showActionFeedback('Filters', 'Filter panel can be connected to backend tags next.')} style={styles.filterButton}>
            <Text style={styles.filterButtonText}>≡</Text>
          </Pressable>
        </View>

        <View style={[styles.heroCard, compact && styles.heroCardCompact]}>
          <View style={styles.heroTextBlock}>
            <Text style={styles.badge}>Curated Selection</Text>
            <Text style={styles.heroTitle}>Premium Weekly Plans</Text>
            <Text style={styles.heroSubtitle}>Chef-crafted nutrition delivered fresh to your doorstep every morning.</Text>
            <Pressable onPress={() => onNavigate('/plans')} style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Explore Plans</Text>
            </Pressable>
          </View>
          <View style={[styles.heroImageWrap, compact && styles.heroImageWrapCompact]}>
            <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXPgqO2lQLPmRefdhCrwym9S2uAeNkIrg-ZsTz1oLAW_QANutuWNwkcME2V5s74r93VUd-PslHP_nVy8jK1oTNghimOtwf6EoUfk7VNkNQGfRm1KGQ9un1m9qVFOsvJveMYruw2AX8gLghe0-1k02x43s_t_NZH5cuZIRPE03qwWL261Bgj61GVvSm1L7iAsBc4zmW8pjpQAoKdGQZt2-IrbiRMt9J17UTr1t66uZknEoIQQcfLskT036fwUdI7HzF6_NH44Ytng' }} style={styles.heroImage} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Nearby Kitchens</Text>
            <Text style={styles.sectionSubtitle}>Authentic meals within 5km radius</Text>
          </View>
          <Pressable onPress={() => showActionFeedback('Nearby kitchens', 'Showing all kitchens in this area.')}>
            <Text style={styles.sectionAction}>View all →</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {kitchens.map((kitchen) => (
            <View key={kitchen.id} style={styles.kitchenCard}>
              <Image source={{ uri: kitchen.image }} style={styles.kitchenImage} />
              <View style={styles.ratingPill}>
                <Text style={styles.ratingText}>★ {kitchen.rating}</Text>
              </View>
              <Text style={styles.kitchenName}>{kitchen.name}</Text>
              <Text style={styles.kitchenMeta}>{kitchen.cuisine} • {kitchen.distance} • {kitchen.deliveryTime}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Trending Subscriptions</Text>
        <View style={styles.subscriptionList}>
          {subscriptions.map((plan) => (
            <View key={plan.id} style={styles.subscriptionCard}>
              <View style={styles.subscriptionIcon}><Text style={styles.subscriptionIconText}>{plan.icon}</Text></View>
              <View style={styles.subscriptionContent}>
                <View style={styles.subscriptionTopRow}>
                  <Text style={styles.subscriptionName}>{plan.name}</Text>
                  {plan.bestValue ? <Text style={styles.bestValueBadge}>BEST SELLER</Text> : null}
                </View>
                <Text style={styles.subscriptionDesc}>{plan.description}</Text>
                <View style={styles.subscriptionBottomRow}>
                  <View>
                    <Text style={styles.priceText}>₹{plan.pricePerMeal} <Text style={styles.perMeal}>/ meal</Text></Text>
                    <Text style={styles.activeUsers}>1200+ active users</Text>
                  </View>
                  <Pressable onPress={() => showActionFeedback('Subscription', `Added ${plan.name} to your subscription flow.`)} style={styles.subscribeButton}>
                    <Text style={styles.subscribeButtonText}>Subscribe</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
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
  locationBlock: {
    gap: 4,
  },
  locationLabel: {
    color: '#707974',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  locationValue: {
    color: '#003526',
    fontSize: 18,
    fontWeight: '800',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 18,
    color: '#003526',
  },
  searchInput: {
    flex: 1,
    color: '#191c1e',
    fontSize: 14,
  },
  filterButton: {
    width: 50,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003526',
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  heroCard: {
    minHeight: 240,
    borderRadius: 30,
    backgroundColor: '#003526',
    padding: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  heroCardCompact: {
    flexDirection: 'column',
  },
  heroTextBlock: {
    flex: 1,
    gap: 12,
    paddingRight: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#a6f2d1',
    color: '#002116',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '900',
  },
  heroSubtitle: {
    color: '#a6f2d1',
    fontSize: 14,
    lineHeight: 20,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#9b4500',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
  },
  heroButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  heroImageWrap: {
    width: 160,
    borderRadius: 26,
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  heroImageWrapCompact: {
    width: '100%',
    height: 190,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#191c1e',
    fontSize: 22,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#404944',
    fontSize: 13,
    marginTop: 2,
  },
  sectionAction: {
    color: '#003526',
    fontSize: 13,
    fontWeight: '700',
  },
  horizontalList: {
    gap: 14,
    paddingRight: 16,
  },
  kitchenCard: {
    width: 250,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    padding: 12,
    gap: 8,
  },
  kitchenImage: {
    width: '100%',
    height: 170,
    borderRadius: 20,
  },
  ratingPill: {
    position: 'absolute',
    top: 22,
    right: 22,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ratingText: {
    color: '#003526',
    fontSize: 12,
    fontWeight: '800',
  },
  kitchenName: {
    color: '#191c1e',
    fontSize: 16,
    fontWeight: '800',
  },
  kitchenMeta: {
    color: '#404944',
    fontSize: 12,
    lineHeight: 16,
  },
  subscriptionList: {
    gap: 14,
  },
  subscriptionCard: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 14,
  },
  subscriptionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#003526',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscriptionIconText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
  },
  subscriptionContent: {
    flex: 1,
    gap: 8,
  },
  subscriptionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  subscriptionName: {
    color: '#191c1e',
    fontSize: 17,
    fontWeight: '800',
    flex: 1,
  },
  bestValueBadge: {
    backgroundColor: '#a6f2d1',
    color: '#002116',
    fontSize: 9,
    fontWeight: '900',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    textTransform: 'uppercase',
  },
  subscriptionDesc: {
    color: '#404944',
    fontSize: 12,
    lineHeight: 17,
  },
  subscriptionBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 10,
  },
  priceText: {
    color: '#003526',
    fontSize: 18,
    fontWeight: '800',
  },
  perMeal: {
    color: '#707974',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  activeUsers: {
    color: '#9b4500',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  subscribeButton: {
    backgroundColor: '#003526',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  subscribeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
});