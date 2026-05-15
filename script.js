document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
    });
});

// Gallery Data (Mapping to your uploaded photos)
// Note to User: Save your photos in the 'images' folder with these names!
const galleries = {
    'repair': {
        title: 'AC Servicing & Repairing',
        images: [
            'images/media__1778820498887.png',
            'images/media__1778820507044.png',
            'images/media__1778820511434.png',
            'images/media__1778821376025.png'
        ]
    },
    'second-hand': {
        title: 'Second-Hand AC Sales',
        images: [
            'images/media__1778820601241.png',
            'images/media__1778820612108.png',
            'images/media__1778821389445.png',
            'images/media__1778821451390.png',
            'images/media__1778821464624.png',
            'images/media__1778821495418.png'
        ]
    },
    'new': {
        title: 'New AC Sales',
        images: [
            'images/media__1778821321752.png',
            'images/media__1778821328153.png',
            'images/media__1778821335027.png',
            'images/media__1778821505841.png',
            'images/media__1778821561548.png'
        ]
    }
};

let currentGallery = [];
let currentIndex = 0;

function openGallery(category) {
    const modal = document.getElementById('galleryModal');
    const modalTitle = document.getElementById('modalTitle');
    const data = galleries[category];
    
    if (data && data.images.length > 0) {
        currentGallery = data.images;
        currentIndex = 0;
        
        modalTitle.textContent = data.title;
        updateModalContent();
        
        // Show modal
        modal.style.display = 'flex';
        // Add a small delay for the transition to take effect
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function changeImage(direction) {
    currentIndex += direction;
    
    if (currentIndex >= currentGallery.length) {
        currentIndex = 0; // Loop back to start
    } else if (currentIndex < 0) {
        currentIndex = currentGallery.length - 1; // Loop to end
    }
    
    updateModalContent();
}

function updateModalContent() {
    const imgElement = document.getElementById('modalImage');
    const dotsContainer = document.getElementById('modalDots');
    
    // Set Image
    imgElement.style.opacity = 0;
    
    setTimeout(() => {
        imgElement.src = currentGallery[currentIndex];
        // Set up fallback if image fails to load
        imgElement.onerror = function() {
            // Find the nearest unsplash fallback in the array or use a default
            const fallback = currentGallery.find(src => src.includes('unsplash.com'));
            if(fallback && this.src !== fallback) {
                this.src = fallback;
            }
        };
        imgElement.style.opacity = 1;
    }, 150);
    
    // Set Dots
    dotsContainer.innerHTML = '';
    currentGallery.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === currentIndex ? 'active' : ''}`;
        dot.onclick = () => {
            currentIndex = index;
            updateModalContent();
        };
        dotsContainer.appendChild(dot);
    });
}

// Close modal when clicking outside the content
window.onclick = function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target === modal) {
        closeGallery();
    }
}
