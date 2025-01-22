import { Header } from "../components/Header";
import { ReaEditInputForm } from "../components/reaconfig/ReaEditInputForm";
import { useLocation } from "react-router-dom";
import { getResourceInfo } from "../services/reaquerys";
import { useEffect } from "react";

export function PostedReaEdit() {
  const location = useLocation(); // Get the location object
  const { state } = location;
  const id = state?.id;

  useEffect(() => {
    const fetchResourceInfo = async () => {
      try {
        const result = await getResourceInfo(id);
      } catch (error) {
        console.error("Failed to fetch resource info", error);
      }
    };

    fetchResourceInfo();
  }, [id]); // Dependency array. If the id changes, the effect runs again.

  return (
    <div>
      <Header />
      <ReaEditInputForm />
    </div>
  );
}
