
import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    product: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        product: '',
      });
      
      // Reset submitted state after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
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

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">Contactez-nous</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact information */}
          <div>
            <div className="animate-on-scroll">
              <h3 className="text-2xl font-bold text-agritop-green-800 mb-6">
                Besoin d'informations supplémentaires ?
              </h3>
              <p className="text-agritop-earth-800 mb-8">
                Notre équipe est à votre disposition pour répondre à toutes vos questions concernant nos produits, les volumes disponibles, les prix et les conditions de livraison. N'hésitez pas à nous contacter par téléphone, email ou en remplissant le formulaire ci-contre.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start animate-on-scroll">
                <div className="bg-agritop-green-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-agritop-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-agritop-green-800 mb-1">Notre adresse</h4>
                  <p className="text-agritop-earth-800">
                    Bourse des Produits Agricoles d'Afrique de l'Ouest, Abidjan, République de Côte d'Ivoire
                  </p>
                </div>
              </div>
              
              <div className="flex items-start animate-on-scroll">
                <div className="bg-agritop-sun-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-agritop-sun-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-agritop-green-800 mb-1">Email</h4>
                  <p className="text-agritop-earth-800 mb-1">
                    <a href="mailto:info@agritop.pro" className="hover:text-agritop-green-600 transition-colors">
                      info@agritop.pro
                    </a>
                  </p>
                  <p className="text-agritop-earth-800 mb-1">
                    <a href="mailto:servicecommercial@agritop.pro" className="hover:text-agritop-green-600 transition-colors">
                      servicecommercial@agritop.pro
                    </a>
                  </p>
                  <p className="text-agritop-earth-800">
                    <a href="mailto:servicecotation@agritop.pro" className="hover:text-agritop-green-600 transition-colors">
                      servicecotation@agritop.pro
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start animate-on-scroll">
                <div className="bg-agritop-earth-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-agritop-earth-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-agritop-green-800 mb-1">Téléphone</h4>
                  <p className="text-agritop-earth-800">
                    <a href="tel:+22501020304" className="hover:text-agritop-green-600 transition-colors">
                      +225 01 02 03 04
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-agritop-green-50 rounded-xl p-6 animate-on-scroll">
              <h4 className="font-semibold text-agritop-green-800 mb-3">Heures d'ouverture</h4>
              <ul className="space-y-2 text-agritop-earth-800">
                <li className="flex justify-between">
                  <span>Lundi - Vendredi:</span>
                  <span>8h00 - 18h00</span>
                </li>
                <li className="flex justify-between">
                  <span>Samedi:</span>
                  <span>9h00 - 14h00</span>
                </li>
                <li className="flex justify-between">
                  <span>Dimanche:</span>
                  <span>Fermé</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="bg-white rounded-xl shadow-lg p-8 animate-on-scroll">
            <h3 className="text-xl font-bold text-agritop-green-800 mb-6">
              Envoyez-nous un message
            </h3>
            
            {submitted ? (
              <div className="bg-agritop-green-50 border border-agritop-green-200 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-agritop-green-100 text-agritop-green-600 mb-4">
                  <Send className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-agritop-green-800 mb-2">Message envoyé !</h4>
                <p className="text-agritop-earth-700">
                  Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-agritop-earth-800 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-agritop-earth-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-agritop-earth-800 mb-1">
                      Adresse email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-agritop-earth-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-agritop-earth-800 mb-1">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-agritop-earth-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="product" className="block text-sm font-medium text-agritop-earth-800 mb-1">
                      Produit d'intérêt
                    </label>
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-agritop-earth-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez un produit</option>
                      <option value="cereals">Céréales</option>
                      <option value="fruits">Fruits</option>
                      <option value="nuts">Noix</option>
                      <option value="legumes">Légumineuses</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-agritop-earth-800 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-agritop-earth-200 rounded-md focus:outline-none focus:ring-2 focus:ring-agritop-green-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`button-primary w-full flex items-center justify-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
                
                <p className="text-xs text-agritop-earth-600 mt-4">
                  * Champs obligatoires. En soumettant ce formulaire, vous acceptez que nous utilisions vos informations conformément à notre politique de confidentialité.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
