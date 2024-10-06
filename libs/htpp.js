import axios from "axios";
let apiUrl = 'http://localhost:8080'

export async function getData(endpoint) {
    try {
        let res  = await axios.get(`${apiUrl}/${endpoint}`)
        return res
    } catch (error) {
        throw error
    }
}

export async function postData(endpoint, body) {
    try {
        let res  = await axios.post(`${apiUrl}/${endpoint}`, body)
        return res
    } catch (error) {
        throw error
    }
}

export async function putData(endpoint, body) {
    try {
        let res = await axios.put(`${apiUrl}/${endpoint}`, body);
        return res;
    } catch (error) {
        throw error;
    }
}

export async function patchData(endpoint, body) {
    try {
        let res = await axios.patch(`${apiUrl}/${endpoint}`, body);
        return res;
    } catch (error) {
        throw error;
    }
}