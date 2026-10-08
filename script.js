/* ============================================================
   OUR STORY — MAIN JAVASCRIPT
============================================================ */


/* ============================================================
   GLOBAL VARIABLES
============================================================ */

let currentPage = 1;
const totalPages = 14;

let musicStarted = false;
let coupleCurrent = 1;
let coupleFinished = false;


/* ============================================================
   ELEMENTS
============================================================ */

const pages = document.querySelectorAll(".page");

const bgMusic = document.getElementById("bgMusic");

const floatingMusicBtn =
    document.getElementById("floatingMusicBtn");

const musicIcon =
    document.getElementById("musicIcon");

const musicText =
    document.getElementById("musicText");

const pageIndicator =
    document.getElementById("pageIndicator");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


/* ============================================================
   START WEBSITE + MUSIC
============================================================ */

function startStory() {

    startMusic();

    nextPage();
}


/* ============================================================
   MUSIC SYSTEM
============================================================ */

function startMusic() {

    if (musicStarted) {
        return;
    }

    bgMusic.volume = 0.65;

    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;

                updateMusicUI();

                floatingMusicBtn.classList.remove("hidden");

            })
            .catch(() => {

                /*
                    Browser autoplay rules may block audio
                    until the user interacts with the page.
                */

                musicStarted = false;

                updateMusicUI();

            });
    }
}


function toggleMusic() {

    if (bgMusic.paused) {

        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    musicStarted = true;

                    floatingMusicBtn.classList.remove("hidden");

                    updateMusicUI();

                })
                .catch(() => {

                    console.log("Music playback was blocked.");

                });

        }

    } else {

        bgMusic.pause();

        updateMusicUI();
    }
}


function updateMusicUI() {

    if (bgMusic.paused) {

        musicIcon.textContent = "♫";
        musicText.textContent = "Play Music";

    } else {

        musicIcon.textContent = "Ⅱ";
        musicText.textContent = "Music On";

    }

}


/* ============================================================
   PAGE NAVIGATION
============================================================ */

function showPage(number) {

    if (number < 1) {
        number = 1;
    }

    if (number > totalPages) {
        number = totalPages;
    }

    currentPage = number;

    pages.forEach((page, index) => {

        if (index === currentPage - 1) {

            page.classList.add("active");

        } else {

            page.classList.remove("active");

        }

    });

    updateNavigation();

    updatePageIndicator();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    /*
        Special behavior for page 5.
    */

    if (currentPage !== 5) {

        const rainPage = document.getElementById("page5");

        if (rainPage) {
            rainPage.classList.remove("raining");
        }

    }
}


function nextPage() {

    if (currentPage < totalPages) {

        showPage(currentPage + 1);

    }

}


function previousPage() {

    if (currentPage > 1) {

        showPage(currentPage - 1);

    }

}


function updatePageIndicator() {

    const current =
        String(currentPage).padStart(2, "0");

    const total =
        String(totalPages).padStart(2, "0");

    pageIndicator.textContent =
        `${current} / ${total}`;
}


function updateNavigation() {

    if (currentPage <= 1) {

        prevBtn.classList.add("hidden");

    } else {

        prevBtn.classList.remove("hidden");

    }


    /*
        Hide global next button on special pages
        where the user should use the page's own button.
    */

    const hideGlobalNext =
        currentPage === 1 ||
        currentPage === 13 ||
        currentPage === 14;

    if (hideGlobalNext) {

        nextBtn.classList.add("hidden");

    } else {

        nextBtn.classList.remove("hidden");

    }

}


/* ============================================================
   GENERIC QUIZ SYSTEM
============================================================ */

function checkAnswer(button, type, resultId) {

    const parent =
        button.parentElement;

    const buttons =
        parent.querySelectorAll("button");

    buttons.forEach(btn => {

        btn.disabled = true;

    });


    const result =
        document.getElementById(resultId);


    if (type === 1) {

        button.classList.add("correct");

        result.innerHTML =
            "You remembered. ♡";

        showRelatedNextButton(resultId);

        createHearts(5);

    } else {

        button.classList.add("wrong");

        result.innerHTML =
            "Not quite. The correct answer is the other memory. ♡";

        /*
            Find correct option by checking onclick code.
        */

        buttons.forEach(btn => {

            const code =
                btn.getAttribute("onclick");

            if (
                code &&
                code.includes("checkAnswer(this, 1")
            ) {

                btn.classList.add("correct");

            }

        });

        showRelatedNextButton(resultId);

    }

}


