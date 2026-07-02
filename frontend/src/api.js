import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const getProfile = () => api.get("/profile").then((res) => res.data);
export const getProjects = (category) =>
  api
    .get("/projects", { params: category ? { category } : {} })
    .then((res) => res.data);
export const getSkills = () => api.get("/skills").then((res) => res.data);
export const getExperience = () => api.get("/experience").then((res) => res.data);
export const getCertifications = () =>
  api.get("/certifications").then((res) => res.data);
export const postContact = (payload) =>
  api.post("/contact", payload).then((res) => res.data);
export const getVisitorCount = () =>
  api.get("/visitors").then((res) => res.data);

export default api;