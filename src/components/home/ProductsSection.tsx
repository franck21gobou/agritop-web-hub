
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import CategoryCard from '../ui/CategoryCard';
import { Wheat, Apple, Nut, LeafyGreen } from 'lucide-react';
import { productCategories } from '@/data/products';

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState(productCategories[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const activeProducts = productCategories.find(cat => cat.id === activeCategory)?.products || [];

  // Render the appropriate icon based on the category
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wheat':
        return <Wheat className="h-6 w-6 text-agritop-green-600" />;
      case 'Apple':
        return <Apple className="h-6 w-6 text-agritop-green-600" />;
      case 'Nut':
        return <Nut className="h-6 w-6 text-agritop-green-600" />;
      case 'LeafyGreen':
        return <LeafyGreen className="h-6 w-6 text-agritop-green-600" />;
      default:
        return <Wheat className="h-6 w-6 text-agritop-green-600" />;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-up');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="products" ref={sectionRef} className="py-20 bg-agritop-green-50">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">Nos produits agricoles</h2>
        
        <p className="text-agritop-earth-800 text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
          Découvrez notre gamme complète de produits agricoles de haute qualité en provenance de Côte d'Ivoire et d'autres pays d'Afrique de l'Ouest. Nous proposons des volumes importants pour répondre aux besoins des industries et des marchés internationaux.
        </p>
        
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {productCategories.map((category) => (
            <div key={category.id} className="animate-on-scroll">
              <CategoryCard
                name={category.name}
                description={category.description}
                icon={renderIcon(category.icon)}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            </div>
          ))}
        </div>
        
        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {activeProducts.map((product) => (
            <div key={product.id} className="animate-on-scroll cursor-pointer" onClick={() => handleProductClick(product.id)}>
              <ProductCard
                name={product.name}
                description={product.description}
                origin={product.origin}
                imageUrl={product.imageUrl}
                category={product.category}
              />
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-16 animate-on-scroll">
          <a
            href="#contact"
            className="button-primary inline-flex items-center"
          >
            Voir tous nos produits
          </a>
          <p className="text-agritop-earth-700 mt-4 text-sm">
            Contactez-nous pour des informations détaillées sur nos produits, y compris les spécifications techniques, les capacités d'approvisionnement et les tarifs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
