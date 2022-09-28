import { v4 as uuidv4 } from 'uuid'
export const getUuid = () => {
   const uuid = localStorage.getItem('uuid')
    if (!uuid) {
        const uuid = uuidv4();
        localStorage.setItem('uuid',uuid)
   }
  return uuid
}