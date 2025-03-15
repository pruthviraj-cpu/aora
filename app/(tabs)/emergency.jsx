import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons

const Emergency = () => {
  // Function to handle SOS button press
  const handleSOSPress = () => {
    Linking.openURL('tel:911'); // Replace '911' with the local emergency number
  };

  // Function to handle Police button press
  const handlePolicePress = () => {
    Linking.openURL('tel:100'); // Replace '100' with the local police number
  };

  // Function to handle Hospital button press
  const handleHospitalPress = () => {
    Linking.openURL('tel:107'); // Replace '107' with the local hospital number
  };

  // Function to handle Fire Dept button press
  const handleFireDeptPress = () => {
    Linking.openURL('tel:101'); // Replace '101' with the local fire department number
  };

  // Function to handle Interactive Map button press
  const handleInteractiveMapPress = () => {
    const searchQuery = 'hospital'; // Search query for hospitals
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open Google Maps.');
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EMERGENCY ASSISTANCE</Text>
        <Text style={styles.headerSubtitle}>Quick access to help when you need it most.</Text>
      </View>

      {/* Quick Access Buttons */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={handlePolicePress}>
          <MaterialIcons name="local-police" size={24} color="red" />
          <Text style={styles.buttonText}>Police</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleHospitalPress}>
          <MaterialIcons name="local-hospital" size={24} color="green" />
          <Text style={styles.buttonText}>Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFireDeptPress}>
          <MaterialIcons name="local-fire-department" size={24} color="orange" />
          <Text style={styles.buttonText}>Fire Dept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="contacts" size={24} color="blue" />
          <Text style={styles.buttonText}>Contacts</Text>
        </TouchableOpacity>
      </View>

      {/* Nearby Emergency Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Emergency Services</Text>
        <TouchableOpacity style={styles.mapButton} onPress={handleInteractiveMapPress}>
          <Text style={styles.mapButtonText}>Interactive Map</Text>
        </TouchableOpacity>
        <View style={styles.serviceList}>
          <View style={styles.serviceItem}>
            <MaterialIcons name="local-police" size={20} color="red" />
            <Text style={styles.serviceText}>Police Station: <Text style={styles.boldText}>1.2 km</Text></Text>
          </View>
          <View style={styles.serviceItem}>
            <MaterialIcons name="local-hospital" size={20} color="green" />
            <Text style={styles.serviceText}>Hospital: <Text style={styles.boldText}>0.8 km</Text></Text>
          </View>
          <View style={styles.serviceItem}>
            <MaterialIcons name="local-fire-department" size={20} color="orange" />
            <Text style={styles.serviceText}>Fire Station: <Text style={styles.boldText}>2.5 km</Text></Text>
          </View>
        </View>
      </View>

      {/* What to Do in an Emergency */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What to Do in an Emergency</Text>
        <View style={styles.tipList}>
          <View style={styles.tipItem}>
            <MaterialIcons name="badge" size={20} color="blue" />
            <Text style={styles.tipText}>Lost Passport: Contact your embassy immediately and report the loss to local police.</Text>
          </View>
          <View style={styles.tipItem}>
            <MaterialIcons name="emergency" size={20} color="red" />
            <Text style={styles.tipText}>Medical Emergency: Call emergency services or go to the nearest hospital.</Text>
          </View>
          <View style={styles.tipItem}>
            <MaterialIcons name="warning" size={20} color="yellow" />
            <Text style={styles.tipText}>Natural Disaster: Follow local authority instructions and locate safe zones.</Text>
          </View>
        </View>
      </View>

      {/* SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
        <MaterialIcons name="emergency" size={24} color="white" />
        <Text style={styles.sosButtonText}>SOS Button</Text>
      </TouchableOpacity>

      {/* Embassy/Consulate Help */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Embassy/Consulate Help</Text>
        <View style={styles.embassyList}>
          <View style={styles.embassyItem}>
            <MaterialIcons name="location-on" size={20} color="blue" />
            <Text style={styles.embassyText}>US Embassy: <Text style={styles.boldText}>3.0 km</Text></Text>
          </View>
          <View style={styles.embassyItem}>
            <MaterialIcons name="location-on" size={20} color="blue" />
            <Text style={styles.embassyText}>UK Consulate: <Text style={styles.boldText}>4.5 km</Text></Text>
          </View>
        </View>
      </View>

      {/* Important Numbers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Important Numbers</Text>
        <View style={styles.numberList}>
          <View style={styles.numberItem}>
            <MaterialIcons name="call" size={20} color="purple" />
            <Text style={styles.numberText}>Emergency: <Text style={styles.boldText}>911</Text></Text>
          </View>
          <View style={styles.numberItem}>
            <MaterialIcons name="call" size={20} color="purple" />
            <Text style={styles.numberText}>Tourist Police: <Text style={styles.boldText}>+1-555-123-4567</Text></Text>
          </View>
        </View>
      </View>

      {/* Safety Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Safety Tips</Text>
        <View style={styles.tipList}>
          <View style={styles.tipItem}>
            <MaterialIcons name="tips-and-updates" size={20} color="teal" />
            <Text style={styles.tipText}>Keep copies of important documents.</Text>
          </View>
          <View style={styles.tipItem}>
            <MaterialIcons name="tips-and-updates" size={20} color="teal" />
            <Text style={styles.tipText}>Register with your embassy when traveling.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 12,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#4b5563',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    width: '48%',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    marginTop: 8,
    fontSize: 14,
    color: '#1f2937',
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 12,
  },
  mapButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  mapButtonText: {
    fontSize: 14,
    color: '#1f2937',
  },
  serviceList: {
    marginTop: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4b5563',
  },
  boldText: {
    fontWeight: '600',
    color: '#2563eb',
  },
  tipList: {
    marginTop: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  tipText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4b5563',
  },
  sosButton: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sosButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  embassyList: {
    marginTop: 8,
  },
  embassyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  embassyText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4b5563',
  },
  numberList: {
    marginTop: 8,
  },
  numberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  numberText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4b5563',
  },
});

export default Emergency;