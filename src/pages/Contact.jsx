import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitted(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
            setTimeout(() => setSubmitted(false), 5000)
        }, 1500)
    }

    const contactInfo = [
        { icon: <Mail size={20} />, label: 'Email', value: 'info@codly.io', href: 'mailto:info@codly.io' },
        { icon: <Phone size={20} />, label: 'Telefon', value: '+90 (555) 123 4567', href: 'tel:+905551234567' },
        { icon: <MapPin size={20} />, label: 'Adres', value: 'İstanbul, Türkiye', href: '#' },
        { icon: <Clock size={20} />, label: 'Çalışma Saatleri', value: 'Pzt-Cum: 09:00 - 18:00', href: '#' },
    ]

    return (
        <main className="contact-page" id="contact-page">
            {/* Hero */}
            <section className="contact-hero">
                <div className="grid-bg"></div>
                <div className="glow-orb glow-orb-1"></div>
                <div className="container contact-hero__content">
                    <div className="section-badge animate-fade-in-up">
                        <span className="badge-dot"></span>
                        iletişim
                    </div>
                    <h1 className="hero__title animate-fade-in-up animate-delay-1">
                        Bize <span className="hero__title-gradient">Ulaşın</span>
                    </h1>
                    <p className="hero__subtitle animate-fade-in-up animate-delay-2">
                        Projeniz hakkında konuşmak için bize ulaşın. Size en kısa sürede dönüş yapacağız.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="contact-content" id="contact-form-section">
                <div className="container">
                    <div className="contact-content__grid">
                        {/* Info */}
                        <div className="contact-info">
                            <h2 className="contact-info__title">İletişim Bilgileri</h2>
                            <p className="contact-info__desc">
                                Herhangi bir sorunuz varsa bize ulaşmaktan çekinmeyin.
                            </p>
                            <div className="contact-info__items">
                                {contactInfo.map((info, i) => (
                                    <a key={i} href={info.href} className="contact-info__item glass-card" id={`contact-info-${i}`}>
                                        <div className="contact-info__icon">{info.icon}</div>
                                        <div>
                                            <p className="contact-info__label">{info.label}</p>
                                            <p className="contact-info__value">{info.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <form className="contact-form glass-card" onSubmit={handleSubmit} id="contact-form">
                            {submitted && (
                                <div className="contact-form__success">
                                    <MessageSquare size={20} />
                                    Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.
                                </div>
                            )}
                            <div className="contact-form__row">
                                <div className="contact-form__group">
                                    <label className="contact-form__label" htmlFor="name">Ad Soyad</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="contact-form__input"
                                        placeholder="Adınızı girin"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact-form__group">
                                    <label className="contact-form__label" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="contact-form__input"
                                        placeholder="Email adresiniz"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="contact-form__group">
                                <label className="contact-form__label" htmlFor="subject">Konu</label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    className="contact-form__input"
                                    placeholder="Konuyu belirtin"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="contact-form__group">
                                <label className="contact-form__label" htmlFor="message">Mesaj</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    className="contact-form__input contact-form__textarea"
                                    placeholder="Mesajınızı yazın..."
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary contact-form__submit" id="contact-submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <div className="contact-form__spinner"></div>
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        Mesaj Gönder
                                        <Send size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contact
