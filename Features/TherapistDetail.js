import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TherapistDetail = ({ route, navigation }) => {
  const { therapist } = route.params;
  const [isBookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  // Mock available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  // Mock next 7 days for appointment
  const getNextSevenDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
      });
    }
    return days;
  };

  const sessionTypes = [
    {
      type: 'Video Call',
      icon: 'videocam',
      price: '$120',
      duration: '50 min'
    },
    {
      type: 'Audio Call',
      icon: 'phone',
      price: '$100',
      duration: '50 min'
    },
    {
      type: 'In-Person',
      icon: 'person',
      price: '$150',
      duration: '60 min'
    }
  ];

  const ReviewCard = ({ review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{review.name}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <MaterialIcons
              key={index}
              name="star"
              size={16}
              color={index < review.rating ? '#FFC107' : '#E0E0E0'}
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewDate}>{review.date}</Text>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );

  const BookingModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isBookingModalVisible}
      onRequestClose={() => setBookingModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Book Appointment</Text>
            <TouchableOpacity 
              onPress={() => setBookingModalVisible(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Select Session Type</Text>
          <View style={styles.sessionTypes}>
            {sessionTypes.map((session, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sessionTypeCard,
                  selectedType === session.type && styles.selectedSessionType
                ]}
                onPress={() => setSelectedType(session.type)}
              >
                <MaterialIcons 
                  name={session.icon} 
                  size={24} 
                  color={selectedType === session.type ? '#FFF' : '#654EA3'} 
                />
                <Text style={[
                  styles.sessionTypeText,
                  selectedType === session.type && styles.selectedSessionTypeText
                ]}>
                  {session.type}
                </Text>
                <Text style={[
                  styles.sessionPrice,
                  selectedType === session.type && styles.selectedSessionTypeText
                ]}>
                  {session.price}
                </Text>
                <Text style={[
                  styles.sessionDuration,
                  selectedType === session.type && styles.selectedSessionTypeText
                ]}>
                  {session.duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.dateSelector}
          >
            {getNextSevenDays().map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCard,
                  selectedDate === day.date.toDateString() && styles.selectedDate
                ]}
                onPress={() => setSelectedDate(day.date.toDateString())}
              >
                <Text style={[
                  styles.dayName,
                  selectedDate === day.date.toDateString() && styles.selectedDateText
                ]}>
                  {day.dayName}
                </Text>
                <Text style={[
                  styles.dayNumber,
                  selectedDate === day.date.toDateString() && styles.selectedDateText
                ]}>
                  {day.dayNumber}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeSlots}>
            {timeSlots.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTime
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.confirmButton,
              (!selectedDate || !selectedTime || !selectedType) && styles.disabledButton
            ]}
            disabled={!selectedDate || !selectedTime || !selectedType}
            onPress={() => {
              setBookingModalVisible(false);
              navigation.navigate('AppointmentConfirmation', {
                therapist,
                date: selectedDate,
                time: selectedTime,
                type: selectedType
              });
            }}
          >
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      <BookingModal />
      
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add to favorites */}}>
          <MaterialIcons name="favorite-border" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Therapist Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: therapist.image }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{therapist.name}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={20} color="#FFC107" />
          <Text style={styles.rating}>{therapist.rating}</Text>
          <Text style={styles.reviewCount}>(124 reviews)</Text>
        </View>
        <View style={styles.badgesContainer}>
          <View style={styles.badge}>
            <MaterialIcons name="verified" size={16} color="#4CAF50" />
            <Text style={styles.badgeText}>Licensed</Text>
          </View>
          <View style={styles.badge}>
            <MaterialIcons name="schedule" size={16} color="#654EA3" />
            <Text style={styles.badgeText}>{therapist.yearsExperience}+ Years</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => {/* Handle message */}}>
          <MaterialIcons name="chat" size={24} color="#654EA3" />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryButton]}
          onPress={() => setBookingModalVisible(true)}
        >
          <MaterialIcons name="calendar-today" size={24} color="#FFF" />
          <Text style={[styles.actionText, styles.primaryButtonText]}>Book Session</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Dr. {therapist.name.split(' ')[1]} is a licensed psychologist with {therapist.yearsExperience} years 
          of experience helping individuals overcome various mental health challenges. 
          Specializing in {therapist.specialty.join(', ')}, they provide evidence-based 
          treatment in a compassionate and understanding environment.
        </Text>
      </View>

      {/* Specialties Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialties</Text>
        <View style={styles.specialtiesContainer}>
          {therapist.specialty.map((spec, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyTagText}>{spec}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Education & License Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education & Licenses</Text>
        <View style={styles.credentialItem}>
          <MaterialIcons name="school" size={20} color="#654EA3" />
          <Text style={styles.credentialText}>Ph.D. in Clinical Psychology - Stanford University</Text>
        </View>
        <View style={styles.credentialItem}>
          <MaterialIcons name="verified" size={20} color="#654EA3" />
          <Text style={styles.credentialText}>Licensed Clinical Psychologist - CA #12345</Text>
        </View>
      </View>

      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Reviews</Text>
        <ReviewCard 
          review={{
            name: "Jane D.",
            rating: 5,
            date: "2 weeks ago",
            text: "Dr. Johnson is incredibly understanding and professional. She helped me develop effective strategies for managing my anxiety."
          }}
        />
        <ReviewCard 
          review={{
            name: "Mark R.",
            rating: 4,
            date: "1 month ago",
            text: "Very knowledgeable and compassionate therapist. The sessions are always productive and insightful."
          }}
        />
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
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
    marginRight: 5,
  },
  reviewCount: {
    color: '#666',
  },
  badgesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EEF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  badgeText: {
    marginLeft: 5,
    color: '#654EA3',
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0EEF6',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F0EEF6',
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: '#654EA3',
  },
  actionText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#654EA3',
    fontWeight: '500',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#F0EEF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyTagText: {
    color: '#654EA3',
    fontSize: 14,
  },
  credentialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  credentialText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  reviewCard: {
    backgroundColor: '#F0EEF6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  sessionTypes: {
    marginBottom: 20,
  },
  sessionTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F0EEF6',
    marginBottom: 10,
  },
  selectedSessionType: {
    backgroundColor: '#654EA3',
  },
  sessionTypeText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#654EA3',
  },
  sessionPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#654EA3',
    marginRight: 10,
  },
  sessionDuration: {
    fontSize: 14,
    color: '#666',
  },
  selectedSessionTypeText: {
    color: '#FFFFFF',
  },
  dateSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateCard: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F0EEF6',
    marginRight: 10,
    minWidth: 70,
  },
  selectedDate: {
    backgroundColor: '#654EA3',
  },
  dayName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  timeSlot: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F0EEF6',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTime: {
    backgroundColor: '#654EA3',
  },
  timeText: {
    fontSize: 14,
    color: '#654EA3',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#654EA3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default TherapistDetail;