import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBIvZzB2x6g60F62hZVuDqQlQ-nCKtBELg',
  authDomain: 'fireshoes-97b04.firebaseapp.com',
  projectId: 'fireshoes-97b04',
  storageBucket: 'fireshoes-97b04.appspot.com',
  messagingSenderId: '151897863485',
  appId: '1:151897863485:web:9b5bb62764831a3aa18154'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
