import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);

    const addNote = () => {
        if (note.trim().length > 0) {
            setNotes([...notes, note]);
            setNote('');
        }
    };

    const deleteNote = (index) => {
        const newNotes = [...notes];
        newNotes.splice(index, 1);
        setNotes(newNotes);
    };

    const renderNote = ({ item, index }) => (
        <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item}</Text>
            <TouchableOpacity onPress={() => deleteNote(index)}>
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
            keyExtractor={(item, index) => index.toString()}
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
  noteText: {
    maxWidth: '80%',
  },
  deleteText: {
    color: 'red',
  },
});

export default App;
