/* =========================================================
   EQUIPO POLÍTICA CON VALORES
   APP.JS
   Reproductor + Playlist + PWA
========================================================= */


/* =========================================================
   LISTA DE CANCIONES
=========================================================

   IMPORTANTE:
   Los archivos MP3 deberán llamarse:

   01-cancion.mp3
   02-cancion.mp3
   ...
   20-cancion.mp3

   Más adelante cambiaremos los títulos por
   los nombres reales de las canciones.
========================================================= */

const canciones = [

    {
        numero: 1,
        titulo: "Canción 01",
        archivo: "canciones/01-cancion.mp3"
    },

    {
        numero: 2,
        titulo: "Canción 02",
        archivo: "canciones/02-cancion.mp3"
    },

    {
        numero: 3,
        titulo: "Canción 03",
        archivo: "canciones/03-cancion.mp3"
    },

    {
        numero: 4,
        titulo: "Canción 04",
        archivo: "canciones/04-cancion.mp3"
    },

    {
        numero: 5,
        titulo: "Canción 05",
        archivo: "canciones/05-cancion.mp3"
    },

    {
        numero: 6,
        titulo: "Canción 06",
        archivo: "canciones/06-cancion.mp3"
    },

    {
        numero: 7,
        titulo: "Canción 07",
        archivo: "canciones/07-cancion.mp3"
    },

    {
        numero: 8,
        titulo: "Canción 08",
        archivo: "canciones/08-cancion.mp3"
    },

    {
        numero: 9,
        titulo: "Canción 09",
        archivo: "canciones/09-cancion.mp3"
    },

    {
        numero: 10,
        titulo: "Canción 10",
        archivo: "canciones/10-cancion.mp3"
    },

    {
        numero: 11,
        titulo: "Canción 11",
        archivo: "canciones/11-cancion.mp3"
    },

    {
        numero: 12,
        titulo: "Canción 12",
        archivo: "canciones/12-cancion.mp3"
    },

    {
        numero: 13,
        titulo: "Canción 13",
        archivo: "canciones/13-cancion.mp3"
    },

    {
        numero: 14,
        titulo: "Canción 14",
        archivo: "canciones/14-cancion.mp3"
    },

    {
        numero: 15,
        titulo: "Canción 15",
        archivo: "canciones/15-cancion.mp3"
    },

    {
        numero: 16,
        titulo: "Canción 16",
        archivo: "canciones/16-cancion.mp3"
    },

    {
        numero: 17,
        titulo: "Canción 17",
        archivo: "canciones/17-cancion.mp3"
    },

    {
        numero: 18,
        titulo: "Canción 18",
        archivo: "canciones/18-cancion.mp3"
    },

    {
        numero: 19,
        titulo: "Canción 19",
        archivo: "canciones/19-cancion.mp3"
    },

    {
        numero: 20,
        titulo: "Canción 20",
        archivo: "canciones/20-cancion.mp3"
    }

];


/* =========================================================
   ELEMENTOS DE LA PÁGINA
========================================================= */

const playlist =
    document.getElementById("playlist");

const audio =
    document.getElementById("audio");

const player =
    document.getElementById("player");

const nowPlaying =
    document.getElementById("nowPlaying");

const playPause =
    document.getElementById("playPause");

const progress =
    document.getElementById("progress");

const time =
    document.getElementById("time");

const installBtn =
    document.getElementById("installBtn");

const notifyBtn =
    document.getElementById("notifyBtn");


/* =========================================================
   VARIABLES
========================================================= */

let cancionActual = null;

let instalacionPendiente = null;


/* =========================================================
   CREAR PLAYLIST
========================================================= */

function mostrarPlaylist() {

    playlist.innerHTML = "";

    canciones.forEach(cancion => {

        const tarjeta =
            document.createElement("article");

        tarjeta.className =
            "track";


        tarjeta.innerHTML = `

            <div class="track-number">
                ${String(cancion.numero).padStart(2, "0")}
            </div>


            <div>

                <div class="track-title">
                    ${cancion.titulo}
                </div>

                <div class="track-meta">
                    MP3 · Escuchar o descargar
                </div>

            </div>


            <div class="track-actions">

                <button
                    class="play-btn"
                    data-play="${cancion.numero}"
                >
                    ▶ Escuchar
                </button>


                <a
                    class="download-btn"
                    href="${cancion.archivo}"
                    download
                >
                    ⬇ Descargar
                </a>

            </div>

        `;


        playlist.appendChild(tarjeta);

    });

}


/* =========================================================
   REPRODUCIR CANCIÓN
========================================================= */

function reproducirCancion(cancion) {

    if (!cancion) {
        return;
    }


    cancionActual =
        cancion;


    audio.src =
        cancion.archivo;


    audio.load();


    nowPlaying.textContent =
        cancion.titulo;


    player.hidden =
        false;


    audio.play()
        .then(() => {

            actualizarBotones();

        })

        .catch(error => {

            console.warn(
                "No se pudo reproducir:",
                error
            );

            alert(
                "Esta canción todavía no está disponible. " +
                "Sube el archivo MP3 correspondiente a la carpeta canciones."
            );

        });

}


/* =========================================================
   BOTONES DE PLAYLIST
========================================================= */

playlist.addEventListener(
    "click",
    function(event) {

        const boton =
            event.target.closest("[data-play]");


        if (!boton) {
            return;
        }


        const numero =
            Number(boton.dataset.play);


        const cancion =
            canciones.find(
                item =>
                    item.numero === numero
            );


        if (!cancion) {
            return;
        }


        if (
            cancionActual &&
            cancionActual.numero === numero &&
            !audio.paused
        ) {

            audio.pause();

            return;
        }


        reproducirCancion(cancion);

    }
);


