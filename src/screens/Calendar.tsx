import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Layout, type RouteName } from '../components/Navigation';
import { showActionFeedback } from '../utils/feedback';

type CalendarProps = {
  currentRoute: RouteName;
  onNavigate: (route: RouteName) => void;
  onBack: () => void;
  userLabel: string;
  onLogout: () => void;
};

export function Calendar({ currentRoute, onNavigate, onBack, userLabel, onLogout }: CalendarProps) {
  const [selectedDay, setSelectedDay] = useState(12);
  const [activeVariant, setActiveVariant] = useState('High Protein');

  const days = [
    { day: 'Mon', date: 12 },
    { day: 'Tue', date: 13 },
    { day: 'Wed', date: 14 },
    { day: 'Thu', date: 15 },
    { day: 'Fri', date: 16 },
    { day: 'Sat', date: 17 },
    { day: 'Sun', date: 18 },
  ];

  const variants = [
    { id: 'High Protein', desc: '+15g lean muscle fuel' },
    { id: 'Jain Friendly', desc: 'No root vegetables or garlic' },
    { id: 'Low Spice', desc: 'Mild aromatic seasoning only' },
  ];

  return (
    <Layout currentRoute={currentRoute} onNavigate={onNavigate} title="Calendar" showBack onBack={onBack} userLabel={userLabel} onLogout={onLogout}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Meal Calendar</Text>
          <Text style={styles.subtitle}>Plan your nourishment for the next two weeks.</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayStrip}>
          {days.map((item) => (
            <Pressable key={item.date} onPress={() => setSelectedDay(item.date)} style={[styles.dayCard, selectedDay === item.date && styles.dayCardActive]}>
              <Text style={[styles.dayLabel, selectedDay === item.date && styles.dayLabelActive]}>{item.day}</Text>
              <Text style={[styles.dayNumber, selectedDay === item.date && styles.dayNumberActive]}>{item.date}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.focusCard}>
          <View style={styles.focusImageWrap}>
            <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzk2GP7_shHqCL-ce9BCiW1yOHWNa7LEb4N0ZtH-Ydz1SWC9Bi-_ZBfDwE6fyfTLX_hxpv5ua1YvyZFJFzGLETj_WEqW-TAPjG83ZW4w2Wo0Q9uiAlpi7AeOO4Iaq_VkCtqqnyxyAFlAoSuUxiLwD7SICckcf3ctKj4_wKOVFCuz39A7z_40-Sk4BX1CyjJ2yvKTuATZCe5cb3TpGieYOy-OkoWZl-3JCIZD5kOcnn8cJQF3SOKX-40ZBqCh25zjUTYdgjWSXeew' }} style={styles.focusImage} />
          </View>
          <View style={styles.focusBody}>
            <View style={styles.tagRow}>
              <Text style={styles.lunchTag}>Lunch</Text>
              <Text style={styles.recommendedTag}>Recommended</Text>
            </View>
            <Text style={styles.focusTitle}>Harvest Quinoa & Grilled Citrus Bowl</Text>
            <Text style={styles.focusDescription}>Rich in essential minerals and protein, topped with a zesty citrus-tahini drizzle.</Text>
            <View style={styles.actionRow}>
              <Pressable onPress={() => showActionFeedback('Meal swapped', 'Alternative meal options loaded.')} style={styles.actionButton}><Text style={styles.actionButtonText}>Swap Meal</Text></Pressable>
              <Pressable onPress={() => showActionFeedback('Side added', 'Side item was added to this day.')} style={styles.actionButton}><Text style={styles.actionButtonText}>Add Side</Text></Pressable>
              <Pressable onPress={() => showActionFeedback('Day skipped', 'This day has been marked as skipped.')} style={styles.skipButton}><Text style={styles.skipButtonText}>Skip Day</Text></Pressable>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Available Variants</Text>
          <View style={styles.variantGrid}>
            {variants.map((variant) => (
              <Pressable key={variant.id} onPress={() => setActiveVariant(variant.id)} style={[styles.variantCard, activeVariant === variant.id && styles.variantCardActive]}>
                <Text style={styles.variantName}>{variant.id}</Text>
                <Text style={styles.variantDesc}>{variant.desc}</Text>
                <Text style={[styles.variantPill, activeVariant === variant.id && styles.variantPillActive]}>{activeVariant === variant.id ? 'Active' : 'Select'}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable onPress={() => showActionFeedback('Calendar saved', 'Your calendar preferences are saved.')} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Calendar</Text>
        </Pressable>
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
  header: {
    gap: 6,
  },
  title: {
    color: '#191c1e',
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: '#404944',
    fontSize: 14,
  },
  dayStrip: {
    gap: 10,
  },
  dayCard: {
    width: 62,
    height: 92,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eceef0',
  },
  dayCardActive: {
    backgroundColor: '#003526',
  },
  dayLabel: {
    color: '#707974',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  dayLabelActive: {
    color: '#a6f2d1',
  },
  dayNumber: {
    color: '#191c1e',
    fontSize: 24,
    fontWeight: '900',
  },
  dayNumberActive: {
    color: '#ffffff',
  },
  focusCard: {
    borderRadius: 30,
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 16,
  },
  focusImageWrap: {
    height: 220,
    borderRadius: 22,
    overflow: 'hidden',
  },
  focusImage: {
    width: '100%',
    height: '100%',
  },
  focusBody: {
    gap: 12,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
  },
  lunchTag: {
    backgroundColor: '#a6f2d1',
    color: '#002116',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  recommendedTag: {
    backgroundColor: '#fd8a42',
    color: '#682c00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  focusTitle: {
    color: '#191c1e',
    fontSize: 22,
    fontWeight: '900',
  },
  focusDescription: {
    color: '#404944',
    fontSize: 13,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#f7f9fb',
    borderWidth: 1,
    borderColor: '#e0e3e5',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  actionButtonText: {
    color: '#003526',
    fontWeight: '800',
    fontSize: 12,
  },
  skipButton: {
    backgroundColor: '#ffefef',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  skipButtonText: {
    color: '#b42318',
    fontWeight: '800',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#191c1e',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
  },
  variantGrid: {
    gap: 12,
  },
  variantCard: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 16,
    borderWidth: 2,
    borderColor: '#eceef0',
    gap: 8,
  },
  variantCardActive: {
    borderColor: '#003526',
    backgroundColor: '#f2f4f6',
  },
  variantName: {
    color: '#003526',
    fontSize: 16,
    fontWeight: '900',
  },
  variantDesc: {
    color: '#404944',
    fontSize: 12,
  },
  variantPill: {
    alignSelf: 'flex-start',
    color: '#404944',
    backgroundColor: '#eceef0',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  variantPillActive: {
    backgroundColor: '#003526',
    color: '#ffffff',
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: '#003526',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
});