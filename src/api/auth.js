import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "/src/firebase";

const requestLogin = async ({ email, password }) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const user = userDocs.find((user) => user.password === password);
      if (user) {
        const { id, email, firstName, lastName } = user;
        return { id, email, firstName, lastName };
      } else {
        throw new Error("Password does not match.");
      }
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    console.error("Login request failed:", error);
    throw new Error("Login process failed due to network or server issues.");
  }
};

const requestCreateUser = async ({ firstName, lastName, email, password }) => {
  try {
    await addDoc(collection(db, "users"), {
      firstName,
      lastName,
      email,
      password,
    });
  } catch (error) {
    console.error("User creation failed:", error);
    throw new Error("Failed to create user due to network or server issues.");
  }
};

const requestUpdateUserProfile = async (
  uid,
  { firstName, lastName, email, password }
) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      firstName,
      lastName,
      email,
      ...(password && { password }),
    });

    const updatedUserSnap = await getDoc(userRef);
    if (updatedUserSnap.exists()) {
      const { email, firstName, lastName } = updatedUserSnap.data();
      return { id: updatedUserSnap.id, email, firstName, lastName };
    } else {
      throw new Error("Failed to fetch updated user profile.");
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Update failed due to network or server issues.");
  }
};

export { requestLogin, requestCreateUser, requestUpdateUserProfile };
