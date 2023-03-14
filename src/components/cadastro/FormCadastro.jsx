import styles from './FormCadastro.module.css';
import { LabelAndInput } from '../login/LabelAndInput';
import { Button } from '../login/Button';
import styleLabelandInput from '../login/LabelAndInput.module.css'
import { useState } from 'react';
import register from '../../services/authentication';


export function FormCadastro() {


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

const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log('values =\n', values);
    try {
        const user = await register({
          values
        })
        console.log('user', user);
    }
    catch (exception) {
        console.log("erro");
    }
}
  
  
  
return(
    <div className={styles.containerForm}>
        <form onSubmit={handleSubmit}>
            <LabelAndInput value = {values.nome} onChange={handleChange} name="nome" labelText={'NOME'} inputType={'text'} placeholderText={'Nome'} inputStyle = {styleLabelandInput.input}/>
            <div className = {styles.divSpacing}> <LabelAndInput value = {values.sobrenome} onChange={handleChange} name="sobrenome" inputStyle = {styleLabelandInput.input} labelText = {'SOBRENOME'} inputType={'text'} placeholderText = {'Sobrenome'}/>          </div>
            <div className = {styles.divSpacing}> <LabelAndInput value = {values.instituicao} onChange={handleChange} name="instituicao" inputStyle = {styleLabelandInput.input} labelText = {'INSTITUIÇÃO DE ENSINO'} inputType = {'text'} placeholderText = {'Instituição de ensino'}/>          </div>
            <div className = {styles.divSpacing}> <LabelAndInput value = {values.perfil} onChange={handleChange} name="perfil" inputStyle = {styleLabelandInput.input} labelText = {'PERFIL'} inputType={'text'} placeholderText = {'Selecione...'}/>          </div>
            <div className = {styles.divSpacing}> <LabelAndInput value = {values.email} onChange={handleChange} name="email" inputStyle = {styleLabelandInput.input} labelText = {'E-MAIL'} inputType={'email'} placeholderText = {'E-mail'}/>          </div>
            <div className = {styles.twoItens}> 
            <LabelAndInput value = {values.password} onChange={handleChange} name="password" inputStyle = {styleLabelandInput.input2} labelText = {'SENHA'} inputType = {'password'} placeholderText = {'• • • • • • •'}/>          
            <LabelAndInput inputStyle = {styleLabelandInput.input2} labelText = {'REPETIR SENHA'} inputType = {'password'} placeholderText = {'• • • • • • •'}/>        
            </div>
            <div style= {{"marginop": "1rem"}}> <Button textButton={"CADASTRAR"}/> </div>
        </form> ''
    </div>
)
}