export interface Brand {
  id: string;
  name: string;
  tagline: string;
  website: string;
  isPrimary?: boolean;
}

export interface CorporateConfig {
  parentCompany: {
    name: string;
    legalName: string;
    role: string;
    email: string;
    website: string;
    hq: string;
  };
  brands: Brand[];
}

export const CORPORATE_CONFIG: CorporateConfig = {
  parentCompany: {
    name: "SYS Pvt. Ltd.",
    legalName: "SYS Private Limited",
    role: "Parent Company",
    email: "hello@sys.pvt.ltd",
    website: "https://sys.pvt.ltd",
    hq: "Patia, Bhubaneswar, Odisha, India - 751024"
  },
  brands: [
    {
      id: "tanvo",
      name: "TANVO",
      tagline: "The Art of Handwoven Luxury",
      website: "https://tanvo.in",
      isPrimary: true
    },
    {
      id: "twothreads",
      name: "TwoThreads Studio",
      tagline: "Custom Creations & Designer Wear",
      website: "https://twothreads.studio"
    },
    {
      id: "sable",
      name: "SABLE",
      tagline: "Luxury Apparel",
      website: "https://sable.luxury"
    }
  ]
};
