import { Header } from '../components/Header';
import { Help } from '../components/Help';
import { MeusDados } from '../components/profile/MeusDados';
import { MeuEmailESenha } from '../components/profile/MeuEmailESenha'
import { useEffect, useState } from 'react';
import { getUser, updateUser, updateUserAccount } from '../services/authentication';
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
        async function fetchData(){
            const some_values = await getUser()
            const all_values = {...some_values, password: values.password, newPassword: values.newPassword}
            setValues(all_values) 
        }
        fetchData()
      }, [])

      const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value,
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log('e = ', e.target.name);
        console.log('values = ', values);
        if (e.target.name === 'MeusDados'){
            try {
                const valores = { ...values };
                delete valores.password; 
                delete valores.newPassword;    
                console.log("valores = ", valores);
                const result = await updateUser(valores)
                
                
                console.log('result = ', result.data);
                console.log('codigo= ', result.status);
     
                setShowNotification(true);
                if (result.status === 200){
                    setNotificationType('savePerfilSuccess'); 
                }   

                if (result.status === 400){
                    setNotificationType('saveError');   
                }
                
            }

            catch (exception) {
                console.log("algum erro aconteceu", exception);

            }
        }
        
        else if (e.target.name === 'MeuEmailESenha'){
            console.log("atualizando  ",values.password,values.newPassword);
            const result = await updateUserAccount(values.password,values.newPassword)
            console.log('result= ', result);
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
