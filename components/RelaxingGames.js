import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RelaxingGames = ({ navigation }) => {
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
          <Text style={styles.header}>SolaceSphere Game World</Text>
          <Text style={styles.tagline}>Relax and Play Mindfully</Text>

          {/* Key Features */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Key Features</Text>
            <Text style={styles.featureItem}>• Games designed with mindful principles for relaxation</Text>
            <Text style={styles.featureItem}>• Variety of games offering diverse experiences</Text>
            <Text style={styles.featureItem}>• Accessible and inclusive for all users</Text>
          </View>

          {/* How It Works */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>How It Works</Text>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Choose a Game</Text>
                <Text style={styles.stepText}>
                  Select from a variety of relaxing games tailored to your mood.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Play Mindfully</Text>
                <Text style={styles.stepText}>
                  Enjoy games that promote relaxation and mental well-being.
                </Text>
              </View>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>3</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Track Your Progress</Text>
                <Text style={styles.stepText}>
                  Monitor your game experience and see how it impacts your mood.
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.primaryButtonText}>Start Playing</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('RelaxingGames')}
          >
            <Text style={styles.secondaryButtonText}>View Game Tutorial</Text>
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

export default RelaxingGames;