import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  // Animation values
  const buttonScale = new Animated.Value(1);
  const securityBoxHeight = new Animated.Value(0);

  // Password requirements
  const passwordRequirements = [
    { label: 'At least 8 characters', regex: /.{8,}/ },
    { label: 'Contains uppercase letter', regex: /[A-Z]/ },
    { label: 'Contains lowercase letter', regex: /[a-z]/ },
    { label: 'Contains number', regex: /[0-9]/ },
    { label: 'Contains special character', regex: /[!@#$%^&*(),.?":{}|<>]/ },
  ];

  useEffect(() => {
    Animated.timing(securityBoxHeight, {
      toValue: passwordFocused ? 180 : 0, // Adjust this value based on your content
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [passwordFocused]);

  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    passwordRequirements.forEach(requirement => {
      if (requirement.regex.test(pass)) {
        strength += 20;
      }
    });
    setPasswordStrength(strength);
  };

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (passwordStrength < 60) {
      Alert.alert('Weak Password', 'Please create a stronger password');
      return;
    }

    Alert.alert('Success', 'Signup successful');
    navigation.navigate('Dashboard');
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            calculatePasswordStrength(text);
          }}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.securityBox, { height: securityBoxHeight }]}>
        <View style={styles.securityBoxContent}>
          <Text style={styles.strengthText}>Password Strength: {passwordStrength}%</Text>
          <View style={styles.strengthBar}>
            <View style={[styles.strengthFill, { 
              width: `${passwordStrength}%`, 
              backgroundColor: passwordStrength > 80 ? '#4CAF50' : 
                             passwordStrength > 60 ? '#FFA000' : 
                             passwordStrength > 40 ? '#FF5722' : '#F44336' 
            }]} />
          </View>
          {passwordRequirements.map((req, index) => (
            <View key={index} style={styles.requirementRow}>
              <MaterialIcons 
                name={req.regex.test(password) ? "check-circle" : "cancel"} 
                size={18} 
                color={req.regex.test(password) ? "#4CAF50" : "#F44336"} 
              />
              <Text style={styles.requirementText}>{req.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            animateButton();
            handleSignup();
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#E6E6FA',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
  },
  securityBox: {
    overflow: 'hidden',
    marginBottom: 0,
  },
  securityBoxContent: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  strengthText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 15,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  requirementText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  switchText: {
    marginTop: 15,
    color: '#666666',
    textAlign: 'center',
  },
});

export default Signup;