import { Header } from '../components/Header';
import { Help } from '../components/Help';
import { MeusDados } from '../components/profile/MeusDados';
import { useEffect, useState } from 'react';
import { getUser, updateUser, getUserInfoFromJWT } from '../services/authentication';
import { BaseNotification } from '../components/modals/BaseNotification';

export function MeuPerfil() {

    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    const closeNotification = () => {
        setShowNotification(false);
    };

    const [values, setValues] = useState({
        given_name: '',
        family_name: '',
        institution: '',
        profile: '',
        profile_picture: ''
      });

    useEffect(() => {
        async function fetchData() {
          const userInfo = await getUserInfoFromJWT();

          if (userInfo && userInfo.email) {
            try {
              const response = await getUser(userInfo.email);
              setValues({
                given_name: response.given_name || '',
                family_name: response.family_name || '',
                institution: response.institution || '',
                profile: response.profile || '',
                profile_picture: localStorage.getItem("profilePicture") || '',
              });
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          }
        }

        fetchData();
    }, []);


    const handleSubmit = async(e, formValues) => {
        e.preventDefault();
        if (e.target.name === 'MeusDados'){
          try {
            const result = await updateUser(formValues);
            if (result.status === 200){
              setValues(formValues); // Update parent state
              setNotificationType('savePerfilSuccess'); 
            } else {
              setNotificationType('saveError');   
            }
            setShowNotification(true);
          } catch (exception) {
            console.error(exception);
          }
        }
      };
    
    return (
        <div>
            <Header notificationNumber = {0}/>
            {(<BaseNotification type = {notificationType} showing={showNotification} onClose={closeNotification} />)}
            <MeusDados values = {values}  handleSubmit={handleSubmit} />
            <Help/>
        </div>
    )
}
