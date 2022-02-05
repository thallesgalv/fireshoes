import { getStorage } from 'firebase/storage'
import { app } from './app'

export { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const storage = getStorage(app)
