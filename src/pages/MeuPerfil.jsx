import { Header } from '../components/Header';
import { Help } from '../components/Help';
import { MeusDados } from '../components/profile/MeusDados';
import { MeuEmailESenha } from '../components/profile/MeuEmailESenha'
import { useEffect, useState } from 'react';
import { getUser, updateUser, updateUserAccount, getUserInfoFromJWT } from '../services/authentication';
import { BaseNotification } from '../components/modals/BaseNotification';

export function MeuPerfil() {

    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    const closeNotification = () => {
        setShowNotification(false);
    };

    const initialValues = {
        nome: '',
        sobrenome: '',
        instituicao: '',
        perfil: '',
        email: '',
        password: '',
        newPassword: '',
    };

    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        async function fetchData() {
          const userInfo = await getUserInfoFromJWT();

          if (userInfo && userInfo.email) {
            try {
              const response = await getUser(userInfo.email);
              //console.log(response);

              setValues({
                nome: response.given_name || '',
                sobrenome: response.family_name || '',
                instituicao: response.institution || '',
                perfil: response.profile || '',
                email: response.email || '',
                password: '',
                newPassword: '',
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
        
        console.log(values);
        e.preventDefault();

        if (e.target.name === 'MeusDados'){
            try {
                const valores = { ...values };
                delete valores.password; 
                delete valores.newPassword;    

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
        
        else if (e.target.name === 'MeuEmailESenha'){
            const result = await updateUserAccount(values.password, values.newPassword)
        }
    }
    
    return (
        <div>
            <Header notificationNumber = {0}/>
            {(<BaseNotification type = {notificationType} showing={showNotification} onClose={closeNotification} />)}
            <MeusDados values = {values}  handleChange={handleChange}  handleSubmit={handleSubmit} />
            <MeuEmailESenha values = {values} handleChange={handleChange} handleSubmit={handleSubmit} />
            <Help/>
        </div>
    )
}
