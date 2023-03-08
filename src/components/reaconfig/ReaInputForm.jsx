import styles from "./ReaInputForm.module.css"
import AddRing from "../../assets/Add_ring_green.png";
import FileUpload from "../../assets/FileUpload.png"

export function ReaInputForm(){
    return(
        <div className = { styles.container }>
            <header className = { styles.header }><img src = { AddRing } alt = "Símbolo de Adição de Recurso" /> Adicionar novos recursos</header>
            <form id = "reaconfig" className = { styles.formContainer }>
                <div>
                    <div className = { styles.column }>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "title" className = { styles.inputLabel }>TÍTULO DO MATERIAL</label>
                            <input id = "title" type = "text" className = { styles.inputBox } placeholder = "Título do Material"/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "reatype" className = { styles.inputLabel }>TIPO DO MATERIAL</label>
                            <input id = "reatype" type = "text" className = { styles.inputBox }/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "link" className = { styles.inputLabel }>LINK</label>
                            <input id = "link" type = "text" className = { styles.inputBox }/>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "targetpublic" className = { styles.inputLabel }>PÚBLICO ALVO</label>
                            <select id = "targetpublic" className = { styles.selector } name = "area-conhecimento" placeholder = "Título do Material">
                                <option value="" disabled selected hidden>Público Alvo</option>
                                <option value="0">Ensino Superior</option>
                                <option value="1">Ensino Médio</option>
                                <option value="2">Ensino Fundamental</option>
                                <option value="3">Séries Iniciais</option>
                                <option value="4">Geral</option>
                            </select>
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
                            <select id = "reatype" className = { styles.selector } name = "area-conhecimento">
                                <option value="0">Matemática</option>
                                <option value="1">Português</option>
                                <option value="2">Ciências</option>
                                <option value="3">Humanas</option>
                                <option value="4">Linguagens</option>
                            </select>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "license" className = { styles.inputLabel }>TIPO DE LICENÇA</label>
                            <select id = "license" className = { styles.selector } name = "area-conhecimento">
                                <option value="0">GNU</option>
                                <option value="1">MIT</option>
                                <option value="2">Public</option>
                                <option value="3">Free</option>
                                <option value="4">Royalties Free</option>
                            </select>
                        </div>
                        <div className = { styles.inputContainer }>
                            <label htmlFor = "language" className = { styles.inputLabel }>IDIOMA DO MATERIAL</label>
                            <select id = "language" className = { styles.selector } name = "area-conhecimento">
                                <option value="0">Português</option>
                                <option value="1">Inglês</option>
                                <option value="2">Francês</option>
                                <option value="3">Alemão</option>
                                <option value="4">Outro</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className = { styles.description }>
                    <label htmlFor = "description" className = { styles.inputLabel }>DESCRIÇÃO</label>
                    <input id = "description" type = "text" className = { styles.inputBox }/>
                </div>      
                <label htmlFor = "instructions"></label>
                <textarea rows="4" cols="20" name="instructions" id = "instructions"  maxLength="1000" className = { styles.textArea }></textarea>
            </form>
        </div>
    )
}
