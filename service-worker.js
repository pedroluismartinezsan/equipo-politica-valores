/* =========================================================
   EQUIPO POLÍTICA CON VALORES
   SERVICE WORKER
========================================================= */

const CACHE_NAME = "politica-valores-v2";


/* =========================================================
   ARCHIVOS PRINCIPALES DE LA APLICACIÓN
========================================================= */

const ARCHIVOS_APP = [

    "./",

    "./index.html",

    "./style.css",

    "./app.js",

    "./manifest.json",

    "./icon-192.png",

    "./icon-512.png",

    "./img/portada.png"

];


/* =========================================================
   INSTALACIÓN
========================================================= */

self.addEventListener(
    "install",
    event => {

        console.log(
            "Instalando Equipo Política con Valores..."
        );


        event.waitUntil(

            caches
                .open(CACHE_NAME)

                .then(cache => {

                    return cache.addAll(
                        ARCHIVOS_APP
                    );

                })

        );


        self.skipWaiting();

    }
);


/* =========================================================
   ACTIVACIÓN
========================================================= */

self.addEventListener(
    "activate",
    event => {

        console.log(
            "Service Worker activado."
        );


        event.waitUntil(

            caches
                .keys()

                .then(cacheNames => {

                    return Promise.all(

                        cacheNames
                            .filter(
                                cacheName =>
                                    cacheName !==
                                    CACHE_NAME
                            )

                            .map(
                                cacheName =>
                                    caches.delete(
                                        cacheName
                                    )
                            )

                    );

                })

        );


        self.clients.claim();

    }
);


/* =========================================================
   SOLICITUDES
========================================================= */

self.addEventListener(
    "fetch",
    event => {

        /*
         * Solo procesamos solicitudes GET.
         */

        if (
            event.request.method !==
            "GET"
        ) {

            return;

        }


        event.respondWith(

            caches
                .match(event.request)

                .then(cachedResponse => {

                    /*
                     * Si existe una copia en caché,
                     * utilizamos esa copia.
                     */

                    if (
                        cachedResponse
                    ) {

                        return cachedResponse;

                    }


                    /*
                     * Si no existe,
                     * buscamos el archivo en Internet.
                     */

                    return fetch(
                        event.request
                    )

                    .then(response => {

                        /*
                         * Guardamos una copia de
                         * los archivos válidos.
                         */

                        if (
                            response &&
                            response.status === 200 &&
                            response.type === "basic"
                        ) {

                            const responseClone =
                                response.clone();


                            caches
                                .open(CACHE_NAME)

                                .then(cache => {

                                    cache.put(
                                        event.request,
                                        responseClone
                                    );

                                });

                        }


                        return response;

                    })

                    .catch(() => {

                        /*
                         * Si no hay Internet y no tenemos
                         * el recurso guardado, devolvemos
                         * la página principal.
                         */

                        return caches.match(
                            "./index.html"
                        );

                    });

                })

        );

    }
);


/* =========================================================
   NOTIFICACIONES PUSH
=========================================================

   Esta sección queda preparada para la siguiente fase.

   Más adelante conectaremos un servidor de Push
   para que puedas enviar:

   🎵 Nueva canción disponible
   Ya puedes escuchar la nueva canción.

========================================================= */

self.addEventListener(
    "push",
    event => {

        let datos = {

            title:
                "Equipo Política con Valores",

            body:
                "Hay una nueva canción disponible.",

            icon:
                "./icon-192.png",

            badge:
                "./icon-192.png"

        };


        if (
            event.data
        ) {

            try {

                datos =
                    event.data.json();

            }

            catch(error) {

                datos.body =
                    event.data.text();

            }

        }


        event.waitUntil(

            self.registration
                .showNotification(
                    datos.title,
                    {

                        body:
                            datos.body,

                        icon:
                            datos.icon,

                        badge:
                            datos.badge,

                        vibrate:
                            [200, 100, 200],

                        data:
                            {
                                url:
                                    "./"
                            }

                    }
                )

        );

    }
);


/* =========================================================
   CLICK EN NOTIFICACIÓN
========================================================= */

self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();


        event.waitUntil(

            clients.matchAll({

                type:
                    "window",

                includeUncontrolled:
                    true

            })

            .then(clientes => {

                for (
                    const cliente
                    of clientes
                ) {

                    if (
                        "focus" in cliente
                    ) {

                        return cliente.focus();

                    }

                }


                if (
                    clients.openWindow
                ) {

                    return clients.openWindow(
                        "./"
                    );

                }

            })

        );

    }
);
