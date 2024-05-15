import axios from "axios";

export const axiosNodeClient = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    headers: { 'x-api-key': "ABCDEFGHIJKLMNOPQRSTUVWXYZ" }
});

export const axiosOpenseaClient = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    headers: { 'x-api-key': "ABCDEFGHIJKLMNOPQRSTUVWXYZ" }
});