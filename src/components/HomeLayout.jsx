import { Navigate, useOutlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { AppBar } from "./AppBar";

export const HomeLayout = () => {
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const outlet = useOutlet();

  if (auth) {
    return <Navigate to="dashboard/invoices" replace />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Home", path: "/" },
          { label: "Login", path: "/login" },
        ]}
      />
      <Container maxWidth="xl">{outlet}</Container>
    </div>
  );
};
