/* =========================================
   AMNA v17.0
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   BOOT SCREEN
========================================= */

const bootScreen =
    document.getElementById("bootScreen");

const mainContent =
    document.getElementById("mainContent");

const loadingProgress =
    document.getElementById("loadingProgress");

const loadingPercent =
    document.getElementById("loadingPercent");

const enterBtn =
    document.getElementById("enterBtn");


const ambientDecoration =
    document.getElementById("ambientDecoration");

if (ambientDecoration) {

    const decorations = ["♡", "✿", "♥", "❀", "♡", "✾"];
    const decorationCount =
        window.innerWidth < 700 ? 14 : 24;

    for (let index = 0; index < decorationCount; index++) {

        const decoration =
            document.createElement("span");

        decoration.className = "ambient-decoration-item";
        decoration.textContent =
            decorations[index % decorations.length];
        decoration.style.left = Math.random() * 100 + "%";
        decoration.style.top = Math.random() * 100 + "%";
        decoration.style.setProperty(
            "--decoration-size",
            15 + Math.random() * 19 + "px"
        );
        decoration.style.setProperty(
            "--decoration-delay",
            Math.random() * -12 + "s"
        );

        ambientDecoration.appendChild(decoration);
    }
}


let progress = 0;


const loadingInterval = setInterval(() => {

    progress++;

    loadingProgress.style.width =
        progress + "%";

    loadingPercent.textContent =
        progress + "%";


    if (progress >= 100) {

        clearInterval(loadingInterval);

        enterBtn.classList.add("ready");

    }

}, 35);



/* =========================================
   ENTER EXPERIENCE
========================================= */

enterBtn.addEventListener("click", () => {

    /*
     * Prevent double-clicks while the
     * cinematic intro is running.
     */
    enterBtn.disabled = true;

    /*
     * Hide the boot screen.
     */
    bootScreen.classList.add("hide");

    /*
     * Keep the page locked while the
     * birthday intro is playing.
     */
    document.body.style.overflow = "hidden";

    /*
     * Wait for the boot screen fade,
     * then start the cinematic intro.
     */
    setTimeout(() => {

        startBirthdayIntro();

    }, 500);

});


/* =========================================
   BIRTHDAY INTRO EXPERIENCE
========================================= */

function startBirthdayIntro() {

    const intro =
        document.getElementById("birthdayIntro");

    /*
     * Safety fallback:
     * if the intro markup is missing,
     * show the original website normally.
     */
    if (!intro) {

        mainContent.classList.add("visible");

        document.body.classList.add(
            "experience-started"
        );

        document.body.style.overflow = "";

        startRevealObserver();
        createEasterEgg();

        return;
    }


    /* SHOW BIRTHDAY INTRO */

intro.style.opacity = "1";
intro.style.visibility = "visible";
intro.style.pointerEvents = "auto";

/* RESTART INTRO ANIMATIONS */

const animatedElements =
    intro.querySelectorAll(
        ".birthday-intro-bg, " +
        ".birthday-intro-line, " +
        ".birthday-intro-small, " +
        ".birthday-intro-age, " +
        ".birthday-intro-name, " +
        ".birthday-intro-divider, " +
        ".birthday-intro-title, " +
        ".birthday-intro-subtitle, " +
        ".birthday-intro-particle"
    );

animatedElements.forEach((element) => {

    element.style.animation = "none";

});

void intro.offsetWidth;

animatedElements.forEach((element) => {

    element.style.animation = "";

});


    const particleContainer =
        intro.querySelector(
            ".birthday-intro-particles"
        );


    /*
     * Create small floating gold particles.
     */
    particleContainer.innerHTML = "";

    for (let i = 0; i < 55; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "birthday-intro-particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.setProperty(
            "--particle-x",
            (
                (Math.random() - 0.5) * 500
            ) + "px"
        );

        particle.style.setProperty(
            "--particle-y",
            (
                (Math.random() - 0.5) * 450
            ) + "px"
        );

        particle.style.setProperty(
            "--particle-duration",
            (
                3 + Math.random() * 4
            ) + "s"
        );

        particle.style.animationDelay =
            (
                Math.random() * 2.5
            ) + "s";

        particleContainer.appendChild(
            particle
        );
    }


    /*
     * Keep the intro on screen long enough
     * for every text beat to land.
     */
    setTimeout(() => {

        intro.classList.add(
            "intro-finished"
        );

        mainContent.classList.add(
            "visible"
        );

        document.body.classList.add(
            "experience-started"
        );

        setTimeout(() => {

            const heroContent =
                document.querySelector(".hero-content");

            if (heroContent) {

                heroContent.classList.remove(
                    "hero-reveal"
                );

                void heroContent.offsetWidth;

                heroContent.classList.add(
                    "hero-reveal"
                );
            }

        }, 1300);

        document.body.style.overflow = "";

        /*
         * Start the existing website systems
         * only after the cinematic intro ends.
         */
        startRevealObserver();
        createEasterEgg();

    }, 5000);


    /*
     * Remove the intro from the DOM after
     * its fade-out has completed.
     */
    setTimeout(() => {

        if (intro.parentNode) {
            intro.remove();
        }

    }, 8200);

}


