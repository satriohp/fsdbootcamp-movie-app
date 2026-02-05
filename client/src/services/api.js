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

export const getMovies = () => api.get('/movies'); 
export const deleteMovie = (id) => api.delete(`/movies/${id}`);
export const addMovie = (movieData) => api.post('/movies', movieData);

export default api;

