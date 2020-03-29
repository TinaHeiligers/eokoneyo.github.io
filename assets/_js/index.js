import initPreloader from './preloader';
import initSearch from './search';

/**
 * @description Stores references to DOM elements
 * @type {{
 *     preloader: {
 *          shape: {SVGElement}
 *          path: {SVGPathElement}
 *     },
 *     header: {HTMLElement},
 *     illustrationScroll : {
 *          illustrationWrapper: {HTMLElement}
 *          illustration: {HTMLElement}
 *          aboutCTA: {HTMLElement}
 *     }
 * }}
 */
const DOM = {};

((global) => {

    document.addEventListener('DOMContentLoaded', () => {
        DOM.preloader = global.document.querySelector('.preloader');
        DOM.illustrationScroll = global.document.querySelector('#illustration-scroll-interaction');
        DOM.header = global.document.querySelector('#header');

        DOM.preloader.shape = DOM.preloader.querySelector('svg.shape');
        DOM.preloader.path = DOM.preloader.shape.querySelector('path');
        initPreloader(global, DOM.preloader);

        initSearch(global);

        if (DOM.illustrationScroll) {
            (async () => {
                DOM.illustrationScroll.illustrationWrapper = DOM.illustrationScroll.querySelector('#illustration-wrapper');
                DOM.illustrationScroll.illustration = DOM.illustrationScroll.querySelector('#illustration');
                DOM.illustrationScroll.aboutCTA = DOM.illustrationScroll.querySelector('#info-cta');

                const { default: handleLandingAnimation } = await import(/* webpackChunkName: "animate-landing-page" */ './animate-landing-page');

                handleLandingAnimation(global, DOM.header, DOM.illustrationScroll);
            })();
        }

        // Do page view tracking
        if (global.ga) {
            global.ga('send', {
                hitType: 'pageview',
                page: global.location.pathname,
            });
        }
    });
})(window);
