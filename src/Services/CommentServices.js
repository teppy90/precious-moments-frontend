import { BACKEND_URL_COMMENTS, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_API } from '../components/constant/constant';
import Axios from 'axios';
const TEST_URL = 'https://httpbin.org/anything';
//const CLOUDINARY_URL = 'cloudinary://745192938862393:h9Ig4ONckIOF-o0pTvvVouq--w0@dgsrnct2b';

export default {
    getAllCommentsinOneVideo: (variable) => {
        return Axios.post(`${BACKEND_URL_COMMENTS}/`, variable )
            .then(response => response)
            .catch(err => err)
    },

   saveComments: (variable) => {
        return Axios.post(`${BACKEND_URL_COMMENTS}/savecomment`, variable)
            .then(response => response)
            .catch(err => err)
    },
}