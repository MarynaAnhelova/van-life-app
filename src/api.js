import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyAvGvcrYv9HiXpty2UVMgAD0V56RjFa-Y0",
    authDomain: "vanlifeapp-d4df8.firebaseapp.com",
    projectId: "vanlifeapp-d4df8",
    storageBucket: "vanlifeapp-d4df8.firebasestorage.app",
    messagingSenderId: "683245107685",
    appId: "1:683245107685:web:b626685d3726c4bc2a170c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const vansCollectionRef = collection(db, "vans")


export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}