/* =========================================
   SCROLL REVEAL
========================================= */

function startRevealObserver() {

    const revealElements =
        document.querySelectorAll(
            ".story-content, " +
            ".memory-content, " +
            ".system-content, " +
            ".trip-content, " +
            ".letter-content, " +
            ".final-content"
        );


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}



/* =========================================
   MEMORY CARD REVEAL
========================================= */

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );


const memoryObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "memory-visible"
                    );

                    memoryObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.2
        }

    );


memoryCards.forEach((card) => {

    memoryObserver.observe(card);

});



/* =========================================
   LIGHTBOX
========================================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );

const lightboxText =
    document.getElementById(
        "lightboxText"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


const galleryCards =
    document.querySelectorAll(
        ".memory-card"
    );


galleryCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            const image =
                card.dataset.image;

            const title =
                card.dataset.title;

            const caption =
                card.dataset.caption;


            lightboxImage.src =
                image;

            lightboxTitle.textContent =
                title;

            lightboxText.textContent =
                caption;


            lightbox.classList.add(
                "open"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});



/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );

    document.body.style.overflow =
        "";

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);



/* =========================================
   AMNA PHOTO ALBUM — CAROUSEL
========================================= */

const albumModal =
    document.getElementById("albumModal");

const openAlbumButton =
    document.getElementById("openAlbum");

const albumClose =
    document.getElementById("albumClose");

const albumImage =
    document.getElementById("albumImage");

const albumCounter =
    document.getElementById("albumCounter");

const albumDots =
    document.getElementById("albumDots");

const albumPrev =
    document.getElementById("albumPrev");

const albumNext =
    document.getElementById("albumNext");

const albumLoader =
    document.getElementById("albumLoader");


/*
 * Put the remaining Amna photos inside:
 * images/album/
 *
 * Name them 01.jpg, 02.jpg, 03.jpg ...
 * The loader checks each file and only adds
 * photos that actually exist, so you can add
 * as many numbered photos as you want.
 */
const albumCandidates = Array.from(
    { length: 29 },
    (_, index) =>
        `images/album/${String(index + 1).padStart(2, "0")}.jpeg`
);

let albumImages = [];
let albumIndex = 0;


function loadAlbumImages() {

    const checks = albumCandidates.map(
        (src) =>
            new Promise((resolve) => {

                const image = new Image();

                image.onload = () =>
                    resolve(src);

                image.onerror = () =>
                    resolve(null);

                image.src = src;

            })
    );

    Promise.all(checks).then((results) => {

        albumImages = results.filter(Boolean);

        renderAlbumDots();

        if (albumImages.length) {
            albumLoader.style.display = "none";
            albumImage.src = albumImages[0];
            updateAlbumUI();
        } else {
            albumLoader.textContent =
                "ADD PHOTOS TO images/album/";
            albumLoader.classList.add("empty");
            albumCounter.textContent = "00 / 00";
            albumPrev.disabled = true;
            albumNext.disabled = true;
        }

    });
}


function updateAlbumUI() {

    if (!albumImages.length) return;

    albumImage.classList.remove("album-image-visible");

    window.setTimeout(() => {
        albumImage.src = albumImages[albumIndex];
        albumImage.classList.add("album-image-visible");
    }, 80);

    albumCounter.textContent =
        `${String(albumIndex + 1).padStart(2, "0")} / ${String(albumImages.length).padStart(2, "0")}`;

    albumDots
        .querySelectorAll("button")
        .forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === albumIndex
            );
        });
}


function renderAlbumDots() {

    albumDots.innerHTML = "";

    albumImages.forEach((_, index) => {

        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "album-dot";
        dot.setAttribute(
            "aria-label",
            `Go to photo ${index + 1}`
        );

        dot.addEventListener("click", () => {
            albumIndex = index;
            updateAlbumUI();
        });

        albumDots.appendChild(dot);
    });
}


