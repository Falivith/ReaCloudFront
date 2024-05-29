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

    const initialValues = {
        given_name: '',
        family_name: '',
        institution: '',
        profile: '',
    };

    const [values, setValues] = useState(initialValues);

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
                profile_picture: response.profilePicture || '',
              });
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          }
        }

        fetchData();
    }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value,
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if (e.target.name === 'MeusDados'){
            try {
                const valores = { ...values };
                const result = await updateUser(valores)
                if (result.status === 200){
                    setNotificationType('savePerfilSuccess'); 
                }else{
                    setNotificationType('saveError');   
                }

                setShowNotification(true);
            }

            catch (exception) {
                console.log(exception);
            }
        }
    }
    
    return (
        <div>
            <Header notificationNumber = {0}/>
            {(<BaseNotification type = {notificationType} showing={showNotification} onClose={closeNotification} />)}
            <MeusDados values = {values}  handleChange={handleChange}  handleSubmit={handleSubmit} />
            <Help/>
        </div>
    )
}
