import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Contact = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (name && email && subject && message) {
      Alert.alert('Form submitted!');
      navigation.navigate('Drawer');
    } else {
      Alert.alert('Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Subject:</Text>
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="Enter subject"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Message:</Text>
          <TextInput
            style={styles.textArea}
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your message"
            multiline
            numberOfLines={5}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Icon name="paper-plane" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
    marginVertical: 40,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginTop: 5,
  },
  textArea: {
    height: 150,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginTop: 5,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#140534',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
});

export default Contact;