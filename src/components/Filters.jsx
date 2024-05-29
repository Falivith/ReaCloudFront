import React, { useEffect, useState } from "react";
import styles from "./Filters.module.css";
import Search from "../assets/Search.svg";
import { CustomSelector } from "./CustomSelector";
import { useNavigate } from "react-router-dom";
import { filterReas } from "../services/reaquerys";
import { useLocation } from "react-router-dom";
import {
  tipoRecurso,
  publicoAlvo,
  areasConhecimento,
  tiposLicenca,
  idiomas,
} from "../models/resource";

export function Filters({
  onFilterChange = () => { },
  pageSize,
  currentPage,
  reqConfigState,
  setIsLoading,
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
    knowledgeArea: "",
    ...(reqConfigState !== null ? reqConfigState : {}),
  };

  const updateSelected = (id, s) => {
    setReqConfig((prevState) => ({
      ...prevState,
      [id]: s,
    }));
  };

  const [reqConfig, setReqConfig] = useState(standardValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [searchValue, setSearchValue] = useState("");

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
              knowledge_area: reqConfig.knowledgeArea,
              rea_type: reqConfig.type,
            },
            currentPage,
            pageSize
          );

          onFilterChange(response);
          setIsLoading(false);
        }

        if (location.pathname === "/" && isSubmitted) {
          navigate("/explorer", { state: { reqConfig } });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [reqConfig, currentPage]); // Run this effect whenever reqConfig changes

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
            id="knowledgeArea"
            type="filter"
            selectorId={1}
            width={"200px"}
            height={"44px"}
            options={Object.values(areasConhecimento)}
            handleResult={updateSelected}
            placeholder={reqConfigState?.knowledgeArea}
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
            placeholder={reqConfigState?.type}
          />
        </div>

        <button className={styles.blueSearchButton} onClick={fetchResources}>
          BUSCAR
        </button>
      </div>
    </div>
  );
}
