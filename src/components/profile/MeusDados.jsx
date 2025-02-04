import { useEffect, useState } from "react";
import Editar from "/Editar.png";
import styles from "./Profile.module.css";
import MeusDadosImg from "../../assets/User_cicle_lightblue.png";
import BaseProfilePic from "../../assets/PlaceholderProfilePic.jpg";
import "../../global.css";
import RemoveUserAccount from "./RemoveUserAccount";

export function MeusDados({ values, handleSubmit }) {
    const [initialValues, setInitialValues] = useState({
        given_name: '',
        family_name: '',
        institution: '',
        profile: '',
        profile_picture: ''
      });
      const [formValues, setFormValues] = useState({
        given_name: '',
        family_name: '',
        institution: '',
        profile: '',
        profile_picture: ''
      });
    const [profilePicture, setProfilePicture] = useState('');
    const [readOnly, setReadOnly] = useState(true);
    const [buttonClass, setButtonClass] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
  

  const buttonHandler = (event) => {
    event.preventDefault();
    setReadOnly(!readOnly);
    setButtonClass(!buttonClass);
  };

  const handleReset = () => {
    setFormValues(initialValues);
    setReadOnly(true);
    setButtonClass(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  const toggleModal = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (values) {
        setInitialValues(values);
        setFormValues(values);
        setProfilePicture(values.profile_picture || BaseProfilePic);
      }
  }, [values]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e, formValues); // Pass formValues to parent
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.profilePicContainer}>
        <img
          className={styles.profilePicImg}
          src={profilePicture}
          alt="profile_picture"
        />
      </div>
      <form onSubmit={onSubmit} name={"MeusDados"}>
        <div className={styles.addNewReasLabel}>
          <img src={MeusDadosImg} alt="Meus Dados" />
          <h1>Meus Dados</h1>
        </div>
        <fieldset className={styles.fieldset}>
          <div className={styles.EntryContainer}>
            <label className={styles.text}>NOME</label>
            <div className={styles.inputWithButton}>
              <input
                name="given_name"
                onChange={handleInputChange}
                value={formValues.given_name || ''}
                type="text"
                className={styles.inputInContainer}
                placeholder="Nome"
                readOnly={readOnly}
              />
              <button
                onClick={buttonHandler}
                type="button"
                className={
                  buttonClass ? styles.MeuButton : styles.MeuButtonClick
                }
              >
                <img src={Editar} alt="Editar" />
              </button>
            </div>
          </div>
          <div className={styles.EntryContainer}>
            <label className={styles.text}>SOBRENOME</label>
            <div className={styles.inputWithButton}>
              <input
                name="family_name"
                onChange={handleInputChange}
                value={formValues.family_name || ''}
                type="text"
                className={styles.inputInContainer}
                placeholder="Sobrenome"
                readOnly={readOnly}
              />
              <button
                onClick={buttonHandler}
                type="button"
                className={
                  buttonClass ? styles.MeuButton : styles.MeuButtonClick
                }
              >
                <img src={Editar} alt="Editar" />
              </button>
            </div>
          </div>
          <div className={styles.EntryContainer}>
            <label className={styles.text}>INSTITUIÇÃO DE ENSINO</label>
            <div className={styles.inputWithButton}>
              <input
                name="institution"
                onChange={handleInputChange}
                value={formValues.institution || ''}
                type="text"
                className={styles.inputInContainer}
                placeholder="Instituição de Ensino"
                readOnly={readOnly}
              />
              <button
                onClick={buttonHandler}
                type="button"
                className={
                  buttonClass ? styles.MeuButton : styles.MeuButtonClick
                }
              >
                <img src={Editar} alt="Editar" />
              </button>
            </div>
          </div>
          <div className={styles.EntryContainer}>
            <label className={styles.text}>PERFIL</label>
            <div className={styles.inputWithButton}>
              <input
                name="profile"
                onChange={handleInputChange}
                value={formValues.profile || ''}
                type="text"
                className={styles.inputInContainer}
                placeholder="Perfil"
                readOnly={readOnly}
              />
              <button
                onClick={buttonHandler}
                type="button"
                className={
                  buttonClass ? styles.MeuButton : styles.MeuButtonClick
                }
              >
                <img src={Editar} alt="Editar" />
              </button>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.whiteButton}
              type="reset"
              onClick={handleReset}
            >
              Cancelar
            </button>
            <button className={styles.blueSearchButton} type="submit">
              Salvar
            </button>
          </div>
        </fieldset>
      </form>
      <a href="#" onClick={handleDeleteAccount} className={styles.removeUser}>Deletar conta</a>
      {showDeleteModal && (
    <RemoveUserAccount 
        callModal={toggleModal}
    />
    )}
    </div>
  );
}
