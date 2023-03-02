import styles from './FormCadastro.module.css';
import { LabelAndInput } from '../login/LabelAndInput';
import { Button } from '../login/Button';
import styled from "styled-components";
import styleLabelandInput from '../login/LabelAndInput.module.css'


export function FormCadastro() {

return(
    <div className={styles.containerForm}>
        <form>
            <LabelAndInput labelText={'NOME'} inputType={'text'} placeholderText={'Nome'} inputStyle = {styleLabelandInput.input}/>
            <div className={styles.divSpacing}> <LabelAndInput inputStyle = {styleLabelandInput.input} labelText={'SOBRENOME'} inputType={'text'} placeholderText={'Sobrenome'}/>          </div>
            <div className={styles.divSpacing}> <LabelAndInput inputStyle = {styleLabelandInput.input} labelText={'INSTITUIÇÃO DE ENSINO'} inputType={'text'} placeholderText={'Instituição de ensino'}/>          </div>
            <div className={styles.divSpacing}> <LabelAndInput inputStyle = {styleLabelandInput.input} labelText={'PERFIL'} inputType={'text'} placeholderText={'Selecione...'}/>          </div>
            <div className={styles.divSpacing}> <LabelAndInput inputStyle = {styleLabelandInput.input} labelText={'E-MAIL'} inputType={'email'} placeholderText={'E-mail'}/>          </div>
            <div className={styles.twoItens}> 
            <LabelAndInput inputStyle = {styleLabelandInput.input2} labelText={'SENHA'} inputType={'password'} placeholderText={'• • • • • • •'}/>          
            <LabelAndInput inputStyle = {styleLabelandInput.input2} labelText={'REPETIR SENHA'} inputType={'password'} placeholderText={'• • • • • • •'}/>        
            </div>
            <div style= {{"margin-top": "1rem"}}> <Button textButton={"CADASTRAR"}/> </div>
        </form> ''
    </div>
)

}