// const container = document.querySelector('.trip-details');
// const btnNext = document.getElementById('next');
// const btnPrev = document.getElementById('prev');

// // width of one “slide” (child) – here each is exactly container.clientWidth
// const slideWidth = () => container.clientWidth;

// btnNext.addEventListener('click', () => {
//     container.scrollBy({
//         left: slideWidth(),
//         behavior: 'smooth'
//     });
// });

// btnPrev.addEventListener('click', () => {
//     container.scrollBy({
//         left: -slideWidth(),
//         behavior: 'smooth'
//     });
// });

const carousel = document.querySelector('.carousel');
const track = carousel.querySelector('.track');
const slides = Array.from(track.children);
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Clone first & last, append/prepend
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.append(firstClone);
track.prepend(lastClone);

// Re-fetch slides (now with clones)
const allSlides = Array.from(track.children);
let index = 1;  // start at the real first slide
let width = carousel.clientWidth;

// Position track to show slide #1
track.style.transform = `translateX(-${width * index}px)`;

// On window resize, recalc width & reposition
window.addEventListener('resize', () => {
    width = carousel.clientWidth;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${width * index}px)`;
    // force reflow then restore transition
    track.getBoundingClientRect();
    track.style.transition = '';
});

function moveTo(idx) {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${width * idx}px)`;
}

nextBtn.addEventListener('click', () => {
    if (index >= allSlides.length - 1) return;
    index++;
    moveTo(index);
});

prevBtn.addEventListener('click', () => {
    if (index <= 0) return;
    index--;
    moveTo(index);
});

// When the slide transition ends, check for clones
track.addEventListener('transitionend', () => {
    // jumped past last real slide?
    if (allSlides[index] === firstClone) {
        track.style.transition = 'none';    // remove animation
        index = 1;                          // reset to real first
        track.style.transform = `translateX(-${width * index}px)`;
    }
    // jumped before first real slide?
    if (allSlides[index] === lastClone) {
        track.style.transition = 'none';
        index = allSlides.length - 2;       // reset to real last
        track.style.transform = `translateX(-${width * index}px)`;
    }
});