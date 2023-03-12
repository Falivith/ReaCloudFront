import { ProfileLabelAndInput } from './ProfileLabelAndInput';
import styles from './Profile.module.css';
import Lock from '../../assets/Lock.png'
import '../../global.css'

export function MeuEmailESenha() {
    return (
        <div className={styles.containerFormEmail}>
            <form>
            <div className={styles.addNewReasLabel}>
                    <img src = { Lock } alt = "Email e Senha" />
                    <h1>Email e Senha</h1>
            </div>
            <fieldset className={styles.fieldset}>
                    <ProfileLabelAndInput labelText={'E-MAIL'} inputType={'text'} placeholderText={'Email'} />
                    <ProfileLabelAndInput labelText={'SENHA ATUAL'} inputType={'password'} placeholderText={'• • • • • • • • • •'} showButton={false}/>
                    <ProfileLabelAndInput labelText={'NOVA SENHA'} inputType={'password'} placeholderText={'• • • • • • • • • •'} showButton={false}/>
                    <ProfileLabelAndInput labelText={'REPETIR NOVA SENHA'} inputType={'password'} placeholderText={'• • • • • • • • • •'} showButton={false}/>
                    <input className={styles.whiteButton} type="reset" value="Cancelar"></input>
                    <input className={styles.blueSearchButton} type="submit" value="Salvar"></input>

            </fieldset>
            </form>
        </div>
    );
}