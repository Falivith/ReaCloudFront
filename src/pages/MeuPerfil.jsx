import { Header } from '../components/Header';
import { Help } from '../components/Help';
import { MeusDados } from '../components/profile/MeusDados';
import { MeuEmailESenha } from '../components/profile/MeuEmailESenha'
import { useEffect, useState } from 'react';
import { getUser } from '../services/authentication';

export function MeuPerfil() {
    
    const initialValues = {
        nome: '',
        sobrenome: '',
        instituicao: '',
        perfil: '',
        email: '',
        password: '',
    };

    const [values, setValues] = useState(initialValues);



    useEffect(() => {
        async function fetchData(){
            setValues(await getUser()) 
        }
        fetchData()
      }, [])

      const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('e.target = ', e.target);
        setValues({
        ...values,
        [name]: value,
        });
    };
    
    
    return (
        <div>
            <Header notificationNumber = {4}/> 
            <MeusDados values = {values}  handleChange={handleChange} />
            <MeuEmailESenha values = {values} andleChange={handleChange} />
            <Help/>
        </div>
    )
}
