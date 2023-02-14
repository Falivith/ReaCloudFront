import styles from './FormCadastro.module.css'
import { LabelAndInput } from '../login/LabelAndInput';


export function FormCadastro() {

return(
    <div className={styles.containerForm}>
        <form>
            <LabelAndInput labelText={'NOME'} inputType={'text'} placeholderText={'Nome'}/>
            <div className={styles.divSpacing}> <LabelAndInput labelText={'SOBRENOME'} inputType={'text'} placeholderText={'Sobrenome'}/>          </div>
            <div className={styles.divSpacing}> <LabelAndInput labelText={'INSTITUIÇÃO DE ENSINO'} inputType={'text'} placeholderText={'Instituição de ensino'}/>          </div>
            <div className={styles.divSpacing}> <LabelAndInput labelText={'PERFIL'} inputType={'text'} placeholderText={'Selecione...'}/>          </div>
            <div className={styles.divSpacing}> <LabelAndInput labelText={'E-MAIL'} inputType={'email'} placeholderText={'E-mail'}/>          </div>

        </form>
    </div>
)

}