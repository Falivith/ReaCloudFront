import styles from "./ReaInputForm.module.css";
import { CustomSelector } from "../CustomSelector";
import AddRing from "../../assets/Add_ring_green.png";
import FileUpload from "../../assets/FileUpload.png";
import { BaseNotification } from "../modals/BaseNotification";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { submitRea } from "../../services/submitNewRea";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import {
  tipoRecurso,
  publicoAlvo,
  areasConhecimento,
  tiposLicenca,
  idiomas,
} from "../../models/resource";

/* saveSuccess, saveError, passwordSuccess, passwordWarning, passwordError */

export function ReaInputForm() {
  const extensionId = import.meta.env.VITE_REACLOUD_EXTENSION_ID;

  const [selectedRea, setSelectedRea] = useState(null);
  const { index } = useParams();
  const [isLoading, setIsLoading] = useState(index ? true : false);
  const initialValues = {
    title: "",
    reaType: Object.values(tipoRecurso)[0],
    link: "",
    targetPublic: Object.values(publicoAlvo)[0],
    knowledgeArea: Object.values(areasConhecimento)[0],
    license: Object.values(tiposLicenca)[0],
    language: Object.values(idiomas)[0],
    description: "",
    instructions: "",
  };
  const [result, setResult] = useState(initialValues);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState("");
  

  useEffect(() => {
    if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(
        extensionId,
        { getTargetData: true },
        (response) => {
          if (response && response.setTargetData) {
            console.log(response);
            setSelectedRea(response.setTargetData[index]);
          }
        }
      );
    }
  }, [index]);
  // Update Selector
  const updateSelected = (id, s) => {
    setResult((prevState) => ({
      ...prevState,
      [id]: s,
    }));
  };

  useEffect(() => {
    console.log(result);
  }, [ result ]);

  useEffect(() => {
    if (selectedRea) {
      setResult((prevState) => ({
        ...prevState,
        title: selectedRea.title,
        link: selectedRea.link,
        description: selectedRea.description,
      }));

      setIsLoading(false);
    }
  }, [selectedRea]);

  const navigate = useNavigate();

  const routeChangeHandler = async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Aguarda 1 segundo
    navigate(`../${route}`);
  };

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");

  const closeNotification = () => {
    setShowNotification(false);
  };

  const addRea = async (data) => {
    setResult((prevState) => ({
      ...prevState,
      title: data.title,
      link: data.link,
      description: data.description,
      instructions: data.instructions,
    }));

    const updatedResult = {
      ...result,
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

    formData.append("thumb", image);

    try {
      console.log("aqui", formData);
      const formSubmitSuccess = await submitRea(formData);
      if (formSubmitSuccess) {
        setNotificationType("saveReaSuccess");
        setShowNotification(true);

        if (chrome && chrome.runtime && selectedRea) {
          chrome.runtime.sendMessage(
            extensionId,
            { delete: selectedRea.link },
            (response) => {
              if (response && response.setTargetData) {
                console.log("Recursos atuais na mochila: ", response);
              }
            }
          );
        }

        await routeChangeHandler("");
      } else {
        setNotificationType("saveReaErrorUnloged");
        setShowNotification(true);
      }
    } catch (error) {
      console.error("Error submitting REA:", error);

      setNotificationType("saveReaError");
      setShowNotification(true);
    }
  };



  const [focusedField, setFocusedField] = useState(null);
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null); // Remover o foco do campo atual
  };

  return (
    <div className={styles.container}>
      {
        <BaseNotification
          type={notificationType}
          showing={showNotification}
          onClose={closeNotification}
        />
      }

      <header className={styles.header}>
        <img src={AddRing} alt="Símbolo de Adição de Recurso" /> Adicionar novos
        recursos
      </header>

      {isLoading ? (
        <Loading />
      ) : (
        <form
          id="reaconfig"
          className={styles.formContainer}
          onSubmit={handleSubmit(addRea)}
        >
          <div className={styles.columns}>
            <div className={styles.column}>
              <div className={styles.inputContainer}>
                <label htmlFor="title" className={styles.inputLabel}>
                  TÍTULO DO MATERIAL
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  {...register("title", {
                    required: "Este campo é obrigatório",
                  })}
                  className={styles.inputBox}
                  placeholder="Título do Material"
                  defaultValue={selectedRea?.title ?? ""}
                  onFocus={() => handleFocus("title")}
                  onBlur={handleBlur}
                  maxLength={100}
                />
                {errors.title && focusedField === "title" && (
                  <p className={styles.errorMessage}>{errors.title.message}</p>
                )}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="reaType" className={styles.inputLabel}>
                  TIPO DO MATERIAL
                </label>
                <CustomSelector
                  id="reaType"
                  selectorId={5}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--lightgray4)"}
                  fontSize={"18px"}
                  options={Object.values(tipoRecurso)}
                  handleResult={updateSelected}
                  placeholder={Object.values(tipoRecurso)[0]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="link" className={styles.inputLabel}>
                  LINK
                </label>
                <input
                  id="link"
                  type="text"
                  name="link"
                  {...register("link", {
                    required: "Este campo é obrigatório",
                  })}
                  className={styles.inputBox}
                  placeholder="Link"
                  defaultValue={selectedRea?.link ?? ""}
                  onFocus={() => handleFocus("link")}
                  onBlur={handleBlur}
                  maxLength={2000}
                />
                {errors.link && focusedField === "link" && (
                  <p className={styles.errorMessage}>{errors.link.message}</p>
                )}
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
                  color={"var(--lightgray4)"}
                  fontSize={"18px"}
                  options={Object.values(publicoAlvo)}
                  handleResult={updateSelected}
                  placeholder={Object.values(publicoAlvo)[0]}
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
                  className={styles.fileChooser}
                >
                  <span> {image ? image.name : "Imagem"} </span>
                  <input
                    id="imgpath"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    style={{ display: "none" }}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div className={styles.cornerUpload}>
                    <img src={FileUpload} alt="Upload de Arquivo" />
                    <span>CARREGAR</span>
                  </div>
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
                  color={"var(--lightgray4)"}
                  fontSize={"18px"}
                  options={Object.values(areasConhecimento)}
                  handleResult={updateSelected}
                  placeholder={Object.values(areasConhecimento)[0]}
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
                  color={"var(--lightgray4)"}
                  fontSize={"18px"}
                  options={Object.values(tiposLicenca)}
                  handleResult={updateSelected}
                  placeholder={Object.values(tiposLicenca)[0]}
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
                  color={"var(--lightgray4)"}
                  fontSize={"18px"}
                  options={Object.values(idiomas)}
                  handleResult={updateSelected}
                  placeholder={Object.values(idiomas)[0]}
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
              name="description"
              {...register("description", {
                required: "Este campo é obrigatório",
              })}
              className={styles.descriptionInputBox}
              placeholder="Descrição do recurso educacional"
              defaultValue={selectedRea?.description ?? ""}
              onFocus={() => handleFocus("description")}
              onBlur={handleBlur}
              maxLength={1000}
            />
            {errors.description && focusedField === "description" && (
              <p className={styles.errorMessage}>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className={styles.instructions}>
            <label htmlFor="instructions" className={styles.inputLabel}>
              INSTRUÇÕES DE USO
            </label>
            <textarea
              rows="4"
              cols="20"
              name="instructions"
              {...register("instructions")}
              id="instructions"
              maxLength="1000"
              className={styles.textArea}
              placeholder="Instruções de Uso"
            ></textarea>
          </div>

          <div className={styles.buttonsContainer}>
            <button
              className={styles.cancelButton}
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button className={styles.submitButton}>Salvar</button>
          </div>
        </form>
      )}
    </div>
  );
}
