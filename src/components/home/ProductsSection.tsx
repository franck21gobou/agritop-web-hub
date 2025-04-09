
import { useState, useEffect, useRef } from 'react';
import ProductCard from '../ui/ProductCard';
import CategoryCard from '../ui/CategoryCard';
import { Wheat, Apple, Nut, LeafyGreen } from 'lucide-react';

// Sample products data
const productCategories = [
  {
    id: 'cereals',
    name: 'Céréales',
    description: 'Maïs, mil, sorgho, riz et autres céréales',
    icon: <Wheat className="h-6 w-6 text-agritop-green-600" />,
    products: [
      {
        id: 1,
        name: 'Maïs',
        description: 'Maïs jaune et blanc de qualité supérieure, disponible en grandes quantités.',
        origin: 'Côte d\'Ivoire',
        imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Céréales',
      },
      {
        id: 2,
        name: 'Riz',
        description: 'Riz de qualité supérieure, disponible en différentes variétés et quantités.',
        origin: 'Côte d\'Ivoire',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Céréales',
      },
      {
        id: 3,
        name: 'Sorgho',
        description: 'Sorgho rouge et blanc cultivé selon des méthodes traditionnelles en Afrique de l\'Ouest.',
        origin: 'Bénin',
        imageUrl: 'https://images.unsplash.com/photo-1603634505498-153447615eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Céréales',
      },
      {
        id: 4,
        name: 'Mil',
        description: 'Mil de haute qualité contenant des nutriments essentiels et disponible toute l\'année.',
        origin: 'Togo',
        imageUrl: 'https://images.unsplash.com/photo-1614336215203-05a588f66cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Céréales',
      },
    ],
  },
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Mangues, ananas, bananes et agrumes',
    icon: <Apple className="h-6 w-6 text-agritop-green-600" />,
    products: [
      {
        id: 5,
        name: 'Ananas',
        description: 'Ananas sucrés et juteux, cultivés dans des plantations certifiées et respectant les normes environnementales.',
        origin: 'Côte d\'Ivoire',
        imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Fruits',
      },
      {
        id: 6,
        name: 'Mangues',
        description: 'Variétés de mangues exotiques au goût délicieux et à la chair ferme, idéales pour l\'exportation.',
        origin: 'Côte d\'Ivoire',
        imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Fruits',
      },
      {
        id: 7,
        name: 'Bananes',
        description: 'Bananes fraîches cultivées selon des méthodes durables, disponibles en grandes quantités.',
        origin: 'Ghana',
        imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Fruits',
      },
      {
        id: 8,
        name: 'Agrumes',
        description: 'Oranges, citrons et pamplemousses frais et juteux, riches en vitamines.',
        origin: 'Bénin',
        imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2335&q=80',
        category: 'Fruits',
      },
    ],
  },
  {
    id: 'nuts',
    name: 'Noix',
    description: 'Noix de cajou, arachides et amandes',
    icon: <Nut className="h-6 w-6 text-agritop-green-600" />,
    products: [
      {
        id: 9,
        name: 'Noix de cajou',
        description: 'Noix de cajou de qualité supérieure, disponibles crues ou transformées selon vos besoins.',
        origin: 'Côte d\'Ivoire',
        imageUrl: 'https://images.unsplash.com/photo-1575506142613-499224781394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Noix',
      },
      {
        id: 10,
        name: 'Arachides',
        description: 'Arachides fraîches et séchées, avec ou sans coque, cultivées dans des conditions optimales.',
        origin: 'Bénin',
        imageUrl: 'https://images.unsplash.com/photo-1567892737950-30c4db37cd7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Noix',
      },
      {
        id: 11,
        name: 'Noix de karité',
        description: 'Noix de karité utilisées pour la production de beurre de karité de haute qualité.',
        origin: 'Togo',
        imageUrl: 'https://images.unsplash.com/photo-1586352555372-16b9d646fed0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Noix',
      },
      {
        id: 12,
        name: 'Noix de cola',
        description: 'Noix de cola fraîches, utilisées dans diverses industries alimentaires et pharmaceutiques.',
        origin: 'Côte d\'Ivoire',
        imageUrl: 'https://images.unsplash.com/photo-1514920735211-8c897da86f7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Noix',
      },
    ],
  },
  {
    id: 'legumes',
    name: 'Légumineuses',
    description: 'Haricots, pois et légumes frais',
    icon: <LeafyGreen className="h-6 w-6 text-agritop-green-600" />,
    products: [
      {
        id: 13,
        name: 'Haricots',
        description: 'Haricots rouges, noirs et blancs, riches en protéines et cultivés sans pesticides.',
        origin: 'Côte d\'Ivoire',
        imageUrl: 'https://images.unsplash.com/photo-1515543904379-3d757afe93a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Légumineuses',
      },
      {
        id: 14,
        name: 'Pois chiches',
        description: 'Pois chiches de qualité supérieure, riches en nutriments et disponibles toute l\'année.',
        origin: 'Ghana',
        imageUrl: 'https://images.unsplash.com/photo-1570057811613-5ac715e0afec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Légumineuses',
      },
      {
        id: 15,
        name: 'Lentilles',
        description: 'Lentilles de différentes variétés, excellente source de protéines végétales.',
        origin: 'Bénin',
        imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Légumineuses',
      },
      {
        id: 16,
        name: 'Niébé',
        description: 'Niébé (haricot à œil noir) cultivé traditionnellement en Afrique de l\'Ouest.',
        origin: 'Togo',
        imageUrl: 'https://images.unsplash.com/photo-1610834572504-214967fb5426?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        category: 'Légumineuses',
      },
    ],
  },
];

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState(productCategories[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const activeProducts = productCategories.find(cat => cat.id === activeCategory)?.products || [];

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

  return (
    <section id="products" ref={sectionRef} className="py-20 bg-agritop-green-50">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">Nos produits agricoles</h2>
        
        <p className="text-agritop-earth-800 text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
          Découvrez notre gamme complète de produits agricoles de haute qualité en provenance de Côte d'Ivoire et d'autres pays d'Afrique de l'Ouest. Nous proposons des volumes importants pour répondre aux besoins des industries et des marchés internationaux.
        </p>
        
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {productCategories.map((category, index) => (
            <div key={category.id} className="animate-on-scroll">
              <CategoryCard
                name={category.name}
                description={category.description}
                icon={category.icon}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            </div>
          ))}
        </div>
        
        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {activeProducts.map((product, index) => (
            <div key={product.id} className="animate-on-scroll">
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
