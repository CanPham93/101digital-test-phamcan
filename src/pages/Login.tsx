import * as React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { asyncDispatch } from "../store/configureStore";
import { actionLogin } from "../store/actions/auth";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmitLogin = async (data: any) => {
    await asyncDispatch(
      dispatch,
      actionLogin({
        client_id: "oO8BMTesSg9Vl3_jAyKpbOd2fIEa",
        client_secret: "0Exp4dwqmpON_ezyhfm0o_Xkowka",
        grant_type: "password",
        scope: "openid",
        username: data.username,
        password: data.password,
      })
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <TextField
            label="User Name"
            type="email"
            {...register("username", { required: true })}
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="User Name"
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", { required: true })}
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Login In
          </Button>
        </form>
      </Box>
    </Container>
  );
};
