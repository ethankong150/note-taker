import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Notes from './component/notes';
import { Amplify } from 'aws-amplify';
import awsmobile from './src/aws-exports';

Amplify.configure(awsmobile);
 
export default function App() {
  return (
    <View style={styles.container}>
        <Notes />
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
