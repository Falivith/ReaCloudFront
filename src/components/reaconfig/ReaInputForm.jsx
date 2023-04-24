import styles from "./ReaInputForm.module.css";
import { CustomSelector } from "../CustomSelector";
import AddRing from "../../assets/Add_ring_green.png";
import FileUpload from "../../assets/FileUpload.png";
import { BaseNotification } from "../modals/BaseNotification";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { submitRea } from "../../services/submitNewRea";

/* saveSuccess, saveError, passwordSuccess, passwordWarning, passwordError */

export function ReaInputForm(){

    const initialValues = {
        title: '',
        reaType: '',
        link: '',
        targetPublic: '',
        knowledgeArea: '',
        license: '',
        language: '',
        description: '',
        instructions: '',
    };

    const [ result, setResult ] = useState(initialValues)
    const { register, handleSubmit, formState: { errors }} = useForm()
    const [ image , setImage ] = useState("")

    const addRea = data => {
        setResult(prevState => ({
            ...prevState,
            title: data.title,
            reaType: data.reaType,
            link: data.link,
            description: data.description,
            instructions: data.instructions
        }))

        console.log(image);

        const formData = new FormData();

        formData.append('title', data.title)
        formData.append('reaType', data.reaType)
        formData.append('link', data.link)
        formData.append('description', data.description)
        formData.append('instructions', data.instructions)
        formData.append('targetPublic', result.targetPublic)
        formData.append('language', result.language)
        formData.append('license', result.license)
        formData.append('knowledgeArea', result.knowledgeArea)

        formData.append('thumb', image)
        console.log(...formData);
        submitRea(formData)
    }

    // Update Selector
    const updateSelected = (id, s) => {
        setResult(prevState => ({
            ...prevState, 
            [id]: s
        }))
    }

    // Descomentar para ver efeito da atualização do objeto recurso pelo Front

    /*useEffect(() => {
        console.log(result);
    }, [result]);*/

    return(
        <div className = { styles.container }>

            <BaseNotification type = "saveSuccess"/>

            <header className = { styles.header }><img src = { AddRing } alt = "Símbolo de Adição de Recurso" /> Adicionar novos recursos</header>
            <form id = "reaconfig" className = { styles.formContainer } onSubmit = {handleSubmit( addRea )}>
                <div className = { styles.columns }>
                    <div className = { styles.column }>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "title" className = { styles.inputLabel }>TÍTULO DO MATERIAL</label>
                            <input id = "title" type = "text" name = "title" {...register("title")} className = { styles.inputBox } placeholder = "Título do Material" autoComplete="off"/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "reaType" className = { styles.inputLabel }>TIPO DO MATERIAL</label>
                            <input id = "reaType" type = "text" name = "reaType" {...register("reaType")}  className = { styles.inputBox } placeholder = "Tipo do Material" autoComplete="off"/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "link" className = { styles.inputLabel }>LINK</label>
                            <input id = "link" type = "text" name = "link" {...register("link")} className = { styles.inputBox } placeholder = "Link" autoComplete="off"/>
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
                                <span> { image? image.name : "Imagem" } </span>
                                <input id = "imgpath" type = "file" accept = ".png, .jpg, .jpeg" style = {{ display: "none" }} onChange = { e => setImage(e.target.files[0]) }/>
                                <div className = { styles.cornerUpload }>
                                    <img src = { FileUpload } alt = "Upload de Arquivo" />
                                    <span>CARREGAR</span>
                                </div>
                            </label>

                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "knowledgeArea" className = { styles.inputLabel }>ÁREA DO CONHECIMENTO</label>
                            <CustomSelector id = "knowledgeArea"
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
                    <input id = "description" type = "text" name = "description" {...register("description")}  className = { styles.descriptionInputBox } placeholder = "Descrição do recurso educacional" autoComplete="off"/>
                </div>

                <div className = { styles.instructions }>
                    <label htmlFor = "instructions" className = { styles.inputLabel }>INSTRUÇÕES DE USO</label>
                    <textarea rows="4" cols="20" name="instructions" {...register("instructions")}  id = "instructions"  maxLength="1000" className = { styles.textArea } placeholder = "Instruções de Uso" autoComplete="off"></textarea>                    
                </div>

                <div className = { styles.buttonsContainer } >
                    <button className = { styles.cancelButton } type = "button" >Cancelar</button>
                    <button className = { styles.submitButton }>Salvar</button>
                </div>
            </form>
        </div>
    )
}
