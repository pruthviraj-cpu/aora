import { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/appwrite";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

const SettingItem = ({ icon, title, onPress }) => (
  <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-2">
    <View className="flex flex-row items-center gap-2">
      <Image source={icon} className="w-5 h-5" />
      <Text className="text-base font-rubik-medium text-black-300">{title}</Text>
    </View>
    <Image source={icons.rightArrow} className="w-4 h-4" />
  </TouchableOpacity>
);

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [userData, setUserData] = useState({
    name: user?.name || "Guest User",
    avatar: user?.avatar || "https://your-default-avatar-url.com",
  });
  const [newName, setNewName] = useState(userData.name);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!auth.currentUser) return;
        const db = getFirestore();
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setUser((prev) => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // 🔹 Select & Upload Profile Picture
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      await uploadProfileImage(result.assets[0].uri);
    }
  };

  // 🔹 Upload Image to Firebase Storage
  const uploadProfileImage = async (uri) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}.jpg`);
      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      // Update Firestore
      const db = getFirestore();
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { avatar: downloadURL });

      setUserData((prev) => ({ ...prev, avatar: downloadURL }));
      setUser((prev) => ({ ...prev, avatar: downloadURL }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // 🔹 Update Name in Firestore
  const updateName = async () => {
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { name: newName });

      setUserData((prev) => ({ ...prev, name: newName }));
      setUser((prev) => ({ ...prev, name: newName }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  // 🔹 Logout Function
  const logout = async () => {
    try {
      setUser(null);
      setIsLogged(false);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            {/* 🔹 Profile Picture */}
            <TouchableOpacity onPress={pickImage} className="w-20 h-20 border rounded-full mt-14">
              <Image
                source={{ uri: userData.avatar }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            </TouchableOpacity>

            {/* 🔹 Display Name & Allow Editing */}
            <View className="flex flex-row items-center mt-4">
              {isEditing ? (
                <TextInput
                  value={newName}
                  onChangeText={setNewName}
                  className="border-b border-gray-400 text-lg font-rubik-medium text-black-300 px-2"
                />
              ) : (
                <Text className="text-lg font-rubik-medium text-black-300">
                  {userData.name}
                </Text>
              )}
              <TouchableOpacity onPress={() => (isEditing ? updateName() : setIsEditing(true))}>
                <Image source={icons.edit} className="w-5 h-5 ml-2" />
              </TouchableOpacity>
            </View>

            {/* 🔹 Settings Menu */}
            <View className="flex w-full mt-16">
              <SettingItem icon={icons.calendar} title="My Bookings" />
              <SettingItem icon={icons.wallet} title="Payments" />
              <SettingItem icon={icons.profile} title="Profile" />
              <SettingItem icon={icons.notifications} title="Notifications" />
              <SettingItem icon={icons.shield} title="Security" />
              <SettingItem icon={icons.language} title="Language" />
              <SettingItem icon={icons.settings} title="Settings" onPress={() => setIsEditing(true)} />
            </View>

            {/* 🔹 Logout Button */}
            <TouchableOpacity onPress={logout} className="mt-4">
              <View className="flex flex-row items-center gap-2">
                <Image source={icons.logout} className="w-5 h-5" />
                <Text className="text-lg font-rubik-medium text-red-500">Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
