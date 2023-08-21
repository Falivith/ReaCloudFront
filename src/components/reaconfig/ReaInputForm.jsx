import styles from "./ReaInputForm.module.css";
import { CustomSelector } from "../CustomSelector";
import AddRing from "../../assets/Add_ring_green.png";
import FileUpload from "../../assets/FileUpload.png";
import { BaseNotification } from "../modals/BaseNotification";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { submitRea } from "../../services/submitNewRea";
import { useNavigate } from 'react-router-dom'

/* saveSuccess, saveError, passwordSuccess, passwordWarning, passwordError */

export function ReaInputForm(){

    const navigate = useNavigate();

    const routeChangeHandler = async (route) => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Aguarda 2 segundos
        navigate(`../${route}`);
    }

    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    const closeNotification = () => {
        setShowNotification(false);
    };

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

    const addRea = async data => {
        setResult(prevState => ({
            ...prevState,
            title: data.title,
            reaType: data.reaType,
            link: data.link,
            description: data.description,
            instructions: data.instructions
        }));
    
        const updatedResult = {
            ...result,
            title: data.title,
            reaType: data.reaType,
            link: data.link,
            description: data.description,
            instructions: data.instructions
        };

        const formData = new FormData();
    
        formData.append('title', updatedResult.title);
        formData.append('reaType', updatedResult.reaType);
        formData.append('link', updatedResult.link);
        formData.append('description', updatedResult.description);
        formData.append('instructions', updatedResult.instructions);
        formData.append('targetPublic', updatedResult.targetPublic);
        formData.append('language', updatedResult.language);
        formData.append('license', updatedResult.license);
        formData.append('knowledgeArea', updatedResult.knowledgeArea);
    
        formData.append('thumb', image);
    
        try {
            const formSubmitSuccess = await submitRea(formData);
    
            if (formSubmitSuccess) {
                setShowNotification(true);
                setNotificationType('saveSuccess');
                await routeChangeHandler('');
            } else {
                setShowNotification(true);
                setNotificationType('saveError'); 
            }
        } catch (error) {
            console.error("Error submitting REA:", error);

            setShowNotification(true);
            setNotificationType('saveError');
        }
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

            {(<BaseNotification type = {notificationType} showing={showNotification} onClose={closeNotification}  />)}

            <header className = { styles.header }><img src = { AddRing } alt = "Símbolo de Adição de Recurso" /> Adicionar novos recursos</header>
            <form id = "reaconfig" className = { styles.formContainer } onSubmit = {handleSubmit( addRea )}>
                <div className = { styles.columns }>
                    <div className = { styles.column }>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "title" className = { styles.inputLabel }>TÍTULO DO MATERIAL</label>
                            <input id = "title" type = "text" name = "title" {...register("title")} className = { styles.inputBox } placeholder = "Título do Material"/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "reaType" className = { styles.inputLabel }>TIPO DO MATERIAL</label>
                            <input id = "reaType" type = "text" name = "reaType" {...register("reaType")}  className = { styles.inputBox } placeholder = "Tipo do Material"/>
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
                    <input id = "description" type = "text" name = "description" {...register("description")}  className = { styles.descriptionInputBox } placeholder = "Descrição do recurso educacional"/>
                </div>

                <div className = { styles.instructions }>
                    <label htmlFor = "instructions" className = { styles.inputLabel }>INSTRUÇÕES DE USO</label>
                    <textarea rows="4" cols="20" name="instructions" {...register("instructions")}  id = "instructions"  maxLength="1000" className = { styles.textArea } placeholder = "Instruções de Uso"></textarea>                    
                </div>

                <div className = { styles.buttonsContainer } >
                    <button className = { styles.cancelButton }>Cancelar</button>
                    <button className = { styles.submitButton }>Salvar</button>
                </div>
            </form>
        </div>
    )
}
