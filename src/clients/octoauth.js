import axios from 'axios'
import settings from '@/settings'

const http = axios.create({
    baseURL: settings.octoauthBaseURL
})

const applicationsMethods = {
    getApplicationDetails(applicationUid){
        return new Promise(resolve=>{
            http.get(`/api/oauth2/applications/${applicationUid}`)
            .then(response=>resolve(response.data));
        })
    },
    searchApplications(){
        return new Promise(resolve=>{
            http.get('/api/oauth2/applications')
            .then(response=>resolve(response.data));
        })
    },
    createApplication(application){
        return new Promise(resolve=>{
            http.post('/api/oauth2/applications', application)
            .then(response=>resolve(response.data));
        })
    },
    deleteApplication(applicationUid){
        return new Promise(resolve=>{
            http.delete(`/api/oauth2/applications/${applicationUid}`)
            .then(response=>resolve(response.data));
        })
    }
}

export default {
    ...applicationsMethods
}
