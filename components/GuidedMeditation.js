import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GuidedMeditation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F0F4F8', '#EDF2F7']} style={styles.gradient}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Guided Meditation</Text>
          <Text style={styles.tagline}>Relax, Breathe, and Find Your Inner Peace</Text>

          {/* Feature Highlights */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Why Meditate?</Text>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>🧘‍♂️ Mental Clarity</Text>
              <Text style={styles.benefitText}>
                Experience improved focus, mental clarity, and a calm mind through meditation.
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>💪 Stress Relief</Text>
              <Text style={styles.benefitText}>
                Release stress and reduce anxiety by engaging in daily meditation sessions.
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>💖 Emotional Balance</Text>
              <Text style={styles.benefitText}>
                Cultivate emotional balance and inner peace with mindfulness and breathing techniques.
              </Text>
            </View>
          </View>

          {/* How It Works */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>How It Works</Text>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Select a Session</Text>
                <Text style={styles.stepText}>
                  Choose from a variety of guided meditation sessions that suit your needs.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Find Comfort</Text>
                <Text style={styles.stepText}>
                  Sit in a comfortable position, close your eyes, and begin focusing on your breath.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>3</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Meditate</Text>
                <Text style={styles.stepText}>
                  Let go of your thoughts and allow the meditation to guide you into relaxation.
                </Text>
              </View>
            </View>
          </View>

          {/* Features List */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Key Features</Text>
            <Text style={styles.featureItem}>• Guided meditation for all experience levels</Text>
            <Text style={styles.featureItem}>• Breathing exercises for stress relief</Text>
            <Text style={styles.featureItem}>• Meditation music and nature sounds</Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.primaryButtonText}>Start Meditation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('GuidedMeditation')}>
            <Text style={styles.secondaryButtonText}>View Tutorial</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  gradient: { flex: 1 },
  scrollContent: { padding: 24 },
  header: { fontSize: 32, fontWeight: '700', color: '#4A5568', marginBottom: 8, letterSpacing: -0.5 },
  tagline: { fontSize: 18, color: '#718096', marginBottom: 24, letterSpacing: 0.2 },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#CBD5E0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  featureTitle: { fontSize: 20, fontWeight: '600', color: '#4A5568', marginBottom: 16 },
  benefitItem: { marginBottom: 16 },
  benefitTitle: { fontSize: 16, fontWeight: '600', color: '#4A5568', marginBottom: 4 },
  benefitText: { fontSize: 15, color: '#718096', lineHeight: 22 },
  stepItem: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-start' },
  stepNumber: {
    backgroundColor: '#4299E1',
    color: '#FFFFFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 16, fontWeight: '600', color: '#4A5568', marginBottom: 4 },
  stepText: { fontSize: 15, color: '#718096', lineHeight: 22 },
  featureItem: { fontSize: 15, color: '#718096', lineHeight: 24, marginBottom: 8 },
  primaryButton: {
    backgroundColor: '#4299E1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#4299E1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  secondaryButtonText: { color: '#4299E1', fontSize: 16, fontWeight: '600' },
});

export default GuidedMeditation;