import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesAction } from "../../store/redux/movieSlice";

import MainLayout from "../templates/MainLayout";
import Hero from "../organisms/Hero";
import CarouselSection from "../organisms/CarouselSection";
import MovieDetailModal from "../organisms/MovieDetailModal";
import VideoPlayer from "../organisms/VideoPlayer";

import leftArrow from "/assets/frame72.png";
import rightArrow from "/assets/frame71.png";

export default function Series() {
  const dispatch = useDispatch();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const { items: allMovies, status } = useSelector((state) => state.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMoviesAction());
    }
  }, [status, dispatch]);

  const filteredSeries = useMemo(() => {
    const seriesOnly = allMovies.filter((item) => item.type === "series");
    
    return {
      continue: seriesOnly.filter((m) => m.category === "continue"),
      trending: seriesOnly.filter((m) => m.category === "trending"),
      toprated: seriesOnly.filter((m) => m.category === "toprated"),
      newrelease: seriesOnly.filter((m) => m.category === "newrelease"),
      originals: seriesOnly.filter((m) => m.category === "trending").slice(0, 6),
    };
  }, [allMovies]);

  const handleItemClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleStartWatch = (movie) => {
    setSelectedMovie(null);
    setActiveVideo(movie);
    document.body.style.overflow = "hidden";
  };

  return (
    <MainLayout>
      {activeVideo && (
        <VideoPlayer 
          movie={activeVideo} 
          onBack={() => {
            setActiveVideo(null);
            document.body.style.overflow = "auto";
          }} 
        />
      )}

      <Hero type="series" />

      <div className="flex flex-col gap-4 sm:gap-8 pb-10 -mt-12 sm:-mt-16 relative z-20">
        
        <CarouselSection
          title="Melanjutkan Tontonan Series"
          items={filteredSeries.continue}
          isHorizontal={true}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Series Persembahan Chill"
          items={filteredSeries.originals}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Top Rating Series Hari Ini"
          items={filteredSeries.toprated}
          isTopTen={true}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Series Trending"
          items={filteredSeries.trending}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Rilis Baru"
          items={filteredSeries.newrelease}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />
      </div>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onStartWatch={handleStartWatch}
        />
      )}
    </MainLayout>
  );
}