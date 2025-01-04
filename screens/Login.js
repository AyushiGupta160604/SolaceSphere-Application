import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const buttonScale = new Animated.Value(1);
  const inputShake = new Animated.Value(0);

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

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(inputShake, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(inputShake, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(inputShake, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(inputShake, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      shakeAnimation();
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert('Success', 'Login successful');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.formContainer, {
        transform: [{ translateX: inputShake }]
      }]}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

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
          {email.length > 0 && (
            <MaterialIcons
              name={email.includes('@') ? "check-circle" : "error"}
              size={24}
              color={email.includes('@') ? "#4CAF50" : "#FF5722"}
              style={styles.validationIcon}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={() => {
              animateButton();
              handleLogin();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.buttonText}>Logging in...</Text>
                <MaterialIcons name="sync" size={24} color="#4A4A4A" style={styles.loadingIcon} />
              </View>
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity 
          style={styles.signupButton} 
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.switchText}>Don't have an account? </Text>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
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
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
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
  validationIcon: {
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    marginLeft: 10,
    transform: [{ rotate: '0deg' }],
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  signupButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  switchText: {
    color: '#666666',
  },
  signupText: {
    color: '#E6E6FA',
    fontWeight: 'bold',
  },
});

export default Login;