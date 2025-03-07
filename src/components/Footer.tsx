
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-familyxp-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-familyxp-dark">FamilyXp</span>
            </div>
            <p className="text-gray-600 mb-4">
              Experiencias familiares inolvidables para disfrutar con los más pequeños.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-familyxp-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-familyxp-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-familyxp-primary">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Explora</h3>
            <ul className="space-y-2">
              <li><Link to="/explorar" className="text-gray-600 hover:text-familyxp-primary">Todas las actividades</Link></li>
              <li><Link to="/explorar?categoria=aventura" className="text-gray-600 hover:text-familyxp-primary">Aventura</Link></li>
              <li><Link to="/explorar?categoria=cultural" className="text-gray-600 hover:text-familyxp-primary">Cultural</Link></li>
              <li><Link to="/explorar?categoria=educativo" className="text-gray-600 hover:text-familyxp-primary">Educativo</Link></li>
              <li><Link to="/explorar?categoria=naturaleza" className="text-gray-600 hover:text-familyxp-primary">Naturaleza</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Comunidad</h3>
            <ul className="space-y-2">
              <li><Link to="/foro" className="text-gray-600 hover:text-familyxp-primary">Foro</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-familyxp-primary">Blog</Link></li>
              <li><Link to="/grupos" className="text-gray-600 hover:text-familyxp-primary">Planes en grupo</Link></li>
              <li><Link to="/como-funciona" className="text-gray-600 hover:text-familyxp-primary">Cómo funciona</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li><Link to="/centro-ayuda" className="text-gray-600 hover:text-familyxp-primary">Centro de ayuda</Link></li>
              <li><Link to="/terminos" className="text-gray-600 hover:text-familyxp-primary">Términos y condiciones</Link></li>
              <li><Link to="/privacidad" className="text-gray-600 hover:text-familyxp-primary">Política de privacidad</Link></li>
              <li><Link to="/contacto" className="text-gray-600 hover:text-familyxp-primary">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FamilyXp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
