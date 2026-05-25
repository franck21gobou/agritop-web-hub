// Local data source used by the catalogue.
//
// The previous version of the app fetched this data from
// `https://agritop.pro/api-agritop.php`. That endpoint no longer returns
// JSON (the domain now serves an HTML parking page with no CORS
// headers), which left the loading spinners stuck in a "pending" state.
// Until a real API is wired up, we serve the catalogue from this static
// dataset so the UI renders correctly.

export interface AgritopCategory {
  id: number;
  nom: string;
  description: string;
}

export interface AgritopProduit {
  id: number;
  nom: string;
  description: string;
  origine: string;
  image: string;
  categorie_id: number;
}

export interface AgritopData {
  categories: AgritopCategory[];
  produits: AgritopProduit[];
}

export const agritopData: AgritopData = {
  categories: [
    {
      id: 1,
      nom: 'Céréales',
      description: 'Maïs, mil, sorgho, riz et autres céréales',
    },
    {
      id: 2,
      nom: 'Fruits',
      description: 'Mangues, ananas, bananes et agrumes',
    },
    {
      id: 3,
      nom: 'Noix',
      description: 'Noix de cajou, arachides et amandes',
    },
    {
      id: 4,
      nom: 'Légumineuses',
      description: 'Haricots, pois et légumes frais',
    },
  ],
  produits: [
    {
      id: 1,
      nom: 'Maïs',
      description:
        'Maïs jaune et blanc de qualité supérieure, disponible en grandes quantités.',
      origine: "Côte d'Ivoire",
      image:
        'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 1,
    },
    {
      id: 2,
      nom: 'Riz',
      description:
        'Riz de qualité supérieure, disponible en différentes variétés et quantités.',
      origine: "Côte d'Ivoire",
      image:
        'https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 1,
    },
    {
      id: 3,
      nom: 'Sorgho',
      description:
        "Sorgho rouge et blanc cultivé selon des méthodes traditionnelles en Afrique de l'Ouest.",
      origine: 'Bénin',
      image:
        'https://images.unsplash.com/photo-1603634505498-153447615eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 1,
    },
    {
      id: 4,
      nom: 'Mil',
      description:
        "Mil de haute qualité contenant des nutriments essentiels et disponible toute l'année.",
      origine: 'Togo',
      image:
        'https://images.unsplash.com/photo-1614336215203-05a588f66cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 1,
    },
    {
      id: 5,
      nom: 'Ananas',
      description:
        'Ananas sucrés et juteux, cultivés dans des plantations certifiées et respectant les normes environnementales.',
      origine: "Côte d'Ivoire",
      image:
        'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 2,
    },
    {
      id: 6,
      nom: 'Mangues',
      description:
        "Variétés de mangues exotiques au goût délicieux et à la chair ferme, idéales pour l'exportation.",
      origine: "Côte d'Ivoire",
      image:
        'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 2,
    },
    {
      id: 7,
      nom: 'Bananes',
      description:
        'Bananes fraîches cultivées selon des méthodes durables, disponibles en grandes quantités.',
      origine: 'Ghana',
      image:
        'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 2,
    },
    {
      id: 8,
      nom: 'Agrumes',
      description:
        'Oranges, citrons et pamplemousses frais et juteux, riches en vitamines.',
      origine: 'Bénin',
      image:
        'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2335&q=80',
      categorie_id: 2,
    },
    {
      id: 9,
      nom: 'Noix de cajou',
      description:
        'Noix de cajou de qualité supérieure, disponibles crues ou transformées selon vos besoins.',
      origine: "Côte d'Ivoire",
      image:
        'https://images.unsplash.com/photo-1575506142613-499224781394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 3,
    },
    {
      id: 10,
      nom: 'Arachides',
      description:
        'Arachides fraîches et séchées, avec ou sans coque, cultivées dans des conditions optimales.',
      origine: 'Bénin',
      image:
        'https://images.unsplash.com/photo-1567892737950-30c4db37cd7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 3,
    },
    {
      id: 11,
      nom: 'Noix de karité',
      description:
        'Noix de karité utilisées pour la production de beurre de karité de haute qualité.',
      origine: 'Togo',
      image:
        'https://images.unsplash.com/photo-1586352555372-16b9d646fed0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 3,
    },
    {
      id: 12,
      nom: 'Noix de cola',
      description:
        'Noix de cola fraîches, utilisées dans diverses industries alimentaires et pharmaceutiques.',
      origine: "Côte d'Ivoire",
      image:
        'https://images.unsplash.com/photo-1514920735211-8c897da86f7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 3,
    },
    {
      id: 13,
      nom: 'Haricots',
      description:
        'Haricots rouges, noirs et blancs, riches en protéines et cultivés sans pesticides.',
      origine: "Côte d'Ivoire",
      image:
        'https://images.unsplash.com/photo-1515543904379-3d757afe93a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 4,
    },
    {
      id: 14,
      nom: 'Pois chiches',
      description:
        "Pois chiches de qualité supérieure, riches en nutriments et disponibles toute l'année.",
      origine: 'Ghana',
      image:
        'https://images.unsplash.com/photo-1570057811613-5ac715e0afec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 4,
    },
    {
      id: 15,
      nom: 'Lentilles',
      description:
        'Lentilles de différentes variétés, excellente source de protéines végétales.',
      origine: 'Bénin',
      image:
        'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 4,
    },
    {
      id: 16,
      nom: 'Niébé',
      description:
        "Niébé (haricot à œil noir) cultivé traditionnellement en Afrique de l'Ouest.",
      origine: 'Togo',
      image:
        'https://images.unsplash.com/photo-1610834572504-214967fb5426?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      categorie_id: 4,
    },
  ],
};
