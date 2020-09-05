import { BACKEND_URL_VIDEOS, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_API } from '../components/constant/constant';
import Axios from 'axios';

export default {
    create: (formData, bodyData) => {
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        return Axios({
            url: CLOUDINARY_API,
            method: 'POST',
            data: formData
        })
            .then(res => {
                if (res.status === 200) {
                    bodyData.cloud = res.data
                    return fetch(`${BACKEND_URL_VIDEOS}/`, {
                        body: JSON.stringify(bodyData),
                        credentials: 'include',
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'access_token': localStorage.getItem('access_token')
                        }
                    })
                        .then(res => res)
                        .catch(err => err)
                }
            })
            .catch(err => err)
    },
    getAll: () => {
        return Axios.get(`${BACKEND_URL_VIDEOS}/`)
            .then(response => response)
            .catch(err => err)
    },
    getByUserID: (userID) => {
        console.log(userID)
        return Axios.get(`${BACKEND_URL_VIDEOS}/${userID}`)
            .then(response => response)
            .catch(err => err)
    },
    deleteOneByID: (videoID) => {
        return Axios.delete(`${BACKEND_URL_VIDEOS}/${videoID}/delete`)
            .then(response => {
                console.log(response)
                return response
            })
            .catch(err => err)
    },
    updateOneByID: (videoID, data) => {
        console.log(data)
        return Axios.put(`${BACKEND_URL_VIDEOS}/${videoID}/update`, data)
            .then(response => {
                console.log(response)
                return response
            })
            .catch(err => err)
    },
    getVideo: (videoID) => {
        return Axios.post(`${BACKEND_URL_VIDEOS}/getVideo`, videoID)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(err => err)
}
}