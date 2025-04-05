import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();



export const addTaskToFirestore = async (task) => {
  try {
    if (typeof task === "object" && !Array.isArray(task) && task !== null) {
      if (Object.keys(task).length === 0) {
        throw new Error("O objeto de tarefa está vazio.");
      }
      const user = auth.currentUser;
      const userid = user.uid;
      const stringId = String(task.id);
      const userDocRef = doc(db, "users", userid);
      const tasksCollectionRef = collection(userDocRef, "tasks");
      const taskDocRef = doc(tasksCollectionRef, stringId);
      await setDoc(taskDocRef, task);
    } else {
      throw new Error(
        "Dados inválidos para adicionar ao Firestore. Esperado um objeto."
      );
    }
  } catch (error) {
    console.error("Erro ao adicionar o documento:", error);
  }
};

export const updatedTaskFromFirestore = async (task) => {
  try {
    const user = auth.currentUser;
    const userid = user.uid;
    const stringId = String(task.id);
    const userDocRef = doc(db, 'users', userid);
    const tasksCollectionRef = collection(userDocRef, "tasks")
    const taskDocRef = doc(tasksCollectionRef, stringId);
    await setDoc(taskDocRef, task)
  } catch(error) {
    console.error(error)
  }
}

export const removeTaskFromFirestore = async (taskId) => {
  try {
    const user = auth.currentUser;
    const userid = user.uid;
    const stringId = String(taskId);
    const userDocRef = doc(db, "users", userid);
    const tasksCollectionRef = collection(userDocRef, "tasks");
    const tasksDocRef = doc(tasksCollectionRef, stringId);
    await deleteDoc(tasksDocRef);
    console.log(`Documento com ID ${taskId} removido com sucesso.`);
  } catch (error) {
    console.error("Erro ao remover o documento:", error);
  }
};

export const getTasksFromFirestore = async () => {
  try {
    const user = auth.currentUser;
    const userid = user.uid;
    const userDocRef = doc(db, "users", userid);
    const tasksCollectionRef = collection(userDocRef, "tasks");
    const querySnapshot = await getDocs(tasksCollectionRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erro ao obter tarefas do Firestore:", error);
    return [];
  }
};

export const concludedTaskFirestore = async (taskId) => {
  try {
    const user = auth.currentUser;
    const userid = user.uid;
    const stringId = String(taskId);
    const userDocRef = doc(db, "users", userid);
    const tasksCollectionRef = collection(userDocRef, "tasks");
    const tasksDocRef = doc(tasksCollectionRef, stringId);
    await updateDoc(tasksDocRef, { completed: true });
  } catch (error) {
    console.error("Erro ao completar task", error);
  }
};

export const notConludedTaksFirestore = async (taskId) => {
  try {
    const user = auth.currentUser;
    const userid = user.uid;
    const stringId = String(taskId);
    const userDocRef = doc(db, "users", userid);
    const tasksCollectionRef = collection(userDocRef, "tasks");
    const tasksDocRef = doc(tasksCollectionRef, stringId);
    await updateDoc(tasksDocRef, { completed: false });
  } catch (error) {
    console.error("Erro ao descompletar task", error);
  }
};

export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userid = user.uid;

    await updateProfile(user, { displayName });

    if (user) {
      try {
        const docRef = doc(db, "users", userid);
        const newUser = {
          username: user.displayName,
          email: user.email,
        };
        await setDoc(docRef, newUser);
      } catch (error) {
        console.error("Erro ao salvar usuário no Firestore", error);
      }
    }

    return user;
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const { user } = result;

    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        const newUser = {
          username: user.displayName,
          email: user.email,
        };
        await setDoc(docRef, newUser);
      } catch (error) {
        console.error("Erro ao salvar usuário no Firestore", error);
      }
    }

    return user;
  } catch (error) {
    console.error('Erro ao fazer login com Google:', error.message);
    throw error;
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao sair:", error);
    throw error;
  }
};
