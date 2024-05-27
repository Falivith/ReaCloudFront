import { Header } from '../components/Header';
import { Help } from '../components/Help';
import { MeusDados } from '../components/profile/MeusDados';
import { MeuEmailESenha } from '../components/profile/MeuEmailESenha'
import { useEffect, useState } from 'react';
import { getUser, loginWithGoogle, updateUser, updateUserAccount } from '../services/authentication';
import { BaseNotification } from '../components/modals/BaseNotification';
import { checkLoginStatus } from '../services/utils';

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
          // Espera pela resolução da promessa retornada por checkLoginStatus
          //const loginStatus = await loginWithGoogle();
          //console.log(loginStatus);
        }
        
        fetchData(); // Chama a função assíncrona
      }, []);
    
    /*useEffect(() => {
        console.log(checkLoginStatus());
        /*async function fetchData(){
            const some_values = await getUser()
            const all_values = {...some_values, password: values.password, newPassword: values.newPassword}
            setValues(all_values) 
        }
        fetchData()
      }, [])*/

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