function showRelatedNextButton(resultId) {

    if (resultId === "page2-result") {

        document
            .getElementById("page2-next")
            .classList.remove("hidden");

    }

    if (resultId === "page4-result") {

        document
            .getElementById("page4-next")
            .classList.remove("hidden");

    }

    if (resultId === "page7-result") {

        document
            .getElementById("page7-next")
            .classList.remove("hidden");

    }

    if (resultId === "page9-result") {

        document
            .getElementById("page9-next")
            .classList.remove("hidden");

    }

}


/* ============================================================
   PAGE 3 — FIRST MEETING MINI QUIZ
============================================================ */

function miniQuiz(button, correct) {

    const parent =
        button.parentElement;

    const buttons =
        parent.querySelectorAll("button");

    buttons.forEach(btn => {

        btn.disabled = true;

    });

    const result =
        parent.parentElement.querySelector(".mini-result");


    if (correct) {

        button.style.background =
            "rgba(182,223,191,0.9)";

        result.textContent =
            "Exactly. You remembered. ♡";

        createHearts(4);

    } else {

        button.style.background =
            "rgba(235,181,195,0.9)";

        result.textContent =
            "The correct answer was: We had planned to meet after a Chemistry exam.";

        buttons.forEach(btn => {

            if (
                btn.textContent.includes(
                    "planned to meet after a Chemistry exam"
                )
            ) {

                btn.style.background =
                    "rgba(182,223,191,0.9)";

            }

        });

    }

}


/* ============================================================
   PHOTO REVEAL
============================================================ */

function revealPhoto(element) {

    if (!element.classList.contains("hidden-photo")) {
        return;
    }

    element.classList.add("revealed");

    createHearts(2);

}


/* ============================================================
   RAIN MEMORY REVEAL
============================================================ */

function revealRainMemory(element) {

    element.classList.add("revealed");

    const rainPage =
        document.getElementById("page5");

    rainPage.classList.add("raining");

    createHearts(5);

    setTimeout(() => {

        rainPage.classList.remove("raining");

    }, 7000);

}


/* ============================================================
   SECRET MEMORY REVEAL
============================================================ */

function openSecretMemory() {

    const envelope =
        document.querySelector(".secret-envelope");

    const reveal =
        document.getElementById("secretReveal");


    envelope.classList.add("opened");


    setTimeout(() => {

        reveal.classList.add("show");

        createHearts(8);

    }, 750);

}


/* ============================================================
   COUPLE QUIZ
============================================================ */

const coupleAnswers = {

    1: "mihi",
    2: "labib",
    3: "mihi",
    4: "mihi",
    5: "labib",
    6: "mihi",
    7: "mihi",
    8: "labib"

};


function coupleAnswer(questionNumber, answer, button) {

    const question =
        document.querySelector(
            `.couple-question[data-question="${questionNumber}"]`
        );


    if (
        question.dataset.answered === "true"
    ) {
        return;
    }


    question.dataset.answered = "true";


    const buttons =
        question.querySelectorAll("button");


    buttons.forEach(btn => {

        btn.disabled = true;

    });


    const feedback =
        question.querySelector(".couple-feedback");


    const correct =
        coupleAnswers[questionNumber];


    if (answer === correct) {

        button.classList.add(
            "selected-correct"
        );

        feedback.textContent =
            "You know us. ♡";

        createHearts(4);

    } else {

        button.classList.add(
            "selected-wrong"
        );

        feedback.textContent =
            `Not quite — the answer is ${capitalize(correct)}. ♡`;


        buttons.forEach(btn => {

            if (
                btn.textContent
                    .trim()
                    .toLowerCase() === correct
            ) {

                btn.classList.add(
                    "selected-correct"
                );

            }

        });

    }


    /*
        Move to next question after a short pause.
    */

    setTimeout(() => {

        moveToNextCoupleQuestion();

    }, 1100);

}


