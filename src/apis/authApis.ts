import axios from "axios";

export interface user {
  username: string;
  password: string;
}
const url = import.meta.env.VITE_USER_URL;

export const SignIn = async (data: user) => {
  const res = await axios
    .post(`${url}/signin`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const GetUsernameFromJWT = async (token: string) => {
  const res = await axios
    .get(`${url}/getusername/${token}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const GetUserByUsername = async (username: string) => {
  const res = await axios
    .get(`${url}/getuser/${username}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const GetAllUsers = async () => {
  const res = await axios
    .get(`${url}/all`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