/* =========================================================
   ACTUALIZAR BOTONES
========================================================= */

function actualizarBotones() {

    const botones =
        document.querySelectorAll(
            "[data-play]"
        );


    botones.forEach(boton => {

        const numero =
            Number(boton.dataset.play);


        if (
            cancionActual &&
            numero === cancionActual.numero &&
            !audio.paused
        ) {

            boton.textContent =
                "⏸ Pausar";

        }

        else {

            boton.textContent =
                "▶ Escuchar";

        }

    });

}


/* =========================================================
   PLAY / PAUSE PRINCIPAL
========================================================= */

playPause.addEventListener(
    "click",
    function() {

        if (!audio.src) {
            return;
        }


        if (audio.paused) {

            audio.play();

        }

        else {

            audio.pause();

        }

    }
);


/* =========================================================
   EVENTO PLAY
========================================================= */

audio.addEventListener(
    "play",
    function() {

        playPause.textContent =
            "⏸";

        actualizarBotones();

    }
);


/* =========================================================
   EVENTO PAUSE
========================================================= */

audio.addEventListener(
    "pause",
    function() {

        playPause.textContent =
            "▶";

        actualizarBotones();

    }
);


/* =========================================================
   FORMATEAR TIEMPO
========================================================= */

function formatearTiempo(segundos) {

    if (
        !Number.isFinite(segundos)
    ) {

        return "00:00";

    }


    const minutos =
        Math.floor(
            segundos / 60
        )
        .toString()
        .padStart(2, "0");


    const segundosRestantes =
        Math.floor(
            segundos % 60
        )
        .toString()
        .padStart(2, "0");


    return `${minutos}:${segundosRestantes}`;

}


/* =========================================================
   ACTUALIZAR TIEMPO
========================================================= */

audio.addEventListener(
    "timeupdate",
    function() {

        if (!audio.duration) {
            return;
        }


        const porcentaje =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        progress.value =
            porcentaje;


        time.textContent =
            `${formatearTiempo(audio.currentTime)} / ${formatearTiempo(audio.duration)}`;

    }
);


/* =========================================================
   METADATOS DEL AUDIO
========================================================= */

audio.addEventListener(
    "loadedmetadata",
    function() {

        time.textContent =
            `00:00 / ${formatearTiempo(audio.duration)}`;

    }
);


/* =========================================================
   BARRA DE PROGRESO
========================================================= */

progress.addEventListener(
    "input",
    function() {

        if (!audio.duration) {
            return;
        }


        const posicion =
            Number(progress.value) / 100;


        audio.currentTime =
            posicion * audio.duration;

    }
);


/* =========================================================
   CUANDO TERMINA UNA CANCIÓN
========================================================= */

audio.addEventListener(
    "ended",
    function() {

        if (!cancionActual) {
            return;
        }


        const siguiente =
            canciones.find(
                cancion =>
                    cancion.numero ===
                    cancionActual.numero + 1
            );


        if (siguiente) {

            reproducirCancion(
                siguiente
            );

        }

        else {

            audio.currentTime =
                0;

            progress.value =
                0;

            actualizarBotones();

        }

    }
);


/* =========================================================
   INSTALACIÓN DE LA PWA
========================================================= */

window.addEventListener(
    "beforeinstallprompt",
    function(event) {

        event.preventDefault();


        instalacionPendiente =
            event;


        installBtn.hidden =
            false;

    }
);


/* =========================================================
   BOTÓN INSTALAR
========================================================= */

installBtn.addEventListener(
    "click",
    async function() {

        if (!instalacionPendiente) {

            alert(
                "La opción de instalación aparecerá " +
                "cuando el navegador reconozca esta página como PWA."
            );

            return;

        }


        instalacionPendiente.prompt();


        const resultado =
            await instalacionPendiente.userChoice;


        if (
            resultado.outcome ===
            "accepted"
        ) {

            console.log(
                "Aplicación instalada."
            );

        }


        instalacionPendiente =
            null;


        installBtn.hidden =
            true;

    }
);


/* =========================================================
   DETECTAR INSTALACIÓN
========================================================= */

window.addEventListener(
    "appinstalled",
    function() {

        console.log(
            "Equipo Política con Valores fue instalado."
        );

        installBtn.hidden =
            true;

    }
);


/* =========================================================
   NOTIFICACIONES
========================================================= */

notifyBtn.addEventListener(
    "click",
    async function() {

        if (
            !("Notification" in window)
        ) {

            alert(
                "Este navegador no admite notificaciones."
            );

            return;

        }


        try {

            const permiso =
                await Notification.requestPermission();


            if (
                permiso === "granted"
            ) {

                new Notification(
                    "Equipo Política con Valores",
                    {
                        body:
                            "Los avisos están activados en este dispositivo.",
                        icon:
                            "icon-192.png"
                    }
                );


                notifyBtn.textContent =
                    "🔔 Avisos activados";

            }

            else {

                notifyBtn.textContent =
                    "🔕 Avisos desactivados";

            }

        }

        catch(error) {

            console.error(
                "Error con notificaciones:",
                error
            );

        }

    }
);


/* =========================================================
   SERVICE WORKER
========================================================= */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        function() {

            navigator.serviceWorker
                .register(
                    "./service-worker.js"
                )

                .then(
                    registration => {

                        console.log(
                            "Service Worker activo:",
                            registration.scope
                        );

                    }
                )

                .catch(
                    error => {

                        console.error(
                            "Error Service Worker:",
                            error
                        );

                    }
                );

        }
    );

}


/* =========================================================
   INICIALIZAR APLICACIÓN
========================================================= */

mostrarPlaylist();