function moveToNextCoupleQuestion() {

    const current =
        document.querySelector(
            `.couple-question[data-question="${coupleCurrent}"]`
        );

    if (current) {
        current.classList.remove("active-couple");
    }


    coupleCurrent++;


    if (coupleCurrent > 8) {

        finishCoupleQuiz();

        return;

    }


    const next =
        document.querySelector(
            `.couple-question[data-question="${coupleCurrent}"]`
        );


    if (next) {

        next.classList.add("active-couple");

    }


    updateCoupleProgress();

}


function updateCoupleProgress() {

    const progress =
        document.getElementById("coupleProgress");

    if (coupleCurrent <= 8) {

        progress.textContent =
            `Question ${coupleCurrent} of 8`;

    }

}


function finishCoupleQuiz() {

    coupleFinished = true;

    document
        .getElementById("coupleProgress")
        .textContent =
        "8 of 8 complete";

    document
        .getElementById("coupleFinal")
        .style.display = "block";

    createHearts(12);

}


/* ============================================================
   HELPER
============================================================ */

function capitalize(text) {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase()
        + text.slice(1);

}


/* ============================================================
   HEART EFFECT
============================================================ */

function createHearts(count = 5) {

    for (let i = 0; i < count; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.className = "heart";

            heart.textContent = "♥";

            heart.style.left =
                `${Math.random() * 100}vw`;

            heart.style.fontSize =
                `${12 + Math.random() * 18}px`;

            heart.style.animationDuration =
                `${5 + Math.random() * 4}s`;

            heart.style.setProperty(
                "--drift",
                `${-70 + Math.random() * 140}px`
            );


            document.body.appendChild(heart);


            setTimeout(() => {

                heart.remove();

            }, 10000);

        }, i * 170);

    }

}


/* ============================================================
   BACKGROUND HEARTS
============================================================ */

function createBackgroundHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart";

    heart.textContent = "♡";

    heart.style.left =
        `${Math.random() * 100}vw`;

    heart.style.fontSize =
        `${10 + Math.random() * 14}px`;

    heart.style.opacity =
        "0.25";

    heart.style.animationDuration =
        `${8 + Math.random() * 6}s`;

    heart.style.setProperty(
        "--drift",
        `${-80 + Math.random() * 160}px`
    );


    document
        .querySelector(".background-hearts")
        .appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 15000);

}


/* ============================================================
   KEYBOARD NAVIGATION
============================================================ */

document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {

        nextPage();

    }

    if (event.key === "ArrowLeft") {

        previousPage();

    }

    if (event.code === "Space") {

        /*
            Prevent space from scrolling the page.
        */

        event.preventDefault();

        toggleMusic();

    }

});


/* ============================================================
   CLICK CURRENT PHOTO TO FLIP ON MOBILE
============================================================ */

document
    .querySelectorAll(".flip-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const inner =
                card.querySelector(".flip-card-inner");

            const current =
                inner.style.transform;


            if (
                current === "rotateY(180deg)"
            ) {

                inner.style.transform =
                    "rotateY(0deg)";

            } else {

                inner.style.transform =
                    "rotateY(180deg)";

            }

        });

    });


/* ============================================================
   TOUCH / SWIPE NAVIGATION
============================================================ */

let touchStartX = 0;
let touchEndX = 0;


document.addEventListener("touchstart", event => {

    touchStartX =
        event.changedTouches[0].screenX;

});


document.addEventListener("touchend", event => {

    touchEndX =
        event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;


    /*
        Ignore tiny movements.
    */

    if (Math.abs(distance) < 70) {
        return;
    }


    if (distance < 0) {

        nextPage();

    } else {

        previousPage();

    }

}


/* ============================================================
   INITIAL SETUP
============================================================ */

showPage(1);

updateMusicUI();

updatePageIndicator();

updateNavigation();


/* ============================================================
   BACKGROUND HEART LOOP
============================================================ */

setInterval(() => {

    createBackgroundHeart();

}, 2600);
