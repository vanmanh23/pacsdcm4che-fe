import axios from "axios";

export interface user {
  username: string;
  password: string;
};
const url = "http://localhost:8081/api/user";
export const SignIn = async (data: user) => {
  const res = await axios
    .post("http://localhost:8081/api/user/signin", data)
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
}
export const GetUserByUsername = async (username: string) => {
  const res = await axios
    .get(`http://localhost:8081/api/user/getuser/${username}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
