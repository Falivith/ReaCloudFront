import styles from "./ReaInputForm.module.css"
import { CustomSelector } from "../CustomSelector";
import AddRing from "../../assets/Add_ring_green.png";
import FileUpload from "../../assets/FileUpload.png"
import { BaseNotification } from "../modals/BaseNotification";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

/* saveSuccess, saveError, passwordSuccess, passwordWarning, passwordError */

export function ReaInputForm(){

    const initialValues = {
        title: '',
        reatype: '',
        link: '',
        targetPublic: '',
        thumb: '',
        knowledgeArea: '',
        license: '',
        language: '',
        description: '',
        instructions: '',
    };

    const [ result, setResult ] = useState(initialValues)

    const updateSelected = (id, s) => {
        setResult(prevState => ({
            ...prevState, 
            [id]: s
        }))
    }    

    const {register, handleSubmit, formState: { errors }} = useForm()

    const addRea = data => {
        setResult(prevState => ({
            ...prevState,
            title: data.title,
            reatype: data.reatype,
            link: data.link,
            description: data.description,
            instructions: data.instructions
        }))
    }

    const send = async(e) =>{
        e.preventDefault();
        console.log('values =\n', result);
        try {
            const result1 = await register(values)
            console.log('bla1 = ', result1);
            const result2 = await login({email : values.email, password : values.password   })
            console.log('bla2 = ', result2);
            navigate('/');
        }
        catch (exception) {
            console.log("erro no cadastro");
        }
    }

    useEffect(() => {
        console.log(result);
      }, [result]);

    const getValues = s => {

    }

    const [showNotification, setShowNotification] = useState(false);

    return(
        <div className = { styles.container }>

            <BaseNotification type = "saveSuccess" />

            <header className = { styles.header }><img src = { AddRing } alt = "Símbolo de Adição de Recurso" /> Adicionar novos recursos</header>
            <form id = "reaconfig" className = { styles.formContainer } onSubmit = {handleSubmit( addRea )}>
                <div className = { styles.columns }>
                    <div className = { styles.column }>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "title" className = { styles.inputLabel }>TÍTULO DO MATERIAL</label>
                            <input id = "title" type = "text" name = "title" {...register("title")} className = { styles.inputBox } placeholder = "Título do Material"/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "reatype" className = { styles.inputLabel }>TIPO DO MATERIAL</label>
                            <input id = "reatype" type = "text" name = "reaType" {...register("reaType")}  className = { styles.inputBox } placeholder = "Tipo do Material"/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "link" className = { styles.inputLabel }>LINK</label>
                            <input id = "link" type = "text" name = "link" {...register("link")} className = { styles.inputBox } placeholder = "Link"/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "targetPublic" className = { styles.inputLabel }>PÚBLICO ALVO</label>
                            <CustomSelector id = "targetPublic"
                                selectorId = { 1 }
                                width = {"364px"}
                                height = {"44px"}
                                color = {"var(--lightgray4)"}
                                fontSize = {"18px"}
                                options = {["Séries Iniciais", "Fundamental", "Médio", "Superior"]}
                                handleResult = { updateSelected }
                                /> 
                        </div>              
                    </div>

                    <div className = { styles.column }>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "imgpathStyle" className = { styles.inputLabel }>IMAGEM DO MATERIAL</label>

                            <label id = "imgpathStyle" htmlFor = "imgpath" className = { styles.fileChooser }>
                                <span>Imagem</span>
                                <input id = "imgpath" type = "file" style = {{ display: "none" }}/>
                                <div className = { styles.cornerUpload }>
                                    <img src = { FileUpload } alt = "Upload de Arquivo" />
                                    <span>CARREGAR</span>
                                </div>
                            </label>

                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "reatype" className = { styles.inputLabel }>ÁREA DO CONHECIMENTO</label>
                            <CustomSelector id = "reatype"
                                selectorId = { 2 }
                                width = {"364px"}
                                height = {"44px"}
                                color = {"var(--lightgray4)"}
                                fontSize = {"18px"}
                                options = {["Português", "Matemática", "Biologia", "Teologia"]}
                                handleResult = { updateSelected }
                                />
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "license" className = { styles.inputLabel }>TIPO DE LICENÇA</label>
                            <CustomSelector 
                                id = "license"
                                selectorId = { 3 }
                                width = {"364px"}
                                height = {"44px"}
                                color = {"var(--lightgray4)"}
                                fontSize = {"18px"}
                                options = {["Domínio Público", "GNU"]}
                                handleResult = { updateSelected }
                                /> 
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "language" className = { styles.inputLabel }>IDIOMA DO MATERIAL</label>
                            <CustomSelector 
                                id = "language"
                                selectorId = { 4 }
                                width = {"364px"}
                                height = {"44px"}
                                color = {"var(--lightgray4)"}
                                fontSize = {"18px"}
                                options = {["Português", "Inglês", "Francês", "Alemão", "Outro"]}
                                handleResult = { updateSelected }
                                />
                        </div>
                    </div>
                </div>

                <div className = { styles.description }>
                    <label htmlFor = "description" className = { styles.inputLabel }>DESCRIÇÃO</label>
                    <input id = "description" type = "text" name = "description" {...register("description")}  className = { styles.descriptionInputBox } placeholder = "Descrição do recurso educacional"/>
                </div>

                <div className = { styles.instructions }>
                    <label htmlFor = "instructions" className = { styles.inputLabel }>INSTRUÇÕES DE USO</label>
                    <textarea rows="4" cols="20" name="instructions" {...register("instructions")}  id = "instructions"  maxLength="1000" className = { styles.textArea } placeholder = "Instruções de Uso"></textarea>                    
                </div>

                <div className = { styles.buttonsContainer } >
                    <button className = { styles.cancelButton }>Cancelar</button>
                    <button onClick = { getValues() } className = { styles.submitButton }>Salvar</button>
                </div>
            </form>
        </div>
    )
}
