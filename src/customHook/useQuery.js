import { useLocation } from "react-router-dom";

export const useQuery = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams;
};