/* =========================================================
   OUR STORY — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. BASIC SETTINGS
   ========================================================= */

const pages = document.querySelectorAll(".page");

let currentPage = 0;


/* =========================================================
   02. SHOW ONLY THE FIRST PAGE AT START
   ========================================================= */

function initializePages() {

    pages.forEach((page, index) => {

        if (index === 0) {

            page.style.display = "flex";

            page.style.opacity = "1";

            page.style.visibility = "visible";

        } else {

            page.style.display = "none";

            page.style.opacity = "0";

            page.style.visibility = "hidden";

        }

    });

}


/* =========================================================
   03. PAGE NAVIGATION
   ========================================================= */

function nextPage(pageId) {

    const targetPage = document.getElementById(pageId);

    if (!targetPage) {

        console.error("Page not found:", pageId);

        return;

    }


    const oldPage = pages[currentPage];


    /* Fade out old page */

    oldPage.style.opacity = "0";

    oldPage.style.transition = "opacity 0.5s ease";


    setTimeout(() => {

        oldPage.style.display = "none";

        oldPage.style.visibility = "hidden";


        /* Show new page */

        targetPage.style.display = "flex";

        targetPage.style.visibility = "visible";

        targetPage.style.opacity = "0";


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });


        setTimeout(() => {

            targetPage.style.transition =
                "opacity 0.8s ease";

            targetPage.style.opacity = "1";

        }, 50);


        /* Update current page */

        currentPage =
            Array.from(pages).indexOf(targetPage);


        /* Run page-specific functions */

        activatePage(targetPage.id);

    }, 500);

}


/* =========================================================
   04. PAGE-SPECIFIC ACTIONS
   ========================================================= */

function activatePage(pageId) {

    switch (pageId) {

        case "page3":

            resetJulyMemory();

            break;


        case "page4":

            resetRainMemory();

            break;


        case "page5":

            resetMemoryQuiz();

            break;


        case "page6":

            prepareBirthdayGallery();

            break;


        case "page9":

            initializeThenNow();

            break;


        case "page10":

            prepareCurrentGallery();

            break;


        case "page11":

            resetCoupleQuiz();

            break;


        case "page12":

            prepareFinalPage();

            break;

    }

}


/* =========================================================
   PAGE 2
   FIRST QUESTION
   ========================================================= */

const firstQuizOptions =
    document.querySelectorAll("#page2 .quiz-option");

const firstQuizMessage =
    document.querySelector("#page2 .quiz-message");


firstQuizOptions.forEach((option) => {

    option.addEventListener("click", function () {

        const isCorrect =
            this.classList.contains("correct");


        if (isCorrect) {

            firstQuizMessage.textContent =
                "You remembered. I knew you would. ♡";

            firstQuizMessage.style.color =
                "#8b3d55";


            this.style.background =
                "#8b3d55";

            this.style.color =
                "#ffffff";


            createHearts(8);

        } else {

            firstQuizMessage.textContent =
                "Hmm... think about the day we officially became us.";

            firstQuizMessage.style.color =
                "#c96f86";

        }

    });

});


/* =========================================================
   PAGE 3
   20 JULY MEMORY REVEAL
   ========================================================= */

const memoryCard =
    document.querySelector(".memory-card");

const julyGallery =
    document.querySelector(".july-gallery");


function resetJulyMemory() {

    if (!julyGallery) return;


    julyGallery.style.display = "none";

    julyGallery.style.opacity = "0";


    if (memoryCard) {

        memoryCard.style.cursor = "pointer";

        memoryCard.querySelector("p").textContent =
            "Tap to reveal the memory";

    }

}


if (memoryCard) {

    memoryCard.addEventListener("click", function () {

        if (!julyGallery) return;


        julyGallery.style.display = "grid";


        setTimeout(() => {

            julyGallery.style.transition =
                "opacity 1s ease";

            julyGallery.style.opacity = "1";

        }, 50);


        this.querySelector("p").textContent =
            "A little moment that became a memory.";


        this.style.transform =
            "scale(0.98)";


        setTimeout(() => {

            this.style.transform =
                "scale(1)";

        }, 250);

    });

}