function moveAlbum(direction) {

    if (!albumImages.length) return;

    albumIndex =
        (albumIndex + direction + albumImages.length) %
        albumImages.length;

    updateAlbumUI();
}


function openAlbum() {

    albumModal.classList.add("open");
    albumModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (albumImages.length) {
        updateAlbumUI();
    }
}


function closeAlbum() {

    albumModal.classList.remove("open");
    albumModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}


openAlbumButton.addEventListener(
    "click",
    openAlbum
);

albumClose.addEventListener(
    "click",
    closeAlbum
);

albumPrev.addEventListener(
    "click",
    () => moveAlbum(-1)
);

albumNext.addEventListener(
    "click",
    () => moveAlbum(1)
);

albumModal.addEventListener(
    "click",
    (event) => {

        if (event.target === albumModal) {
            closeAlbum();
        }

    }
);


/* Keyboard controls */
document.addEventListener("keydown", (event) => {

    if (!albumModal.classList.contains("open")) return;

    if (event.key === "Escape") {
        closeAlbum();
    }

    if (event.key === "ArrowLeft") {
        moveAlbum(-1);
    }

    if (event.key === "ArrowRight") {
        moveAlbum(1);
    }

});


/* Touch / swipe controls */
let albumTouchStartX = 0;

albumModal.addEventListener("touchstart", (event) => {

    albumTouchStartX =
        event.changedTouches[0].screenX;

}, { passive: true });

albumModal.addEventListener("touchend", (event) => {

    const endX =
        event.changedTouches[0].screenX;

    const distance =
        endX - albumTouchStartX;

    if (Math.abs(distance) < 45) return;

    moveAlbum(distance > 0 ? -1 : 1);

}, { passive: true });


loadAlbumImages();


/* =========================================
   HIDDEN BIRTHDAY EASTER EGG
========================================= */

