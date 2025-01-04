import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SERVICES = [
  { name: 'Mood Tracking', route: 'MoodTracking', description: 'Monitor and analyze your emotional well-being' },
  { name: 'Guided Meditation', route: 'GuidedMeditation', description: 'Professional meditation sessions' },
  { name: 'Therapist Finder', route: 'TherapistFinder', description: 'Connect with certified mental health professionals' },
  { name: 'Relaxation Tools', route: 'RelaxingGames', description: 'Evidence-based stress reduction techniques' },
  { name: 'Focus Timer', route: 'Pomodoro', description: 'Enhanced productivity management system' },
  { name: 'Journal', route: 'Journal', description: 'Structured self-reflection and documentation' },
  { name: 'Goal Management', route: 'GoalSetting', description: 'Strategic planning and progress tracking' },
];

const ServiceCard = ({ name, description, onPress }) => (
  <TouchableOpacity
    style={styles.serviceItem}
    onPress={onPress}
    activeOpacity={0.9}
  >
    <View style={styles.serviceContent}>
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>{name}</Text>
      </View>
      <Text style={styles.serviceDescription}>{description}</Text>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Services = ({ navigation }) => {
  const handleServicePress = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0F4F8', '#EDF2F7']}
        style={styles.gradient}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Services</Text>
          <Text style={styles.subheader}>Choose your service to know more about</Text>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.serviceList}>
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.route}
                name={service.name}
                description={service.description}
                onPress={() => handleServicePress(service.route)}
              />
            ))}
          </View>
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
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4A5568',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subheader: {
    fontSize: 16,
    color: '#718096',
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  serviceList: {
    marginTop: 8,
  },
  serviceItem: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#CBD5E0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  serviceContent: {
    padding: 20,
    borderRadius: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A5568',
    letterSpacing: -0.2,
  },
  serviceDescription: {
    fontSize: 15,
    color: '#718096',
    lineHeight: 21,
    letterSpacing: 0.1,
  },
  arrowContainer: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  arrow: {
    fontSize: 24,
    color: '#A0AEC0',
    fontWeight: '300',
  },
});

export default Services;