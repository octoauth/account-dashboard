import http from '@/plugins/http'

export default {
    namespaced: true,
    actions: {
        uploadFile(context, fileData){
            return new Promise(resolve=>{
                const formData = new FormData();
                formData.append("file", fileData);
                http.post("/upload", formData, {headers: {Accept: 'application/json'}})
                .then(response=>resolve(response.data));
            })
        }
    }
}