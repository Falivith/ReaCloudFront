import styles from './FormCadastro.module.css';
import { LabelAndInput } from '../login/LabelAndInput';
import { Button } from '../login/Button';
import styleLabelandInput from '../login/LabelAndInput.module.css'
import { useState, useEffect } from 'react';
import { login, register} from '../../services/authentication';
import { useNavigate } from 'react-router-dom';
import { BaseNotification } from "../modals/BaseNotification";
import { CustomSelector } from '../CustomSelector';

export function FormCadastro() {

    const navigate = useNavigate();

    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    const closeNotification = () => {
        setShowNotification(false);
    };

    const updateSelected = (id, s) => {
        setValues(prevState => ({
            ...prevState, 
            [id]: s
        }))
    }

    const initialValues = {
        nome: '',
        sobrenome: '',
        instituicao: '',
        perfil: '',
        email: '',
        password: '',
    };

    const [values, setValues] = useState(initialValues);

    /*useEffect(() => {
        console.log(values); // Descomentar para printar o estado do formulário
    }, [values]);*/

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

        /*if(values.perfil == ""){
            console.log("Erro, escolha um perfil");
        }*/

        try {
            if (values.nome.length > 2 && values.email.length > 0) {
                const result1 = await register(values)
                const result2 = await login({email : values.email, password : values.password   })
                navigate('/');
                setShowNotification(true);
                setNotificationType('saveSuccess'); 
            } else {
                setShowNotification(true);
                setNotificationType('saveError'); 
                throw new Error('Nome ou email inválidos!');
            }
        }
        catch (exception) {
            console.log("erro no cadastro");
        }
    }
    
    return(
        <div className={styles.containerForm}>
            {(<BaseNotification type = {notificationType} showing={showNotification} onClose={closeNotification}  />)}
            <form onSubmit={handleSubmit}>
                <LabelAndInput value = {values.nome} onChange={handleChange} name="nome" labelText={'NOME'} inputType={'text'} placeholderText={'Nome'} inputStyle = {styleLabelandInput.input}/>
                <div className = {styles.divSpacing}> <LabelAndInput value = {values.sobrenome} onChange={handleChange} name="sobrenome" inputStyle = {styleLabelandInput.input} labelText = {'SOBRENOME'} inputType={'text'} placeholderText = {'Sobrenome'}/>          </div>
                <div className = {styles.divSpacing}> <LabelAndInput value = {values.instituicao} onChange={handleChange} name="instituicao" inputStyle = {styleLabelandInput.input} labelText = {'INSTITUIÇÃO DE ENSINO'} inputType = {'text'} placeholderText = {'Instituição de ensino'}/> </div>

                <p className= {styles.label}> PERFIL </p>
                <CustomSelector
                        id = "knowledgeArea"
                        selectorId={1}
                        width={"364px"}
                        height={"44px"}
                        placeholder = {"Escolha..."}
                        options={["Estudante", "Professor", "Outro"]}
                        handleResult = { updateSelected }
                />
                
                <div className = {styles.divSpacing}> <LabelAndInput value = {values.email} onChange={handleChange} name="email" inputStyle = {styleLabelandInput.input} labelText = {'E-MAIL'} inputType={'email'} placeholderText = {'E-mail'}/>          </div>
                <div className = {styles.twoItens}> 
                <LabelAndInput value = {values.password} onChange={handleChange} name="password" inputStyle = {styleLabelandInput.input2} labelText = {'SENHA'} inputType = {'password'} placeholderText = {'• • • • • • •'}/>          
                <LabelAndInput inputStyle = {styleLabelandInput.input2} labelText = {'REPETIR SENHA'} inputType = {'password'} placeholderText = {'• • • • • • •'}/>        
                </div>
                <div style= {{"marginTop": "1rem"}}> <Button textButton={"CADASTRAR"}/> </div>
            </form> ''
        </div>
    )
}
