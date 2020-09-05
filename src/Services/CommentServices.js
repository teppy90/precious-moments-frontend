import { BACKEND_URL_COMMENTS, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_API } from '../components/constant/constant';
import Axios from 'axios';

export default {
    getAllCommentsinOneVideo: (variable) => {
        return Axios.post(`${BACKEND_URL_COMMENTS}/getcomments`, variable )
            .then(response => response)
            .catch(err => err)
    },
   saveComments: (variable) => {
        return Axios.post(`${BACKEND_URL_COMMENTS}/savecomment`, variable)
            .then(response => response)
            .catch(err => err)
    },
}