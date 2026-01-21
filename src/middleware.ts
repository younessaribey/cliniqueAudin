import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = (context, next) => {
    // Get the lang parameter from the URL
    const url = new URL(context.request.url);
    const langParam = url.searchParams.get('lang');
    const lang = langParam === 'ar' ? 'ar' : 'fr';

    // Log for debugging
    console.log('🌐 MIDDLEWARE CALLED');
    console.log('🌐 URL:', url.href);
    console.log('🌐 Lang param:', langParam);
    console.log('🌐 Final lang:', lang);

    // Store it in locals so pages can access it
    context.locals.lang = lang;

    return next();
};
