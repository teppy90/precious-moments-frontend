import React, {useContext} from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import GoogleLogin from 'react-google-login';
import { GOOGLE_CLIENTID, BACKEND_GOOGLE_AUTH } from '../constant/constant'
import axios from 'axios'
import renderEmpty from 'antd/lib/config-provider/renderEmpty'
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../AuthContext';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      margin: theme.spacing(0, 0, 1),
      display: 'flex',
      backgroundColor: '#DD4B39',
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
      height: '36px',
      cursor: 'pointer',
      textDecoration: 'none',
      '&:hover': {
        backgroundColor: '#D94521'
      },
      '&:active': {
        boxShadow: 'inset 0 4px 8px 0  rgba(0,0,0,0.2)'
      }
    },
    wrapper: {
      marginTop: '1px',
      marginLeft: '1px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '34px',
      height: '34px',
      borderRadius: '2px',
      backgroundColor: '#fff'
    },
    icon: {
      width: '18px',
      height: '18px'
    },
    text: {
      margin: '0 34px 0 0',
      color: '#fff',
      fontSize: '14px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      flexGrow: 1,
      textAlign: 'center',
      alignSelf: 'center'
    }
  })
)

function GoogleLoginButton (props) {

    const history = useHistory()
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);


    const responseSuccessGoogle = (response) => {
      console.log(response)
      axios({ 
        method: 'POST',
        url: BACKEND_GOOGLE_AUTH,
        data: {tokenId : response.tokenId}
        
      }).then(response => {
          console.log(response.data.user.token);
          localStorage.setItem("access_token", response.data.user.token)
          setIsAuthenticated(true)
          history.push("/");
          })}
    

    const responseErrorGoogle = (response) => {
        console.log(response)
    }

  // "width=450,height=600"

  return(
    <div >
 
          <div >
            <GoogleLogin
              clientId= {GOOGLE_CLIENTID }
              buttonText='Login with Google'
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle} 
              cookiePolicy = { 'single_host_origin' }

              >
              </GoogleLogin>
          </div>
 
  </div>
)
};




export default GoogleLoginButton 