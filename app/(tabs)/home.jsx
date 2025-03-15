import React, { useState } from "react";
import { SafeAreaView, FlatList, Image, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For icons
import { useGlobalContext } from "../../context/GlobalProvider";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const { user } = useGlobalContext();

  const popularDestinations = [
    { id: "1", name: "Taj Mahal", image: "https://www.holidify.com/images/bgImages/INDIA.jpg" },
    { id: "2", name: "Mumbai", image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/c5/e8/5c.jpg" },
    { id: "3", name: "Darjeeling", image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/5c/2f.jpg" },
    { id: "4", name: "Hyderabad", image: "https://images.unsplash.com/photo-1538097304804-2a1b932466a9" },
  ];

  const specialOffers = [
    { id: "1", icon: "flight", title: "Flight Deals", description: "Save up to 30% on international flights" },
    { id: "2", icon: "hotel", title: "Hotel Discounts", description: "Get 25% off on luxury hotels" },
    { id: "3", icon: "beach-access", title: "Holiday Packages", description: "All-inclusive deals starting at $599" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        {/* Header */}
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: "#e5e7eb", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>TravelApp</Text>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={{ height: 300, position: "relative" }}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.4)", justifyContent: "center", alignItems: "center", padding: 16 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff", marginBottom: 24, textAlign: "center" }}>Discover Your Next Adventure</Text>
            <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 999, width: "100%", maxWidth: 320, flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="search" size={20} color="#9ca3af" />
              <TextInput
                placeholder="Where would you like to go?"
                style={{ flex: 1, marginLeft: 8, fontSize: 14 }} // Removed outlineStyle
              />
            </View>
          </View>
        </View>

        {/* Popular Destinations */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 16 }}>Popular Destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingBottom: 16 }}>
            {popularDestinations.map((destination) => (
              <TouchableOpacity key={destination.id} style={{ width: 280, borderRadius: 24, overflow: "hidden", marginRight: 16 }} onPress={() => router.push('/infoPage/post')}>
                <View style={{ height: 180, position: "relative" }}>
                  <Image
                    source={{ uri: destination.image }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                  <Text style={{ position: "absolute", bottom: 16, left: 16, fontSize: 18, fontWeight: "600", color: "#fff" }}>{destination.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Special Offers */}
        <View style={{ padding: 16, backgroundColor: "#f9fafb" }}>
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 16 }}>Special Offers</Text>
          <View style={{ gap: 16 }}>
            {specialOffers.map((offer) => (
              <TouchableOpacity key={offer.id} style={{ backgroundColor: "#fff", padding: 16, borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
                <MaterialIcons name={offer.icon} size={32} color="#3b82f6" style={{ marginBottom: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 4 }}>{offer.title}</Text>
                <Text style={{ fontSize: 14, color: "#6b7280" }}>{offer.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Spacer */}
        <View style={{ height: 64 }} />
      </ScrollView>

      {/* Bottom Navigation */}
    </SafeAreaView>
  );
};


export default Home;