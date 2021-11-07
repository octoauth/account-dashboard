import fileServerClient from '@/clients/fileserver'

export default {
    namespaced: true,
    actions: {
        uploadImage(context, fileData){
            console.log(fileData);
            return fileServerClient.uploadImage(fileData);
        }
    }
}