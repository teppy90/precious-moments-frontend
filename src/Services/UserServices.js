import { BACKEND_URL_USERS } from '../components/constant/constant';
import Axios from 'axios';

export default {
    getUserInfo: (userID) => {
        return Axios.get(`${BACKEND_URL_USERS}/${userID}`)
            .then(response => response)
            .catch(err => err)
    },
}