/* =========================================================
   PAGE 4
   BRISHTI BILASH REVEAL
   ========================================================= */

const revealPhoto =
    document.querySelector(".reveal-photo");

const rainImage =
    revealPhoto
        ? revealPhoto.querySelector("img")
        : null;

const rainButton =
    revealPhoto
        ? revealPhoto.querySelector("button")
        : null;


function resetRainMemory() {

    if (!rainImage) return;


    rainImage.style.filter =
        "blur(12px)";

    rainImage.style.transform =
        "scale(1.03)";


    if (rainButton) {

        rainButton.style.display =
            "block";

        rainButton.textContent =
            "REVEAL MEMORY";

    }

}


if (rainButton) {

    rainButton.addEventListener("click", function () {

        rainImage.style.filter =
            "blur(0)";

        rainImage.style.transform =
            "scale(1)";


        this.style.opacity =
            "0";


        setTimeout(() => {

            this.style.display =
                "none";

        }, 500);


        createRainHearts();

    });

}


/* =========================================================
   PAGE 5
   MEMORY QUIZ
   ========================================================= */

const memoryQuizOptions =
    document.querySelectorAll("#page5 .quiz-option");

const memoryRevealButton =
    document.querySelector("#page5 .quiz + button");

const blurredMemory =
    document.querySelector(".blurred-memory");


let memoryQuizAnswered = false;


function resetMemoryQuiz() {

    memoryQuizAnswered = false;


    memoryQuizOptions.forEach((option) => {

        option.style.background = "";

        option.style.color = "";

    });


    if (blurredMemory) {

        blurredMemory.style.filter =
            "blur(8px)";

        blurredMemory.style.backgroundImage =
            "url('images/august.jpg')";

        blurredMemory.style.backgroundSize =
            "cover";

        blurredMemory.style.backgroundPosition =
            "center";

    }


    if (memoryRevealButton) {

        memoryRevealButton.textContent =
            "REVEAL";

    }

}


memoryQuizOptions.forEach((option) => {

    option.addEventListener("click", function () {

        /*
           Current correct answer:
           Option C = Our first Brishti Bilash

           Change this later if you want.
        */

        const correct =
            this.textContent.trim() ===
            "Our first Brishti Bilash";


        if (correct) {

            memoryQuizAnswered = true;

            this.style.background =
                "#8b3d55";

            this.style.color =
                "#ffffff";

        } else {

            this.style.background =
                "#e7a0b2";

            this.style.color =
                "#ffffff";

        }

    });

});


if (memoryRevealButton) {

    memoryRevealButton.addEventListener("click", function () {

        if (blurredMemory) {

            blurredMemory.style.filter =
                "blur(0)";

            blurredMemory.querySelector("p").textContent =
                "A memory worth remembering ♡";

        }


        this.textContent =
            "MEMORY REVEALED";

    });

}


/* =========================================================
   PAGE 6
   BIRTHDAY PHOTO REVEAL
   ========================================================= */

const birthdayPhotos =
    document.querySelectorAll(".birthday-photo");


function prepareBirthdayGallery() {

    birthdayPhotos.forEach((photo, index) => {

        photo.style.opacity = "0";

        photo.style.transform =
            "translateY(30px)";


        setTimeout(() => {

            photo.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            photo.style.opacity =
                "1";

            photo.style.transform =
                "translateY(0)";

        }, index * 300);

    });

}


/* =========================================================
   PAGE 7
   IMPORTANT QUESTION
   ========================================================= */

const importantQuizOptions =
    document.querySelectorAll("#page7 .quiz-option");

const importantQuizMessage =
    document.querySelector("#page7 .quiz-message");


importantQuizOptions.forEach((option) => {

    option.addEventListener("click", function () {

        const correct =
            this.classList.contains("correct");


        if (correct) {

            importantQuizMessage.textContent =
                "09 October 2023. The day we became US. ♡";


            importantQuizMessage.style.color =
                "#8b3d55";


            this.style.background =
                "#8b3d55";

            this.style.color =
                "#ffffff";


            createHearts(15);

        } else {

            importantQuizMessage.textContent =
                "Not quite... remember the date that changed everything.";

            importantQuizMessage.style.color =
                "#c96f86";

        }

    });

});


