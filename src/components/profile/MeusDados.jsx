import { useEffect, useState } from 'react';
import { ProfileLabelAndInput } from './ProfileLabelAndInput';
import styles from './Profile.module.css';
import MeusDadosImg from '../../assets/User_cicle_lightblue.png';
import BaseProfilePic from '../../../public/PlaceholderProfilePic.jpg'
import '../../global.css';
import ProfilePicture from './profilePicture';

export function MeusDados({ values, handleChange, handleSubmit }) {
    const [profilePicture, setProfilePicture] = useState(values.profile_picture);

    useEffect(() => {
        if (values.profile_picture) {
            setProfilePicture(values.profile_picture);
        } else {
            setProfilePicture(BaseProfilePic); // imagem padrão caso profile_picture seja undefined ou null
        }
    }, [values.profile_picture]);

    return (
        <div className={styles.containerForm}>
            <div className={styles.profilePicContainer }>
                <img className={styles.profilePicImg } src={profilePicture} alt="profile_picture"/>
            </div>
            <form onSubmit={handleSubmit} name={'MeusDados'}>
                <div className={styles.addNewReasLabel}>
                    <img src={MeusDadosImg} alt="Meus Dados" />
                    <h1>Meus Dados</h1>
                </div>
                <fieldset className={styles.fieldset}>
                    <ProfileLabelAndInput name={'given_name'} value={values.given_name} onChange={handleChange} labelText={'NOME'} inputType={'text'} placeholderText={'Nome'} />
                    <ProfileLabelAndInput name={'family_name'} value={values.family_name} onChange={handleChange} labelText={'SOBRENOME'} inputType={'text'} placeholderText={'Sobrenome'} />
                    <ProfileLabelAndInput name={'institution'} value={values.institution} onChange={handleChange} labelText={'INSTITUIÇÃO DE ENSINO'} inputType={'text'} placeholderText={'Instituição de Ensino'} />
                    <ProfileLabelAndInput name={'profile'} value={values.profile} onChange={handleChange} labelText={'PERFIL'} inputType={'text'} placeholderText={'Perfil'} showButton={false} />
                    <input className={styles.whiteButton} type="reset" value="Cancelar"></input>
                    <input className={styles.blueSearchButton} type="submit" value="Salvar"></input>
                </fieldset>
            </form>
        </div>
    );
}
