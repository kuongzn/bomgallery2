document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. Mobile Navigation Toggle
       ========================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* ==========================================
       2. Hero 6 Artworks Slider (Ken Burns)
       ========================================== */
    const sliderContainer = document.querySelector('.slider-container');
    
    // 실제 갤러리 작품 데이터 연동
    const artSlides = [
        {
            img: 'img/artworks/art-01.jpg',
            artist: 'Noriko Yamamoto',
            title: 'Featured Artwork 01'
        },
        {
            img: 'img/artworks/art-02.jpg',
            artist: 'Bomi Ko',
            title: 'Featured Artwork 02'
        },
        {
            img: 'img/artworks/art-03.jpg',
            artist: 'Dasha Silkova',
            title: 'Featured Artwork 03'
        },
        {
            img: 'img/artworks/art-04.jpg',
            artist: 'Gaesook Yang',
            title: 'Featured Artwork 04'
        },
        {
            img: 'img/artworks/art-05.jpg',
            artist: 'Irene YK Cha',
            title: 'Featured Artwork 05'
        },
        {
            img: 'img/artworks/art-06.jpg',
            artist: 'William Lottering',
            title: 'Featured Artwork 06'
        }
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    if (sliderContainer && artSlides.length > 0) {
        const shuffledSlides = shuffleArray([...artSlides]);
        let currentSlideIndex = 0;

        function renderSlide(index) {
            sliderContainer.innerHTML = '';
            const slideData = shuffledSlides[index];

            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide active';

            const imgEl = document.createElement('img');
            imgEl.src = slideData.img;
            imgEl.alt = slideData.title;

            slideDiv.appendChild(imgEl);
            sliderContainer.appendChild(slideDiv);

            const artistEl = document.querySelector('.caption-artist');
            const titleEl = document.querySelector('.caption-title');
            if (artistEl) artistEl.textContent = slideData.artist;
            if (titleEl) titleEl.textContent = slideData.title;
        }

        renderSlide(currentSlideIndex);

        // 5초마다 슬라이드 자동 전환
        setInterval(() => {
            currentSlideIndex = (currentSlideIndex + 1) % shuffledSlides.length;
            renderSlide(currentSlideIndex);
        }, 5000);
    }

    /* ==========================================
       3. Exhibition Carousel Scroll Buttons
       ========================================== */
    const carouselWrapper = document.querySelector('.exhibition-carousel-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carouselWrapper && prevBtn && nextBtn) {
        const scrollAmount = 460;

        prevBtn.addEventListener('click', () => {
            carouselWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            carouselWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});