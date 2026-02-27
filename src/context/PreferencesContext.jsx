import { createContext, useContext, useState, useEffect } from 'react'

const PreferencesContext = createContext()

export const usePreferences = () => {
    const context = useContext(PreferencesContext)
    if (!context) {
        throw new Error('usePreferences must be used within a PreferencesProvider')
    }
    return context
}

// Tema renkleri
export const themeColors = {
    purple: {
        label: 'Mor',
        primary: '#6c5ce7',
        secondary: '#a29bfe',
        glow: 'rgba(108, 92, 231, 0.4)',
        gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
    },
    blue: {
        label: 'Mavi',
        primary: '#0984e3',
        secondary: '#74b9ff',
        glow: 'rgba(9, 132, 227, 0.4)',
        gradient: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)',
    },
    red: {
        label: 'Kırmızı',
        primary: '#d63031',
        secondary: '#ff7675',
        glow: 'rgba(214, 48, 49, 0.4)',
        gradient: 'linear-gradient(135deg, #d63031 0%, #ff7675 100%)',
    },
    green: {
        label: 'Yeşil',
        primary: '#00b894',
        secondary: '#55efc4',
        glow: 'rgba(0, 184, 148, 0.4)',
        gradient: 'linear-gradient(135deg, #00b894 0%, #55efc4 100%)',
    },
    orange: {
        label: 'Turuncu',
        primary: '#e17055',
        secondary: '#fab1a0',
        glow: 'rgba(225, 112, 85, 0.4)',
        gradient: 'linear-gradient(135deg, #e17055 0%, #fab1a0 100%)',
    },
    yellow: {
        label: 'Sarı',
        primary: '#fdcb6e',
        secondary: '#ffeaa7',
        glow: 'rgba(253, 203, 110, 0.4)',
        gradient: 'linear-gradient(135deg, #f39c12 0%, #fdcb6e 100%)',
    },
    cyan: {
        label: 'Camgöbeği',
        primary: '#00cec9',
        secondary: '#81ecec',
        glow: 'rgba(0, 206, 201, 0.4)',
        gradient: 'linear-gradient(135deg, #00cec9 0%, #81ecec 100%)',
    },
    pink: {
        label: 'Pembe',
        primary: '#e84393',
        secondary: '#fd79a8',
        glow: 'rgba(232, 67, 147, 0.4)',
        gradient: 'linear-gradient(135deg, #e84393 0%, #fd79a8 100%)',
    },
}

// Font seçenekleri
export const fontOptions = {
    inter: { label: 'Inter', family: "'Inter', sans-serif", display: "'Inter', sans-serif" },
    outfit: { label: 'Outfit', family: "'Outfit', sans-serif", display: "'Outfit', sans-serif" },
    poppins: { label: 'Poppins', family: "'Poppins', sans-serif", display: "'Poppins', sans-serif" },
    jetbrains: { label: 'JetBrains Mono', family: "'JetBrains Mono', monospace", display: "'JetBrains Mono', monospace" },
    nunito: { label: 'Nunito', family: "'Nunito', sans-serif", display: "'Nunito', sans-serif" },
}

// Dil seçenekleri
export const langOptions = {
    tr: { label: 'Türkçe', flag: '🇹🇷' },
    en: { label: 'English', flag: '🇬🇧' },
    de: { label: 'Deutsch', flag: '🇩🇪' },
}

