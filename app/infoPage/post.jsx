import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const Post = ({ navigation }) => {
  const image = { uri: 'https://www.holidify.com/images/bgImages/INDIA.jpg' }; // Replace with your image URL

  // Example gallery data
  const [gallery, setGallery] = useState([
    {
      id: '1',
      image: { uri: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/c5/e8/5c.jpg' }, // Replace with your image URL
      title: 'Mumbai',
    },
    {
      id: '2',
      image: { uri: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/5c/2f.jpg' }, // Replace with your image URL
      title: 'Darjeeling',
    },
    {
      id: '3',
      image: { uri: 'https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/27/f8745e931992190b556e1d31a0ec8135_1000x1000.jpg' }, // Replace with your image URL
      title: 'Lal Mahal',
    },
  ]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <Text style={styles.Tagline}>Discover Taj mahal</Text>
        <Text style={styles.Placename}>
          Explore the scenic beauty of Taj mahal, one of the Seven Wonders
        </Text>

        <TouchableOpacity
          onPress={goBack}
          style={{
            position: 'absolute',
            left: 20,
            top: 40,
            backgroundColor: '#ff6200',
            padding: 10,
            borderRadius: 40,
          }}
        >
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: 40,
            backgroundColor: '#ff6200',
            padding: 10,
            borderRadius: 40,
          }}
        >
          <Feather name="heart" size={22} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView style={{ backgroundColor: 'white' }}>
        <Text style={{ padding: 14, fontSize: 20, fontWeight: 'bold' }}>
          About the place
        </Text>

        <Text
          style={{
            paddingHorizontal: 14,
            fontSize: 14,
            fontWeight: 'normal',
            opacity: 0.3,
            justifyContent: 'flex-start',
            textAlign: 'justify',
            lineHeight: 26,
          }}
        >
          Agra stands atop as it homes the world’s most beautiful monument, Taj Mahal. It reigns supreme in the 
          list of famous tourist places in India. This white marvel is one of the Seven Wonders of the World. Agra city 
          also includes places such as Fatehpur Sikri, Agra Fort, Akbar's tomb, Ram Bagh, and Sikandra Fort. Must 
          see the sunset and sunrise view of Taj Mahal. Know more about Agra so that you can explore its places 
          beautifully. 
        </Text>

        <Text
          style={{
            paddingHorizontal: 14,
            fontSize: 14,
            fontWeight: 'normal',
            opacity: 0.3,
            justifyContent: 'flex-start',
            textAlign: 'justify',
            lineHeight: 26,
          }}
        >
          Tourist Attractions: Taj Mahal, Agra Fort, Fatehpur Sikri, Ram Bagh, Akbar's Tomb, Itimad ud 
          Daulah, Akbar’s Mausoleum, Agra Museum, Mehtab Bagh, etc.
        </Text>

        <Text
          style={{
            padding: 14,
            fontSize: 20,
            fontWeight: 'normal',
            opacity: 0.3,
            justifyContent: 'flex-start',
            textAlign: 'justify',
            lineHeight: 26,
          }}
        >
          The Taj Mahal was designated as a UNESCO World Heritage Site in 1983 for being "the jewel of Islamic art in India and one of the universally admired masterpieces of the world's heritage". It is regarded as one of the best examples of Mughal architecture and a symbol of Indian history. The Taj Mahal is a major tourist attraction and attracts more than five million visitors a year. In 2007, it was declared a winner of the New 7 Wonders of the World initiative.
        </Text>

        <View>
          <Text style={{ padding: 14, fontSize: 20, fontWeight: 'bold' }}>
            Suggested Places
          </Text>
          <FlatList
            data={gallery}
            horizontal={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingBottom: 40 }}>
                  <View>
                    <Image
                      source={item.image}
                      style={{
                        width: 150,
                        height: 250,
                        marginHorizontal: 10,
                        borderRadius: 10,
                      }}
                    />
                    <View style={styles.darkOverlay}></View>
                    <Feather
                      name="map-pin"
                      size={16}
                      color="white"
                      style={{
                        marginHorizontal: 14,
                        marginTop: 4,
                        position: 'absolute',
                        left: 10,
                        bottom: 10,
                      }}
                    />
                    <Text
                      style={{
                        marginHorizontal: 14,
                        marginTop: 4,
                        position: 'absolute',
                        left: 30,
                        bottom: 10,
                        color: 'white',
                        fontSize: 14,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 380,
    justifyContent: 'flex-end',
  },
  Tagline: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    marginVertical: 6,
  },
  Placename: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    marginBottom: 30,
  },
  BookTicketBtn: {
    position: 'absolute',
    right: 20,
    top: 350,
    backgroundColor: '#ff6200',
    padding: 16,
    borderRadius: 40,
    elevation: 5,
  },
  darkOverlay: {
    width: 150,
    height: 250,
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export default Post;