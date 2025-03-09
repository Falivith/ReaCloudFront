import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Gear from "../../assets/Gear.png";
import { getResourceInfo } from "../../services/reaquerys";
import { CustomSelector } from "../CustomSelector";
import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      contributor: "",
      coverage: "",
      creator: "",
      date: "",
      source: "",
      description: "",
      instructionalMethod: "",
    },
  });

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

        // Set form values for React Hook Form
        Object.entries(result).forEach(([key, value]) => {
          setValue(key, value || "");
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch resource info", error);
        setIsLoading(false);
      }
    };

    fetchResourceInfo();
  }, [id, setValue]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setResourceData((prev) => ({ ...prev, [id]: value }));
  };

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
        setResourceData((prevState) => ({
          ...prevState,
          [id]: selectedKey,
        }));
      } else {
        console.warn(`Key not found for value: ${selectedValue}`);
      }
    } else {
      setResourceData((prevState) => ({
        ...prevState,
        [id]: selectedValue,
      }));
    }
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
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div className={styles.container}>
      <BaseNotification
        type={notificationType}
        showing={showNotification}
        onClose={() => setShowNotification(false)}
      />

      <header className={styles.header}>
        <img src={Gear} alt="Símbolo de Adição de Recurso" /> Editar Recurso{" "}
      </header>

      {isLoading ? (
        <Loading />
      ) : (
        <form
          id="reaconfig"
          className={styles.formContainer}
          onSubmit={handleSubmit(updateRea)}
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
                  className={styles.inputBox}
                  placeholder="Título do Material"
                  {...register("title", {
                    required: "Este campo é obrigatório",
                  })}
                  value={resourceData.title}
                  onChange={handleInputChange}
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
                  className={styles.inputBox}
                  placeholder="Contribuidor do recurso"
                  {...register("contributor")}
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
                  selectorId={5}
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
                  {...register("source", {
                    required: "Este campo é obrigatório",
                  })}
                  placeholder="Fonte"
                  value={resourceData.source}
                  onChange={handleInputChange}
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
                  {...register("creator")}
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
                  {...register("publisher")}
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
                  selectorId={6}
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
                  {...register("coverage")}
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
                  {...register("date", {
                    required: "Este campo é obrigatório",
                  })}
                  className={styles.inputBox}
                  value={formatDateForInput(resourceData.date)}
                  onChange={handleInputChange}
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
              className={styles.descriptionInputBox}
              placeholder="Descrição..."
              {...register("description", {
                required: "Este campo é obrigatório",
              })}
              value={resourceData.description}
              onChange={handleInputChange}
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
              id="instructionalMethod"
              {...register("instructionalMethod")}
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
              type="button"
            >
              Cancelar
            </button>
            <button
              id="submitButton"
              className={styles.submitButton}
              type="submit"
            >
              Salvar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
