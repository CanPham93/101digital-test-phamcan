import { useEffect } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { asyncDispatch } from "../store/configureStore";
import { actionGetUserProfile } from "../store/actions/user";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const outlet = useOutlet();

  const getUserProfile = async () => {
    await asyncDispatch(dispatch, actionGetUserProfile());
  };

  useEffect(() => {
    if (!!auth) {
      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (!auth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Invoices", path: "invoices" },
          { label: "Create Invoice", path: "create-invoice" },
        ]}
      />
      <Container maxWidth="xl">{outlet}</Container>
    </div>
  );
};
