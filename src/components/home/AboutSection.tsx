
import { useEffect, useRef } from 'react';
import { CheckCircle, TrendingUp, Users, Award, Warehouse } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">À propos d'AGRITOP PRO</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          <div>
            <div className="relative animate-on-scroll">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80"
                alt="Agriculture en Côte d'Ivoire"
                className="rounded-lg shadow-lg object-cover h-96 w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg animate-on-scroll">
                <p className="text-agritop-green-700 font-bold text-3xl">10+</p>
                <p className="text-agritop-earth-800">années d'expertise</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-agritop-green-800 mb-4 animate-on-scroll">
              L'ami fidèle des agriculteurs de Côte d'Ivoire et de l'Afrique de l'Ouest
            </h3>
            <p className="text-agritop-earth-800 mb-6 animate-on-scroll">
              AGRITOP PRO SARL est une entreprise leader dans l'approvisionnement de produits agricoles en provenance de la Côte d'Ivoire et d'autres pays d'Afrique de l'Ouest. Nous nous engageons à fournir des produits de haute qualité qui respectent les normes internationales les plus strictes.
            </p>
            <p className="text-agritop-earth-800 mb-8 animate-on-scroll">
              Nous travaillons en étroite collaboration avec les agriculteurs locaux pour garantir des produits frais et de qualité, tout en soutenant le développement économique des communautés agricoles locales.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start animate-on-scroll">
                <CheckCircle className="h-6 w-6 text-agritop-green-600 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-agritop-green-800">Qualité supérieure</h4>
                  <p className="text-sm text-agritop-earth-700">Standards internationaux garantis</p>
                </div>
              </div>
              
              <div className="flex items-start animate-on-scroll">
                <TrendingUp className="h-6 w-6 text-agritop-green-600 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-agritop-green-800">Grande capacité</h4>
                  <p className="text-sm text-agritop-earth-700">Volumes importants disponibles</p>
                </div>
              </div>
              
              <div className="flex items-start animate-on-scroll">
                <Users className="h-6 w-6 text-agritop-green-600 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-agritop-green-800">Réseau étendu</h4>
                  <p className="text-sm text-agritop-earth-700">Présence dans plusieurs pays</p>
                </div>
              </div>
              
              <div className="flex items-start animate-on-scroll">
                <Award className="h-6 w-6 text-agritop-green-600 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-agritop-green-800">Certifications</h4>
                  <p className="text-sm text-agritop-earth-700">Produits certifiés et contrôlés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key figures */}
        <div className="mt-24 bg-agritop-green-50 rounded-2xl p-8 shadow-inner">
          <h3 className="text-2xl font-bold text-center text-agritop-green-800 mb-12 animate-on-scroll">
            Capacité d'approvisionnement exceptionnelle
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-on-scroll">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-agritop-green-100 text-agritop-green-700 mb-4">
                <Warehouse className="h-8 w-8" />
              </div>
              <h4 className="text-3xl font-bold text-agritop-green-700">25K+</h4>
              <p className="text-agritop-earth-800">Tonnes de céréales par mois</p>
            </div>
            
            <div className="text-center animate-on-scroll">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-agritop-sun-100 text-agritop-sun-700 mb-4">
                <Warehouse className="h-8 w-8" />
              </div>
              <h4 className="text-3xl font-bold text-agritop-sun-700">15K+</h4>
              <p className="text-agritop-earth-800">Tonnes de fruits par mois</p>
            </div>
            
            <div className="text-center animate-on-scroll">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-agritop-earth-100 text-agritop-earth-700 mb-4">
                <Warehouse className="h-8 w-8" />
              </div>
              <h4 className="text-3xl font-bold text-agritop-earth-700">10K+</h4>
              <p className="text-agritop-earth-800">Tonnes de noix par mois</p>
            </div>
            
            <div className="text-center animate-on-scroll">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-agritop-green-100 text-agritop-green-700 mb-4">
                <Warehouse className="h-8 w-8" />
              </div>
              <h4 className="text-3xl font-bold text-agritop-green-700">30+</h4>
              <p className="text-agritop-earth-800">Pays clients dans le monde</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
