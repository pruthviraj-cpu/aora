import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { getStorage,ref,uploadBytes,getDownloadURL, } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiBYP33AF3m3Xvjhk6urkMuQ86EZFJfSk",
  authDomain: "fantom-fe2d1.firebaseapp.com",
  projectId: "fantom-fe2d1",
  storageBucket: "fantom-fe2d1.firebasestorage.app",
  messagingSenderId: "383619636051",
  appId: "1:383619636051:web:dad1ca80eede22e99e5fa6",
  measurementId: "G-HY8Q1V331Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Register user
export async function createUser(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email,
      username,
      avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get Current User
export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
}

// Sign Out
export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Upload File
export async function uploadFile(file, type) {
  try {
    const storageRef = ref(storage, `${type}/${file.name}`);
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);
    return fileUrl;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    const thumbnailUrl = await uploadFile(form.thumbnail, "thumbnails");
    const videoUrl = await uploadFile(form.video, "videos");

    const newPostRef = await addDoc(collection(db, "videos"), {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      creator: form.userId,
      createdAt: new Date(),
    });

    return newPostRef.id;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const postsSnapshot = await getDocs(collection(db, "videos"));
    return postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const postsQuery = query(
      collection(db, "videos"),
      where("creator", "==", userId)
    );
    const postsSnapshot = await getDocs(postsQuery);
    return postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get video posts that match search query
export async function searchPosts(queryText) {
  try {
    const postsQuery = query(
      collection(db, "videos"),
      where("title", ">=", queryText),
      where("title", "<=", queryText + "\uf8ff")
    );
    const postsSnapshot = await getDocs(postsQuery);
    return postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const postsQuery = query(
      collection(db, "videos"),
      orderBy("createdAt", "desc"),
      limit(7)
    );
    const postsSnapshot = await getDocs(postsQuery);
    return postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(error.message);
  }
}
