// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

// const MyJournal = ({ navigation }) => {
//   const [journalEntries, setJournalEntries] = useState([]);
//   const [newEntry, setNewEntry] = useState('');

//   const addEntry = () => {
//     if (newEntry.trim() === '') {
//       Alert.alert('Empty Entry', 'Please write something before saving.');
//       return;
//     }
//     const entry = {
//       id: Date.now(),
//       text: newEntry,
//       date: new Date().toLocaleDateString(),
//     };
//     setJournalEntries([entry, ...journalEntries]);
//     setNewEntry('');
//   };

//   const deleteEntry = (id) => {
//     Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: () => setJournalEntries(journalEntries.filter((entry) => entry.id !== id)),
//       },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <MaterialIcons name="arrow-back" size={24} color="#654EA3" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My Journal</Text>
//       </View>

//       {/* Add New Entry */}
//       <View style={styles.newEntryContainer}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Write your thoughts here..."
//           value={newEntry}
//           onChangeText={setNewEntry}
//           multiline
//         />
//         <TouchableOpacity style={styles.saveButton} onPress={addEntry}>
//           <Text style={styles.saveButtonText}>Save</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Journal Entries */}
//       <ScrollView style={styles.entriesContainer}>
//         {journalEntries.map((entry) => (
//           <View key={entry.id} style={styles.entryCard}>
//             <Text style={styles.entryDate}>{entry.date}</Text>
//             <Text style={styles.entryText} numberOfLines={3}>
//               {entry.text}
//             </Text>
//             <TouchableOpacity onPress={() => deleteEntry(entry.id)}>
//               <MaterialIcons name="delete" size={24} color="#F44336" />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F6FA',
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginLeft: 10,
//   },
//   newEntryContainer: {
//     backgroundColor: '#FFFFFF',
//     padding: 15,
//     borderRadius: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   textInput: {
//     height: 100,
//     textAlignVertical: 'top',
//     backgroundColor: '#F5F6FA',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     fontSize: 16,
//     color: '#333',
//   },
//   saveButton: {
//     backgroundColor: '#654EA3',
//     padding: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   entriesContainer: {
//     flex: 1,
//   },
//   entryCard: {
//     backgroundColor: '#FFFFFF',
//     padding: 15,
//     borderRadius: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   entryDate: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 5,
//   },
//   entryText: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 10,
//   },
// });

// export default MyJournal;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MyJournal = ({ navigation }) => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState(null);

  const addOrEditEntry = () => {
    if (newEntry.trim() === '') {
      Alert.alert('Empty Entry', 'Please write something before saving.');
      return;
    }

    if (isEditing) {
      setJournalEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === editingEntryId ? { ...entry, text: newEntry } : entry
        )
      );
      setIsEditing(false);
      setEditingEntryId(null);
    } else {
      const entry = {
        id: Date.now(),
        text: newEntry,
        date: new Date().toLocaleDateString(),
      };
      setJournalEntries([entry, ...journalEntries]);
    }

    setNewEntry('');
  };

  const deleteEntry = (id) => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setJournalEntries(journalEntries.filter((entry) => entry.id !== id)),
      },
    ]);
  };

  const editEntry = (id) => {
    const entryToEdit = journalEntries.find((entry) => entry.id === id);
    setNewEntry(entryToEdit.text);
    setIsEditing(true);
    setEditingEntryId(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#654EA3" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Journal</Text>
      </View>

      <View style={styles.newEntryContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write your thoughts here..."
          value={newEntry}
          onChangeText={setNewEntry}
          multiline
        />
        <TouchableOpacity style={styles.saveButton} onPress={addOrEditEntry}>
          <Text style={styles.saveButtonText}>{isEditing ? 'Update' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.entriesContainer}>
        {journalEntries.map((entry) => (
          <View key={entry.id} style={styles.entryCard}>
            <Text style={styles.entryDate}>{entry.date}</Text>
            <Text style={styles.entryText} numberOfLines={3}>
              {entry.text}
            </Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => editEntry(entry.id)}>
                <MaterialIcons name="edit" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteEntry(entry.id)}>
                <MaterialIcons name="delete" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  newEntryContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#F5F6FA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#654EA3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  entriesContainer: {
    flex: 1,
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  entryText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MyJournal;