import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput 
        placeholder="Search places" 
        style={styles.input} 
        placeholderTextColor="#999"
      />
      <View style={styles.filterBtn}>
        <Text style={styles.filterIcon}>⚙️</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6', // Light gray background
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 15, // Rounded corners
    paddingHorizontal: 15,
    height: 50,
  },
  icon: {
    marginRight: 10,
    fontSize: 18,
  },
  input: {
    flex: 1, // Matches layout_weight="1"
    fontSize: 16,
    color: '#000',
  },
  filterBtn: {
    backgroundColor: '#D3D3D3',
    padding: 8,
    borderRadius: 10,
  },
  filterIcon: {
    fontSize: 14,
  }
});

export default SearchBar;