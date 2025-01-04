import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Pomodoro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0F4F8', '#EDF2F7']}
        style={styles.gradient}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.header}>SolaceSphere Pomodoro Spot</Text>
          <Text style={styles.tagline}>Boost Your Focus with Pomodoro Technique</Text>

          {/* Key Features */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Key Features</Text>
            <Text style={styles.featureItem}>• Customizable Pomodoro timer for focused intervals</Text>
            <Text style={styles.featureItem}>• Break reminders to maintain productivity</Text>
            <Text style={styles.featureItem}>• Detailed session tracking for performance review</Text>
          </View>

          {/* How It Works */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>How It Works</Text>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Set Your Timer</Text>
                <Text style={styles.stepText}>
                  Customize the duration of your Pomodoro sessions and breaks.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Start Focusing</Text>
                <Text style={styles.stepText}>
                  Begin your focused work interval and let the timer guide you.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>3</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Take Breaks</Text>
                <Text style={styles.stepText}>
                  Receive gentle reminders to take breaks and refresh.
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.primaryButtonText}>Start Pomodoro</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Pomodoro')}
          >
            <Text style={styles.secondaryButtonText}>View Tutorial</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4A5568',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 18,
    color: '#718096',
    marginBottom: 24,
    letterSpacing: 0.2,
  },
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
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 16,
  },
  featureItem: {
    fontSize: 15,
    color: '#718096',
    lineHeight: 24,
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
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
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 4,
  },
  stepText: {
    fontSize: 15,
    color: '#718096',
    lineHeight: 22,
  },
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
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: '#4299E1',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Pomodoro;