/* =========================================================
   PAGE 8
   ANNIVERSARY EFFECT
   ========================================================= */

const anniversaryPage =
    document.querySelector(".anniversary-page");


function anniversaryEffect() {

    if (!anniversaryPage) return;


    createHearts(20);

}


/* =========================================================
   PAGE 9
   THEN VS NOW
   ========================================================= */

const comparisonSlider =
    document.querySelector("#page9 .slider input");


const thenBox =
    document.querySelector("#page9 .then");

const nowBox =
    document.querySelector("#page9 .now");


function initializeThenNow() {

    if (!comparisonSlider) return;


    comparisonSlider.value = 50;

}


if (comparisonSlider) {

    comparisonSlider.addEventListener("input", function () {

        const value =
            Number(this.value);


        /*
           The slider changes the visual balance
           between THEN and NOW.
        */

        if (thenBox) {

            thenBox.style.flex =
                `${100 - value}`;

        }


        if (nowBox) {

            nowBox.style.flex =
                `${value}`;

        }

    });

}


/* =========================================================
   PAGE 10
   CURRENT PHOTOS
   ========================================================= */

const currentPhotos =
    document.querySelectorAll(".current-gallery img");


function prepareCurrentGallery() {

    currentPhotos.forEach((photo, index) => {

        photo.style.opacity = "0";

        photo.style.transform =
            "translateY(40px)";


        setTimeout(() => {

            photo.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            photo.style.opacity =
                "1";

            photo.style.transform =
                "translateY(0)";

        }, index * 350);

    });

}


/* =========================================================
   PAGE 11
   COUPLE QUIZ
   ========================================================= */

const coupleQuestions =
    document.querySelectorAll(".couple-question");


let coupleScore = 0;

let answeredQuestions = 0;


/*
   IMPORTANT:

   These are temporary answers.

   Later you can tell me the actual answers
   and I will change them.

   Example:
   question 1 = "You"
   question 2 = "Me"
   etc.
*/

const correctCoupleAnswers = [

    "You",

    "Me",

    "You",

    "Me"

];


function resetCoupleQuiz() {

    coupleScore = 0;

    answeredQuestions = 0;


    coupleQuestions.forEach((question, index) => {

        const buttons =
            question.querySelectorAll("button");


        buttons.forEach((button) => {

            button.style.background = "";

            button.style.color = "";

            button.disabled = false;

        });

    });

}


coupleQuestions.forEach((question, questionIndex) => {

    const buttons =
        question.querySelectorAll("button");


    buttons.forEach((button) => {

        button.addEventListener("click", function () {

            /*
               Prevent answering the same question twice.
            */

            if (this.disabled) return;


            buttons.forEach((btn) => {

                btn.disabled = true;

            });


            const answer =
                this.textContent.trim();


            const correctAnswer =
                correctCoupleAnswers[questionIndex];


            if (answer === correctAnswer) {

                coupleScore++;

                this.style.background =
                    "#8b3d55";

                this.style.color =
                    "#ffffff";

            } else {

                this.style.background =
                    "#d99aaa";

                this.style.color =
                    "#ffffff";

            }


            answeredQuestions++;


            if (answeredQuestions === coupleQuestions.length) {

                showCoupleScore();

            }

        });

    });

});


function showCoupleScore() {

    const message =
        document.createElement("p");


    message.id =
        "coupleScoreMessage";


    message.textContent =
        `You got ${coupleScore} / ${coupleQuestions.length} ♡`;


    message.style.margin =
        "30px auto";

    message.style.fontFamily =
        "Arial, sans-serif";

    message.style.fontSize =
        "15px";

    message.style.color =
        "#8b3d55";


    const container =
        document.querySelector("#page11 .page-content");


    const existing =
        document.querySelector("#coupleScoreMessage");


    if (existing) {

        existing.remove();

    }


    container.appendChild(message);


    createHearts(10);

}


