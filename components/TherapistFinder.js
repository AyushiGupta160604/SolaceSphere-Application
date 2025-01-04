import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TherapistFinder = ({ navigation }) => {
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
          <Text style={styles.header}>Therapist Finder</Text>
          <Text style={styles.tagline}>Find a Therapist Who Fits Your Needs</Text>

          {/* Feature Highlights */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Why Find a Therapist?</Text>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>🔍 Tailored Matches</Text>
              <Text style={styles.benefitText}>
                Get matched with therapists based on your preferences and needs.
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>💬 Personalized Support</Text>
              <Text style={styles.benefitText}>
                Receive personalized care that aligns with your mental health goals.
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>📅 Easy Scheduling</Text>
              <Text style={styles.benefitText}>
                Book appointments directly with therapists that fit your schedule.
              </Text>
            </View>
          </View>

          {/* How It Works */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>How It Works</Text>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Enter Your Preferences</Text>
                <Text style={styles.stepText}>
                  Choose your preferred therapy type, location, and availability.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Find Matches</Text>
                <Text style={styles.stepText}>
                  View a list of therapists that match your criteria.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>3</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Book an Appointment</Text>
                <Text style={styles.stepText}>
                  Select a therapist and schedule your first session.
                </Text>
              </View>
            </View>
          </View>

          {/* Key Features */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Key Features</Text>
            <Text style={styles.featureItem}>• Search for therapists by location and specialty</Text>
            <Text style={styles.featureItem}>• View therapist profiles and reviews</Text>
            <Text style={styles.featureItem}>• Schedule sessions with ease</Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.primaryButtonText}>Find a Therapist</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('TherapistFinder')}
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

export default TherapistFinder;