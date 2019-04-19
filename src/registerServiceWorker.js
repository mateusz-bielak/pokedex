/* eslint-disable no-console */
const compatibleServiceWorker = 'serviceWorker' in navigator;

export const registerServiceWorker = () => {
    if (process.env.NODE_ENV !== 'production' || !compatibleServiceWorker) {
        return;
    }

    window.addEventListener('load', () => {
        const swUrl = 'service-worker.js';

        navigator.serviceWorker
            .register(swUrl)
            .then(registration => {
                // eslint-disable-next-line no-param-reassign
                registration.onupdatefound = () => {
                    const { installing } = registration;

                    installing.onstatechange = () => {
                        if (installing.state !== 'installed') {
                            return;
                        }

                        console.log(
                            navigator.serviceWorker.controller
                                ? 'New content is available; please refresh.'
                                : 'Content is cached for offline use.',
                        );
                    };
                };
            })
            .catch(error => {
                console.error('Error during service worker registration:', error);
            });
    });
};
