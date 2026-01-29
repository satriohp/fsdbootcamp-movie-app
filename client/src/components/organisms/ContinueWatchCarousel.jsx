import { useState, useEffect } from "react";
import LandscapePosterItem from "../molecules/LandscapePosterItem";

export default function ContinueWatchCarousel({ 
  title, 
  items, 
  category, 
  onDelete, 
  leftArrowSrc, 
  rightArrowSrc,
  onItemClick 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(2);
      else if (width < 768) setItemsPerView(3);
      else if (width < 1024) setItemsPerView(4);
      else if (width < 1280) setItemsPerView(5);
      else setItemsPerView(6);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const scrollLeft = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const scrollRight = () => {
    const maxIndex = Math.max(0, items.length - itemsPerView);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className="my-10 px-4 sm:px-6 lg:px-8 group/carousel relative">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">{title}</h2>
      
      <div className="relative flex items-center">
        {currentIndex > 0 && (
          <button 
            onClick={scrollLeft} 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-black/70 p-2 rounded-full z-10 transition-transform hover:scale-110"
          >
            <img src={leftArrowSrc} alt="Prev" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        <div className="overflow-hidden w-full">
          <div 
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {items.map((item) => (
              <LandscapePosterItem
                key={item.id}
                src={item.src}
                title={item.title}
                year={item.year}
                itemsPerView={itemsPerView}
                onDelete={onDelete ? () => onDelete(category, item.id) : null}
                onClick={() => onItemClick && onItemClick(item)}
              />
            ))}
          </div>
        </div>

        {currentIndex < items.length - itemsPerView && (
          <button 
            onClick={scrollRight} 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-black/70 p-2 rounded-full z-10 transition-transform hover:scale-110"
          >
            <img src={rightArrowSrc} alt="Next" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>
    </section>
  );
}