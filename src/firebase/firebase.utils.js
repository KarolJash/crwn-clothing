import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAgMbT4zyDY1Hse9q3Zkn0BY2AmyYQ0y7o",
    authDomain: "crwn-db-f3b57.firebaseapp.com",
    databaseURL: "https://crwn-db-f3b57.firebaseio.com",
    projectId: "crwn-db-f3b57",
    storageBucket: "crwn-db-f3b57.appspot.com",
    messagingSenderId: "872110416038",
    appId: "1:872110416038:web:909c2d338327a1c5cb5467",
    measurementId: "G-ML26X6JTXE"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase