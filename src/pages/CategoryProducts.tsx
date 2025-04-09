
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryProductsSection from "@/components/category/CategoryProductsSection";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  
  useEffect(() => {
    // Set document title based on category
    document.title = `AGRITOP PRO SARL - Catégorie de produits`;
    
    // Scroll to top when navigating to this page
    window.scrollTo(0, 0);
  }, [categoryId]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-20">
        <CategoryProductsSection categoryId={categoryId} />
      </main>
      <Footer />
    </div>
  );
};

export default CategoryProducts;
