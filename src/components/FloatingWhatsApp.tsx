import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
    phoneNumber?: string;
    lang?: 'fr' | 'ar';
}

const translations = {
    fr: {
        greeting: 'Bonjour ! Comment pouvons-nous vous aider ?',
        placeholder: 'Écrivez votre message...',
        send: 'Envoyer',
    },
    ar: {
        greeting: 'مرحباً! كيف يمكننا مساعدتك؟',
        placeholder: 'اكتب رسالتك...',
        send: 'إرسال',
    },
};

export default function FloatingWhatsApp({
    phoneNumber = '213560055803',
    lang = 'fr'
}: FloatingWhatsAppProps) {
    const t = translations[lang];
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show button after a delay
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleSend = () => {
        if (!message.trim()) return;

        const encodedMessage = encodeURIComponent(
            `Bonjour, je vous contacte depuis le site web de la Clinique Audin.\n\n${message}`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        setMessage('');
        setIsOpen(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {/* Chat Popup */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-[#075E54] text-white p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-semibold">Clinique Audin</p>
                                    <p className="text-xs text-white/70">En ligne</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="p-4 bg-[#ECE5DD]">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-sm text-gray-700">{t.greeting}</p>
                            <p className="text-xs text-gray-400 text-right mt-1">Clinique Audin</p>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={t.placeholder}
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#25D366]"
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:bg-[#128C7E] transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 ${isOpen ? 'rotate-0' : ''}`}
                style={{
                    animation: !isOpen ? 'pulse-glow 2s ease-in-out infinite' : 'none'
                }}
            >
                {isOpen ? (
                    <X className="w-7 h-7" />
                ) : (
                    <MessageCircle className="w-7 h-7" />
                )}
            </button>

            <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
          }
        }
      `}</style>
        </div>
    );
}
