
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Truck, ShieldCheck, Calendar, Send } from 'lucide-react';
import { productCategories } from '@/data/products';
import { toast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Find the product across all categories
  const allProducts = productCategories.flatMap(category => category.products);
  const product = allProducts.find(p => p.id.toString() === productId);
  
  // Form state
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // If product not found, redirect to homepage
    if (!product && productId) {
      navigate('/');
      toast({
        title: "Produit non trouvé",
        description: "Le produit demandé n'existe pas ou a été supprimé.",
        variant: "destructive"
      });
    }
  }, [product, productId, navigate]);
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Demande envoyée avec succès!",
        description: "Un de nos conseillers vous contactera sous 24h.",
      });
      setLoading(false);
    }, 1500);
  };
  
  if (!product) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-agritop-earth-600 mb-6">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center hover:text-agritop-green-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux produits
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div>
              <span className="inline-block bg-agritop-sun-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-agritop-green-800 mb-3">{product.name}</h1>
              <p className="text-agritop-earth-700 mb-6">{product.description}</p>
              
              <div className="bg-agritop-green-50 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-agritop-green-800 mb-4">Spécifications</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="flex-shrink-0 bg-white p-2 rounded-full mr-3">
                      <Truck className="h-5 w-5 text-agritop-green-600" />
                    </span>
                    <div>
                      <p className="font-medium text-agritop-green-800">Capacité d'approvisionnement</p>
                      <p className="text-sm text-agritop-earth-700">500 tonnes par mois</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 bg-white p-2 rounded-full mr-3">
                      <ShieldCheck className="h-5 w-5 text-agritop-green-600" />
                    </span>
                    <div>
                      <p className="font-medium text-agritop-green-800">Qualité</p>
                      <p className="text-sm text-agritop-earth-700">Standards internationaux d'exportation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 bg-white p-2 rounded-full mr-3">
                      <Calendar className="h-5 w-5 text-agritop-green-600" />
                    </span>
                    <div>
                      <p className="font-medium text-agritop-green-800">Origine</p>
                      <p className="text-sm text-agritop-earth-700">{product.origin}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Order Form */}
              <div className="p-6 border border-agritop-green-200 rounded-lg">
                <h3 className="font-bold text-agritop-green-800 mb-4">Demande rapide</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-agritop-earth-700 mb-1">Quantité (tonnes)</label>
                    <input 
                      type="number" 
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full p-2 border border-agritop-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-agritop-earth-700 mb-1">Livraison souhaitée</label>
                    <input 
                      type="date" 
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full p-2 border border-agritop-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full button-primary flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
          
          {/* Contact Form Section */}
          <div id="contact-form" className="mt-16 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-agritop-green-800 mb-6">Formulaire de demande de devis</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-agritop-earth-700 mb-1">Entreprise</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-agritop-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-agritop-earth-700 mb-1">Nom complet</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-agritop-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-agritop-earth-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-agritop-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-agritop-earth-700 mb-1">Téléphone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-agritop-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-agritop-earth-700 mb-1">Détails de votre demande</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={5}
                  className="w-full p-3 border border-agritop-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500"
                  placeholder={`Je souhaite commander ${quantity} tonnes de ${product.name} avec livraison prévue pour ${deliveryDate || 'une date à déterminer'}.`}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="button-primary w-full md:w-auto px-8 py-3"
                disabled={loading}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
