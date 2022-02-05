import { getStorage } from 'firebase/storage'
import { app } from '../firebase/app'

export { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const storage = getStorage(app)
