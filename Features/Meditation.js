import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const Meditation = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const timerRef = useRef(null);
  const [sound, setSound] = useState();

  const meditations = [
    { id: 1, title: 'Mindful Breathing', duration: 5, icon: 'air' },
    { id: 2, title: 'Body Scan', duration: 10, icon: 'accessibility' },
    { id: 3, title: 'Loving Kindness', duration: 15, icon: 'favorite' },
    { id: 4, title: 'Stress Relief', duration: 20, icon: 'spa' },
  ];

  useEffect(() => {
    // Cleanup function
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const formatTime = (timeInMinutes) => {
    const minutes = Math.floor(timeInMinutes);
    const seconds = Math.floor((timeInMinutes - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        // You would need to add your own meditation audio files
        require('../assets/music.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const startMeditation = (duration) => {
    if (isPlaying) {
      Alert.alert(
        'Session in Progress',
        'Would you like to end the current session?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'End Session', 
            onPress: () => {
              clearInterval(timerRef.current);
              setIsPlaying(false);
              setTimeRemaining(0);
            }
          }
        ]
      );
      return;
    }

    setSelectedDuration(duration);
    setTimeRemaining(duration);
    setIsPlaying(true);
    playSound();

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          setIsPlaying(false);
          playSound();
          return 0;
        }
        return prev - 1/60;
      });
    }, 1000);
  };

  const pauseMeditation = () => {
    clearInterval(timerRef.current);
    setIsPlaying(false);
  };

  const MeditationCard = ({ title, duration, icon }) => (
    <TouchableOpacity
      style={[
        styles.meditationCard,
        selectedDuration === duration && styles.selectedCard
      ]}
      onPress={() => startMeditation(duration)}
    >
      <MaterialIcons name={icon} size={32} color="#654EA3" />
      <Text style={styles.meditationTitle}>{title}</Text>
      <Text style={styles.meditationDuration}>{duration} minutes</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meditation</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
          {selectedDuration && (
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={isPlaying ? pauseMeditation : () => startMeditation(selectedDuration)}
            >
              <MaterialIcons
                name={isPlaying ? 'pause' : 'play-arrow'}
                size={48}
                color="#654EA3"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Meditation Types */}
        <Text style={styles.sectionTitle}>Choose Your Practice</Text>
        <View style={styles.meditationGrid}>
          {meditations.map((meditation) => (
            <MeditationCard
              key={meditation.id}
              title={meditation.title}
              duration={meditation.duration}
              icon={meditation.icon}
            />
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Meditation Tips</Text>
          <View style={styles.tipCard}>
            <MaterialIcons name="lightbulb" size={24} color="#654EA3" />
            <Text style={styles.tipText}>
              Find a quiet, comfortable place to sit. Keep your back straight and close your eyes.
              Focus on your breath and let thoughts pass by like clouds.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  timerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#654EA3',
    marginBottom: 20,
  },
  playPauseButton: {
    backgroundColor: '#F0EEFF',
    padding: 20,
    borderRadius: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  meditationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  meditationCard: {
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
  selectedCard: {
    backgroundColor: '#F0EEFF',
    borderColor: '#654EA3',
    borderWidth: 2,
  },
  meditationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  meditationDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  tipsContainer: {
    marginTop: 20,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipText: {
    flex: 1,
    marginLeft: 15,
    color: '#666',
    lineHeight: 20,
  },
});

export default Meditation;