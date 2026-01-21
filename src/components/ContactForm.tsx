import { useState, type FormEvent } from 'react';
import { MessageCircle, Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
    lang?: 'fr' | 'ar';
}

const translations = {
    fr: {
        name: 'Nom Complet',
        name_placeholder: 'Votre nom',
        phone: 'Téléphone',
        phone_placeholder: '+213',
        email: 'Email',
        email_placeholder: 'votre@email.com',
        message: 'Message',
        message_placeholder: 'Comment pouvons-nous vous aider ?',
        submit: 'Envoyer',
        whatsapp: 'Contacter via WhatsApp',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès !',
        error: 'Erreur lors de l\'envoi. Veuillez réessayer.',
    },
    ar: {
        name: 'الاسم الكامل',
        name_placeholder: 'اسمك',
        phone: 'الهاتف',
        phone_placeholder: '+213',
        email: 'البريد الإلكتروني',
        email_placeholder: 'بريدك@email.com',
        message: 'الرسالة',
        message_placeholder: 'كيف يمكننا مساعدتك؟',
        submit: 'إرسال',
        whatsapp: 'تواصل عبر واتساب',
        sending: 'جاري الإرسال...',
        success: 'تم إرسال الرسالة بنجاح!',
        error: 'خطأ في الإرسال. يرجى المحاولة مرة أخرى.',
    },
};

export default function ContactForm({ lang = 'fr' }: ContactFormProps) {
    const t = translations[lang];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus('success');
            setFormData({ name: '', phone: '', email: '', message: '' });
        } catch {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const whatsappMessage = encodeURIComponent(
        `Bonjour, je vous contacte depuis le site web de la Clinique Audin.\n\nNom: ${formData.name}\nTéléphone: ${formData.phone}\n\nMessage: ${formData.message}`
    );
    const whatsappUrl = `https://wa.me/213560055803?text=${whatsappMessage}`;

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="form-group">
                    <label htmlFor="name" className="form-label">{t.name}</label>
                    <input
                        type="text"
                        id="name"
                        className="form-input"
                        placeholder={t.name_placeholder}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                {/* Phone */}
                <div className="form-group">
                    <label htmlFor="phone" className="form-label">{t.phone}</label>
                    <input
                        type="tel"
                        id="phone"
                        className="form-input"
                        placeholder={t.phone_placeholder}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email" className="form-label">{t.email}</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder={t.email_placeholder}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                {/* Message */}
                <div className="form-group">
                    <label htmlFor="message" className="form-label">{t.message}</label>
                    <textarea
                        id="message"
                        rows={4}
                        className="form-input resize-none"
                        placeholder={t.message_placeholder}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                    ></textarea>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                    <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                        {t.success}
                    </div>
                )}
                {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                        {t.error}
                    </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary flex-1 py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {t.sending}
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                {t.submit}
                            </>
                        )}
                    </button>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-[#25D366] text-white hover:bg-[#128C7E] flex-1 py-4"
                    >
                        <MessageCircle className="w-5 h-5" />
                        {t.whatsapp}
                    </a>
                </div>
            </form>
        </div>
    );
}
