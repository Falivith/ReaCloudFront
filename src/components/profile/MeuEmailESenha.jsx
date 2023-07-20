import { ProfileLabelAndInput } from './ProfileLabelAndInput';
import styles from './Profile.module.css';
import Lock from '../../assets/Lock.png'
import '../../global.css'


export function MeuEmailESenha({values,handleChange,handleSubmit}) {  
    
    return (
        <div className={styles.containerFormEmail}>
            <form name = {'MeuEmailESenha'} onSubmit={handleSubmit}>
            <div className={styles.addNewReasLabel}>
                    <img src = { Lock } alt = "Email e Senha" />
                    <h1>Email e Senha</h1>
            </div>
            <fieldset className={styles.fieldset}>
                    <ProfileLabelAndInput name={'email'} value={values.email} onChange = {handleChange} labelText={'E-MAIL'} inputType={'text'} placeholderText={'Email'} />
                    <ProfileLabelAndInput name={'password'} value={values.password} onChange = {handleChange} labelText={'SENHA ATUAL'} inputType={'password'} placeholderText={'• • • • • • • • • •'} showButton={false}/>
                    <div className = {styles.twoItens}> 
                        <ProfileLabelAndInput name={'newPassword'} value={values.newPassword} onChange = {handleChange}labelText={'NOVA SENHA'} inputType={'password'} inputStyle = {styles.inputTwo} placeholderText={'• • • • • • • • • •'} showButton={false}/>
                        <ProfileLabelAndInput labelText={'REPETIR NOVA SENHA'} inputType={'password'} inputStyle = {styles.inputTwo} placeholderText={'• • • • • • • • • •'} showButton={false}/>
                    </div>
                    <input className={styles.whiteButton} type="reset" value="Cancelar"></input>
                    <input className={styles.blueSearchButton} type="submit" value="Salvar"></input>
            </fieldset>
            </form>
        </div>
    );
}
