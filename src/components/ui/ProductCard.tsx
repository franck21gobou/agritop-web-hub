
import { useState } from 'react';
import { Info, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  name: string;
  description: string;
  origin: string;
  imageUrl: string;
  category: string;
}

const ProductCard = ({ name, description, origin, imageUrl, category }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div 
      className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <div className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${isImageLoaded ? 'hidden' : 'block'}`}>
          <div className="animate-pulse w-12 h-12 rounded-full bg-gray-300"></div>
        </div>
        <img
          src={imageUrl}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'} ${isImageLoaded ? 'img-loaded' : 'img-loading'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-agritop-sun-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-block bg-white/80 backdrop-blur-sm text-agritop-earth-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {origin}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-agritop-green-800 mb-2">{name}</h3>
        <p className="text-agritop-earth-700 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <button className="inline-flex items-center text-agritop-green-600 hover:text-agritop-green-800 font-medium text-sm">
            <Info className="h-4 w-4 mr-1" />
            Spécifications
          </button>
          <button className="inline-flex items-center text-agritop-sun-600 hover:text-agritop-sun-800 font-medium text-sm">
            <ExternalLink className="h-4 w-4 mr-1" />
            Demander un devis
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
