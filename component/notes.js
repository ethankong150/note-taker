import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { DataStore } from '@aws-amplify/datastore';
import { Note } from '../src/models'; 

// Notes component
// TODO: consider abstracting fetchNotes, addNote, and deleteNote into a custom hook
function Notes() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  // Fetches notes from DataStore on update and on mount
  useEffect(() => {
    try {
      fetchNotes();

      const subscription = DataStore.observe(Note).subscribe(msg => {
        fetchNotes();
      });
  
      return () => subscription.unsubscribe();
    } catch (error) {
      console.error("Error loading notes: "+error);
    }
  
      // Call fetchNotes on any CRUD operation
  }, []);
  
  async function fetchNotes() {
    try {

      const notesData = await DataStore.query(Note);
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes: "+error);
    }
  }
  
  const addNote = async () => {
    try {
      if (note.trim().length > 0) {
        await DataStore.save(new Note({
        message: note
        }));
  
        setNote('');
        await fetchNotes();
        }
      } catch (error) {
        console.error("Error adding note: "+error);
      }
    }
  
  const deleteNote = async (id) => {
    try {
      await DataStore.delete(Note, id);
      await fetchNotes();
    } catch (error) {
      console.error("Error deleting note: "+error);
    }
  };
  
  const renderNote = ({ item }) => (
  <View style={styles.noteContainer}>
      <Text style={styles.note}>{item.message}</Text>
      <TouchableOpacity onPress={() => deleteNote(item.id)}>
      <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
  </View>
  );

  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerText}>Notes</Text>
          </View>
          <TextInput
              style={styles.input}
              placeholder="Write a note..."
              value={note}
              onChangeText={setNote}
          />
          <Button title="Add Note" onPress={addNote} />
          <FlatList
              data={notes}
              renderItem={renderNote}
              keyExtractor={(item) => item.id}
          />
      </SafeAreaView>
      );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  note: {
    maxWidth: '80%',
  },
  deleteText: {
    color: 'red',
  },
});

export default Notes;
