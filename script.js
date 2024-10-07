// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Intersection Observer for section visibility
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Update active nav link
                updateActiveNavLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Function to update active navigation link
    function updateActiveNavLink(sectionId) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Typing animation for the subtitle
    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriter(element, text, i + 1), 100);
        }
    }

    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const textToType = typingElement.textContent;
        typingElement.textContent = '';
        setTimeout(() => typeWriter(typingElement, textToType), 1000);
    }

    // Add skill icons dynamically
    const skillIcons = [
        { name: 'HTML5', class: 'fab fa-html5' },
        { name: 'CSS3', class: 'fab fa-css3-alt' },
        { name: 'JavaScript', class: 'fab fa-js' },
        { name: 'React', class: 'fab fa-react' },
        { name: 'Python', class: 'fab fa-python' },
        { name: 'Java', class: 'fab fa-java' },
        { name: 'Git', class: 'fab fa-git-alt' },
        { name: 'AI/ML', class: 'fas fa-brain' }
    ];

    const skillIconsContainer = document.querySelector('.skill-icons');
    if (skillIconsContainer) {
        skillIcons.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill-icon rotating-border';
            skillDiv.innerHTML = `
                <i class="${skill.class}"></i>
                <span>${skill.name}</span>
            `;
            skillIconsContainer.appendChild(skillDiv);
        });
    }

    // Add glowing border to section titles on hover
    document.querySelectorAll('.section-title').forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.classList.add('glowing-border');
        });
        title.addEventListener('mouseleave', () => {
            title.classList.remove('glowing-border');
        });
    });

    // Add flip animation to internship cards on click
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('flip-card-animation');
            setTimeout(() => {
                card.classList.remove('flip-card-animation');
            }, 1000);
        });
    });

    // Initialize AOS animation library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        scrollProgress.style.width = `${scrollPercentage}%`;
    });
});
