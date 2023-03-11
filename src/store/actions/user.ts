import { toast } from "react-toastify";
import user from "../../request/user";

export const actionGetUserProfile = (data: any) => {
  return async (dispatch: any) => {

    try {
      const res = await user.userProfile(data);
      console.log(res)
      if (res?.status === 200) {
        localStorage.setItem("org_token", res?.data?.data?.memberships[0].token || "");
        dispatch({ type: "GET_USER_PROFILE", payload: res?.data?.data || {} });
      } else { }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
};
