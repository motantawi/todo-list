import { useNavigate } from "react-router-dom";
import userStore from "@zustand/userStore";
const useUser = () => {
  const navigate = useNavigate();
  const { user, setUser, removeUser } = userStore((state) => state);

  const logout = () => {
    removeUser();
    navigate("/login");
  };

  return { user, logout, removeUser, setUser };
};

export default useUser;
