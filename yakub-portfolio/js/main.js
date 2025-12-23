// Main initialization and data loading
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Load all data
    loadHeroData();
    loadAboutData();
    loadSkillsData();
    loadDjangoContent();
    loadContactData();
    
    // Initialize navigation and smooth scrolling
    initNavigation();
});

// Navigation and smooth scrolling
function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('glass-card');
            nav.classList.remove('py-4');
            nav.classList.add('py-2');
        } else {
            nav.classList.remove('glass-card');
            nav.classList.remove('py-2');
            nav.classList.add('py-4');
        }
    });
}

// Load hero data
async function loadHeroData() {
    try {
        const response = await fetch('data/hero.json');
        const data = await response.json();
        
        const heroContent = document.getElementById('heroContent');
        heroContent.innerHTML = `
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
                Hi, I'm <span class="gradient-text">${data.name}</span>
            </h1>
            <div class="typewriter text-xl md:text-2xl mb-8">
                ${data.title}
            </div>
            <p class="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                ${data.description}
            </p>
            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
                ${data.buttons.map(button => `
                    <a href="${button.href}" class="${button.class}">${button.text}</a>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error loading hero data:', error);
    }
}

// Load about data
async function loadAboutData() {
    try {
        const response = await fetch('data/about.json');
        const data = await response.json();
        
        const aboutContent = document.getElementById('aboutContent');
        aboutContent.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                <div class="glass-card p-8 rounded-2xl">
                    <h3 class="text-2xl font-bold mb-4 gradient-text">${data.journey.title}</h3>
                    ${data.journey.content.map(paragraph => `
                        <p class="text-gray-300 mb-6 ${paragraph.startsWith('"') ? 'italic' : ''}">
                            ${paragraph}
                        </p>
                    `).join('')}
                </div>
                
                <div class="glass-card p-8 rounded-2xl">
                    <h3 class="text-2xl font-bold mb-4 gradient-text">${data.whyChooseMe.title}</h3>
                    <div class="space-y-4">
                        ${data.whyChooseMe.points.map(point => `
                            <div class="flex items-start space-x-3">
                                <i class="${point.icon} text-cyan-400 mt-1"></i>
                                <div>
                                    <h4 class="font-semibold">${point.title}</h4>
                                    <p class="text-gray-300 text-sm">${point.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading about data:', error);
    }
}

// Load skills data
async function loadSkillsData() {
    try {
        const response = await fetch('data/skills.json');
        const data = await response.json();
        
        const skillsContent = document.getElementById('skillsContent');
        
        let delay = 200;
        skillsContent.innerHTML = data.categories.map((category, index) => {
            const isEven = index % 2 === 0;
            delay += 200;
            
            return `
                <div class="timeline-item animate__animated animate__fadeIn" 
                     data-aos="${isEven ? 'fade-right' : 'fade-left'}" 
                     data-aos-duration="800" 
                     data-aos-delay="${delay}">
                    <h3 data-aos="fade-up" data-aos-delay="${delay + 100}">${category.name}</h3>
                    <p>
                        ${category.skills.map((skill, skillIndex) => {
                            const skillDelay = delay + 100 + (skillIndex * 100);
                            return `
                                <span data-aos="${isEven ? 'zoom-in' : 'flip-left'}" 
                                      data-aos-duration="600" 
                                      data-aos-delay="${skillDelay}">
                                    <i class="${skill.icon} skill-icon"></i> ${skill.name}
                                </span>
                            `;
                        }).join('')}
                    </p>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading skills data:', error);
    }
}

// Load Django content
function loadDjangoContent() {
    const djangoContent = document.getElementById('djangoContent');
    djangoContent.innerHTML = `
        <div class="glass-card p-8 rounded-2xl mt-8">
            <p class="text-gray-300 mb-6">
                I have a strong understanding of Django, one of the most powerful Python frameworks for web development. Django is one of my favorite frameworks because it allows me to combine speed, security, and scalability in every project I create.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                    <h3 class="text-xl font-bold mb-4 gradient-text">What I Can Do</h3>
                    <ul class="text-gray-300 space-y-3">
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
                            <span>Build dynamic web applications using Django's MVC (MVT) architecture</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
                            <span>Work with Django ORM, admin panel, authentication systems, and REST APIs</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
                            <span>Integrate frontend frameworks like React or Vue with Django backend</span>
                        </li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-xl font-bold mb-4 gradient-text">Expertise</h3>
                    <ul class="text-gray-300 space-y-3">
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
                            <span>Handle database management, form processing, and user authentication systems efficiently</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
                            <span>Deploy Django projects and optimize them for performance and SEO</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-400 mr-2 mt-1"></i>
                            <span>Build scalable and secure web applications</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Load contact data
async function loadContactData() {
    try {
        const response = await fetch('data/contact.json');
        const data = await response.json();
        
        const contactContent = document.getElementById('contactContent');
        contactContent.innerHTML = `
            <div class="glass-card p-8 rounded-2xl mt-8">
                <p class="text-gray-300 text-center mb-8">
                    ${data.description}
                </p>
                
                <form class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="name" class="block text-gray-300 mb-2">Your Name</label>
                            <input type="text" id="name" class="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors">
                        </div>
                        <div>
                            <label for="email" class="block text-gray-300 mb-2">Your Email</label>
                            <input type="email" id="email" class="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors">
                        </div>
                    </div>
                    
                    <div>
                        <label for="subject" class="block text-gray-300 mb-2">Subject</label>
                        <input type="text" id="subject" class="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors">
                    </div>
                    
                    <div>
                        <label for="message" class="block text-gray-300 mb-2">Message</label>
                        <textarea id="message" rows="5" class="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"></textarea>
                    </div>
                    
                    <button type="submit" class="w-full bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg py-3 font-medium glow hover:opacity-90 transition-all">
                        Send Message
                    </button>
                </form>
                
                <div class="mt-8 pt-8 border-t border-gray-800">
                    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-envelope text-cyan-400"></i>
                            <span>${data.contactInfo.email}</span>
                        </div>
                        <div class="flex space-x-4">
                            ${data.contactInfo.social.map(social => `
                                <div class="social-icon">
                                    <i class="${social.icon} text-xl"></i>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading contact data:', error);
    }
}