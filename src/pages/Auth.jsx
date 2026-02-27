import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import CodlyLogo from '../components/ui/CodlyLogo'
import './Auth.css'

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const { user, login, register, loginWithGoogle, loginWithApple } = useAuth()
    const navigate = useNavigate()

    // Giriş yapmış kullanıcıyı profile yönlendir
    useEffect(() => {
        if (user) {
            navigate('/profile')
        }
    }, [user, navigate])

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const getFirebaseErrorMessage = (code) => {
        const messages = {
            'auth/email-already-in-use': 'Bu e-posta adresi zaten kullanılıyor.',
            'auth/invalid-email': 'Geçersiz e-posta adresi.',
            'auth/weak-password': 'Şifre en az 6 karakter olmalıdır.',
            'auth/user-not-found': 'Bu e-posta ile kayıtlı kullanıcı bulunamadı.',
            'auth/wrong-password': 'Hatalı şifre.',
            'auth/too-many-requests': 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.',
            'auth/invalid-credential': 'Geçersiz giriş bilgileri. Lütfen kontrol edin.',
            'auth/popup-closed-by-user': 'Giriş penceresi kapatıldı.',
            'auth/newsletter-request-failed': 'Ağ hatası. İnternet bağlantınızı kontrol edin.',
            'auth/operation-not-allowed': 'Bu giriş yöntemi şu anda etkin değil. Lütfen yönetici ile iletişime geçin.',
            'auth/configuration-not-found': 'Giriş yöntemi yapılandırılmamış. Firebase ayarlarını kontrol edin.'
        }
        return messages[code] || `Bir hata oluştu: ${code}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            if (isLogin) {
                await login(formData.email, formData.password)
                setSuccess('Başarıyla giriş yapıldı!')
                setTimeout(() => navigate('/profile'), 1000)
            } else {
                if (!formData.username.trim()) {
                    setError('Kullanıcı adı gerekli.')
                    setLoading(false)
                    return
                }
                if (formData.username.length < 3) {
                    setError('Kullanıcı adı en az 3 karakter olmalıdır.')
                    setLoading(false)
                    return
                }
                if (formData.password !== formData.confirmPassword) {
                    setError('Şifreler eşleşmiyor.')
                    setLoading(false)
                    return
                }
                if (formData.password.length < 6) {
                    setError('Şifre en az 6 karakter olmalıdır.')
                    setLoading(false)
                    return
                }
                await register(formData.email, formData.password, formData.username)
                setSuccess('Hesabınız başarıyla oluşturuldu!')
                setTimeout(() => navigate('/profile'), 1000)
            }
        } catch (err) {
            setError(getFirebaseErrorMessage(err.code))
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setError('')
        setLoading(true)
        try {
            await loginWithGoogle()
            setSuccess('Google ile giriş yapıldı!')
            setTimeout(() => navigate('/profile'), 1000)
        } catch (err) {
            setError(getFirebaseErrorMessage(err.code || err.message))
        } finally {
            setLoading(false)
        }
    }

    const handleAppleLogin = async () => {
        setError('')
        setLoading(true)
        try {
            await loginWithApple()
            setSuccess('Apple ile giriş yapıldı!')
            setTimeout(() => navigate('/profile'), 1000)
        } catch (err) {
            setError(getFirebaseErrorMessage(err.code || err.message))
        } finally {
            setLoading(false)
        }
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setError('')
        setSuccess('')
        setFormData({ email: '', username: '', password: '', confirmPassword: '' })
    }

    return (
        <div className="auth-page">
            {/* Background effects */}
            <div className="auth-bg">
                <div className="auth-bg__orb auth-bg__orb--1"></div>
                <div className="auth-bg__orb auth-bg__orb--2"></div>
                <div className="auth-bg__orb auth-bg__orb--3"></div>
                <div className="auth-bg__grid"></div>
            </div>

            <div className="auth-container">
                {/* Logo */}
                <Link to="/" className="auth-logo" id="auth-logo">
                    <CodlyLogo className="auth-logo__svg" />
                </Link>

                {/* Title */}
                <h1 className="auth-title">
                    {isLogin ? 'Tekrar Hoş Geldin' : 'Aramıza Katıl'}
                </h1>
                <p className="auth-subtitle">
                    {isLogin
                        ? 'Hesabına giriş yaparak devam et'
                        : 'Hemen ücretsiz hesabını oluştur'
                    }
                </p>

                {/* Social Login Buttons */}
                <div className="auth-social">
                    <button
                        className="auth-social__btn auth-social__btn--google"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        id="google-login-btn"
                        type="button"
                    >
                        <svg className="auth-social__icon" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google ile {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                    </button>

                    <button
                        className="auth-social__btn auth-social__btn--apple"
                        onClick={handleAppleLogin}
                        disabled={loading}
                        id="apple-login-btn"
                        type="button"
                    >
                        <svg className="auth-social__icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        Apple ile {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                    </button>
                </div>

                {/* Divider */}
                <div className="auth-divider">
                    <span>veya</span>
                </div>

                {/* Form */}
                <form className="auth-form" onSubmit={handleSubmit} id="auth-form">
                    {/* Error/Success messages */}
                    {error && (
                        <div className="auth-message auth-message--error">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="auth-message auth-message--success">
                            <CheckCircle size={18} />
                            <span>{success}</span>
                        </div>
                    )}

                    {/* Email */}
                    <div className="auth-field">
                        <label className="auth-field__label" htmlFor="email">E-posta Adresi</label>
                        <div className="auth-field__input-wrapper">
                            <Mail size={18} className="auth-field__icon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="ornek@codly.io"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="auth-field__input"
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* Username - sadece kayıt */}
                    {!isLogin && (
                        <div className="auth-field">
                            <label className="auth-field__label" htmlFor="username">Kullanıcı Adı</label>
                            <div className="auth-field__input-wrapper">
                                <User size={18} className="auth-field__icon" />
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="kullanici_adi"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="auth-field__input"
                                    autoComplete="username"
                                    minLength={3}
                                />
                            </div>
                        </div>
                    )}

                    {/* Password */}
                    <div className="auth-field">
                        <label className="auth-field__label" htmlFor="password">Şifre</label>
                        <div className="auth-field__input-wrapper">
                            <Lock size={18} className="auth-field__icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="auth-field__input"
                                autoComplete={isLogin ? 'current-password' : 'new-password'}
                                minLength={6}
                            />
                            <button
                                type="button"
                                className="auth-field__toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password - sadece kayıt */}
                    {!isLogin && (
                        <div className="auth-field">
                            <label className="auth-field__label" htmlFor="confirmPassword">Şifre Onayı</label>
                            <div className="auth-field__input-wrapper">
                                <Lock size={18} className="auth-field__icon" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="auth-field__input"
                                    autoComplete="new-password"
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    className="auth-field__toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                        id="auth-submit-btn"
                    >
                        {loading ? (
                            <div className="auth-submit__loader"></div>
                        ) : (
                            <>
                                {isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                {/* Toggle */}
                <div className="auth-toggle">
                    {isLogin ? (
                        <p>
                            Henüz codly.io'lu değil misin?{' '}
                            <button onClick={toggleMode} className="auth-toggle__btn" id="toggle-to-register">
                                Hemen Kayıt Ol
                            </button>
                        </p>
                    ) : (
                        <p>
                            Zaten bir hesabın var mı?{' '}
                            <button onClick={toggleMode} className="auth-toggle__btn" id="toggle-to-login">
                                Giriş Yap
                            </button>
                        </p>
                    )}
                </div>

                {/* Back to home */}
                <Link to="/" className="auth-back" id="auth-back-home">
                    ← Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    )
}

export default Auth
