import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loginUser: (data: any) =>
    axios({
      method: 'post',
      url: `${API_URL}/token`,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      return res;
    }),
}