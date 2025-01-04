import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Journal = ({ navigation }) => {
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
          <Text style={styles.header}>SolaceSphere Journal Section</Text>
          <Text style={styles.tagline}>Organize Your Thoughts and Reflections</Text>

          {/* Feature Highlights */}
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Key Features</Text>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>📓 Effortless Organization</Text>
              <Text style={styles.benefitText}>
                Seamlessly organize your entries by creating multiple notebooks
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>📝 Entry Management</Text>
              <Text style={styles.benefitText}>
                Easily add new entries and save them in a clean space
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>📂 Intuitive Sidebar</Text>
              <Text style={styles.benefitText}>
                View and manage notebooks with ease
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>🎨 Interactive UI</Text>
              <Text style={styles.benefitText}>
                An immersive and user-friendly journaling experience
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.primaryButtonText}>Start Journaling</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Journal')}
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

export default Journal;