/* script.js - Lógica de Anime.js y Coreografía Visual */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos clave
    const shield = document.getElementById('school-shield');
    const shieldBody = document.querySelector('.shield-body');
    const centralElements = document.querySelector('.central-elements');
    const gearLarge = document.querySelector('.gear-large');
    const gearSmall = document.querySelector('.gear-small');
    const ipetText = document.querySelector('.ipet-text');
    const ipetChars = document.querySelectorAll('.ipet-text .char');
    const num249 = document.querySelector('.num-249');
    const copernicoText = document.querySelector('.copernico-text');
    const infoPanel = document.querySelector('.info-panel');
    const infoItems = document.querySelectorAll('.info-item');

    // Estado de la animación continua
    let isContinuousActive = false;
    let gearAnimations = [];

    // --- Coreografía de Entrada (Timeline principal) ---
    const introTimeline = anime.timeline({
        easing: 'easeOutElastic(1, 0.8)',
        duration: 1000
    });

    introTimeline
        // 1. Dibujar el borde del escudo (Stroke Path Drawing)
        .add({
            targets: '.shield-border',
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 1800,
            delay: 200,
            easing: 'easeInOutQuad'
        })
        // 2. Llenar el cuerpo del escudo con color amarillo
        .add({
            targets: shieldBody,
            opacity: [0, 1],
            fill: '#ffeb3b',
            duration: 1000,
            offset: '-=800' // Empieza antes de que termine el borde
        })
        // 3. Revelar elementos centrales (engranajes y texto)
        .add({
            targets: centralElements,
            opacity: [0, 1],
            scale: [0, 1],
            delay: anime.stagger(150),
            duration: 1200,
            offset: '-=600'
        })
        // 4. Staggering de letras "IPET"
        .add({
            targets: ipetChars,
            translateY: [-50, 0],
            scale: [0, 1],
            opacity: [0, 1],
            stagger: 150,
            duration: 1000,
            offset: '-=1000'
        })
        // 5. Animación del número "249"
        .add({
            targets: num249,
            opacity: [0, 1],
            scale: [0, 1.2, 1],
            rotate: '1turn',
            duration: 1400,
            offset: '-=800'
        })
        // 6. Revelar texto curvo inferior
        .add({
            targets: copernicoText,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutQuad',
            offset: '-=600',
            // Al terminar la introducción, activamos la animación continua
            complete: startContinuousAnimations
        });

    // --- Funciones para Animaciones Continuas y Coreografía ---

    function startContinuousAnimations() {
        if (isContinuousActive) return;

        // Limpiar animaciones previas si existen
        gearAnimations.forEach(anim => anim.pause());
        gearAnimations = [];

        // Animación continua de los engranajes en loop (velocidades diferentes)
        const gearLargeAnim = anime({
            targets: '.gear-large-group',
            rotation: '-1turn',
            duration: 4000,
            easing: 'linear',
            loop: true
        });
        gearAnimations.push(gearLargeAnim);

        const gearSmallAnim = anime({
            targets: '.gear-small-group',
            rotation: '1turn',
            duration: 2500, // Gira más rápido
            easing: 'linear',
            loop: true
        });
        gearAnimations.push(gearSmallAnim);

        isContinuousActive = true;
    }

    function stopContinuousAnimations() {
        gearAnimations.forEach(anim => anim.pause());
        isContinuousActive = false;
    }

    // --- Coreografía al Clic (Panel de Info y Efectos) ---
    shield.addEventListener('click', () => {
        if (introTimeline.completed && !introTimeline.reversed) {
            // Coreografía al hacer clic: 'Explotar' escudo, mostrar panel
            const clickTimeline = anime.timeline({
                easing: 'easeOutBack'
            });

            clickTimeline
                // 1. Pausar animaciones continuas
                .add({
                    targets: {}, // Dummy target
                    duration: 1,
                    complete: stopContinuousAnimations
                })
                // 2. 'Latido' del escudo y engranajes aceleran brevemente
                .add({
                    targets: shield,
                    scale: 1.1,
                    duration: 200,
                })
                .add({
                    targets: shield,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                })
                // 3. 'Explosión' controlada: elementos centrales se separan
                .add({
                    targets: '.gear-large-group',
                    translateX: 50,
                    duration: 600,
                    offset: '-=200'
                })
                .add({
                    targets: '.gear-small-group',
                    translateX: -50,
                    translateY: -30,
                    duration: 600,
                    offset: '-=600'
                })
                .add({
                    targets: [num249, copernicoText],
                    translateY: 40,
                    duration: 600,
                    offset: '-=600'
                })
                // 4. Stagger de letras IPET que se dispersan
                .add({
                    targets: ipetChars,
                    translateY: (el, i) => anime.random(-60, 60),
                    translateX: (el, i) => anime.random(-40, 40),
                    rotate: (el, i) => anime.random(-15, 15),
                    opacity: 0,
                    stagger: 80,
                    duration: 800,
                    easing: 'easeOutQuad',
                    offset: '-=600'
                })
                // 5. Animación del panel lateral desde abajo
                .add({
                    targets: infoPanel,
                    bottom: '5vh', // Sube a su posición final
                    duration: 1200,
                    easing: 'easeOutElastic(1, .6)',
                    offset: '-=400'
                })
                // 6. Staggering de los elementos de información dentro del panel
                .add({
                    targets: infoItems,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    stagger: 200,
                    duration: 1000,
                    delay: anime.stagger(150),
                    easing: 'easeOutQuad',
                    offset: '-=1000'
                });
            
            introTimeline.reverse(); // Preparar para revertir la intro
        } else if (introTimeline.completed && introTimeline.reversed) {
            // Coreografía de re-ensamblado al segundo clic
            const reassembleTimeline = anime.timeline({
                easing: 'easeOutCubic'
            });

            reassembleTimeline
                // 1. Ocultar panel lateral (reverse)
                .add({
                    targets: [infoPanel, ...infoItems],
                    bottom: '-100%',
                    opacity: 0,
                    duration: 1000,
                    easing: 'easeInOutCubic',
                })
                // 2. Elementos central de re-ensamblan (reverse explosion)
                .add({
                    targets: '.gear-large-group',
                    translateX: 0,
                    duration: 600,
                    offset: '-=600'
                })
                .add({
                    targets: '.gear-small-group',
                    translateX: 0,
                    translateY: 0,
                    duration: 600,
                    offset: '-=600'
                })
                .add({
                    targets: [num249, copernicoText],
                    translateY: 0,
                    duration: 600,
                    offset: '-=600'
                })
                // 3. Stagger de letras IPET regresando y reapareciendo
                .add({
                    targets: ipetChars,
                    translateX: 0,
                    translateY: 0,
                    rotate: 0,
                    opacity: [0, 1],
                    stagger: { from: 'center', amount: 300 }, // Desde el centro
                    duration: 1000,
                    easing: 'easeOutQuad',
                    offset: '-=600'
                })
                // 4. Volver a activar animaciones continuas
                .add({
                    targets: {}, 
                    duration: 1,
                    complete: startContinuousAnimations
                });

            introTimeline.reverse(); // Preparar para revertir
        }
    });
});
