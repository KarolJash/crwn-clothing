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

export const createUserProfileDocument = async (userAuth, additionalDATA) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const {
            displayName,
            email
        } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalDATA
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {
            title,
            items
        } = doc.data()

        return {
            // when you pass a string into encodeURI, i will return a readable string for a url
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items

        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase