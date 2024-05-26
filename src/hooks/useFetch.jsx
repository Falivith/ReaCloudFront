import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// TODO: Arquivo morto. Lógica pra ser revisada e implementada em outro lugar.

const useFetch = (url) => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);

        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          localStorage.setItem("reaCloudSession", JSON.stringify(data?.user));
          window.location.reload();
          
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
      navigate('../')
  };
  return { loading, error, handleGoogle };
};

export default useFetch;
