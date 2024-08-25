import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useUser from "@hooks/useUser";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
        textAlign: "center",
      }}
    >
      <ErrorOutlineIcon color="action" style={{ fontSize: 120 }} />
      <Typography color="textSecondary" variant="h4">
        Page Not Found{" "}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 5, fontSize: "20px" }}
        onClick={() => navigate(user ? "/todos" : "/")}
      >
        Return to Home Page
      </Button>
    </div>
  );
};

export default PageNotFound;
