import React, { useEffect, useState } from "react";
import styles from "./Filters.module.css";
import Search from "../assets/Search.svg";
import { CustomSelector } from "./CustomSelector";
import { useNavigate } from "react-router-dom";
import { filterReas } from "../services/reaquerys";
import { useLocation } from "react-router-dom";
import { tipoRecurso, areasConhecimento } from "../models/resource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export function Filters({
  onFilterChange = () => {},
  pageSize,
  currentPage,
  reqConfigState,
  setIsLoading,
  setTotalPages, // Pass a function to update the total number of pages
  isFirstLoad,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (reqConfigState !== null && reqConfigState !== undefined) {
      setSearchValue(reqConfigState.title);
    }
  }, [reqConfigState]);

  const routeChangeHandler = async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1));
    navigate(`../${route}`);
  };

  const standardValues = {
    title: "",
    type: "",
    subject: "",
    ...(reqConfigState !== null ? reqConfigState : {}),
  };

  const updateSelected = (id, selectedValue) => {
    let key;

    // Map the selected value to its corresponding key
    if (id === "subject") {
      key = Object.keys(areasConhecimento).find(
        (k) => areasConhecimento[k] === selectedValue
      );
    } else if (id === "type") {
      key = Object.keys(tipoRecurso).find(
        (k) => tipoRecurso[k] === selectedValue
      );
    }

    // Update the state with the key instead of the value
    setReqConfig((prevState) => ({
      ...prevState,
      [id]: key || selectedValue, // Fallback to the selected value if no key is found
    }));
  };

  const [reqConfig, setReqConfig] = useState(standardValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const fetchResources = async () => {
    setIsSubmitted(true);
    try {
      setReqConfig((prevState) => ({
        ...prevState,
        title: searchValue,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.pathname === "/explorer") {
          setIsLoading(true);

          const response = await filterReas(
            {
              title: reqConfig.title,
              subject: reqConfig.subject,
              type: reqConfig.type,
            },
            currentPage,
            pageSize
          );

          onFilterChange(response.recursos);
          setTotalPages(response.totalPages); // Update total pages from response
          setIsLoading(false);
        }

        if (location.pathname === "/" && isSubmitted) {
          navigate("/explorer", { state: { reqConfig } });
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Ensure loading state is updated on error
      }
    };

    fetchData();
  }, [reqConfig, currentPage, pageSize]); // Run this effect whenever reqConfig, currentPage, or pageSize changes

  useEffect(() => {
    if (isFirstLoad) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip("hide");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isFirstLoad]);

  return (
    <div className={styles.container}>
      <form
        className={styles.internalContainer}
        onSubmit={(e) => {
          e.preventDefault();
          fetchResources();
        }}
      >
        <input
          value={searchValue}
          className={styles.inputSpace}
          type="text"
          placeholder="O que você procura?"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className={styles.searchButton} type="submit">
          <img src={Search} alt="Pesquisar" />
        </button>
      </form>

      <div className={styles.selectorsAndSearch}>
        <div className={styles.selectorExternalContainer}>
          <span className={styles.blueSpan}>ÁREA DO CONHECIMENTO</span>
          <CustomSelector
            id="subject"
            type="filter"
            selectorId={1}
            width={"200px"}
            height={"44px"}
            options={Object.values(areasConhecimento)}
            handleResult={updateSelected}
            placeholder={areasConhecimento[reqConfigState?.subject] || "Todos"} // Map key to value
          />
        </div>

        <div className={styles.selectorExternalContainer}>
          <span className={styles.blueSpan}>TIPO DO MATERIAL</span>
          <CustomSelector
            id="type"
            type="filter"
            selectorId={2}
            width={"200px"}
            height={"44px"}
            options={Object.values(tipoRecurso)}
            handleResult={updateSelected}
            placeholder={tipoRecurso[reqConfigState?.type] || "Todos"} // Map key to value
          />
        </div>

        <div className={styles.tooltipWrapper}>
          <button className={styles.blueSearchButton} onClick={fetchResources}>
            BUSCAR
          </button>
          {showTooltip && (
            <div
              className={`${styles.tooltip} ${
                showTooltip === "hide" ? styles.hidden : ""
              }`}
              onClick={() => setShowTooltip("hide")}
            >
              <span>Clique aqui para buscar recursos!</span>
              <FontAwesomeIcon icon={faArrowDown} className={styles.pulse} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
