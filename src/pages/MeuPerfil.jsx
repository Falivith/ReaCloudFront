import { Header } from '../components/Header';
import { Help } from '../components/Help';
import { MeusDados } from '../components/profile/MeusDados';
import { MeuEmailESenha } from '../components/profile/MeuEmailESenha'
import { useEffect, useState } from 'react';
import { getUser, updateUser, updateUserAccount } from '../services/authentication';

export function MeuPerfil() {
    
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
                const result = await updateUser(values)
                console.log('result = ', result);
            }
            catch (exception) {
                console.log("erro ao atualizar");
            }
        }
        
        else if (e.target.name === 'MeuEmailESenha'){
            const result = await updateUserAccount(values.password,values.newPassword)
            console.log('result feijoada = ', result);
        }
      
    }
    
    
    return (
        <div>
            <Header notificationNumber = {4}/> 
            <MeusDados values = {values}  handleChange={handleChange}  handleSubmit={handleSubmit} />
            <MeuEmailESenha values = {values} handleChange={handleChange} handleSubmit={handleSubmit} />
            <Help/>
        </div>
    )
}