// Çeviriler
const translations = {
    tr: {
        home: 'Ana Sayfa', services: 'Hizmetler', about: 'Hakkımızda', contact: 'İletişim',
        profile: 'Profil', settings: 'Ayarlar', preferences: 'Tercihler', logout: 'Çıkış Yap',
        joinCodly: "codly.io'ya Katıl", lightTheme: 'Aydınlık Tema', fontType: 'Font Tipi',
        siteLanguage: 'Site Dili', siteTheme: 'Site Teması', close: 'Kapat',
        preferencesTitle: 'Site Tercihleri',
        // Hero
        heroBadge: 'geleceğiniz için çalışıyoruz',
        heroTitle: 'Dijital Dünyada Geleceği Şekillendir',
        heroSubtitle: 'Hayalinizdeki web projesine sadece bir adım uzaktasınız. Modern teknolojilerle premium yazılım çözümleri sunuyoruz.',
        startProject: 'Proje Başlat',
        viewServices: 'Hizmetlerimiz',
        // Stats
        statProjects: 'Tamamlanan Proje', statClients: 'Mutlu Müşteri', statSatisfaction: 'Müşteri Memnuniyeti', statSupport: 'Destek',
        // Features
        whyUsBadge: 'Neden Biz?',
        whyUsTitle: 'Neden Bizi Tercih Etmelisiniz?',
        whyUsSubtitle: 'Her zaman hizmetlerimizi ve ürünlerimizi geliştirmeye çalışıyoruz.',
        featurePrivacyTitle: 'Gizlilik Önceliğimiz', featurePrivacyDesc: 'Verileriniz bizim için önemli. En üst düzey güvenlik standartlarıyla koruma altındayız.',
        featureGlobalTitle: 'Global Tasarım', featureGlobalDesc: 'Her dilde çalışacak şekilde tasarlıyoruz. Dünyanın her yerinden müşterilerinize ulaşın.',
        featureTechTitle: 'En Son Teknolojiler', featureTechDesc: 'Her zaman en güncel teknolojileri kullanarak, sürekli en iyisini sunuyoruz.',
        featureDesignTitle: 'Herkes İçin Tasarım', featureDesignDesc: 'Her bireye özel tasarımlar yaratıyoruz. Tasarımlarımız herkesin ihtiyacını karşılar.',
        // Services Preview
        servicesBadge: 'Hizmetlerimiz',
        servicesTitle: 'Hizmetlerimiz ve Uzmanlık Alanlarımız',
        servicesSubtitle: 'Sunduğumuz hizmetler ve uzmanlık alanlarımız. Bir sonraki projeniz için bize güvenebilirsiniz.',
        serviceWebTitle: 'Web Geliştirme', serviceWebDesc: 'Modern ve performanslı web uygulamaları geliştiriyoruz. React, Next.js ve en son teknolojilerle.',
        serviceMobileTitle: 'Mobil Uygulama', serviceMobileDesc: 'iOS ve Android platformları için native ve cross-platform mobil uygulamalar.',
        serviceDesignTitle: 'UI/UX Tasarım', serviceDesignDesc: 'Kullanıcı odaklı, modern ve etkileyici arayüz tasarımları oluşturuyoruz.',
        serviceSeoTitle: 'SEO & Dijital Pazarlama', serviceSeoDesc: 'Markanızı dijital dünyada öne çıkarıyoruz. Organik büyüme stratejileri.',
        serviceBackendTitle: 'Backend Geliştirme', serviceBackendDesc: 'Güçlü ve ölçeklenebilir API geliştirme. Node.js, Python, Go ile.',
        serviceEcommerceTitle: 'E-Ticaret Çözümleri', serviceEcommerceDesc: 'Özel e-ticaret platformları ve entegrasyonlar. Satışlarınızı artırın.',
        moreInfo: 'Detaylı Bilgi',
        // Testimonials
        testimonialsBadge: 'Müşteri Yorumları',
        testimonialsTitle: 'Müşterilerimiz Ne Diyor?',
        // CTA
        ctaTitle: 'Projenizi Hayata Geçirmeye Hazır mısınız?',
        ctaSubtitle: 'Her zaman yardım etmeye hazırız. İstediğiniz zaman bizimle iletişime geçebilirsiniz.',
        contactUs: 'Bize Ulaşın',
        checkServices: 'Hizmetleri İncele'
    },
    en: {
        home: 'Home', services: 'Services', about: 'About', contact: 'Contact',
        profile: 'Profile', settings: 'Settings', preferences: 'Preferences', logout: 'Log Out',
        joinCodly: 'Join codly.io', lightTheme: 'Light Theme', fontType: 'Font Type',
        siteLanguage: 'Site Language', siteTheme: 'Site Theme', close: 'Close',
        preferencesTitle: 'Site Preferences',
        // Hero
        heroBadge: 'working for your future',
        heroTitle: 'Shape the Future in Digital World',
        heroSubtitle: 'You are just one step away from your dream web project. We offer premium software solutions with modern technologies.',
        startProject: 'Start Project',
        viewServices: 'Our Services',
        // Stats
        statProjects: 'Completed Projects', statClients: 'Happy Clients', statSatisfaction: 'Client Satisfaction', statSupport: 'Support',
        // Features
        whyUsBadge: 'Why Us?',
        whyUsTitle: 'Why Should You Choose Us?',
        whyUsSubtitle: 'We are always trying to improve our services and products.',
        featurePrivacyTitle: 'Privacy Priority', featurePrivacyDesc: 'Your data is important to us. Protected with the highest security standards.',
        featureGlobalTitle: 'Global Design', featureGlobalDesc: 'Designed to work in every language. Reach customers from all over the world.',
        featureTechTitle: 'Latest Technologies', featureTechDesc: 'Always using the latest technologies to offer the best solutions.',
        featureDesignTitle: 'Design for Everyone', featureDesignDesc: 'We create custom designs for every individual. Our designs meet everyone\'s needs.',
        // Services Preview
        servicesBadge: 'Our Services',
        servicesTitle: 'Our Services and Expertise',
        servicesSubtitle: 'Our services and areas of expertise. You can trust us for your next project.',
        serviceWebTitle: 'Web Development', serviceWebDesc: 'Developing modern and performant web applications with React, Next.js and latest tech.',
        serviceMobileTitle: 'Mobile App', serviceMobileDesc: 'Native and cross-platform mobile apps for iOS and Android platforms.',
        serviceDesignTitle: 'UI/UX Design', serviceDesignDesc: 'Creating user-centric, modern and impressive interface designs.',
        serviceSeoTitle: 'SEO & Digital Marketing', serviceSeoDesc: 'Highlighting your brand in the digital world. Organic growth strategies.',
        serviceBackendTitle: 'Backend Development', serviceBackendDesc: 'Robust and scalable API development with Node.js, Python, Go.',
        serviceEcommerceTitle: 'E-Commerce Solutions', serviceEcommerceDesc: 'Custom e-commerce platforms and integrations. Boost your sales.',
        moreInfo: 'More Info',
        // Testimonials
        testimonialsBadge: 'Testimonials',
        testimonialsTitle: 'What Our Clients Say?',
        // CTA
        ctaTitle: 'Ready to Bring Your Project to Life?',
        ctaSubtitle: 'We are always ready to help. You can contact us anytime.',
        contactUs: 'Contact Us',
        checkServices: 'Check Services'
    },
    de: {
        home: 'Startseite', services: 'Dienstleistungen', about: 'Über uns', contact: 'Kontakt',
        profile: 'Profil', settings: 'Einstellungen', preferences: 'Einstellungen', logout: 'Abmelden',
        joinCodly: 'codly.io beitreten', lightTheme: 'Helles Thema', fontType: 'Schriftart',
        siteLanguage: 'Website-Sprache', siteTheme: 'Website-Thema', close: 'Schließen',
        preferencesTitle: 'Website-Einstellungen',
        // Hero
        heroBadge: 'wir arbeiten für ihre zukunft',
        heroTitle: 'Gestalten Sie die Zukunft digital',
        heroSubtitle: 'Sie sind nur einen Schritt von Ihrem Traum-Webprojekt entfernt. Wir bieten Premium-Softwarelösungen mit modernen Technologien.',
        startProject: 'Projekt Starten',
        viewServices: 'Unsere Dienste',
        // Stats
        statProjects: 'Abgeschlossene Projekte', statClients: 'Glückliche Kunden', statSatisfaction: 'Kundenzufriedenheit', statSupport: 'Support',
        // Features
        whyUsBadge: 'Warum Wir?',
        whyUsTitle: 'Warum Sollten Sie Uns Wählen?',
        whyUsSubtitle: 'Wir versuchen immer, unsere Dienstleistungen und Produkte zu verbessern.',
        featurePrivacyTitle: 'Datenschutz Priorität', featurePrivacyDesc: 'Ihre Daten sind uns wichtig. Geschützt mit höchsten Sicherheitsstandards.',
        featureGlobalTitle: 'Globales Design', featureGlobalDesc: 'Entwickelt, um in jeder Sprache zu funktionieren. Erreichen Sie Kunden weltweit.',
        featureTechTitle: 'Neueste Technologien', featureTechDesc: 'Immer die neuesten Technologien nutzen, um die besten Lösungen anzubieten.',
        featureDesignTitle: 'Design für Alle', featureDesignDesc: 'Wir erstellen individuelle Designs für jeden. Unsere Designs erfüllen alle Bedürfnisse.',
        // Services Preview
        servicesBadge: 'Unsere Dienstleistungen',
        servicesTitle: 'Unsere Dienstleistungen und Expertise',
        servicesSubtitle: 'Unsere Dienstleistungen und Fachgebiete. Vertrauen Sie uns für Ihr nächstes Projekt.',
        serviceWebTitle: 'Webentwicklung', serviceWebDesc: 'Entwicklung moderner und leistungsfähiger Webanwendungen mit React, Next.js.',
        serviceMobileTitle: 'Mobile App', serviceMobileDesc: 'Native und plattformübergreifende mobile Apps für iOS und Android.',
        serviceDesignTitle: 'UI/UX Design', serviceDesignDesc: 'Erstellung benutzerzentrierter, moderner und beeindruckender Schnittstellendesigns.',
        serviceSeoTitle: 'SEO & Digitales Marketing', serviceSeoDesc: 'Markenpräsenz in der digitalen Welt stärken. Organische Wachstumsstrategien.',
        serviceBackendTitle: 'Backend Entwicklung', serviceBackendDesc: 'Robuste und skalierbare API-Entwicklung mit Node.js, Python, Go.',
        serviceEcommerceTitle: 'E-Commerce Lösungen', serviceEcommerceDesc: 'Maßgeschneiderte E-Commerce-Plattformen und Integrationen.',
        moreInfo: 'Mehr Info',
        // Testimonials
        testimonialsBadge: 'Kundenbewertungen',
        testimonialsTitle: 'Was Unsere Kunden Sagen?',
        // CTA
        ctaTitle: 'Bereit, Ihr Projekt zum Leben zu Erwecken?',
        ctaSubtitle: 'Wir sind immer bereit zu helfen. Sie können uns jederzeit kontaktieren.',
        contactUs: 'Kontaktieren Sie uns',
        checkServices: 'Dienste Prüfen'
    },
}

