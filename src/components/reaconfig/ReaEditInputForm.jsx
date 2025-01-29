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
  tipoRecurso,
  publicoAlvo,
  areasConhecimento,
  tiposLicenca,
  idiomas,
  formats,
} from "../../models/resource";

export function ReaEditInputForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [resourceData, setResourceData] = useState({
    title: "",
    contributor: "",
    coverage: "",
    creator: "",
    date: "",
    format: "",
    publisher: "",
    type: "",
    source: "",
    audience: "",
    thumb: "",
    subject: "",
    rights: "",
    language: "",
    description: "",
    instructionalMethod: "",
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
    const updatedResult = {
      ...resourceData,
      title: data.title,
      contributor: data.contributor,
      coverage: data.coverage,
      creator: data.creator,
      date: data.date,
      format: data.format,
      publisher: data.publisher,
      type: data.type,
      source: data.source,
      audience: data.audience,
      subject: data.subject,
      rights: data.rights,
      language: data.language,
      description: data.description,
      instructionalMethod: data.instructionalMethod,
    };

    const formData = new FormData();

    formData.append("title", updatedResult.title);
    formData.append("contributor", updatedResult.contributor);
    formData.append("coverage", updatedResult.coverage);
    formData.append("creator", updatedResult.creator);
    formData.append("date", updatedResult.date);
    formData.append("format", updatedResult.format);
    formData.append("publisher", updatedResult.publisher);
    formData.append("type", updatedResult.type);
    formData.append("source", updatedResult.source);
    formData.append("audience", updatedResult.audience);
    formData.append("subject", updatedResult.subject);
    formData.append("rights", updatedResult.rights);
    formData.append("language", updatedResult.language);
    formData.append("description", updatedResult.description);
    formData.append("instructionalMethod", updatedResult.instructionalMethod);

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

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
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
                <label htmlFor="contributor" className={styles.inputLabel}>
                  CONTRIBUÍDOR
                </label>
                <input
                  id="contributor"
                  type="text"
                  className={styles.inputBox}
                  placeholder="Contribuidor do recurso"
                  value={resourceData.contributor}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="type" className={styles.inputLabel}>
                  TIPO DO MATERIAL
                </label>
                <CustomSelector
                  id="type"
                  selectorId={1}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--dark-grey)"}
                  fontSize={"18px"}
                  options={Object.values(tipoRecurso)}
                  handleResult={updateSelected}
                  initialValue={tipoRecurso[resourceData.type]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="source" className={styles.inputLabel}>
                  FONTE
                </label>
                <input
                  id="source"
                  type="text"
                  className={styles.inputBox}
                  placeholder="Fonte"
                  value={resourceData.source}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="audience" className={styles.inputLabel}>
                  PÚBLICO ALVO
                </label>
                <CustomSelector
                  id="audience"
                  selectorId={1}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--dark-grey)"}
                  fontSize={"18px"}
                  options={Object.values(publicoAlvo)}
                  handleResult={updateSelected}
                  initialValue={publicoAlvo[resourceData.audience]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="creator" className={styles.inputLabel}>
                  CRIADOR
                </label>
                <input
                  id="creator"
                  type="text"
                  className={styles.inputBox}
                  placeholder="Criador/Autor do recurso"
                  value={resourceData.creator}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="publisher" className={styles.inputLabel}>
                  PUBLICADOR
                </label>
                <input
                  id="publisher"
                  type="text"
                  className={styles.inputBox}
                  placeholder="Publicador"
                  value={resourceData.publisher}
                  onChange={handleInputChange}
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
                  initialValue={idiomas[resourceData.language]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="format" className={styles.inputLabel}>
                  FORMATO
                </label>
                <CustomSelector
                  id="format"
                  selectorId={1}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--dark-grey)"}
                  fontSize={"18px"}
                  options={Object.values(formats)}
                  handleResult={updateSelected}
                  initialValue={formats[resourceData.format]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="subject" className={styles.inputLabel}>
                  ÁREA DO CONHECIMENTO
                </label>
                <CustomSelector
                  id="subject"
                  selectorId={2}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--dark-grey)"}
                  fontSize={"18px"}
                  options={Object.values(areasConhecimento)}
                  handleResult={updateSelected}
                  initialValue={areasConhecimento[resourceData.subject]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="rights" className={styles.inputLabel}>
                  TIPO DE LICENÇA
                </label>
                <CustomSelector
                  id="rights"
                  selectorId={3}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--dark-grey)"}
                  fontSize={"18px"}
                  options={Object.values(tiposLicenca)}
                  handleResult={updateSelected}
                  initialValue={tiposLicenca[resourceData.rights]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="coverage" className={styles.inputLabel}>
                  COBERTURA
                </label>
                <input
                  id="coverage"
                  type="text"
                  className={styles.inputBox}
                  placeholder="Cobertura (Ex: Brasil, século XIX.)"
                  value={resourceData.coverage}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="date" className={styles.inputLabel}>
                  DATA DO RECURSO
                </label>
                <input
                  id="date"
                  type="date"
                  className={styles.inputBox}
                  value={formatDateForInput(resourceData.date)}
                  onChange={handleInputChange}
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
              placeholder="Descrição..."
              value={resourceData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.instructions}>
            <label htmlFor="instructionalMethod" className={styles.inputLabel}>
              INSTRUÇÕES DE USO
            </label>
            <textarea
              rows="4"
              cols="20"
              name="instructionalMethod"
              id="instructionalMethod"
              maxLength="1000"
              className={styles.textArea}
              placeholder="Instruções de Uso"
              value={resourceData.instructionalMethod}
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