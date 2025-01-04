import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MyTherapistFinder = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  // Mock therapist data
  const therapists = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: ['Anxiety', 'Depression'],
      yearsExperience: 12,
      rating: 4.8,
      acceptingNew: true,
      distance: '2.3 miles',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: ['Trauma', 'PTSD', 'Anxiety'],
      yearsExperience: 8,
      rating: 4.9,
      acceptingNew: true,
      distance: '3.1 miles',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: ['Relationships', 'Career Counseling'],
      yearsExperience: 15,
      rating: 4.7,
      acceptingNew: false,
      distance: '1.8 miles',
      image: 'https://via.placeholder.com/100',
    },
  ];

  const specialtyOptions = [
    'Anxiety',
    'Depression',
    'Trauma',
    'PTSD',
    'Relationships',
    'Career Counseling',
  ];

  const SpecialtyChip = ({ title, selected, onPress }) => (
    <TouchableOpacity
      style={[styles.specialtyChip, selected && styles.selectedChip]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, selected && styles.selectedChipText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const TherapistCard = ({ therapist }) => (
    <TouchableOpacity
      style={styles.therapistCard}
      onPress={() => navigation.navigate('TherapistDetail', { therapist })}
    >
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: therapist.image }}
          style={styles.therapistImage}
        />
        <View style={styles.therapistInfo}>
          <Text style={styles.therapistName}>{therapist.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#FFC107" />
            <Text style={styles.ratingText}>{therapist.rating}</Text>
          </View>
          <Text style={styles.distanceText}>{therapist.distance}</Text>
        </View>
      </View>
      
      <View style={styles.specialtiesContainer}>
        {therapist.specialty.map((spec, index) => (
          <View key={index} style={styles.specialtyTag}>
            <Text style={styles.specialtyTagText}>{spec}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.experienceText}>
          {therapist.yearsExperience} years experience
        </Text>
        <Text style={[
          styles.availabilityText,
          { color: therapist.acceptingNew ? '#4CAF50' : '#F44336' }
        ]}>
          {therapist.acceptingNew ? 'Accepting new patients' : 'Not accepting new patients'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const toggleSpecialty = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialties.length === 0 || 
      therapist.specialty.some(s => selectedSpecialties.includes(s));
    return matchesSearch && matchesSpecialty;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find a Therapist</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
          <MaterialIcons name="filter-list" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or specialty"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.specialtiesScroll}
      >
        {specialtyOptions.map((specialty, index) => (
          <SpecialtyChip
            key={index}
            title={specialty}
            selected={selectedSpecialties.includes(specialty)}
            onPress={() => toggleSpecialty(specialty)}
          />
        ))}
      </ScrollView>

      <View style={styles.resultsContainer}>
        {filteredTherapists.map(therapist => (
          <TherapistCard key={therapist.id} therapist={therapist} />
        ))}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  specialtiesScroll: {
    paddingHorizontal: 20,
  },
  specialtyChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#654EA3',
  },
  selectedChip: {
    backgroundColor: '#654EA3',
  },
  chipText: {
    color: '#654EA3',
    fontSize: 14,
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  resultsContainer: {
    padding: 20,
  },
  therapistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  therapistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  therapistInfo: {
    marginLeft: 15,
    flex: 1,
  },
  therapistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: '#666',
  },
  distanceText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  specialtyTag: {
    backgroundColor: '#F0EEF6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyTagText: {
    color: '#654EA3',
    fontSize: 12,
  },
  cardFooter: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0EEF6',
    paddingTop: 10,
  },
  experienceText: {
    color: '#666',
    fontSize: 14,
  },
  availabilityText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
  },
});

export default MyTherapistFinder;