function createEasterEgg() {

    if (
        document.querySelector(".secret-button") ||
        document.querySelector(".diagnostic-modal")
    ) {
        return;
    }

    /* -----------------------------------------
       FLOATING BUTTON
    ----------------------------------------- */

    const secretButton =
        document.createElement("button");

    secretButton.className =
        "secret-button";

    secretButton.innerHTML =
        "✦ There's One More ✦";

    secretButton.setAttribute(
        "aria-label",
        "A little surprise for Amna"
    );

    document.body.appendChild(
        secretButton
    );


    /* -----------------------------------------
       BIRTHDAY OVERLAY
    ----------------------------------------- */

    const birthdayOverlay =
        document.createElement("div");

    birthdayOverlay.className =
        "birthday-overlay";

    birthdayOverlay.innerHTML = `
    <div class="birthday-celebration">

        <div class="balloons">

            <div class="balloon balloon-1">
                <span></span>
            </div>

            <div class="balloon balloon-2">
                <span></span>
            </div>

            <div class="balloon balloon-3">
                <span></span>
            </div>

            <div class="balloon balloon-4">
                <span></span>
            </div>

            <div class="balloon balloon-5">
                <span></span>
            </div>

        </div>


        <div class="birthday-confetti"></div>


        <div class="birthday-content">

            <div class="birthday-small">
                A LITTLE SURPRISE
            </div>


            <div class="birthday-title">
                HAPPY BIRTHDAY
            </div>


            <div class="birthday-name">
                AMNA
            </div>


            <!-- CAKE -->

            <div class="cake-scene">

                <div class="cake-glow"></div>


                <div class="cake">

                    <!-- 5 CANDLES -->

                    <div class="candles">

                        <div class="candle candle-1">

                            <div class="flame"></div>

                            <div class="smoke"></div>

                        </div>


                        <div class="candle candle-2">

                            <div class="flame"></div>

                            <div class="smoke"></div>

                        </div>


                        <div class="candle candle-3">

                            <div class="flame"></div>

                            <div class="smoke"></div>

                        </div>


                        <div class="candle candle-4">

                            <div class="flame"></div>

                            <div class="smoke"></div>

                        </div>


                        <div class="candle candle-5">

                            <div class="flame"></div>

                            <div class="smoke"></div>

                        </div>

                    </div>


                    <div class="cake-top"></div>


                    <div class="cake-body">

                        <div class="cake-cream"></div>

                        <div class="cake-decoration"></div>

                    </div>


                    <div class="cake-base"></div>

                </div>

            </div>


            <div class="birthday-age">
                17
            </div>


            <div class="blow-instruction">

                🎤
                <span>Make a wish...</span>
                <br>

                <strong>
                    Blow on the candles!
                </strong>

            </div>


            <div class="blow-status">

                <span class="blow-mic-dot"></span>

                MICROPHONE READY

            </div>


            <div class="birthday-line"></div>


            <p class="birthday-message">

                A little wish.
                <br>

                Beautiful moments.
                <br>

                Just for Amna.

            </p>


            <div class="wish-granted">

                ✨ WISH GRANTED ✨

            </div>


            <button class="birthday-continue">

                CONTINUE

            </button>

        </div>

    </div>
`;

    document.body.appendChild(
        birthdayOverlay
    );


    /* -----------------------------------------
       AMNA PROFILE MODAL
    ----------------------------------------- */

    const diagnosticModal =
        document.createElement("div");

    diagnosticModal.className =
        "diagnostic-modal";

    diagnosticModal.innerHTML = `
        <div class="diagnostic-window">

            <div class="diagnostic-header">

                <div>

                    <span class="diagnostic-dot"></span>

                    AMNA.exe

                </div>


                <button class="diagnostic-close">

                    ×

                </button>

            </div>


            <div class="diagnostic-body">

                <p class="diagnostic-label">

                    AMNA PROFILE

                </p>


                <h2>

                    Checking Amna...

                </h2>


                <div class="scan-results"></div>


                <div class="scan-progress">

                    <div class="scan-progress-bar"></div>

                </div>


                <div class="diagnostic-final">

                    <span class="final-icon">
                        ✓
                    </span>

                    <span class="final-text">

                        Beautiful soul detected.

                    </span>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(
        diagnosticModal
    );


    /* -----------------------------------------
       SCROLL REVEAL
    ----------------------------------------- */

    let buttonShown = false;


    function revealSecretButton() {

        if (buttonShown) return;


        if (window.scrollY > 180) {

            buttonShown = true;


            setTimeout(() => {

                secretButton.classList.add(
                    "secret-visible"
                );

            }, 350);

        }

    }


    window.addEventListener(
        "scroll",
        revealSecretButton
    );


    /* -----------------------------------------
       BUTTON CLICK
    ----------------------------------------- */

    secretButton.addEventListener(
        "click",
        () => {

            birthdayOverlay.classList.add(
                "birthday-show"
            );


            createBirthdayParticles();


            setTimeout(() => {

                startCandleBlowDetection();

            }, 700);

        }
    );


    /* -----------------------------------------
       CONTINUE TO AMNA.EXE
    ----------------------------------------- */

    const continueButton =
        birthdayOverlay.querySelector(
            ".birthday-continue"
        );


    continueButton.onclick =
        () => {

            birthdayOverlay.classList.remove(
                "birthday-show"
            );


            setTimeout(() => {

                diagnosticModal.classList.add(
                    "diagnostic-show"
                );


                startDiagnostic();

            }, 500);

        };


    /* -----------------------------------------
       CLOSE DIAGNOSTIC
    ----------------------------------------- */

    const closeButton =
        diagnosticModal.querySelector(
            ".diagnostic-close"
        );


    closeButton.addEventListener(
        "click",
        () => {

            diagnosticModal.classList.remove(
                "diagnostic-show"
            );

        }
    );


    /* -----------------------------------------
       BIRTHDAY PARTICLES
    ----------------------------------------- */

    function createBirthdayParticles() {

        const container =
            birthdayOverlay.querySelector(
                ".birthday-confetti"
            );


        container.innerHTML = "";


        for (let i = 0; i < 45; i++) {

            const particle =
                document.createElement("span");


            particle.className =
                "birthday-particle";


            particle.style.left =
                Math.random() * 100 + "%";


            particle.style.animationDelay =
                Math.random() * 2 + "s";


            particle.style.animationDuration =
                2.5 +
                Math.random() * 2 +
                "s";


            container.appendChild(
                particle
            );

        }

    }


    /* -----------------------------------------
       CANDLE BLOW DETECTION
    ----------------------------------------- */

    function startCandleBlowDetection() {

        const candles =
            birthdayOverlay.querySelectorAll(
                ".candle"
            );


        const flames =
            birthdayOverlay.querySelectorAll(
                ".flame"
            );


        const instruction =
            birthdayOverlay.querySelector(
                ".blow-instruction"
            );


        const micStatus =
            birthdayOverlay.querySelector(
                ".blow-status"
            );


        const wishGranted =
            birthdayOverlay.querySelector(
                ".wish-granted"
            );


        const continueButton =
            birthdayOverlay.querySelector(
                ".birthday-continue"
            );


        let audioContext = null;

        let analyser = null;

        let microphone = null;

        let animationFrame = null;


        let candleIndex = 0;


        let blowStartTime = null;

        let lastCandleTime = 0;


        let isBlowing = false;

        let detecting = false;


        const CANDLE_COOLDOWN =
            650;


        /*
         * Blow threshold.
         *
         * Higher = harder blow required.
         * Lower = easier to trigger.
         */

        const BLOW_THRESHOLD =
            0.045;


        /* -----------------------------------------
           START MICROPHONE
        ----------------------------------------- */

        async function startMicrophone() {

            try {

                const stream =
                    await navigator.mediaDevices.getUserMedia({

                        audio: {

                            echoCancellation: true,

                            noiseSuppression: true,

                            autoGainControl: false

                        }

                    });


                audioContext =
                    new (
                        window.AudioContext ||
                        window.webkitAudioContext
                    )();


                analyser =
                    audioContext.createAnalyser();


                analyser.fftSize =
                    1024;


                analyser.smoothingTimeConstant =
                    0.35;


                microphone =
                    audioContext.createMediaStreamSource(
                        stream
                    );


                microphone.connect(
                    analyser
                );


                detecting = true;


                micStatus.innerHTML =
                    `<span class="blow-mic-dot active"></span> LISTENING FOR A BLOW`;


                instruction.innerHTML =
                    `💨 <span>Now blow on the candles...</span>`;


                detectBlow();

            }


            catch (error) {

                console.log(
                    "Microphone permission:",
                    error
                );


                micStatus.innerHTML =
                    `<span class="blow-mic-dot error"></span> MICROPHONE BLOCKED`;


                instruction.innerHTML =
                    `<span>Allow microphone access to blow out the candles.</span>`;

            }

        }


        /* -----------------------------------------
           CALCULATE MICROPHONE VOLUME
        ----------------------------------------- */

        function getVolume() {

            if (!analyser) return 0;


            const data =
                new Uint8Array(
                    analyser.fftSize
                );


            analyser.getByteTimeDomainData(
                data
            );


            let sum = 0;


            for (
                let i = 0;
                i < data.length;
                i++
            ) {

                const normalized =
                    (data[i] - 128) / 128;


                sum +=
                    normalized *
                    normalized;

            }


            return Math.sqrt(
                sum / data.length
            );

        }


        /* -----------------------------------------
           DETECT CONTINUOUS BLOWING
        ----------------------------------------- */

        function detectBlow() {

            if (!detecting) return;


            const volume =
                getVolume();


            const now =
                performance.now();


            if (
                volume >
                BLOW_THRESHOLD
            ) {


                if (!isBlowing) {

                    isBlowing = true;

                    blowStartTime =
                        now;

                }


                /*
                 * How long the current
                 * blow has lasted.
                 */

                const blowDuration =
                    now -
                    blowStartTime;


                /*
                 * A candle can only be
                 * extinguished after cooldown.
                 */

                if (
                    now -
                    lastCandleTime >
                    CANDLE_COOLDOWN
                ) {


                    /*
                     * Short blow:
                     * approximately one candle.
                     *
                     * Long continuous blow:
                     * additional candles keep
                     * going out.
                     */

                    if (
                        blowDuration >
                        100
                    ) {


                        extinguishNextCandle();


                        lastCandleTime =
                            now;


                        /*
                         * Reset timer so a continuous
                         * blow can extinguish the next
                         * candle after another interval.
                         */

                        blowStartTime =
                            now;

                    }

                }

            }


            else {

                /*
                 * Blow has stopped.
                 */

                isBlowing =
                    false;


                blowStartTime =
                    null;

            }


            animationFrame =
                requestAnimationFrame(
                    detectBlow
                );

        }


        /* -----------------------------------------
           EXTINGUISH ONE CANDLE
        ----------------------------------------- */

        function extinguishNextCandle() {

            if (
                candleIndex >=
                candles.length
            ) {

                return;

            }


            const candle =
                candles[candleIndex];


            candle.classList.add(
                "candle-extinguished"
            );


            /*
             * Small delay between candles
             * makes the effect feel natural.
             */

            setTimeout(() => {

                candle.classList.add(
                    "smoke-visible"
                );

            }, 180);


            candleIndex++;


            /*
             * All candles gone.
             */

            if (
                candleIndex >=
                candles.length
            ) {

                setTimeout(() => {

                    finishBirthdayCandles();

                }, 700);

            }

        }


        /* -----------------------------------------
           ALL CANDLES EXTINGUISHED
        ----------------------------------------- */

        function finishBirthdayCandles() {

            detecting =
                false;


            if (animationFrame) {

                cancelAnimationFrame(
                    animationFrame
                );

            }


            if (microphone) {

                microphone.disconnect();

            }


            if (audioContext) {

                audioContext.close();

            }


            micStatus.innerHTML =
                `<span class="blow-mic-dot success"></span> ALL CANDLES OUT`;


            instruction.innerHTML =
                `✨ <span>Your wish has been made.</span>`;


            wishGranted.classList.add(
                "wish-visible"
            );


            setTimeout(() => {

                continueButton.classList.add(
                    "birthday-continue-visible"
                );

            }, 1000);


            continueButton.onclick =
                () => {

                    birthdayOverlay.classList.remove(
                        "birthday-show"
                    );


                    setTimeout(() => {

                        diagnosticModal.classList.add(
                            "diagnostic-show"
                        );


                        startDiagnostic();

                    }, 500);

                };

        }


        /* -----------------------------------------
           START MICROPHONE
        ----------------------------------------- */

        setTimeout(() => {

            startMicrophone();

        }, 900);

    }


    /* -----------------------------------------
       DIAGNOSTIC DATA
    ----------------------------------------- */

    function startDiagnostic() {

        const results =
            diagnosticModal.querySelector(
                ".scan-results"
            );


        const progressBar =
            diagnosticModal.querySelector(
                ".scan-progress-bar"
            );


        const finalBox =
            diagnosticModal.querySelector(
                ".diagnostic-final"
            );


        results.innerHTML =
            "";


        finalBox.classList.remove(
            "final-show"
        );


        const scanData = [

            {
                label: "Nature",
                value: "Bohat achi",
                type: "good",
                delay: 900
            },


            {
                label: "Relationship",
                value: "Ali ki Jaan ❤️",
                type: "good",
                delay: 900
            },


            {
                label: "Height",
                value: "Choti si",
                type: "normal",
                delay: 900
            },


            {
                label: "Smile Level",
                value: "Too cute",
                type: "warning",
                delay: 1400
            },


            {
                label: "Birthday Mode",
                value: "17 / 17 ✨",
                type: "warning",
                delay: 1800
            },


        ];


        scanData.forEach(
            (item, index) => {

                setTimeout(() => {

                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "scan-row";


                    row.innerHTML = `
                        <span class="scan-check">
                            ✓
                        </span>

                        <span class="scan-label">
                            ${item.label}
                        </span>

                        <span class="scan-value ${item.type}">
                            ${item.value}
                        </span>
                    `;


                    results.appendChild(
                        row
                    );


                    /* -----------------------------------------
                       COMMON SENSE
                    ----------------------------------------- */

                    if (
                        item.label ===
                        "Smile Level"
                    ) {

                        setTimeout(() => {

                            const value =
                                row.querySelector(
                                    ".scan-value"
                                );


                            const check =
                                row.querySelector(
                                    ".scan-check"
                                );


                            value.textContent =
                                "ERROR 404: Smile Level NOT FOUND";


                            value.classList.remove(
                                "warning"
                            );


                            value.classList.add(
                                "error"
                            );


                            check.textContent =
                                "×";

                        }, 1400);

                    }


                    /* -----------------------------------------
                       BEARD
                    ----------------------------------------- */

                    if (
                        item.label ===
                        "Birthday Mode"
                    ) {

                        setTimeout(() => {

                            const value =
                                row.querySelector(
                                    ".scan-value"
                                );


                            value.textContent =
                                "STILL LOADING...";


                            value.classList.remove(
                                "warning"
                            );


                            value.classList.add(
                                "error"
                            );


                            const subtext =
                                document.createElement(
                                    "div"
                                );


                            subtext.className =
                                "scan-subtext";


                            subtext.textContent =
                                "Expected release: MAYBE IN VERSION 19.0 😂";


                            row.appendChild(
                                subtext
                            );

                        }, 1800);

                    }

                }, index * 650);

            }
        );


        /* -----------------------------------------
           PROGRESS BAR
        ----------------------------------------- */

        setTimeout(() => {

            progressBar.style.width =
                "100%";

        }, 500);


        /* -----------------------------------------
           FINAL RESULT
        ----------------------------------------- */

        setTimeout(() => {

            finalBox.classList.add(
                "final-show"
            );

        }, 5000);

    }

}


