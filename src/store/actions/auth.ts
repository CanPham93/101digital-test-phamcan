import { toast } from "react-toastify";
import { auth } from "../constants/auth";
import { user } from './../constants/user';
import apiAuth from "../../request/auth";

export const actionLogin = (data: any) => {
  return async (dispatch: any) => {
    dispatch({ type: auth.LOGIN_LOADING });

    try {
      const res = await apiAuth.loginUser(data);
      if (res.status === 200) {
        localStorage.setItem("access_token", res?.data?.access_token);
        dispatch({ type: "LOGIN_SUCCESS" });
        toast.success("Login success!");
      } else {
        toast.error("Username or password incorrect");
        dispatch({ type: auth.LOGIN_FAILURE, payload: {} });
      }
    } catch (error: any) {
      dispatch({ type: auth.LOGIN_FAILURE, payload: error });
      toast.error(error?.message);
    }
  };
};

export const actionLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("org_token");
  toast.success("Logout success!");
  return async (dispatch: any) => {
    dispatch({ type: auth.LOGOUT });
    dispatch({ type: user.DELETE_USER_PROFILE });
  };
};
