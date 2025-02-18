// Importando Firebase
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"; // Se for usar autenticação
import { getFirestore } from "firebase/firestore"; // Se for usar Firestore
import { getStorage } from "firebase/storage"; // Se for usar Storage

// Configurações do Firebase (adicione suas credenciais aqui)
const firebaseConfig = {
    apiKey: "AIzaSyATcCZaQ6AZr5pTm2HdV_1Oa4uBwWO2Uoc",
    authDomain: "dietaapp-f4103.firebaseapp.com",
    projectId: "dietaapp-f4103",
    storageBucket: "dietaapp-f4103.firebasestorage.app",
    messagingSenderId: "1087802466144",
    appId: "1:1087802466144:web:625c58b7f51f0591810805",
    measurementId: "G-FETT5SLDFL"
};

// Inicializa apenas se ainda não foi iniciado
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Exporta serviços do Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
