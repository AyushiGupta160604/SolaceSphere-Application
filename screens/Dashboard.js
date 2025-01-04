import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const Dashboard = ({ navigation }) => {
  const [moodData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [3, 4, 3, 5, 4, 4, 5], // 1-5 mood scale
    }],
  });

  const [todayStats] = useState({
    meditationMinutes: 15,
    journalEntries: 2,
    moodScore: 4,
    goalsCompleted: 3,
  });

  const WellnessCard = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.wellnessCard} onPress={onPress}>
      <MaterialIcons name={icon} size={32} color="#654EA3" />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>How are you feeling today?</Text>
          <Text style={styles.userName}>Sarah</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="account-circle" size={40} color="#654EA3" />
        </TouchableOpacity>
      </View>

      {/* Quick Mood Selection */}
      <View style={styles.moodSelector}>
        <Text style={styles.sectionTitle}>Track Your Mood</Text>
        <View style={styles.moodIcons}>
          <TouchableOpacity style={styles.moodIcon}>
            <MaterialIcons name="sentiment-very-satisfied" size={40} color="#4CAF50" />
            <Text>Great</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moodIcon}>
            <MaterialIcons name="sentiment-satisfied" size={40} color="#8BC34A" />
            <Text>Good</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moodIcon}>
            <MaterialIcons name="sentiment-neutral" size={40} color="#FFC107" />
            <Text>Okay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moodIcon}>
            <MaterialIcons name="sentiment-dissatisfied" size={40} color="#FF9800" />
            <Text>Bad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moodIcon}>
            <MaterialIcons name="sentiment-very-dissatisfied" size={40} color="#F44336" />
            <Text>Awful</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mood Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Your Week</Text>
        <LineChart
          data={moodData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(101, 78, 163, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Wellness Tools */}
      <View style={styles.wellnessTools}>
        <Text style={styles.sectionTitle}>Wellness Tools</Text>
        <View style={styles.wellnessGrid}>
          <WellnessCard
            icon="self-improvement"
            title="Meditation"
            subtitle="Start your daily practice"
            onPress={() => navigation.navigate('Meditation')}
          />
          <WellnessCard
            icon="edit"
            title="Journal"
            subtitle="Write your thoughts"
            onPress={() => navigation.navigate('MyJournal')}
          />
          <WellnessCard
            icon="sports-esports"
            title="Games"
            subtitle="Relax your mind"
            onPress={() => navigation.navigate('Games')}
          />
          <WellnessCard
            icon="timer"
            title="Pomodoro"
            subtitle="Focus time"
            onPress={() => navigation.navigate('MyPomodoro')}
          />
          <WellnessCard
            icon="flag"
            title="Goals"
            subtitle="Track your progress"
            onPress={() => navigation.navigate('Goals')}
          />
          <WellnessCard
            icon="psychology"
            title="Therapist"
            subtitle="Find support"
            onPress={() => navigation.navigate('MyTherapistFinder')}
          />
        </View>
      </View>

      {/* Daily Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialIcons name="self-improvement" size={24} color="#654EA3" />
            <Text style={styles.statNumber}>{todayStats.meditationMinutes}min</Text>
            <Text style={styles.statLabel}>Meditation</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="edit" size={24} color="#654EA3" />
            <Text style={styles.statNumber}>{todayStats.journalEntries}</Text>
            <Text style={styles.statLabel}>Journal Entries</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="flag" size={24} color="#654EA3" />
            <Text style={styles.statNumber}>{todayStats.goalsCompleted}</Text>
            <Text style={styles.statLabel}>Goals Met</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  moodSelector: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moodIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  moodIcon: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wellnessTools: {
    padding: 20,
  },
  wellnessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wellnessCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  statsContainer: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default Dashboard;