import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer" id="footer">
            <div className="footer__glow"></div>
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <span className="footer__logo-text">codlyio</span><span className="footer__logo-dot">.</span>
                        </Link>
                        <p className="footer__desc">
                            Codly.io, 2024 yılında kurulan modern bir yazılım geliştirme şirketidir.
                            Web yazılım, mobil uygulama ve dijital çözümler konusunda uzmanız.
                        </p>
                        <div className="footer__socials">
                            <a href="#" className="footer__social" aria-label="Github"><Github size={18} /></a>
                            <a href="#" className="footer__social" aria-label="Twitter"><Twitter size={18} /></a>
                            <a href="#" className="footer__social" aria-label="LinkedIn"><Linkedin size={18} /></a>
                            <a href="#" className="footer__social" aria-label="Instagram"><Instagram size={18} /></a>
                        </div>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__links-title">Hizmetler</h4>
                        <Link to="/services" className="footer__link">Web Geliştirme</Link>
                        <Link to="/services" className="footer__link">Mobil Uygulama</Link>
                        <Link to="/services" className="footer__link">UI/UX Tasarım</Link>
                        <Link to="/services" className="footer__link">SEO & Dijital Pazarlama</Link>
                        <Link to="/services" className="footer__link">E-Ticaret Çözümleri</Link>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__links-title">Şirket</h4>
                        <Link to="/about" className="footer__link">Hakkımızda</Link>
                        <Link to="/services" className="footer__link">Hizmetler</Link>
                        <Link to="/contact" className="footer__link">İletişim</Link>
                        <Link to="#" className="footer__link">Blog</Link>
                        <Link to="#" className="footer__link">Kariyer</Link>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__links-title">İletişim</h4>
                        <div className="footer__contact-item">
                            <Mail size={14} />
                            <span>info@codly.io</span>
                        </div>
                        <div className="footer__contact-item">
                            <Phone size={14} />
                            <span>+90 (555) 123 4567</span>
                        </div>
                        <div className="footer__contact-item">
                            <MapPin size={14} />
                            <span>İstanbul, Türkiye</span>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © 2026 codlyio. Tüm hakları saklıdır.
                    </p>
                    <div className="footer__bottom-links">
                        <a href="#" className="footer__bottom-link">Gizlilik Politikası</a>
                        <a href="#" className="footer__bottom-link">Kullanım Şartları</a>
                        <a href="#" className="footer__bottom-link">Çerez Politikası</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
