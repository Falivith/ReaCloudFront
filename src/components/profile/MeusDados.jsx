import { ProfileLabelAndInput } from './ProfileLabelAndInput';
import styles from './Profile.module.css';

export function MeusDados() {
    return(
        <div className={styles.containerForm}>
            <form>
            <fieldset className={styles.fieldset}>
                <ProfileLabelAndInput labelText={'NOME'} inputType={'text'} placeholderText={'Nome'} />
                <ProfileLabelAndInput labelText={'SOBRENOME'} inputType={'text'} placeholderText={'Sobrenome'} />
                <ProfileLabelAndInput labelText={'INSTITUIÇÃO DE ENSINO'} inputType={'text'} placeholderText={'Instituição de Ensino'} />
                <ProfileLabelAndInput labelText={'PERFIL'} inputType={'text'} placeholderText={'Perfil'} showButton={false}/>
            </fieldset>
            </form>
        </div>
    );
}