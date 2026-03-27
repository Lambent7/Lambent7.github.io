import { myProjects, Project } from './projects.js';

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("project-grid");
    const sidebar = document.getElementById('filter-sidebar');
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.getElementById('close-sidebar');
    const sortDateBtn = document.getElementById('sort-date');
    const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');

    let activeFilters: string[] = [];
    let isDateDescending = true;

    if (!gridContainer) return;

    // --- 1. render func ---
    function renderProjects() {
        // filter for active checkboxes
        let displayProjects = myProjects;
        
        if (activeFilters.length > 0) {
            displayProjects = myProjects.filter(project => 
                project.filters.some(f => activeFilters.includes(f))
            );
        }

        // then sort based on current state
        displayProjects.sort((a, b) => {
            const timeA = a.datePosted.getTime();
            const timeB = b.datePosted.getTime();
            return isDateDescending ? timeB - timeA : timeA - timeB;
        });

        // generate HTML
        gridContainer!.innerHTML = displayProjects.map(project => {
            const tagsHTML = project.filters.map(tag => `<span class="filter-tag">${tag}</span>`).join('');
            const videoClass = project.videoPath ? 'has-video' : '';
            const starHTML = project.isFavorite ? `<i data-lucide="sparkle" class="favorite-star"></i>` : '';
            
            const mediaHTML = project.videoPath 
                ? `<video src="${project.videoPath}" loop muted playsinline></video>
                   <img src="${project.imagePath}" alt="${project.title}">`
                : `<img src="${project.imagePath}" alt="${project.title}">`;

            return `
                <a href="${project.url}" class="project-tile ${videoClass}" target="_blank">
                    <div class="media-container">${mediaHTML}</div>
                    <div class="tile-content">
                        <div class="tile-header"><h3>${project.title}</h3>${starHTML}</div>
                        <p>${project.description}</p>
                        <div class="filters-wrapper">${tagsHTML}</div>
                    </div>
                </a>
            `;
        }).join('');

        // reload lucide
        // @ts-ignore
        lucide.createIcons();
        attachVideoHoverListeners();
    }

    // --- filter logic ---
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.checked) {
                activeFilters.push(target.value);
            } else {
                activeFilters = activeFilters.filter(f => f !== target.value);
            }
            renderProjects(); // re-render
        });
    });

    // --- sidebar and sort ---
    openBtn?.addEventListener('click', () => sidebar?.classList.add('open'));
    closeBtn?.addEventListener('click', () => sidebar?.classList.remove('open'));

    sortDateBtn?.addEventListener('click', () => {
        isDateDescending = !isDateDescending;
        const icon = document.getElementById('sort-icon');
        if (icon) {
            icon.setAttribute('data-lucide', isDateDescending ? 'chevron-down' : 'chevron-up');
        }
        renderProjects();
    });

    // video listener
    function attachVideoHoverListeners() {
        document.querySelectorAll('.project-tile').forEach(tile => {
            const video = tile.querySelector('video') as HTMLVideoElement | null;
            if (video) {
                tile.addEventListener('mouseenter', () => video.play().catch(() => {}));
                tile.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
            }
        });
    }

    // initialize
    renderProjects();
    // @ts-ignore
    lucide.createIcons(); 
});