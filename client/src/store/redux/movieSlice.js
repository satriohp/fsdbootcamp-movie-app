import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchMoviesAction = createAsyncThunk('movies/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/movies');
    return response.data;
  } catch (err) { return rejectWithValue(err.response.data); }
});

export const addMovieAction = createAsyncThunk('movies/add', async (movie, { rejectWithValue }) => {
  try {
    const response = await api.post('/movies', movie);
    return response.data;
  } catch (err) { return rejectWithValue(err.response.data); }
});

export const deleteMovieAction = createAsyncThunk('movies/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/movies/${id}`);
    return id;
  } catch (err) { return rejectWithValue(err.response.data); }
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addMovieAction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteMovieAction.fulfilled, (state, action) => {
        state.items = state.items.filter(m => m.id !== action.payload);
      });
  }
});

export default movieSlice.reducer;