
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

interface CategoryProductsSectionProps {
  categoryId?: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  origin: string;
  imageUrl: string;
  category: string;
}

interface CategoryData {
  id: number;
  nom: string;
  description: string;
}

const CategoryProductsSection = ({ categoryId }: CategoryProductsSectionProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<CategoryData | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://agritop.pro/api-agritop.php');
        
        if (response.data && Array.isArray(response.data.categories)) {
          const category = response.data.categories.find((cat: any) => cat.id.toString() === categoryId);
          
          if (category) {
            setCategoryInfo(category);
            
            // Find products for this category
            if (Array.isArray(response.data.produits)) {
              const filteredProducts = response.data.produits
                .filter((product: any) => product.categorie_id.toString() === categoryId)
                .map((product: any) => ({
                  id: product.id,
                  name: product.nom,
                  description: product.description || "Description non disponible",
                  origin: product.origine || "Côte d'Ivoire",
                  imageUrl: product.image || "/placeholder.svg",
                  category: category.nom
                }));
              
              setCategoryProducts(filteredProducts);
            }
          } else {
            setError("Catégorie non trouvée");
            navigate('/');
          }
        } else {
          setError("Format de données invalide");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    
    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId, navigate]);
  
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };
  
  if (loading) {
    return (
      <div className="py-20 bg-agritop-green-50 min-h-screen">
        <div className="section-container text-center">
          <Loader2 className="h-12 w-12 animate-spin text-agritop-green-600 mx-auto" />
          <p className="mt-4 text-agritop-earth-800">Chargement des produits...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-20 bg-agritop-green-50 min-h-screen">
        <div className="section-container text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 button-primary"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <section className="py-20 bg-agritop-green-50 min-h-screen">
      <div className="section-container">
        <div className="mb-8">
          <a href="/" className="text-agritop-green-600 hover:text-agritop-green-800 mb-4 inline-flex items-center">
            ← Retour à l'accueil
          </a>
          <h1 className="section-title mt-4">{categoryInfo?.nom || "Catégorie"}</h1>
          <p className="text-agritop-earth-800 text-center max-w-3xl mx-auto mb-12">
            {categoryInfo?.description || "Découvrez notre sélection de produits dans cette catégorie"}
          </p>
        </div>
        
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <div key={product.id} className="cursor-pointer" onClick={() => handleProductClick(product.id)}>
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
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-agritop-earth-700">Aucun produit disponible dans cette catégorie pour le moment.</p>
          </div>
        )}
        
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="button-primary inline-flex items-center"
          >
            Contactez-nous pour plus d'informations
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategoryProductsSection;
