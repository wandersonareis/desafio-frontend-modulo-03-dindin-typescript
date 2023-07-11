import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://dead-rose-seahorse-suit.cyclic.app",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export default instance;

