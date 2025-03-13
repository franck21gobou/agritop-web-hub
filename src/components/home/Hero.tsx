
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Fournisseur N°1 des usines et des marchés",
    subtitle: "Produits vivriers et matières premières agricoles de qualité",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
  },
  {
    id: 2,
    title: "Produits agricoles d'Afrique de l'Ouest",
    subtitle: "De la Côte d'Ivoire, du Bénin, du Togo et du Ghana",
    imageUrl: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
  },
  {
    id: 3,
    title: "Qualité et fiabilité garanties",
    subtitle: "Respectant les standards internationaux les plus exigeants",
    imageUrl: "https://images.unsplash.com/photo-1495107334309-fcf20f6a8343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Preload images
    slides.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.imageUrl;
      img.onload = () => {
        setLoadedImages(prev => ({
          ...prev,
          [index]: true
        }));
      };
    });

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className={`object-cover w-full h-full transition-transform duration-10000 ease-out ${
              index === currentSlide ? 'scale-105' : 'scale-100'
            } ${loadedImages[index] ? 'img-loaded' : 'img-loading'}`}
          />

          {/* Text content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif ${
                  index === currentSlide ? 'animate-fade-up opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: '300ms' }}
              >
                {slide.title}
              </h1>
              <p 
                className={`text-xl md:text-2xl text-white/90 mb-8 ${
                  index === currentSlide ? 'animate-fade-up opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: '500ms' }}
              >
                {slide.subtitle}
              </p>
              <div 
                className={`${
                  index === currentSlide ? 'animate-fade-up opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: '700ms' }}
              >
                <a
                  href="#products"
                  className="inline-flex items-center bg-agritop-sun-500 hover:bg-agritop-sun-600 transition-colors text-white font-medium py-3 px-8 rounded-md"
                >
                  Découvrir nos produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-10' : 'bg-white/40'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
