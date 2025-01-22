import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Gear from "../../assets/Gear.png";
import { getResourceInfo } from "../../services/reaquerys";
import { CustomSelector } from "../CustomSelector";
import { BaseNotification } from "../modals/BaseNotification";
import styles from "./ReaInputForm.module.css";
import Loading from "../Loading";
import { editRea } from "../../services/submitNewRea";
import {
  publicoAlvo,
  areasConhecimento,
  tiposLicenca,
  idiomas,
} from "../../models/resource";

export function ReaEditInputForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [resourceData, setResourceData] = useState({
    title: "",
    reaType: "",
    link: "",
    targetPublic: "",
    knowledgeArea: "",
    license: "",
    language: "",
    description: "",
    instructions: "",
  });

  // Popula os forms
  useEffect(() => {
    const fetchResourceInfo = async () => {
      try {
        const result = await getResourceInfo(id);
        setResourceData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch resource info", error);
        setIsLoading(false);
      }
    };

    fetchResourceInfo();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setResourceData((prev) => ({ ...prev, [id]: value }));
  };

  // Update Selector
  const updateSelected = (id, s) => {
    setResourceData((prevState) => ({
      ...prevState,
      [id]: s,
    }));
  };

  // Route Change Handler (quit page after edit)
  const routeChangeHandler = async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Aguarda 1 segundo
    navigate(`../${route}`);
  };

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");

  const closeNotification = () => {
    setShowNotification(false);
  };

  const updateRea = async (data) => {
    setResourceData((prevState) => ({
      ...prevState,
      title: data.title,
      link: data.link,
      description: data.description,
      instructions: data.instructions,
    }));

    const updatedResult = {
      ...resourceData,
      title: data.title,
      link: data.link,
      description: data.description,
      instructions: data.instructions,
    };

    const formData = new FormData();

    formData.append("title", updatedResult.title);
    formData.append("reaType", updatedResult.reaType);
    formData.append("link", updatedResult.link);
    formData.append("description", updatedResult.description);
    formData.append("instructions", updatedResult.instructions);
    formData.append("targetPublic", updatedResult.targetPublic);
    formData.append("language", updatedResult.language);
    formData.append("license", updatedResult.license);
    formData.append("knowledgeArea", updatedResult.knowledgeArea);

    try {
      const formSubmitSuccess = await editRea(id, formData);
      if (formSubmitSuccess) {
        setNotificationType("editReaSuccess");
        setShowNotification(true);

        await routeChangeHandler("");
      } else {
        setNotificationType("editReaErrorUnloged");
        setShowNotification(true);
      }
    } catch (error) {
      console.error("Error submitting REA:", error);

      setNotificationType("editReaError");
      setShowNotification(true);
    }
  };

  return (
    <div className={styles.container}>
      <BaseNotification type="passwordWarning" />

      <header className={styles.header}>
        <img src={Gear} alt="Símbolo de Adição de Recurso" /> Editar Recurso{" "}
      </header>

      {isLoading ? (
        <Loading />
      ) : (
        <form id="reaconfig" className={styles.formContainer}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <div className={styles.inputContainer}>
                <label htmlFor="title" className={styles.inputLabel}>
                  TÍTULO DO MATERIAL
                </label>
                <input
                  id="title"
                  type="text"
                  className={styles.inputBox}
                  placeholder="Título do Material"
                  value={resourceData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="reatype" className={styles.inputLabel}>
                  TIPO DO MATERIAL
                </label>
                <input
                  id="reatype"
                  type="text"
                  className={styles.inputBox}
                  placeholder="Tipo do Material"
                  value={resourceData.reaType}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="link" className={styles.inputLabel}>
                  LINK
                </label>
                <input
                  id="link"
                  type="text"
                  className={styles.inputBox}
                  placeholder="Link"
                  value={resourceData.link}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="targetPublic" className={styles.inputLabel}>
                  PÚBLICO ALVO
                </label>
                <CustomSelector
                  id="targetPublic"
                  selectorId={1}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--dark-grey)"}
                  fontSize={"18px"}
                  options={Object.values(publicoAlvo)}
                  handleResult={updateSelected}
                  initialValue={resourceData.targetPublic}
                />
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.inputContainer}>
                <label htmlFor="imgpathStyle" className={styles.inputLabel}>
                  IMAGEM DO MATERIAL
                </label>

                <label
                  id="imgpathStyle"
                  htmlFor="imgpath"
                  className={`${styles.fileChooser} ${styles.disabled}`}
                >
                  <span className={styles.disabledUpload}>
                    Não é possível editar a imagem
                  </span>
                  <span id="imgpath" type="file" style={{ display: "none" }} />
                </label>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="knowledgeArea" className={styles.inputLabel}>
                  ÁREA DO CONHECIMENTO
                </label>
                <CustomSelector
                  id="knowledgeArea"
                  selectorId={2}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--dark-grey)"}
                  fontSize={"18px"}
                  options={Object.values(areasConhecimento)}
                  handleResult={updateSelected}
                  initialValue={resourceData.knowledgeArea}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="license" className={styles.inputLabel}>
                  TIPO DE LICENÇA
                </label>
                <CustomSelector
                  id="license"
                  selectorId={3}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--dark-grey)"}
                  fontSize={"18px"}
                  options={Object.values(tiposLicenca)}
                  handleResult={updateSelected}
                  initialValue={resourceData.license}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="language" className={styles.inputLabel}>
                  IDIOMA DO MATERIAL
                </label>
                <CustomSelector
                  id="language"
                  selectorId={4}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--dark-grey)"}
                  fontSize={"18px"}
                  options={Object.values(idiomas)}
                  handleResult={updateSelected}
                  initialValue={resourceData.language}
                />
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <label htmlFor="description" className={styles.inputLabel}>
              DESCRIÇÃO
            </label>
            <input
              id="description"
              type="text"
              className={styles.descriptionInputBox}
              placeholder="Descrição do recurso educacional"
              value={resourceData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.instructions}>
            <label htmlFor="instructions" className={styles.inputLabel}>
              INSTRUÇÕES DE USO
            </label>
            <textarea
              rows="4"
              cols="20"
              name="instructions"
              id="instructions"
              maxLength="1000"
              className={styles.textArea}
              placeholder="Instruções de Uso"
              value={resourceData.instructions}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className={styles.buttonsContainer}>
            <button
              className={styles.cancelButton}
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button
              className={styles.submitButton}
              onClick={(e) => {
                e.preventDefault();
                updateRea(resourceData);
              }}
            >
              Salvar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
