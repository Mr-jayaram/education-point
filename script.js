window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);


document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'f12'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect & ScrollSpy
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-links a');

    window.addEventListener('scroll', () => {
        // Header background toggle
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // ScrollSpy logic
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a small offset (150px) for early triggering when scrolling down
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Tab Switching Logic for "What You Will Master" Section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and hide all contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
                // Trigger reflow for animation
                void targetContent.offsetWidth;
                targetContent.style.animation = 'fadeIn 0.5s ease-out forwards';
            }
        });
    });

    // Scroll Reveal Animation via IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Initialize Splide AutoScroll for Mentors and Testimonials
    const splideOptions = {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        perPage: 3,
        gap: '2.5rem',
        arrows: false,
        pagination: false,
        autoScroll: {
            speed: 1.5,
            pauseOnHover: true,
            pauseOnFocus: false,
        },
        breakpoints: {
            1024: { perPage: 2 },
            768: { perPage: 1 }
        }
    };

    if (document.querySelector('#mentors-slider')) {
        new Splide('#mentors-slider', splideOptions).mount(window.splide.Extensions);
    }

    if (document.querySelector('#testimonials-slider')) {
        new Splide('#testimonials-slider', splideOptions).mount(window.splide.Extensions);
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const animationDuration = 2000; // 2 seconds

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');

                let startTime = null;
                const updateCount = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / animationDuration, 1);

                    // easeOutQuart for smooth deceleration
                    const easeProgress = 1 - Math.pow(1 - progress, 4);

                    counter.innerText = Math.floor(easeProgress * target);

                    if (progress < 1) {
                        window.requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };

                window.requestAnimationFrame(updateCount);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNav && mobileCloseBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        mobileCloseBtn.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Typewriter Effect for Hero Section
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const words = ['Get Placed.', 'Get Certified.', 'Get Hired.', 'Succeed.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2500; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing effect
        setTimeout(type, 1000); // Initial delay
    }
});

// Simple Keyframe animation added programmatically for tabs
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);
