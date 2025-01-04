import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AppointmentConfirmation = ({ route, navigation }) => {
  const { therapist, date, time, type } = route.params;

  const getEndTime = (startTime) => {
    const duration = type === 'In-Person' ? 60 : 50;
    const [hours, minutes] = startTime.split(':');
    const ampm = startTime.split(' ')[1];
    let hour = parseInt(hours);
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(parseInt(minutes));
    date.setMinutes(date.getMinutes() + duration);
    
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  const addToCalendar = () => {
    // Implementation for adding to device calendar
    console.log('Adding to calendar...');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <MaterialIcons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.successIcon}>
          <MaterialIcons name="check-circle" size={80} color="#4CAF50" />
        </View>
        
        <Text style={styles.title}>Appointment Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your session with {therapist.name} has been scheduled
        </Text>

        <View style={styles.appointmentCard}>
          <View style={styles.appointmentDetail}>
            <MaterialIcons name="calendar-today" size={24} color="#654EA3" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>

          <View style={styles.appointmentDetail}>
            <MaterialIcons name="schedule" size={24} color="#654EA3" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>
                {time} - {getEndTime(time)}
              </Text>
            </View>
          </View>

          <View style={styles.appointmentDetail}>
            <MaterialIcons 
              name={type === 'Video Call' ? 'videocam' : type === 'Audio Call' ? 'phone' : 'person'}
              size={24}
              color="#654EA3"
            />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Session Type</Text>
              <Text style={styles.detailValue}>{type}</Text>
            </View>
          </View>
        </View>

        <View style={styles.reminderSection}>
          <Text style={styles.reminderTitle}>Reminders</Text>
          <View style={styles.reminderItem}>
            <MaterialIcons name="notification-important" size={20} color="#654EA3" />
            <Text style={styles.reminderText}>
              Please join the session 5 minutes before the scheduled time
            </Text>
          </View>
          <View style={styles.reminderItem}>
            <MaterialIcons name="info" size={20} color="#654EA3" />
            <Text style={styles.reminderText}>
              Cancellation is free up to 24 hours before the session
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.calendarButton} onPress={addToCalendar}>
          <MaterialIcons name="event" size={24} color="#FFF" />
          <Text style={styles.calendarButtonText}>Add to Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.joinButton}
          onPress={() => navigation.navigate('SessionRoom', { 
            therapist,
            date,
            time,
            type
          })}
        >
          <MaterialIcons name="video-call" size={24} color="#654EA3" />
          <Text style={styles.joinButtonText}>Join Session</Text>
        </TouchableOpacity>
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
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  successIcon: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  reminderSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginVertical: 20,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reminderText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#654EA3',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginBottom: 15,
  },
  calendarButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EEF6',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  joinButtonText: {
    color: '#654EA3',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
});

export default AppointmentConfirmation;