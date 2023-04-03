import styles from "./ReaInputForm.module.css"
import { CustomSelector } from "../CustomSelector";
import AddRing from "../../assets/Add_ring_green.png";
import FileUpload from "../../assets/FileUpload.png"
import { BaseNotification } from "../modals/BaseNotification";
import { useEffect, useState, useRef } from "react";
import { useForm } from 'react-hook-form';

/* saveSuccess, saveError, passwordSuccess, passwordWarning, passwordError */

export function ReaInputForm(){

    /*fetch('http://localhost:3001/api/recurso', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtldmluMzExMjEzQGNhc3Ryby5jb20iLCJpZCI6NSwiaWF0IjoxNjc5OTYxOTUyLCJleHAiOjE2Nzk5Nzk5NTJ9.taodRSLxCuvDePyUFdfUYVWGsUKUvlrxDLY4pKtHpi8'
  },
  body: JSON.stringify({
    title: 'Recurso3',
    reatype: 'Ferramenta',
    link: 'https://pt.symbolab.com/',
    targetPublic: 'Médio',
    thumb: 'https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg',
    knowledgeArea: 'Matemática',
    license: 'Domínio Público',
    language: 'Português',
    description: 'is simply dummy text of the printing and types',
    instructions: 'Abra, insira equação veja resposta.'
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });*/

    const initialValues = {
        title: '',
        reaType: '',
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
    const { register, handleSubmit, formState: { errors }} = useForm()
    const [ file , setFileName ] = useState({nome: "", escolhido: false, path: ""});

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const path = URL.createObjectURL(selectedFile);
        setFileName ({nome:  selectedFile.name, escolhido: true, path: path});
      };

    const addRea = data => {
        setResult(prevState => ({
            ...prevState,
            title: data.title,
            reaType: data.reaType,
            link: data.link,
            description: data.description,
            instructions: data.instructions,
            thumb: file.path
        }))
        const onSubmit = data => console.log(data);
    }

    const sendRea = async(e) =>{
        e.preventDefault();
        console.log("Recurso: ", result);
        try {
            const result1 = await register(result)
        }
        catch (exception) {
            console.log("erro no cadastro");
        }
    }

    // Update Selector
    const updateSelected = (id, s) => {
        setResult(prevState => ({
            ...prevState, 
            [id]: s
        }))
    }    

    useEffect(() => {
        console.log(result);
    }, [result]);

    return(
        <div className = { styles.container }>

            <BaseNotification type = "saveSuccess"/>

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
                                <span> { file.escolhido? file.nome : "Imagem" } </span>
                                <input id = "imgpath" type = "file" accept = ".png, .jpg, .jpeg" style = {{ display: "none" }} onChange = { handleFileChange }/>
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
