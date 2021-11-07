import axios from 'axios'
import settings from '@/settings'

const http = axios.create({
    baseURL: settings.fileserverBaseUrl
})

export default {
    uploadImage(fileData){
        return new Promise(resolve=>{
            const formData = new FormData();
            formData.append("file", fileData);
            http.post("/upload/images", formData, {headers: {Accept: 'application/json'}})
            .then(response=>resolve(response.data));
        })
    }
}
