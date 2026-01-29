import Badge from "../atoms/Badge";
import IconButton from "../atoms/IconButton";

export default function PosterItem({ 
  src, 
  title, 
  year, 
  badge, 
  itemsPerView = 6, 
  onDelete,
  onClick, 
  isPremium, 
  isNewEpisode, 
  topNumber,
  isHorizontal 
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
          >
            <span className="text-xs font-bold">✕</span>
          </IconButton>
        </div>
      )}
      
      <div className={`relative rounded-lg overflow-hidden shadow-lg ${isHorizontal ? 'aspect-video' : 'aspect-[2/3]'}`}>
        <img
          src={getFallbackImage(src, title)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=No+Image"; }}
        />
        
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
          {isNewEpisode && (
            <div className="bg-[#0F1E93] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded">
              Episode Baru
            </div>
          )}
          
          {isPremium && (
            <div className="bg-[#E5A004] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded">
              Premium
            </div>
          )}
        </div>

        {topNumber && (
          <div className={`absolute top-2 ${onDelete ? 'right-10' : 'right-2'} z-10`}>
            <div className="bg-[#E50914] text-white rounded-sm px-2 py-1 flex flex-col items-center justify-center leading-none">
              <span className="text-[9px] font-semibold">Top</span>
              <span className="text-[13px] font-black">{topNumber}</span>
            </div>
          </div>
        )}

        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent rounded-b-lg p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <h4 className="text-xs sm:text-sm font-semibold text-white truncate">{title}</h4>
            {year && <p className="text-[10px] sm:text-xs text-white/70">{year}</p>}
          </div>
        )}
      </div>
    </div>
  );
}