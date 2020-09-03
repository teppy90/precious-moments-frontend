import { BACKEND_URL_VIDEOS, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_API } from '../components/constant/constant';
import Axios from 'axios';
const TEST_URL = 'https://httpbin.org/anything';
//const CLOUDINARY_URL = 'cloudinary://745192938862393:h9Ig4ONckIOF-o0pTvvVouq--w0@dgsrnct2b';

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
            .catch (err => err)
    }
}