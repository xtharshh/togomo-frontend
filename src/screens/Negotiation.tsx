import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';

import { Layout, type RouteName } from '../components/Navigation';
import type { ChatMessage } from '../types';
import { showActionFeedback } from '../utils/feedback';

type NegotiationProps = {
  currentRoute: RouteName;
  onNavigate: (route: RouteName) => void;
  onBack: () => void;
  userLabel: string;
  onLogout: () => void;
};

const messages: ChatMessage[] = [
  { id: '1', sender: 'restaurant', text: "Hello! We've reviewed your request for the 3-month corporate plan. While the budget is acceptable, we need to adjust the menu slightly to ensure premium organic ingredients for 45 people daily.", timestamp: 'Annapurna Tiffins • 10:14 AM' },
  { id: '2', sender: 'user', text: 'Understood. What kind of menu adjustments are you proposing? We are specifically looking to maintain the high protein options for our engineering team.', timestamp: 'You • 10:45 AM' },
  { id: '3', sender: 'restaurant', text: "We've attached a revised menu proposal with enhanced protein rotations (Quinoa Bowls, Grilled Lean Meats, and Tofu-based curries).", timestamp: 'Annapurna Tiffins • 11:02 AM', attachment: { name: 'Revised_Menu_Q3.pdf', size: '2.4 MB', type: 'PDF Document' } },
];

