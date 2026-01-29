import { useState, useRef, useEffect } from "react";
import PosterItem from "../molecules/PosterItem";

export default function CarouselSection({ 
  title, 
  items, 
  category, 
  onDelete, 
  leftArrowSrc, 
  rightArrowSrc, 
  onItemClick,
  isTopTen,
  isHorizontal 
}) {
  const [currentIndex, setCurrentIndex] = useState(items.length); 
  const [itemsPerView, setItemsPerView] = useState(6);
  const carouselRef = useRef(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      
      if (isHorizontal) {
        if (width < 640) setItemsPerView(1);
        else if (width < 1024) setItemsPerView(2);
        else if (width < 1280) setItemsPerView(3);
        else setItemsPerView(4);
      } else if (isTopTen) {
        if (width < 640) setItemsPerView(2);
        else if (width < 768) setItemsPerView(3);
        else if (width < 1024) setItemsPerView(4);
        else if (width < 1280) setItemsPerView(5);
        else setItemsPerView(6);
      } else {
        if (width < 640) setItemsPerView(2); 
        else if (width < 768) setItemsPerView(3); 
        else if (width < 1024) setItemsPerView(4); 
        else if (width < 1280) setItemsPerView(5); 
        else setItemsPerView(6);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [isHorizontal, isTopTen]);

  const infiniteItems = [...items, ...items, ...items];

  const scrollLeft = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? items.length * 2 - 1 : prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => (prev + 1 >= items.length * 2 ? items.length : prev + 1));
  };

  const getTransformValue = () => {
    return -(currentIndex * (100 / itemsPerView));
  };

  return (
    <section className={`py-6 sm:py-8 px-4 sm:px-8 relative group ${isTopTen ? 'overflow-visible' : ''}`}>
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">{title}</h3>
      
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-1.5 sm:p-2 rounded-full z-10 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <img src={leftArrowSrc} alt="Arrow Left" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className={`overflow-hidden ${isTopTen ? 'py-4' : ''}`} ref={carouselRef}>
          <div 
            className={`flex ${isTopTen ? 'gap-6 sm:gap-8' : 'gap-3 sm:gap-4'} transition-transform duration-500 ease-out`}
            style={{ transform: `translateX(${getTransformValue()}%)` }}
          >
            {infiniteItems.map((item, index) => (
              <PosterItem
                key={`${item.id}-${index}`}
                src={item.src}
                title={item.title}
                year={item.year}
                isPremium={item.isPremium}
                isNewEpisode={item.isNewEpisode}
                topNumber={isTopTen ? (index % items.length) + 1 : null}
                isHorizontal={isHorizontal}
                itemsPerView={itemsPerView}
                onDelete={onDelete ? () => onDelete(category, item.id) : null}
                onClick={() => onItemClick && onItemClick(item)}
              />
            ))}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-1.5 sm:p-2 rounded-full z-10 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <img src={rightArrowSrc} alt="Arrow Right" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
}