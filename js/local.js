document.addEventListener("DOMContentLoaded", function() {
    // --- Navigation active state logic ---
    const links = document.querySelectorAll('.scrolly');
    const sections = document.querySelectorAll('section');

    function updateActiveLink() {
        let index = sections.length;
        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
        links.forEach(link => link.classList.remove('active'));
        if (links[index]) links[index].classList.add('active');
    }

    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(lnk => lnk.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', updateActiveLink);


    // --- Language toggle & logo logic ---
    const toggleButton = document.getElementById('langToggle');
    const logo = document.getElementById('logo');

    let currentLang = localStorage.getItem('lang');
    if (!currentLang) {
        const browserLang = navigator.language || navigator.userLanguage;
        currentLang = browserLang.startsWith('zh') ? 'zh' : 'en';
    }

    function setLanguage(lang) {
        // Text content swap
        document.querySelectorAll('.lang').forEach(el => {
      el.innerHTML = el.getAttribute(`data-${lang}`); // ← render HTML, not text
      el.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    });

        // Logo swap (with alt text)
        if (logo) {
            const src = logo.getAttribute(`data-${lang}`);
            if (src) logo.src = src;
            const alt = logo.getAttribute(`data-alt-${lang}`);
            if (alt) logo.alt = alt;
        }

        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
    }

    // Toggle language on button click
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'zh' : 'en';
            setLanguage(currentLang);
        });
    }

    // Initialize on load
    setLanguage(currentLang);
});
