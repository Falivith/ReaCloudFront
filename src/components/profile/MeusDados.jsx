import { ProfileLabelAndInput } from './ProfileLabelAndInput';
import styles from './Profile.module.css';
import MeusDadosImg from '../../assets/User_cicle_lightblue.png'
import '../../global.css'

export function MeusDados() {
    return(
        <div className={styles.containerForm}>
            <form>
            <div className={styles.addNewReasLabel}>
                    <img src = { MeusDadosImg } alt = "Meus Dados" />
                    <h1>Meus Dados</h1>
            </div>
            <fieldset className={styles.fieldset}>
                    <ProfileLabelAndInput labelText={'NOME'} inputType={'text'} placeholderText={'Nome'} />
                    <ProfileLabelAndInput labelText={'SOBRENOME'} inputType={'text'} placeholderText={'Sobrenome'} />
                    <ProfileLabelAndInput labelText={'INSTITUIÇÃO DE ENSINO'} inputType={'text'} placeholderText={'Instituição de Ensino'} />
                    <ProfileLabelAndInput labelText={'PERFIL'} inputType={'text'} placeholderText={'Perfil'} showButton={false}/>
                    
                    <input className={styles.whiteButton} type="reset" value="Cancelar"></input>
                    <input className={styles.blueSearchButton} type="submit" value="Salvar"></input>

            </fieldset>
            </form>
        </div>
    );
}