export const PreferencesProvider = ({ children }) => {
    const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)

    // localStorage'dan oku veya varsayılan kullan
    const [theme, setTheme] = useState(() => localStorage.getItem('codly-theme') || 'dark')
    const [themeColor, setThemeColor] = useState(() => localStorage.getItem('codly-color') || 'purple')
    const [font, setFont] = useState(() => localStorage.getItem('codly-font') || 'inter')
    const [lang, setLang] = useState(() => localStorage.getItem('codly-lang') || 'tr')

    // Çeviri fonksiyonu
    const t = (key) => translations[lang]?.[key] || translations.tr[key] || key

    // CSS değişkenlerini güncelle
    useEffect(() => {
        const color = themeColors[themeColor]
        const fontOpt = fontOptions[font]
        const root = document.documentElement

        // Tema renkleri
        root.style.setProperty('--accent-primary', color.primary)
        root.style.setProperty('--accent-secondary', color.secondary)
        root.style.setProperty('--accent-glow', color.glow)
        root.style.setProperty('--accent-gradient-btn', color.gradient)
        root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${color.primary} 0%, ${color.secondary} 50%, ${color.secondary} 100%)`)

        // Font
        root.style.setProperty('--font-primary', fontOpt.family)
        root.style.setProperty('--font-display', fontOpt.display)

        // Aydınlık / karanlık tema
        if (theme === 'light') {
            root.classList.add('light-theme')
        } else {
            root.classList.remove('light-theme')
        }

        // localStorage'a kaydet
        localStorage.setItem('codly-theme', theme)
        localStorage.setItem('codly-color', themeColor)
        localStorage.setItem('codly-font', font)
        localStorage.setItem('codly-lang', lang)
    }, [theme, themeColor, font, lang])

    const togglePreferences = () => setIsPreferencesOpen(prev => !prev)

    const value = {
        theme, setTheme,
        themeColor, setThemeColor,
        font, setFont,
        lang, setLang,
        t,
        isPreferencesOpen, setIsPreferencesOpen, togglePreferences,
    }

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    )
}

export default PreferencesContext
