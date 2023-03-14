import styles from "./ReaInputForm.module.css"
import { CustomSelector } from "../CustomSelector";
import AddRing from "../../assets/Add_ring_green.png";
import FileUpload from "../../assets/FileUpload.png"
import { BaseNotification } from "../modals/BaseNotification";

/* saveSuccess, saveError, passwordSuccess, passwordWarning, passwordError */

export function ReaInputForm(){
    return(
        <div className = { styles.container }>

            <BaseNotification type = "saveSuccess"/>

            <header className = { styles.header }><img src = { AddRing } alt = "Símbolo de Adição de Recurso" /> Adicionar novos recursos</header>
            <form id = "reaconfig" className = { styles.formContainer }>
                <div className = { styles.columns }>
                    <div className = { styles.column }>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "title" className = { styles.inputLabel }>TÍTULO DO MATERIAL</label>
                            <input id = "title" type = "text" className = { styles.inputBox } placeholder = "Título do Material"/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "reatype" className = { styles.inputLabel }>TIPO DO MATERIAL</label>
                            <input id = "reatype" type = "text" className = { styles.inputBox } placeholder = "Tipo do Material"/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "link" className = { styles.inputLabel }>LINK</label>
                            <input id = "link" type = "text" className = { styles.inputBox } placeholder = "Link"/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "targetpublic" className = { styles.inputLabel }>PÚBLICO ALVO</label>
                            <CustomSelector id = "targetpublic"
                                selectorId = { 1 }
                                width = {"364px"}
                                height = {"44px"}
                                color = {"var(--lightgray4)"}
                                fontSize = {"18px"}
                                options = {["Séries Iniciais", "Fundamental", "Médio", "Superior"]}/> 
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
                                options = {["Português", "Matemática", "Biologia", "Teologia"]}/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "license" className = { styles.inputLabel }>TIPO DE LICENÇA</label>
                            <CustomSelector id = "targetpublic"
                                selectorId = { 3 }
                                width = {"364px"}
                                height = {"44px"}
                                color = {"var(--lightgray4)"}
                                fontSize = {"18px"}
                                options = {["Domínio Público", "GNU"]}/> 
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "language" className = { styles.inputLabel }>IDIOMA DO MATERIAL</label>
                            <CustomSelector id = "targetpublic"
                                selectorId = { 4 }
                                width = {"364px"}
                                height = {"44px"}
                                color = {"var(--lightgray4)"}
                                fontSize = {"18px"}
                                options = {["Português", "Inglês", "Francês", "Alemão", "Outro"]}/>
                        </div>
                    </div>
                </div>

                <div className = { styles.description }>
                    <label htmlFor = "description" className = { styles.inputLabel }>DESCRIÇÃO</label>
                    <input id = "description" type = "text" className = { styles.descriptionInputBox } placeholder = "Descrição do recurso educacional"/>
                </div>

                <div className = { styles.instructions }>
                    <label htmlFor = "instructions" className = { styles.inputLabel }>INSTRUÇÕES DE USO</label>
                    <textarea rows="4" cols="20" name="instructions" id = "instructions"  maxLength="1000" className = { styles.textArea } placeholder = "Instruções de Uso"></textarea>                    
                </div>

                <div className = { styles.buttonsContainer } >
                    <button className = { styles.cancelButton }>Cancelar</button>
                    <button className = { styles.submitButton }>Salvar</button>
                </div>
            </form>
        </div>
    )
}
