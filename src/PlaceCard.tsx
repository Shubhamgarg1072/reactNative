import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 1. Import Hook

// Define the shape of the data object
interface PlaceProps {
  item: {
    id: string; // Ideally add an ID for keys
    title: string;
    location: string;
    rating: number;
    image: string;
    price: number | string; // Added this because your detail screen needs it
    description: string; // Added this because your detail screen needs it
  }
}

const PlaceCard = ({ item }: PlaceProps) => {
  const navigation = useNavigation<any>(); // 2. Get navigation object

  return (
    <TouchableOpacity 
    
      style={styles.cardContainer}
      activeOpacity={0.8}
      // 3. Navigate and pass the specific item data
      onPress={() => navigation.navigate('DetailScreen', { place: item })}
    >
      <ImageBackground 
        source={{ uri: item.image }} 
        style={styles.image} 
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.heartContainer}>
           <Text>🤍</Text> 
        </View>

        <View style={styles.overlay}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>📍 {item.location}</Text>
          </View>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 280, 
    height: 380, 
    marginRight: 20, 
    marginLeft: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  heartContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)', 
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    color: '#ddd',
    fontSize: 12,
  },
  rating: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 5,
    borderRadius: 8,
  },
  ratingText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default PlaceCard;