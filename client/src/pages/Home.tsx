import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Bed, Bath, Ruler, Heart, MessageCircle, Instagram, X, ChevronLeft, ChevronRight, Star, Phone } from "lucide-react";

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  type: "apartment";
  isFavorite?: boolean;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

interface GalleryProject {
  id: number;
  title: string;
  location: string;
  image: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: "Apartamento Premium - Zona Sul",
    price: 950000,
    location: "Zona Sul, São Paulo",
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    image: "/apartments/apartment_1.png",
    type: "apartment",
  },
  {
    id: 2,
    title: "Apartamento Moderno - Pinheiros",
    price: 750000,
    location: "Pinheiros, São Paulo",
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    image: "/apartments/apartment_2.png",
    type: "apartment",
  },
  {
    id: 3,
    title: "Apartamento Luxuoso - Vila Mariana",
    price: 1200000,
    location: "Vila Mariana, São Paulo",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    image: "/apartments/apartment_3.png",
    type: "apartment",
  },
  {
    id: 4,
    title: "Apartamento Aconchegante - Consolação",
    price: 650000,
    location: "Consolação, São Paulo",
    bedrooms: 2,
    bathrooms: 1,
    area: 120,
    image: "/apartments/apartment_4.png",
    type: "apartment",
  },
  {
    id: 5,
    title: "Apartamento Espaçoso - Ibirapuera",
    price: 1100000,
    location: "Ibirapuera, São Paulo",
    bedrooms: 3,
    bathrooms: 2,
    area: 240,
    image: "/apartments/apartment_5.png",
    type: "apartment",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marina Silva",
    role: "Cliente Satisfeita",
    text: "Jane foi excepcional! Encontrou exatamente o apartamento que procurava. Seu atendimento personalizado e dedicação fizeram toda a diferença. Recomendo muito!",
    rating: 5,
    image: "👩‍💼",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Comprador",
    text: "Profissionalismo de primeira qualidade. Jane guiou-me em cada etapa do processo de compra com clareza e transparência. Excelente consultora!",
    rating: 5,
    image: "👨‍💼",
  },
  {
    id: 3,
    name: "Beatriz Costa",
    role: "Cliente",
    text: "Adorei trabalhar com a Jane! Ela apresentou imóveis com suíte e lazer completo, exatamente como eu queria. Muito obrigada!",
    rating: 5,
    image: "👩‍🦰",
  },
];

const galleryProjects: GalleryProject[] = [
  {
    id: 1,
    title: "Condomínio com Playground",
    location: "Zona Sul, São Paulo",
    image: "/gallery-1.png",
  },
  {
    id: 2,
    title: "Apartamento Premium",
    location: "Vila Mariana, São Paulo",
    image: "/apartments/apartment_1.png",
  },
  {
    id: 3,
    title: "Imóvel Moderno",
    location: "Pinheiros, São Paulo",
    image: "/apartments/apartment_2.png",
  },
];

const JANE_WHATSAPP = "+5511992817555";
const JANE_INSTAGRAM = "@jay_consultora_cury";

interface ModalProperty extends Property {
  allImages?: string[];
}

