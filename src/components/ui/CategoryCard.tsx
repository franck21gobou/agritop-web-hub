
import { useState } from 'react';

interface CategoryCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const CategoryCard = ({ name, description, icon, active, onClick }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`rounded-xl p-6 transition-all duration-300 cursor-pointer ${
        active 
          ? 'bg-agritop-green-600 text-white shadow-lg shadow-agritop-green-500/20' 
          : 'bg-white hover:bg-agritop-green-50 text-agritop-earth-800 shadow-md'
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center mb-4 transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
        <div className={`p-3 rounded-full ${active ? 'bg-white/20' : 'bg-agritop-green-100'}`}>
          {icon}
        </div>
      </div>
      <h3 className={`text-lg font-bold mb-2 ${active ? 'text-white' : 'text-agritop-green-800'}`}>
        {name}
      </h3>
      <p className={`text-sm ${active ? 'text-white/80' : 'text-agritop-earth-700'}`}>
        {description}
      </p>
    </div>
  );
};

export default CategoryCard;
