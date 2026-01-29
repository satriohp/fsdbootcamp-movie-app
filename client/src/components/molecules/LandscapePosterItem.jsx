import Badge from "../atoms/Badge";
import IconButton from "../atoms/IconButton";

export default function LandscapePosterItem({ 
  src, 
  title, 
  year, 
  badge, 
  itemsPerView = 6, 
  onDelete, 
  onClick 
}) {
  
  const getFallbackImage = (currentSrc, currentTitle) => {
    if (currentSrc && currentSrc !== "null" && currentSrc !== "") return currentSrc;
    const slug = currentTitle?.toLowerCase().replace(/\s+/g, '-');
    return `/assets/${slug}.png`; 
  };

  const getItemWidth = () => {
    const gap = itemsPerView > 1 ? (itemsPerView - 1) * 1 : 0;
    return `calc((100% - ${gap}rem) / ${itemsPerView})`;
  };

  return (
    <div 
      className="relative cursor-pointer group flex-shrink-0"
      style={{ width: getItemWidth() }}
      onClick={onClick}
    >
      {badge && <Badge>{badge}</Badge>}

      {onDelete && (
        <div className="absolute top-2 right-2 z-40 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconButton 
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete();
            }}
            className="bg-red-600/90 hover:bg-red-700 text-white w-7 h-7 sm:w-8 sm:h-8"
            aria-label={`Hapus ${title}`}
          >
            <span className="text-xs font-bold">✕</span>
          </IconButton>
        </div>
      )}

      <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video bg-[#1A1A1A]">
        <img
          src={getFallbackImage(src, title)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 group-hover:opacity-80"
          onError={(e) => { e.target.src = "https://via.placeholder.com/640x360?text=No+Preview"; }}
        />

        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h4 className="text-xs sm:text-sm font-semibold text-white truncate leading-tight">
              {title}
            </h4>
            {year && (
              <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">
                {year}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}