export default function Home() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<ModalProperty | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleWhatsAppClick = (propertyTitle?: string) => {
    const message = propertyTitle
      ? encodeURIComponent(
          `Olá Jane! Gostaria de saber mais sobre o apartamento: ${propertyTitle}`
        )
      : encodeURIComponent(
          "Olá Jane! Gostaria de saber mais sobre seus apartamentos disponíveis."
        );
    window.open(
      `https://wa.me/${JANE_WHATSAPP.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    );
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty({ ...property, allImages: [] });
    setCurrentImageIndex(0);
  };

  const handleScheduleVisit = (propertyTitle: string) => {
    handleWhatsAppClick(propertyTitle);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 5);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 5) % 5);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Enviar via WhatsApp
    const message = encodeURIComponent(
      `Olá Jane!\n\nNome: ${formData.name}\nTelefone: ${formData.phone}\n\nMensagem:\n${formData.message}`
    );
    window.open(
      `https://wa.me/${JANE_WHATSAPP.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    );
    setFormSubmitted(true);
    setFormData({ name: "", phone: "", message: "" });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Jane Souza Imóveis" className="h-12" />
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#sobre" className="text-slate-600 hover:text-[#bbaa72] transition font-medium">
              Sobre
            </a>
            <a href="#galeria" className="text-slate-600 hover:text-[#bbaa72] transition font-medium">
              Galeria
            </a>
            <a href="#depoimentos" className="text-slate-600 hover:text-[#bbaa72] transition font-medium">
              Depoimentos
            </a>
            <a href="#contato" className="text-slate-600 hover:text-[#bbaa72] transition font-medium">
              Contato
            </a>
            <Button
              onClick={() => handleWhatsAppClick()}
              className="bg-green-500 hover:bg-green-600 gap-2"
            >
              <MessageCircle size={18} />
              WhatsApp
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="text-white py-16 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/banner-bg.png')",
          backgroundColor: "#213248",
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Encontre seu Apartamento Ideal
          </h2>
          <p className="text-xl text-slate-200">
            Especialista em apartamentos premium em São Paulo
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#bbaa72" }}>
                5
              </div>
              <p className="text-slate-600">Apartamentos Disponíveis</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <MessageCircle className="text-green-500" size={32} />
              </div>
              <p className="text-slate-600">Atendimento via WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Instagram size={32} style={{ color: "#bbaa72" }} />
              </div>
              <p className="text-slate-600">{JANE_INSTAGRAM}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            Apartamentos Disponíveis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition"
                  >
                    <Heart
                      size={20}
                      className={
                        favorites.includes(property.id)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-400"
                      }
                    />
                  </button>
                  <div
                    className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: "#bbaa72" }}
                  >
                    Apartamento
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <MapPin size={18} />
                    <span className="text-sm">{property.location}</span>
                  </div>



                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-slate-200">
                    <div className="text-center">
                      <Bed size={20} className="mx-auto mb-2 text-slate-600" />
                      <p className="text-sm font-semibold text-slate-900">
                        {property.bedrooms}
                      </p>
                      <p className="text-xs text-slate-500">Quartos</p>
                    </div>
                    <div className="text-center">
                      <Bath size={20} className="mx-auto mb-2 text-slate-600" />
                      <p className="text-sm font-semibold text-slate-900">
                        {property.bathrooms}
                      </p>
                      <p className="text-xs text-slate-500">Banheiros</p>
                    </div>
                    <div className="text-center">
                      <Ruler size={20} className="mx-auto mb-2 text-slate-600" />
                      <p className="text-sm font-semibold text-slate-900">
                        {property.area}
                      </p>
                      <p className="text-xs text-slate-500">m²</p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <Button
                      onClick={() => handleViewDetails(property)}
                      className="flex-1 text-white hover:opacity-90"
                      style={{ backgroundColor: "#213248" }}
                    >
                      Ver Detalhes
                    </Button>
                    <Button
                      onClick={() => handleScheduleVisit(property.title)}
                      className="flex-1"
                      style={{ backgroundColor: "#bbaa72", color: "#213248" }}
                    >
                      Agendar Visita
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Sobre Jane Souza</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Sou Jane Souza, consultora Cury, apaixonada por ajudar pessoas a encontrarem o lar dos sonhos. Com atendimento personalizado, apresento imóveis com suíte, lazer completo e localização estratégica, guiando você em cada passo da compra.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Minha missão é transformar o sonho da casa própria em realidade, oferecendo um serviço de excelência, transparência e dedicação. Cada cliente é único e merece atenção especial.
              </p>
              <Button
                onClick={() => handleWhatsAppClick()}
                className="text-white hover:opacity-90 gap-2"
                style={{ backgroundColor: "#213248" }}
              >
                <MessageCircle size={20} />
                Fale Comigo
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/jane-profile.png"
                  alt="Jane Souza"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Galeria de Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-80 overflow-hidden bg-slate-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={18} />
                    <span className="text-sm">{project.location}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Depoimentos de Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{testimonial.image}</div>
                  <div>
                    <h3 className="font-bold text-slate-900">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 flex-1 leading-relaxed">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Entre em Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "#bbaa72" }}>
                    <Phone size={24} className="text-[#213248]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">WhatsApp</h4>
                    <p className="text-slate-600">+55 11 99281-7555</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "#bbaa72" }}>
                    <Instagram size={24} className="text-[#213248]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Instagram</h4>
                    <p className="text-slate-600">{JANE_INSTAGRAM}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Envie uma Mensagem</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": "#bbaa72" } as any}
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": "#bbaa72" } as any}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Mensagem</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": "#bbaa72" } as any}
                    placeholder="Sua mensagem aqui..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full text-white hover:opacity-90"
                  style={{ backgroundColor: "#213248" }}
                >
                  Enviar Mensagem
                </Button>
                {formSubmitted && (
                  <p className="text-green-600 font-semibold text-center">
                    ✓ Mensagem enviada com sucesso!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modal - Property Details */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition"
              style={{ zIndex: 10 }}
            >
              <X size={24} className="text-slate-900" />
            </button>

            {/* Image Gallery */}
            <div className="relative h-96 bg-slate-200 overflow-hidden">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / 5
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {selectedProperty.title}
              </h2>

              <div className="flex items-center gap-2 text-slate-600 mb-6">
                <MapPin size={20} />
                <span>{selectedProperty.location}</span>
              </div>

              <p className="text-4xl font-bold mb-8" style={{ color: "#bbaa72" }}>
                {formatPrice(selectedProperty.price)}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8 p-6 rounded-lg" style={{ backgroundColor: "#f8f7f4" }}>
                <div className="text-center">
                  <Bed size={32} className="mx-auto mb-3" style={{ color: "#213248" }} />
                  <p className="text-2xl font-bold text-slate-900">
                    {selectedProperty.bedrooms}
                  </p>
                  <p className="text-slate-600">Quartos</p>
                </div>
                <div className="text-center">
                  <Bath size={32} className="mx-auto mb-3" style={{ color: "#213248" }} />
                  <p className="text-2xl font-bold text-slate-900">
                    {selectedProperty.bathrooms}
                  </p>
                  <p className="text-slate-600">Banheiros</p>
                </div>
                <div className="text-center">
                  <Ruler size={32} className="mx-auto mb-3" style={{ color: "#213248" }} />
                  <p className="text-2xl font-bold text-slate-900">
                    {selectedProperty.area}
                  </p>
                  <p className="text-slate-600">m²</p>
                </div>
              </div>

              <p className="text-slate-600 mb-8 leading-relaxed">
                Apartamento de alta qualidade localizado em uma das melhores regiões de São Paulo. 
                Oferece conforto, segurança e proximidade com comércios e serviços essenciais. 
                Ideal para quem busca qualidade de vida e bom investimento imobiliário.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    handleScheduleVisit(selectedProperty.title);
                    setSelectedProperty(null);
                  }}
                  className="flex-1 text-white py-6 text-lg hover:opacity-90"
                  style={{ backgroundColor: "#213248" }}
                >
                  <MessageCircle size={20} className="mr-2" />
                  Agendar Visita via WhatsApp
                </Button>
                <Button
                  onClick={() => setSelectedProperty(null)}
                  variant="outline"
                  className="flex-1 py-6 text-lg"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="text-white py-12" style={{ backgroundColor: "#213248" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Jane Souza Imóveis</h4>
              <p className="text-slate-300 text-sm">
                Consultora imobiliária especializada em apartamentos premium em São Paulo.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navegação</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>
                  <a href="#sobre" className="hover:text-[#bbaa72] transition">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="hover:text-[#bbaa72] transition">
                    Galeria
                  </a>
                </li>
                <li>
                  <a href="#depoimentos" className="hover:text-[#bbaa72] transition">
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-[#bbaa72] transition">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>📞 +55 11 99281-7555</li>

                <li>📍 São Paulo, SP</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a
                  href={`https://instagram.com/${JANE_INSTAGRAM.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#bbaa72] transition flex items-center gap-2"
                >
                  <Instagram size={20} />
                  Instagram
                </a>
                <a
                  href={`https://wa.me/${JANE_WHATSAPP.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-green-400 transition flex items-center gap-2"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-300 text-sm">
            <p>&copy; 2024 Jane Souza - Consultora Imobiliária. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <button
        onClick={() => handleWhatsAppClick()}
        className="fixed bottom-6 right-6 z-50 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
        style={{ backgroundColor: "#213248" }}
        title="Enviar mensagem no WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="absolute right-16 bg-slate-900 text-white px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
          Fale conosco!
        </span>
      </button>
    </div>
  );
}

