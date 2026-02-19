import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CATEGORIES = ['Most Viewed', 'Nearby', 'Latest'];

const CategoryTabs = () => {
  // State to track selected tab (like a variable in your Activity)
  const [selected, setSelected] = useState(0);

  return (
    <View style={styles.container}>
      {CATEGORIES.map((cat, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => setSelected(index)}
          style={[
            styles.chip, 
            selected === index ? styles.chipActive : styles.chipInactive
          ]}
        >
          <Text style={selected === index ? styles.textActive : styles.textInactive}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 15, // Space between items
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: '#2F2F2F', // Dark bg for active
  },
  chipInactive: {
    backgroundColor: '#F3F3F3', // Light bg for inactive
  },
  textActive: {
    color: 'white',
    fontWeight: '600',
  },
  textInactive: {
    color: 'gray',
  },
});

export default CategoryTabs;