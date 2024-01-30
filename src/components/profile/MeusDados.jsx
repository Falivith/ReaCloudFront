import { ProfileLabelAndInput } from './ProfileLabelAndInput';
import styles from './Profile.module.css';
import MeusDadosImg from '../../assets/User_cicle_lightblue.png';
import '../../global.css';
import ProfilePicture from './profilePicture';

export function MeusDados({ values, handleChange, handleSubmit }) {
    return (
        <div className={styles.containerForm}>
            <ProfilePicture nome={values.nome} />
            <form onSubmit={handleSubmit} name={'MeusDados'}>
                <div className={styles.addNewReasLabel}>
                    <img src={MeusDadosImg} alt="Meus Dados" />
                    <h1>Meus Dados</h1>
                </div>
                <fieldset className={styles.fieldset}>
                    <ProfileLabelAndInput name={'nome'} value={values.nome} onChange={handleChange} labelText={'NOME'} inputType={'text'} placeholderText={'Nome'} />
                    <ProfileLabelAndInput name={'sobrenome'} value={values.sobrenome} onChange={handleChange} labelText={'SOBRENOME'} inputType={'text'} placeholderText={'Sobrenome'} />
                    <ProfileLabelAndInput name={'instituicao'} value={values.instituicao} onChange={handleChange} labelText={'INSTITUIÇÃO DE ENSINO'} inputType={'text'} placeholderText={'Instituição de Ensino'} />
                    <ProfileLabelAndInput name={'perfil'} value={values.perfil} onChange={handleChange} labelText={'PERFIL'} inputType={'text'} placeholderText={'Perfil'} showButton={false} />
                    <input className={styles.whiteButton} type="reset" value="Cancelar"></input>
                    <input className={styles.blueSearchButton} type="submit" value="Salvar"></input>
                </fieldset>
            </form>
        </div>
    );
}
