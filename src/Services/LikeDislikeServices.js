import { BACKEND_URL_LIKES, BACKEND_URL_DISLIKES, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_API } from '../components/constant/constant';
import Axios from 'axios';

export default {
    getAllLikesinOneVideo: (variable) => {
        return Axios.post(`${BACKEND_URL_LIKES}/getLikes`, variable )
            .then(response => response)
            .catch(err => err)
    },
    getAllDislikesinOneVideo: (variable) => {
        return Axios.post(`${BACKEND_URL_DISLIKES}/getDislikes`, variable )
            .then(response => response)
            .catch(err => err)
    },
}
