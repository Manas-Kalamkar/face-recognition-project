import { myAxios } from "./helper";

export const signUp = (user) => {
    return myAxios
    .post('/auth/signup',user)
    .then((response) => response.data)
}