export function Negotiation({ currentRoute, onNavigate, onBack, userLabel, onLogout }: NegotiationProps) {
  const { width } = useWindowDimensions();
  const compact = width < 980;

  return (
    <Layout currentRoute={currentRoute} onNavigate={onNavigate} title="Offers" showBack onBack={onBack} userLabel={userLabel} onLogout={onLogout}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>Active Negotiation</Text></View>
          <Text style={styles.heroTitle}>Annapurna Tiffins</Text>
          <Text style={styles.heroSubtitle}>Refining the corporate meal plan for Q3. Currently in the review phase with the culinary team.</Text>
        </View>

        <View style={styles.stepperCard}>
          <View style={styles.stepLine} />
          <View style={styles.stepActiveLine} />
          <View style={styles.step}><Text style={styles.stepDotActive}>✓</Text><Text style={styles.stepLabel}>Proposal Sent</Text></View>
          <View style={styles.step}><Text style={styles.stepDotCenter}>◉</Text><Text style={styles.stepLabel}>Restaurant Review</Text></View>
          <View style={styles.step}><Text style={styles.stepDotInactive}>◌</Text><Text style={styles.stepLabelMuted}>Agreement</Text></View>
        </View>

        <View style={[styles.columns, compact && styles.columnsCompact]}>
          <View style={styles.leftColumn}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Modify Proposal</Text>
              <TextInput placeholder="4,500" placeholderTextColor="#707974" keyboardType="numeric" style={styles.input} />
              <TextInput placeholder="6 Months (Recommended)" placeholderTextColor="#707974" style={styles.input} />
              <TextInput placeholder="Mention specific dietary preferences or delivery times..." placeholderTextColor="#707974" multiline style={[styles.input, styles.textArea]} />
              <Pressable onPress={() => showActionFeedback('Offer updated', 'Your counter offer has been sent.')} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Update Offer</Text></Pressable>
            </View>

            <View style={[styles.card, styles.summaryCard]}>
              <Text style={styles.summaryTitle}>Terms Summary</Text>
              <Text style={styles.summaryMeta}>Draft Version 2.4</Text>
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Daily Capacity</Text><Text style={styles.summaryValue}>45 Meals</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Service Level</Text><Text style={styles.summaryValue}>Premium Plus</Text></View>
              <View style={[styles.summaryRow, styles.summaryTotalRow]}><Text style={styles.summaryLabel}>Est. Total Value</Text><Text style={styles.summaryTotal}>$13,500</Text></View>
            </View>
          </View>

          <View style={styles.chatColumn}>
            <View style={styles.card}>
              <View style={styles.chatHeader}><Text style={styles.cardTitle}>Negotiation Log</Text><Text style={styles.livePill}>Live Updates</Text></View>
              <Text style={styles.datePill}>October 24, 2023</Text>
              {messages.map((message) => (
                <View key={message.id} style={[styles.messageRow, message.sender === 'user' && styles.messageRowUser]}>
                  <View style={[styles.messageBubble, message.sender === 'user' ? styles.userBubble : styles.restaurantBubble]}>
                    <Text style={[styles.messageText, message.sender === 'user' && styles.messageTextUser]}>{message.text}</Text>
                    {message.attachment ? (
                      <View style={styles.attachmentCard}>
                        <Text style={styles.attachmentIcon}>📄</Text>
                        <View>
                          <Text style={styles.attachmentName}>{message.attachment.name}</Text>
                          <Text style={styles.attachmentMeta}>{message.attachment.size} • {message.attachment.type}</Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
                </View>
              ))}
              <View style={styles.composerRow}>
                <View style={styles.composerInput}><TextInput placeholder="Type a counter-offer or question..." placeholderTextColor="#707974" style={styles.inputPlain} /></View>
                <Pressable onPress={() => showActionFeedback('Message sent', 'Your negotiation message was sent.')} style={styles.sendButton}><Text style={styles.sendButtonText}>↑</Text></Pressable>
              </View>
            </View>
          </View>
        </View>

        <Pressable onPress={() => showActionFeedback('Support', 'Negotiation help center opened.')} style={styles.fab}><Text style={styles.fabText}>?</Text></Pressable>
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
    borderRadius: 32,
    backgroundColor: '#004e39',
    padding: 20,
    gap: 10,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#a6f2d1',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  heroBadgeText: {
    color: '#002116',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
  },
  heroSubtitle: {
    color: '#d8f6e9',
    fontSize: 15,
    lineHeight: 21,
  },
  stepperCard: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  stepLine: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: '50%',
    height: 4,
    backgroundColor: '#eceef0',
    marginTop: -2,
  },
  stepActiveLine: {
    position: 'absolute',
    left: 24,
    width: '50%',
    top: '50%',
    height: 4,
    backgroundColor: '#003526',
    marginTop: -2,
  },
  step: {
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  },
  stepDotActive: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#003526',
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '900',
    overflow: 'hidden',
    lineHeight: 38,
  },
  stepDotCenter: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#003526',
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '900',
    overflow: 'hidden',
    lineHeight: 42,
  },
  stepDotInactive: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#eceef0',
    color: '#707974',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '900',
    overflow: 'hidden',
    lineHeight: 38,
  },
  stepLabel: {
    color: '#003526',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  stepLabelMuted: {
    color: '#707974',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  columns: {
    flexDirection: 'row',
    gap: 14,
  },
  columnsCompact: {
    flexDirection: 'column',
  },
  leftColumn: {
    flex: 0.42,
    gap: 14,
  },
  chatColumn: {
    flex: 0.58,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 18,
    gap: 14,
  },
  cardTitle: {
    color: '#003526',
    fontSize: 20,
    fontWeight: '900',
  },
  input: {
    backgroundColor: '#f2f4f6',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#191c1e',
    fontSize: 14,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#003526',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  summaryCard: {
    backgroundColor: '#003526',
  },
  summaryTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  summaryMeta: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginBottom: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  summaryValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  summaryTotalRow: {
    paddingTop: 12,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  summaryTotal: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  livePill: {
    backgroundColor: '#eceef0',
    color: '#191c1e',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  datePill: {
    alignSelf: 'center',
    backgroundColor: '#eceef0',
    color: '#707974',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  messageRow: {
    gap: 8,
    maxWidth: '88%',
  },
  messageRowUser: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageBubble: {
    borderRadius: 22,
    padding: 16,
    gap: 10,
  },
  restaurantBubble: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 6,
  },
  userBubble: {
    backgroundColor: '#003526',
    borderTopRightRadius: 6,
  },
  messageText: {
    color: '#191c1e',
    fontSize: 13,
    lineHeight: 18,
  },
  messageTextUser: {
    color: '#ffffff',
  },
  attachmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f2f4f6',
    borderRadius: 14,
    padding: 10,
  },
  attachmentIcon: {
    fontSize: 18,
  },
  attachmentName: {
    color: '#003526',
    fontSize: 11,
    fontWeight: '900',
  },
  attachmentMeta: {
    color: '#707974',
    fontSize: 9,
  },
  messageTimestamp: {
    color: '#707974',
    fontSize: 10,
  },
  composerRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  composerInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eceef0',
    borderRadius: 18,
    paddingHorizontal: 14,
  },
  inputPlain: {
    minHeight: 48,
    color: '#191c1e',
  },
  sendButton: {
    width: 52,
    borderRadius: 18,
    backgroundColor: '#003526',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#fd8a42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: '#682c00',
    fontSize: 24,
    fontWeight: '900',
  },
});