/* =========================================================
   PAGE 12
   FINAL PAGE
   ========================================================= */

function prepareFinalPage() {

    createHearts(12);

}


/* =========================================================
   MUSIC SYSTEM
   ========================================================= */


/*
   Put your selected song here:

   Create a folder:

   audio/

   Then put your song inside it as:

   song.mp3

   Final path:

   audio/song.mp3
*/


let music = null;

let musicStarted = false;


function createMusic() {

    if (music) return;


    music =
        new Audio("audio/song.mp3");


    music.loop = true;

    music.volume = 0.65;

}


const playSongButton =
    document.getElementById("playSong");


if (playSongButton) {

    playSongButton.addEventListener("click", function () {

        createMusic();


        if (!musicStarted) {

            music.play()
                .then(() => {

                    musicStarted = true;

                    playSongButton.textContent =
                        "PAUSE OUR SONG";

                })
                .catch((error) => {

                    console.log(
                        "Music could not start:",
                        error
                    );

                    playSongButton.textContent =
                        "SONG FILE NOT FOUND";

                });

        } else {

            if (music.paused) {

                music.play();

                playSongButton.textContent =
                    "PAUSE OUR SONG";

            } else {

                music.pause();

                playSongButton.textContent =
                    "PLAY OUR SONG";

            }

        }

    });

}


/* =========================================================
   HEART PARTICLES
   ========================================================= */

function createHearts(number = 10) {

    for (let i = 0; i < number; i++) {

        const heart =
            document.createElement("div");


        heart.innerHTML = "♡";


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() * 100 + "vw";


        heart.style.bottom =
            "-30px";


        heart.style.fontSize =
            (12 + Math.random() * 20) + "px";


        heart.style.color =
            "#c96f86";


        heart.style.zIndex =
            "9999";


        heart.style.pointerEvents =
            "none";


        heart.style.opacity =
            "0.85";


        heart.style.transition =
            "transform 4s ease, opacity 4s ease";


        document.body.appendChild(heart);


        setTimeout(() => {

            heart.style.transform =
                `translateY(-${window.innerHeight + 100}px)
                 rotate(${Math.random() * 360}deg)`;


            heart.style.opacity =
                "0";

        }, 50);


        setTimeout(() => {

            heart.remove();

        }, 4500);

    }

}


/* =========================================================
   SMALL RAIN / LOVE EFFECT
   ========================================================= */

function createRainHearts() {

    for (let i = 0; i < 12; i++) {

        const drop =
            document.createElement("div");


        drop.innerHTML = "♡";


        drop.style.position =
            "fixed";


        drop.style.top =
            "-30px";


        drop.style.left =
            Math.random() * 100 + "vw";


        drop.style.color =
            "rgba(255,255,255,0.8)";


        drop.style.fontSize =
            "18px";


        drop.style.zIndex =
            "9999";


        drop.style.pointerEvents =
            "none";


        drop.style.transition =
            "transform 2s linear, opacity 2s linear";


        document.body.appendChild(drop);


        setTimeout(() => {

            drop.style.transform =
                `translateY(${window.innerHeight + 100}px)`;


            drop.style.opacity =
                "0";

        }, 50);


        setTimeout(() => {

            drop.remove();

        }, 2300);

    }

}


/* =========================================================
   KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener("keydown", function (event) {

    /*
       Right arrow = next page
    */

    if (event.key === "ArrowRight") {

        const nextIndex =
            currentPage + 1;


        if (nextIndex < pages.length) {

            nextPage(
                pages[nextIndex].id
            );

        }

    }


    /*
       Left arrow = previous page

       We intentionally keep this simple.
    */

    if (event.key === "ArrowLeft") {

        const previousIndex =
            currentPage - 1;


        if (previousIndex >= 0) {

            nextPage(
                pages[previousIndex].id
            );

        }

    }

});


/* =========================================================
   START EVERYTHING
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializePages();

});
