import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMovies = () => api.get('/movie'); 
export const deleteMovie = (id) => api.delete(`/movie/${id}`);
export const addMovie = (movieData) => api.post('/movie', movieData);

export default api;