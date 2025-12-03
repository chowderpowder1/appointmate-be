import axios from "axios";

export const postUserData = async (userData) => {

    const response = await axios
    .post('http://localhost:8080/userData/submit', userData)
    console.log(response.data);

}