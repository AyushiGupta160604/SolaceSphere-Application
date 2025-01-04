import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MoodTracking = ({ navigation }) => {
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
          <Text style={styles.header}>Mood Tracking</Text>
          <Text style={styles.tagline}>Your Daily Emotional Check-in</Text>

          {/* Feature Highlights */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Why Track Your Mood?</Text>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>🔍 Gain Insights</Text>
              <Text style={styles.benefitText}>
                Understand patterns in your emotional well-being and identify what influences your mood
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>📊 Track Progress</Text>
              <Text style={styles.benefitText}>
                Monitor your emotional journey with detailed charts and personalized insights
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>🎯 Set Goals</Text>
              <Text style={styles.benefitText}>
                Create meaningful wellness goals based on your mood patterns
              </Text>
            </View>
          </View>

          {/* How It Works */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>How It Works</Text>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Log Your Mood</Text>
                <Text style={styles.stepText}>
                  Record how you're feeling with our simple mood scale and emoji selector
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Add Context</Text>
                <Text style={styles.stepText}>
                  Tag activities, add notes, and identify factors affecting your mood
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>3</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Get Insights</Text>
                <Text style={styles.stepText}>
                  Receive weekly reports and personalized recommendations
                </Text>
              </View>
            </View>
          </View>

          {/* Features List */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Key Features</Text>
            <Text style={styles.featureItem}>• Daily mood logging with customizable reminders</Text>
            <Text style={styles.featureItem}>• Detailed activity and trigger tracking</Text>
            <Text style={styles.featureItem}>• Personal journal space for reflection</Text>
            <Text style={styles.featureItem}>• Weekly and monthly mood analysis</Text>
            <Text style={styles.featureItem}>• Export options for sharing with healthcare providers</Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.primaryButtonText}>Start Tracking</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('MoodTracking')}
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
  benefitItem: {
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 15,
    color: '#718096',
    lineHeight: 22,
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
  featureItem: {
    fontSize: 15,
    color: '#718096',
    lineHeight: 24,
    marginBottom: 8,
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

export default MoodTracking;