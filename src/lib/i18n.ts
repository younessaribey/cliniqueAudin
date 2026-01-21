import frTranslations from '../i18n/fr.json';
import arTranslations from '../i18n/ar.json';

export type Language = 'fr' | 'ar';

export const translations = {
    fr: frTranslations,
    ar: arTranslations,
};

export const defaultLanguage: Language = 'fr';

export function getTranslations(lang: Language = defaultLanguage) {
    return translations[lang] || translations[defaultLanguage];
}

export function isRTL(lang: Language): boolean {
    return lang === 'ar';
}

export function getLanguageDirection(lang: Language): 'ltr' | 'rtl' {
    return isRTL(lang) ? 'rtl' : 'ltr';
}

// Type-safe translation getter
export function t(lang: Language, path: string): string {
    const keys = path.split('.');
    let value: any = translations[lang];

    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            // Fallback to French
            value = translations['fr'];
            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    return path; // Return path if not found
                }
            }
            return value;
        }
    }

    return typeof value === 'string' ? value : path;
}
