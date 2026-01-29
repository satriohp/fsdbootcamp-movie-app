import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesAction, addMovieAction, deleteMovieAction } from "../../store/redux/movieSlice";

import MainLayout from "../templates/MainLayout";
import Hero from "../organisms/Hero";
import ContinueWatchCarousel from "../organisms/ContinueWatchCarousel";
import CarouselSection from "../organisms/CarouselSection";
import MovieDetailModal from "../organisms/MovieDetailModal"; 
import PremiumModal from "../organisms/PremiumModal"; 
import VideoPlayer from "../organisms/VideoPlayer"; 

import leftArrow from "/assets/frame72.png"; 
import rightArrow from "/assets/frame71.png";

export default function Home() {
  const dispatch = useDispatch();
  const { items: allMovies, status } = useSelector((state) => state.movies);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null); 
  const [pendingMovie, setPendingMovie] = useState(null); 
  const [isUserPremium] = useState(false); 
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
  const [newMovie, setNewMovie] = useState({ 
    title: "", 
    category: "trending", 
    src: "",
    type: "film" 
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000); 
  };

  const filteredMovieList = useMemo(() => {
    return {
      continue: allMovies.filter(m => m.category === "continue"),
      toprated: allMovies.filter(m => m.category === "toprated"),
      trending: allMovies.filter(m => m.category === "trending"),
      newrelease: allMovies.filter(m => m.category === "newrelease"),
    };
  }, [allMovies]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMoviesAction());
    }
  }, [status, dispatch]);

  const handleDeleteMovie = async (category, id) => {
    try {
      await dispatch(deleteMovieAction(id)).unwrap();
      showToast("Movie berhasil dihapus!");
    } catch (error) {
      showToast("Gagal menghapus dari server", "error");
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!newMovie.title) return showToast("Judul wajib diisi", "error");

    const movieToSave = {
      ...newMovie,
      src: newMovie.src || "https://placehold.co/400x600?text=No+Poster",
      year: new Date().getFullYear().toString(),
      rating: "5.0/5", 
      isPremium: true, 
      description: `Film ${newMovie.title} ditambahkan ke Database.`
    };

    try {
      await dispatch(addMovieAction(movieToSave)).unwrap();
      setNewMovie({ title: "", src: "", category: "trending", type: "film" });
      showToast("Movie berhasil ditambahkan!");
    } catch (error) {
      showToast("Gagal menyambung ke API", "error");
    }
  };

  const handleItemClick = (movie) => setSelectedMovie(movie);

  const handleStartWatch = (movie) => {
    if (movie.isPremium && !isUserPremium) {
      setPendingMovie(movie); 
      setSelectedMovie(null);
      setShowPremiumModal(true); 
      document.body.style.overflow = "hidden";
    } else {
      setSelectedMovie(null);
      setActiveVideo(movie); 
      document.body.style.overflow = "hidden";
    }
  };

  const handleBackFromPlayer = () => {
    setActiveVideo(null);
    document.body.style.overflow = "auto";
  };

  const handleClosePremium = () => {
    setShowPremiumModal(false);
    setPendingMovie(null);
    document.body.style.overflow = "auto";
  };

  return (
    <MainLayout>
      {activeVideo && <VideoPlayer movie={activeVideo} onBack={handleBackFromPlayer} />}
      {showPremiumModal && <PremiumModal movie={pendingMovie} onClose={handleClosePremium} />}
      <Hero type="home" />
      
      {toast.show && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-white shadow-2xl ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
          {toast.message}
        </div>
      )}

      <section className="px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-[#181A1C] p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Tambah Koleksi Film</h2>
          <form onSubmit={handleAddMovie} className="flex flex-col md:grid md:grid-cols-5 gap-4 items-end">
            <input className="bg-[#2C2F32] p-2.5 rounded-lg text-white" value={newMovie.title} onChange={(e) => setNewMovie({...newMovie, title: e.target.value})} placeholder="Judul..." />
            <select className="bg-[#2C2F32] p-2.5 rounded-lg text-white" value={newMovie.category} onChange={(e) => setNewMovie({...newMovie, category: e.target.value})}>
              <option value="continue">Melanjutkan</option>
              <option value="toprated">Top Rated</option>
              <option value="trending">Trending</option>
              <option value="newrelease">Rilis Baru</option>
            </select>
            <select className="bg-[#2C2F32] p-2.5 rounded-lg text-white" value={newMovie.type} onChange={(e) => setNewMovie({...newMovie, type: e.target.value})}>
              <option value="film">Film</option>
              <option value="series">Series</option>
            </select>
            <input className="bg-[#2C2F32] p-2.5 rounded-lg text-white" value={newMovie.src} onChange={(e) => setNewMovie({...newMovie, src: e.target.value})} placeholder="URL Poster..." />
            <button type="submit" className="bg-[#0F1E93] text-white py-2.5 rounded-lg font-semibold hover:bg-[#192DB7]">Tambah</button>
          </form>
        </div>
      </section>

      <div className="flex flex-col gap-8 pb-10">
        <ContinueWatchCarousel title="Melanjutkan Tonton" items={filteredMovieList.continue} category="continue" onDelete={handleDeleteMovie} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} onItemClick={handleItemClick} />
        <CarouselSection title="Top Rating Hari Ini" items={filteredMovieList.toprated} category="toprated" onDelete={handleDeleteMovie} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} onItemClick={handleItemClick} />
        <CarouselSection title="Film Trending" items={filteredMovieList.trending} category="trending" onDelete={handleDeleteMovie} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} onItemClick={handleItemClick} />
        <CarouselSection title="Rilis Baru" items={filteredMovieList.newrelease} category="newrelease" onDelete={handleDeleteMovie} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} onItemClick={handleItemClick} />
      </div>

      {selectedMovie && <MovieDetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} onStartWatch={handleStartWatch} />}
    </MainLayout>
  );
}