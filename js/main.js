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
       2. Hero Artworks Slider (CMS 연동: hero-slides.json)
       ========================================== */
    const sliderContainer = document.querySelector('.slider-container');
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    if (sliderContainer) {
        fetch('./content/hero-slides.json')
            .then(response => response.json())
            .then(data => {
                const artSlides = data.slides || [];
                if (artSlides.length === 0) return;

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
            })
            .catch(error => console.error('Hero slides load error:', error));
    }

    /* ==========================================
       3. Exhibitions Carousel (CMS 연동: exhibitions.json)
       ========================================== */
    const exhibitionTrack = document.querySelector('.exhibition-track');

    if (exhibitionTrack) {
        fetch('./content/exhibitions.json')
            .then(response => response.json())
            .then(data => {
                const exhibitions = data.items || [];
                if (exhibitions.length === 0) return;

                exhibitionTrack.innerHTML = '';

                exhibitions.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'exhibition-card';

                    card.innerHTML = `
                        <img src="${item.image}" alt="${item.title}">
                        <div class="exhibition-info">
                            <span>${item.badge}</span>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    `;
                    exhibitionTrack.appendChild(card);
                });
            })
            .catch(error => console.error('Exhibitions load error:', error));
    }

    /* ==========================================
       4. Exhibition Carousel Scroll Buttons
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