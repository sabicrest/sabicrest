document.addEventListener('DOMContentLoaded', () => {
    const enrollBtn = document.getElementById('enroll-btn');
    const coursesGrid = document.getElementById('all-courses-grid');
    const mainCourseGrid = document.querySelector('section.bg-white .grid');
    const detailOverlay = document.getElementById('detail-overlay');
    const closeDetail = document.getElementById('close-detail');
    const categoryContainer = document.getElementById('category-filters');
    const searchInput = document.getElementById('course-search');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const contactForm = document.getElementById('contact-form');
    const submitContactBtn = document.getElementById('submit-contact');

    let currentCategory = 'All';
    let searchQuery = '';
    const EXCHANGE_RATE = 1600; // 1 USD = 1600 NGN (Market placeholder)

    // Generate 50 sample courses
    const categories = ['Design', 'Videography', 'Engineering', 'Marketing', 'Product', 'Finance', 'Data Science'];
    const toolsList = ['Figma', 'VS Code', 'Python', 'Jira', 'Tableau', 'Slack', 'React', 'Premiere Pro', 'DaVinci Resolve', 'After Effects'];
    const courses = Array.from({ length: 50 }, (_, i) => {
        const title = [
            'Product Strategy Masterclass',
            'UX Research Deep Dive',
            'Fullstack Development',
            'Quantitative Finance',
            'AI Prompt Engineering',
            'Brand Architecture',
            'Cinematography & Lighting',
            'Commercial Video Editing',
            'Documentary Storytelling'
        ][i % 9];
        
        return {
        id: i + 1,
        title: `${title} #${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        duration: `${Math.floor(Math.random() * 8) + 4} Weeks`,
        type: i % 2 === 0 ? 'Live Online' : 'Hybrid',
        priceUSD: Math.floor(Math.random() * 400) + 150,
        tools: [toolsList[i % toolsList.length], toolsList[(i + 2) % toolsList.length]],
        outcome: `Certified ${title.split(' ')[0]} Specialist`,
        internship: i % 3 === 0 ? 'Guaranteed 3-month internship' : 'Career placement support'
        };
    });

    function toggleDetail(show, courseId = null) {
        const isCoursesPage = !!document.getElementById('all-courses-grid');
        const coursesMain = document.querySelector('main');
        const pageHero = document.querySelector('main > .mb-16');
        const filterBar = document.querySelector('.flex.flex-col.md\\:flex-row.gap-6.mb-12');
        const grid = document.getElementById('all-courses-grid');

        if (show && courseId) {
            const course = courses.find(c => c.id === parseInt(courseId));
            renderCourseDetail(course);

            if (isCoursesPage) {
                // Transition to dynamic "page" view
                pageHero?.classList.add('hidden');
                filterBar?.classList.add('hidden');
                grid?.classList.add('hidden');
                detailOverlay.classList.remove('fixed', 'inset-0', 'bg-white/95', 'z-[110]');
                detailOverlay.classList.add('relative', 'min-h-screen', 'bg-white');
            } else {
                detailOverlay.classList.add('flex');
                document.body.style.overflow = 'hidden';
            }
            detailOverlay.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            if (isCoursesPage) {
                pageHero?.classList.remove('hidden');
                filterBar?.classList.remove('hidden');
                grid?.classList.remove('hidden');
                detailOverlay.classList.add('fixed', 'inset-0', 'bg-white/95', 'z-[110]');
                detailOverlay.classList.remove('relative', 'min-h-screen', 'bg-white');
            }
            detailOverlay.classList.add('hidden');
            detailOverlay.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    }

    function renderFilters() {
        if (!categoryContainer) return;
        const filterList = ['All', ...categories];
        categoryContainer.innerHTML = filterList.map(cat => `
            <button class="filter-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${currentCategory === cat ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}" 
                    data-category="${cat}">
                ${cat}
            </button>
        `).join('');

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentCategory = btn.dataset.category;
                renderFilters();
                renderCourses();
            });
        });
    }

    function renderCourses() {
        if (!coursesGrid) return;
        const filtered = courses.filter(course => {
            const matchesCategory = currentCategory === 'All' || course.category === currentCategory;
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        coursesGrid.innerHTML = filtered.map(course => `
            <div class="bento-card p-6 rounded-[2.5rem] hover:shadow-xl hover:shadow-zinc-200/50 hover:border-yellow-400/50 transition-all duration-500 group cursor-pointer flex flex-col h-full relative overflow-hidden" data-id="${course.id}">
                <div class="aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100 border border-gray-100">
                    <img src="https://source.unsplash.com/random/400x250?${course.category.toLowerCase()}" 
                         class="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="${course.title}">
                </div>
                <div class="flex justify-between items-center mb-3">
                    <span class="bg-yellow-400 text-black text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest">${course.category}</span>
                    <span class="text-zinc-400 text-[10px] font-bold uppercase tracking-tighter">${course.duration}</span>
                </div>
                <h4 class="text-zinc-900 font-bold text-lg leading-tight group-hover:text-yellow-600 transition-colors mb-2">${course.title}</h4>
                <p class="text-zinc-500 text-sm mb-4">${course.outcome}</p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${course.tools.map(tool => `<span class="bg-zinc-100 px-3 py-1 rounded-full text-xs font-medium text-zinc-600">${tool}</span>`).join('')}
                </div>

                <div class="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <span class="text-zinc-900 text-base font-extrabold">$${course.priceUSD.toLocaleString()}</span>
                    <span class="text-zinc-500 text-[10px] font-bold uppercase flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full ${course.type === 'Live Online' ? 'bg-green-500' : 'bg-blue-500'}"></span>
                        ${course.type}
                    </span>
                </div>
                <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
            </div>
        `).join('');
    }

    function renderCourseDetail(course) {
        const priceNGN = (course.priceUSD * EXCHANGE_RATE).toLocaleString();
        const detailContent = document.getElementById('detail-content');
        
        detailContent.innerHTML = `
            <div class="grid lg:grid-cols-3 gap-12">
                <div class="lg:col-span-2">
                    <span class="text-yellow-600 font-bold uppercase text-xs tracking-[0.2em] mb-4 block">${course.category}</span>
                    <h3 class="text-5xl font-extrabold text-zinc-900 tracking-tighter mb-6">${course.title}</h3>
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        <div class="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl">
                            <p class="text-[10px] uppercase font-bold text-zinc-400 mb-1">Duration</p>
                            <p class="font-bold text-zinc-900">${course.duration}</p>
                        </div>
                        <div class="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl">
                            <p class="text-[10px] uppercase font-bold text-zinc-400 mb-1">Format</p>
                            <p class="font-bold text-zinc-900">${course.type}</p>
                        </div>
                    </div>

                    <div class="space-y-8">
                        <section>
                            <h4 class="text-xl font-bold mb-3 italic">What you'll become</h4>
                            <p class="text-zinc-600 leading-relaxed">After completing this course, you will be a ${course.outcome}. You'll be equipped with the industry-standard frameworks needed to lead high-impact teams.</p>
                        </section>

                        <section>
                            <h4 class="text-xl font-bold mb-3 italic">Tools you'll master</h4>
                            <div class="flex flex-wrap gap-2">
                                ${course.tools.map(tool => `<span class="bg-zinc-100 px-4 py-2 rounded-xl text-sm font-medium">${tool}</span>`).join('')}
                            </div>
                        </section>

                        <section class="bg-yellow-50 p-8 rounded-[2rem] border border-yellow-100">
                            <h4 class="text-xl font-bold mb-2">The Sabicrest Edge</h4>
                            <p class="text-yellow-800">${course.internship}. We don't just teach; we place you in the industry.</p>
                        </section>
                    </div>
                </div>

                <div class="lg:col-span-1">
                    <div class="bg-white border border-zinc-200 p-8 rounded-[2.5rem] sticky top-8 shadow-2xl shadow-zinc-200/50">
                        <p class="text-[10px] uppercase font-bold text-zinc-400 mb-4 tracking-widest">Tuition Fee</p>
                        <div class="mb-6">
                            <p class="text-4xl font-extrabold text-zinc-900">$${course.priceUSD.toLocaleString()}</p>
                            <p class="text-zinc-400 text-sm mt-1">Approx. <span class="text-zinc-900 font-bold">₦${priceNGN}</span></p>
                        </div>
                        <a href="payment-success.html" class="block text-center w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all mb-4">Secure My Spot</a>
                        <p class="text-[10px] text-center text-zinc-400 uppercase font-bold">Next cohort starts in 12 days</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialize courses if on the courses page
    if (coursesGrid) {
        renderCourses();
        renderFilters();
    }

    // Event Listeners
    if (enrollBtn) {
        enrollBtn.addEventListener('click', () => {
            window.location.href = 'courses.html';
        });
    }

    if (closeDetail) {
        closeDetail.addEventListener('click', () => toggleDetail(false));
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderCourses();
        });
    }

    // Event delegation for course clicks
    document.addEventListener('click', (e) => {
        const card = e.target.closest('[data-id]');
        if (card) {
            toggleDetail(true, card.dataset.id);
        }
    });

    // Mobile Menu Toggle logic
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
            const isOpen = mobileMenu.classList.contains('is-open');
            
            if (isOpen) {
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // Switch to X icon
                document.body.style.overflow = 'hidden';
            } else {
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); // Switch back to Hamburger
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when links are clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                document.body.style.overflow = 'auto';
            });
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification show';
        toast.innerText = message;
        document.body.appendChild(toast);
        
        // Auto-remove after animation
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // Contact Form Logic
    if (submitContactBtn && contactForm) {
        submitContactBtn.addEventListener('click', () => {
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('border-red-500');
                    isValid = false;
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if (isValid) {
                const originalText = submitContactBtn.innerText;
                submitContactBtn.innerText = 'Sending...';
                submitContactBtn.disabled = true;

                // Simulate network request
                setTimeout(() => {
                    showToast('Message sent! We\'ll get back to you shortly.');
                    submitContactBtn.innerText = originalText;
                    submitContactBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }
        });
    }
});
