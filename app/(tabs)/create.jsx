import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Create = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [currentAddress, setCurrentAddress] = useState('Fetching your location...');

  useEffect(() => {
    console.log('Initializing Geolocation...');
    requestLocationPermission();
  }, []);

  // Request location permission for both Android and iOS
  const requestLocationPermission = async () => {
    console.log('Requesting location permission...');
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show it on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted on Android.');
          getCurrentLocation();
        } else {
          console.log('Location permission denied on Android.');
          setCurrentAddress('Location permission denied.');
        }
      } catch (err) {
        console.warn('Error requesting location permission on Android:', err);
      }
    } else if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse').then((status) => {
        if (status === 'granted') {
          console.log('Location permission granted on iOS.');
          getCurrentLocation();
        } else {
          console.log('Location permission denied on iOS.');
          setCurrentAddress('Location permission denied.');
        }
      });
    }
  };

  // Get the user's current location
  const getCurrentLocation = () => {
    console.log('Fetching current location...');
    if (!Geolocation) {
      console.error('Geolocation is not available.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Location fetched successfully:', position);
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchAddress(latitude, longitude);
      },
      (error) => {
        console.log('Error fetching location:', error.code, error.message);
        setCurrentAddress('Location access denied or failed.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Fetch address from coordinates
  const fetchAddress = (lat, lon) => {
    console.log('Fetching address for coordinates:', lat, lon);
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then(response => response.json())
      .then(data => {
        console.log('Address fetched successfully:', data);
        setCurrentAddress(data.display_name || 'Your current location');
      })
      .catch(() => {
        console.log('Error fetching address.');
        setCurrentAddress('Your current location');
      });
  };

  // Search for a location
  const handleSearchLocation = () => {
    console.log('Searching for location:', searchLocation);
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          console.log('Location found:', data[0]);
          const { lat, lon } = data[0];
          setDestination({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
        } else {
          console.log('Location not found.');
          alert('Location not found! Try a different search.');
        }
      })
      .catch(() => {
        console.log('Error searching for location.');
        alert('Error searching for the location.');
      });
  };

  // Get directions between user location and destination
  const getDirections = () => {
    if (!userLocation || !destination) {
      alert('Please set both your location and destination first.');
      return;
    }

    const origin = `${userLocation.latitude},${userLocation.longitude}`;
    const dest = `${destination.latitude},${destination.longitude}`;

    fetch(`https://router.project-osrm.org/route/v1/driving/${origin};${dest}?overview=full`)
      .then(response => response.json())
      .then(data => {
        if (data.routes && data.routes[0]) {
          const coordinates = data.routes[0].geometry.coordinates.map(coord => ({
            latitude: coord[1],
            longitude: coord[0],
          }));
          setRouteCoordinates(coordinates);
        }
      })
      .catch(() => alert('Error fetching directions.'));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search location..."
            placeholderTextColor="#9ca3af"
            value={searchLocation}
            onChangeText={setSearchLocation}
            onSubmitEditing={handleSearchLocation}
          />
        </View>
      </View>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        region={userLocation ? {
          ...userLocation,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        } : null}
      >
        {userLocation && <Marker coordinate={userLocation} title="You are here" />}
        {destination && <Marker coordinate={destination} title="Destination" />}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="#3b82f6"
          />
        )}
      </MapView>

      {/* Location Card */}
      <View style={styles.locationCard}>
        <View style={styles.locationHeader}>
          <View style={styles.iconContainer}>
            <Icon name="navigation" size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.locationTitle}>Current Location</Text>
            <Text style={styles.locationAddress}>{currentAddress}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={getDirections}>
            <Icon name="directions" size={20} color="#fff" />
            <Text style={styles.actionText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Icon name="share" size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Icon name="bookmark" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Controls */}
      <TouchableOpacity style={styles.mapControl} onPress={requestLocationPermission}>
        <Icon name="my-location" size={24} color="#3b82f6" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 999,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#1f2937',
  },
  map: {
    flex: 1,
  },
  locationCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: '#3b82f6',
    borderRadius: 999,
    padding: 12,
    marginRight: 12,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  locationAddress: {
    fontSize: 14,
    color: '#6b7280',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: '#f9fafb',
    padding: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  mapControl: {
    position: 'absolute',
    right: 16,
    top: 80,
    backgroundColor: '#ffffff',
    borderRadius: 999,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default Create;