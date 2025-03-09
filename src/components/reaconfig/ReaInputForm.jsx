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
  formats,
} from "../../models/resource";

/* saveSuccess, saveError, passwordSuccess, passwordWarning, passwordError */

export function ReaInputForm() {
  const extensionId = import.meta.env.VITE_REACLOUD_EXTENSION_ID;

  const [selectedRea, setSelectedRea] = useState(null);
  const { index } = useParams();
  const [isLoading, setIsLoading] = useState(index ? true : false);
  const initialValues = {
    title: "",
    contributor: "",
    coverage: "",
    creator: "",
    date: null,
    format: Object.keys(formats)[0],
    publisher: "",
    type: Object.keys(tipoRecurso)[0],
    source: "",
    audience: Object.keys(publicoAlvo)[0],
    thumb: "",
    subject: Object.keys(areasConhecimento)[0],
    rights: Object.keys(tiposLicenca)[0],
    language: Object.keys(idiomas)[0],
    description: "",
    instructionalMethod: "",
  };

  const [result, setResult] = useState(initialValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState("");

  // Extension Communication
  useEffect(() => {
    if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(
        extensionId,
        { getTargetData: true },
        (response) => {
          if (response && response.setTargetData) {
            setSelectedRea(response.setTargetData[index]);
          }
        }
      );
    }
  }, [index]);

  // Update Selector
  const updateSelected = (id, selectedValue) => {
    // Debug what's being passed
    // console.log('Type of selectedValue:', typeof selectedValue);
    // console.log('Selected value:', selectedValue);

    if (typeof selectedValue === "object" && selectedValue.value) {
      // If selectedValue is an object with a value property
      selectedValue = selectedValue.value;
    }

    const mapping = {
      subject: areasConhecimento,
      type: tipoRecurso,
      audience: publicoAlvo,
      rights: tiposLicenca,
      language: idiomas,
      format: formats,
    };

    if (
      ["subject", "type", "audience", "rights", "language", "format"].includes(
        id
      )
    ) {
      const selectedKey = Object.entries(mapping[id]).find(
        ([_, value]) => value === selectedValue
      )?.[0];

      console.log("Comparing:", {
        selectedValue,
        availableValues: Object.values(mapping[id]),
      });

      if (selectedKey) {
        setResult((prevState) => ({
          ...prevState,
          [id]: selectedKey,
        }));
      } else {
        console.warn(`Key not found for value: ${selectedValue}`);
      }
    } else {
      setResult((prevState) => ({
        ...prevState,
        [id]: selectedValue,
      }));
    }
  };

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
      contributor: data.contributor,
      coverage: data.coverage,
      creator: data.creator,
      date: data.date,
      publisher: data.publisher,
      source: data.source,
      description: data.description,
      instructionalMethod: data.instructionalMethod,
    }));

    const updatedResult = {
      ...result,
      title: data.title,
      contributor: data.contributor,
      coverage: data.coverage,
      creator: data.creator,
      date: data.date,
      publisher: data.publisher,
      source: data.source,
      description: data.description,
      instructionalMethod: data.instructionalMethod,
    };

    const formData = new FormData();

    formData.append("title", updatedResult.title);
    formData.append("contributor", updatedResult.contributor);
    formData.append("coverage", updatedResult.coverage);
    formData.append("creator", updatedResult.creator);
    if (data.date) {
      formData.append("date", data.date);
    } else {
      formData.append("date", null);
    }
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

    formData.append("thumb", image);

    try {
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

        console.log(formSubmitSuccess);

        // Get the ID from the response and navigate
        const newReaId = formSubmitSuccess.data.id;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate(`/ReaView/${newReaId}`);
      } else {
        setNotificationType("saveReaErrorUnloged");
        setShowNotification(true);
      }
    } catch (error) {
      console.error("Error submitting REA:", error);

      // Check for internal server error (500)
      if (error.response && error.response.status === 500) {
        setNotificationType("saveReaNetworkError");
        setShowNotification(true);
      } else if (error.message === "Network Error") {
        setNotificationType("saveReaNetworkError");
        setShowNotification(true);
      } else {
        setNotificationType("saveReaError");
        setShowNotification(true);
      }
    }
  };

  const [focusedField, setFocusedField] = useState(null);
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null); // Remover o foco do campo atual
  };

  // useEffect(() => {
  //   console.log("Updated result:", result);
  //   console.log("tipo", tipoRecurso);
  // }, [result]);

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
                  TÍTULO
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  {...register("title", {
                    required: "Este campo é obrigatório",
                  })}
                  className={styles.inputBox}
                  placeholder="Título do Recurso"
                  defaultValue={selectedRea?.title ?? ""}
                  onFocus={() => handleFocus("title")}
                  onBlur={handleBlur}
                  maxLength={100}
                />
                {errors.title && (
                  <p className={styles.errorMessage}>{errors.title.message}</p>
                )}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="contributor" className={styles.inputLabel}>
                  CONTRIBUÍDOR
                </label>
                <input
                  id="contributor"
                  type="text"
                  name="contributor"
                  className={styles.inputBox}
                  {...register("contributor")}
                  placeholder="Contribuídor do Material"
                  defaultValue={""}
                  onFocus={() => handleFocus("contributor")}
                  onBlur={handleBlur}
                  maxLength={100}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="type" className={styles.inputLabel}>
                  TIPO
                </label>
                <CustomSelector
                  id="type"
                  selectorId={5}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--darkgrey)"}
                  fontSize={"18px"}
                  options={Object.values(tipoRecurso)}
                  handleResult={updateSelected}
                  placeholder={Object.values(tipoRecurso)[0]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="source" className={styles.inputLabel}>
                  FONTE
                </label>
                <input
                  id="source"
                  type="text"
                  name="source"
                  {...register("source", {
                    required: "Este campo é obrigatório",
                  })}
                  className={styles.inputBox}
                  placeholder="Fonte (link)"
                  defaultValue={selectedRea?.source ?? ""}
                  onFocus={() => handleFocus("source")}
                  onBlur={handleBlur}
                  maxLength={2000}
                />
                {errors.source && (
                  <p className={styles.errorMessage}>{errors.source.message}</p>
                )}
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
                  color={"var(--darkgrey)"}
                  fontSize={"18px"}
                  options={Object.values(publicoAlvo)}
                  handleResult={updateSelected}
                  placeholder={Object.values(publicoAlvo)[0]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="creator" className={styles.inputLabel}>
                  CRIADOR
                </label>
                <input
                  id="creator"
                  type="text"
                  name="creator"
                  className={styles.inputBox}
                  {...register("creator")}
                  placeholder="Autor do Recurso"
                  defaultValue={""}
                  onFocus={() => handleFocus("creator")}
                  onBlur={handleBlur}
                  maxLength={100}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="publisher" className={styles.inputLabel}>
                  PUBLICADOR
                </label>
                <input
                  id="publisher"
                  type="text"
                  name="publisher"
                  {...register("publisher")}
                  className={styles.inputBox}
                  placeholder={"Publicador do Recurso (pessoa/entidade)"}
                  defaultValue={""}
                  onFocus={() => handleFocus("publisher")}
                  onBlur={handleBlur}
                  maxLength={100}
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
                    {...register("thumb", {
                      required: "Este campo é obrigatório",
                    })}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div className={styles.cornerUpload}>
                    <img src={FileUpload} alt="Upload de Arquivo" />
                    <span>CARREGAR</span>
                  </div>
                </label>
                {errors.thumb && (
                  <p className={styles.errorMessage}>{errors.thumb.message}</p>
                )}
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
                  color={"var(--darkgrey)"}
                  fontSize={"18px"}
                  options={Object.values(idiomas)}
                  handleResult={updateSelected}
                  placeholder={Object.values(idiomas)[0]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="format" className={styles.inputLabel}>
                  FORMATO
                </label>
                <CustomSelector
                  id="format"
                  selectorId={6}
                  width={"364px"}
                  height={"44px"}
                  color={"var(--darkgrey)"}
                  fontSize={"18px"}
                  options={Object.values(formats)}
                  handleResult={updateSelected}
                  placeholder={Object.values(formats)[0]}
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
                  color={"var(--darkgrey)"}
                  fontSize={"18px"}
                  options={Object.values(areasConhecimento)}
                  handleResult={updateSelected}
                  placeholder={Object.values(areasConhecimento)[0]}
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
                  color={"var(--darkgrey)"}
                  fontSize={"18px"}
                  options={Object.values(tiposLicenca)}
                  handleResult={updateSelected}
                  placeholder={Object.values(tiposLicenca)[0]}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="coverage" className={styles.inputLabel}>
                  COBERTURA
                </label>
                <input
                  id="coverage"
                  type="text"
                  name="coverage"
                  {...register("coverage")}
                  className={styles.inputBox}
                  placeholder={"Cobertura (Ex: Brasil, século XIX.)"}
                  defaultValue={""}
                  onFocus={() => handleFocus("coverage")}
                  onBlur={handleBlur}
                  maxLength={100}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="date" className={styles.inputLabel}>
                  DATA DO RECURSO (CRIAÇÃO/MODIFICAÇÃO)
                </label>
                <input
                  id="date"
                  type="date"
                  {...register("date", {
                    required: "Este campo é obrigatório",
                  })}
                  className={styles.inputBox}
                  onFocus={() => handleFocus("date")}
                  onBlur={handleBlur}
                  maxLength={100}
                />
                {errors.date && (
                  <p className={styles.errorMessage}>{errors.date.message}</p>
                )}
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
              placeholder={"Descrição do recurso educacional"}
              defaultValue={selectedRea?.description ?? ""}
              onFocus={() => handleFocus("description")}
              onBlur={handleBlur}
              maxLength={1000}
            />
            {errors.description && (
              <p className={styles.errorMessage}>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className={styles.instructions}>
            <label htmlFor="instructionalMethod" className={styles.inputLabel}>
              INSTRUÇÕES DE USO
            </label>
            <textarea
              rows="4"
              cols="20"
              name="instructionalMethod"
              {...register("instructionalMethod")}
              id="instructionalMethod"
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
            <button id="submitButton" className={styles.submitButton}>
              Salvar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
