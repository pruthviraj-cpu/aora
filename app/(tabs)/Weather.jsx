import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "../../constants";

const WeatherTab = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "883f2c1e3baa6d1acbbc2d93c63fa6ed";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const fetchWeather = async (cityName) => {
    if (!cityName) {
      Alert.alert("Error", "Please enter a city name");
      return;
    }

    try {
      const response = await fetch(`${API_URL}${cityName}&appid=${API_KEY}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        Alert.alert("Error", data.message || "Failed to fetch weather data");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <LinearGradient colors={["#eff6ff", "#faf5ff"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for places..."
            placeholderTextColor="#b1b1b1"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => fetchWeather(city)}
          >
            <Image source={icons.search2} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        {weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.cityName}>{weatherData.name}</Text>
            <Text style={styles.temperature}>
              {Math.round(weatherData.main.temp)}°
            </Text>
            <Text style={styles.weatherDescription}>
              {weatherData.weather[0].main}
            </Text>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>
                Humidity: {weatherData.main.humidity}%
              </Text>
              <Text style={styles.detailText}>
                Wind: {weatherData.wind.speed} km/h
              </Text>
            </View>

            <View style={styles.forecastContainer}>
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
                <View key={day} style={styles.forecastDay}>
                  <Text style={styles.forecastDayText}>{day}</Text>
                  <Image
                    source={
                      index === 0
                        ? icons.yo
                        : index === 1
                        ? icons.yo3
                        : index === 2
                        ? icons.yo
                        : index === 3
                        ? icons.yo1
                        : icons.yo4
                    }
                    style={styles.forecastIcon}
                  />
                  <Text style={styles.forecastTemp}>
                    {[32, 34, 33, 35, 31][index]}°
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    marginTop: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#611BF8",
  },
  searchButton: {
    padding: 10,
  },
  searchIcon: {
    width: 15,
    height: 18,
    // color: "",
  },
  weatherContainer: {
    alignItems: "center",
  },
  cityName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563eb",
  },
  temperature: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#9333ea",
  },
  weatherDescription: {
    fontSize: 20,
    color: "#999",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    marginTop: 20,
  },
  detailText: {
    fontSize: 18,
    color: "#000",
  },
  forecastContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  forecastDay: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  forecastDayText: {
    fontSize: 14,
    color: "#000",
  },
  forecastIcon: {
    width: 40,
    height: 40,
    marginVertical: 10,
  },
  forecastTemp: {
    fontSize: 16,
    color: "#000",
  },
});

export default WeatherTab;