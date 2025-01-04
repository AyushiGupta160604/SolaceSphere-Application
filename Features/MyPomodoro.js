import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';

const CLIENT_ID = '5fbb7b29d33943c8b830c965ebd61f72';
const SPOTIFY_REDIRECT_URI = makeRedirectUri({
  native: 'exp://192.168.125.231:8081',
});

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const MyPomodoro = ({ navigation }) => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: ['user-read-playback-state', 'user-modify-playback-state'],
      redirectUri: SPOTIFY_REDIRECT_URI,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      setSpotifyToken(access_token);
      checkPlaybackState(access_token);
    }
  }, [response]);

  const checkPlaybackState = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        console.error('Permission denied. Ensure correct scopes and Premium account.');
        Alert.alert('Error', 'Permission denied. Please ensure you have a Spotify Premium account.');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setIsPlaying(data.is_playing);
      } else {
        console.error(`Failed to fetch playback state: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching playback state:', error);
    }
  };

  const toggleSpotifyPlayback = async () => {
    if (!spotifyToken) {
      promptAsync();
      return;
    }

    try {
      // Check for active devices
      const devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
        headers: { Authorization: `Bearer ${spotifyToken}` },
      });
      const devicesData = await devicesResponse.json();

      if (!devicesData.devices || devicesData.devices.length === 0) {
        Alert.alert('No Active Device', 'Please start Spotify on any device first.');
        return;
      }

      // Toggle playback
      const endpoint = isPlaying ? 'pause' : 'play';
      const response = await fetch(`https://api.spotify.com/v1/me/player/${endpoint}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      });

      if (response.ok) {
        setIsPlaying(!isPlaying);
      } else {
        throw new Error('Failed to control playback');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to control Spotify playback');
      console.error('Error toggling playback:', error);
    }
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            handleSessionSwitch();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleSessionSwitch = () => {
    setIsWorkSession((prev) => !prev);
    setTime(isWorkSession ? breakDuration * 60 : workDuration * 60);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateDurations = () => {
    if (workDuration <= 0 || breakDuration <= 0) {
      Alert.alert('Invalid Input', 'Durations must be greater than 0.');
      return;
    }
    resetTimer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundDecoration} />
      <View style={styles.backgroundCircle} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#6D28D9" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mindful Timer</Text>
      </View>

      <View style={styles.timerContainer}>
        <View style={styles.timerCard}>
          <View style={styles.timerInnerCard}>
            <Text style={styles.sessionType}>
              {isWorkSession ? 'Focus Session' : 'Mindful Break'}
            </Text>
            <Text style={styles.timerText}>{formatTime(time)}</Text>
            <Text style={styles.motivationalText}>
              {isWorkSession ? 'Stay present, stay focused' : 'Take a mindful pause'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Session Settings</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Focus Time</Text>
            <TextInput
              style={styles.input}
              placeholder="25"
              keyboardType="numeric"
              value={workDuration.toString()}
              onChangeText={(text) => setWorkDuration(Number(text))}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Break Time</Text>
            <TextInput
              style={styles.input}
              placeholder="5"
              keyboardType="numeric"
              value={breakDuration.toString()}
              onChangeText={(text) => setBreakDuration(Number(text))}
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.updateButton} onPress={updateDurations}>
          <Text style={styles.updateButtonText}>Apply Changes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, isRunning ? styles.pauseButton : styles.startButton]}
          onPress={() => setIsRunning((prev) => !prev)}
        >
          <MaterialIcons 
            name={isRunning ? "pause" : "play-arrow"} 
            size={28} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetTimer}>
          <MaterialIcons name="refresh" size={24} color="#6D28D9" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.controlButton, styles.musicButton, isPlaying && styles.musicButtonActive]} 
          onPress={toggleSpotifyPlayback}
        >
          <MaterialIcons 
            name={isPlaying ? "music-off" : "music-note"} 
            size={24} 
            color="#6D28D9" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundDecoration: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    transform: [{ scale: 1.5 }],
  },
  backgroundCircle: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  backButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C1D95',
    marginLeft: 15,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  timerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 3,
    width: '100%',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  timerInnerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.1)',
  },
  sessionType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6D28D9',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#4C1D95',
    fontVariant: ['tabular-nums'],
    textShadowColor: 'rgba(109, 40, 217, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  motivationalText: {
    fontSize: 14,
    color: '#7C3AED',
    marginTop: 16,
    fontStyle: 'italic',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4C1D95',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  inputLabel: {
    color: '#6D28D9',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F3FF',
    padding: 16,
    borderRadius: 16,
    color: '#4C1D95',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: 'rgba(109, 40, 217, 0.1)',
  },
  updateButton: {
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 100,
  },
  controlButton: {
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  startButton: {
    backgroundColor: '#7C3AED',
    transform: [{ scale: 1.1 }],
  },
  pauseButton: {
    backgroundColor: '#6D28D9',
    transform: [{ scale: 1.1 }],
  },
  resetButton: {
    backgroundColor: '#EDE9FE',
  },
  musicButton: {
    backgroundColor: '#EDE9FE',
  },
  musicButtonActive: {
    backgroundColor: '#D1C4E9',
  },
});

export default MyPomodoro;