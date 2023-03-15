import { ProfileLabelAndInput } from './ProfileLabelAndInput';
import styles from './Profile.module.css';
import MeusDadosImg from '../../assets/User_cicle_lightblue.png'
import '../../global.css'
import {useState,useEffect} from 'react';
import { getUser } from '../../services/authentication';

export function MeusDados() {
    
    const initialValues = {
        nome: '',
        sobrenome: '',
        instituicao: '',
        perfil: '',
        email: '',
        password: '',
    };

    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value,
        });
    };
    
   
    useEffect(() => {
        async function fetchData(){
        const user = window.localStorage.getItem('user')
        if (user) {
          const userObject = JSON.parse(user)
          const userInfo = await getUser(userObject.email,userObject.token)
          console.log('userInfo = ', userInfo);
          setValues({...userInfo})  
        }}
        fetchData()
      }, [])
    
    
    
    
    
    return(
        <div className={styles.containerForm}>
            <form>
            <div className={styles.addNewReasLabel}>
                    <img src = { MeusDadosImg } alt = "Meus Dados" />
                    <h1>Meus Dados</h1>
            </div>
            <fieldset className={styles.fieldset}>
                    <ProfileLabelAndInput name={'nome'} value={values.nome} onChange = {handleChange} labelText={'NOME'} inputType={'text'} placeholderText={'Nome'} />
                    <ProfileLabelAndInput name={'sobrenome'} value={values.sobrenome} onChange = {handleChange} labelText={'SOBRENOME'} inputType={'text'} placeholderText={'Sobrenome'} />
                    <ProfileLabelAndInput name={'instituicao'} value={values.instituicao} onChange = {handleChange} labelText={'INSTITUIÇÃO DE ENSINO'} inputType={'text'} placeholderText={'Instituição de Ensino'} />
                    <ProfileLabelAndInput name={'perfil'} value={values.perfil} onChange = {handleChange} labelText={'PERFIL'} inputType={'text'} placeholderText={'Perfil'} showButton={false}/>
                    
                    <input className={styles.whiteButton} type="reset" value="Cancelar"></input>
                    <input className={styles.blueSearchButton} type="submit" value="Salvar"></input>

            </fieldset>
            </form>
        </div>
    );
}
