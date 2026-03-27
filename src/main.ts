import { myProjects, Project } from './projects';

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("project-grid");
    if (!gridContainer) return;

    // --- 1. Render Function ---
    // We wrap this in a function so we can call it again every time we sort
    function renderProjects() {
        function createTileHTML(project: Project): string {
            const tagsHTML = project.filters.map(tag => `<span class="filter-tag">${tag}</span>`).join('');
            const mediaHTML = project.videoPath 
                ? `<video src="${project.videoPath}" loop muted playsinline></video>
                   <img src="${project.imagePath}" alt="${project.title}">`
                : `<img src="${project.imagePath}" alt="${project.title}">`;
            const starHTML = project.isFavorite ? `<span class="favorite-star">★</span>` : '';
            const videoClass = project.videoPath ? 'has-video' : '';

            return `
                <a href="${project.url}" class="project-tile ${videoClass}" data-id="${project.id}">
                    <div class="media-container">
                        ${mediaHTML}
                    </div>
                    <div class="tile-content">
                        <div class="tile-header">
                            <h3>${project.title}</h3>
                            ${starHTML}
                        </div>
                        <p>${project.description}</p>
                        <div class="filters-wrapper">
                            ${tagsHTML}
                        </div>
                    </div>
                </a>
            `;
        }

        gridContainer.innerHTML = myProjects.map(createTileHTML).join('');
        attachVideoHoverListeners();
    }

    // --- 2. Video Hover Logic ---
    function attachVideoHoverListeners() {
        const tiles = document.querySelectorAll('.project-tile');
        tiles.forEach(tile => {
            const video = tile.querySelector('video') as HTMLVideoElement | null;
            if (video) {
                tile.addEventListener('mouseenter', () => video.play().catch(() => {}));
                tile.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        });
    }

    // --- 3. Sidebar Open/Close Logic ---
    const sidebar = document.getElementById('filter-sidebar');
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.getElementById('close-sidebar');

    if (sidebar && openBtn && closeBtn) {
        openBtn.addEventListener('click', () => sidebar.classList.add('open'));
        closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));
    }

    // --- 4. Sort by Date Logic ---
    let isDateDescending = true; // Start with newest first
    const sortDateBtn = document.getElementById('sort-date');

    if (sortDateBtn) {
        // Initial sort before first render
        myProjects.sort((a, b) => b.datePosted.getTime() - a.datePosted.getTime());

        sortDateBtn.addEventListener('click', () => {
            isDateDescending = !isDateDescending; // Toggle state
            
            // Update the arrow icon
            const arrow = sortDateBtn.querySelector('.arrow');
            if (arrow) arrow.textContent = isDateDescending ? '↓' : '↑';

            // Sort the array based on state
            myProjects.sort((a, b) => {
                const dateA = a.datePosted.getTime();
                const dateB = b.datePosted.getTime();
                return isDateDescending ? dateB - dateA : dateA - dateB;
            });

            // Re-draw the grid with the new order
            renderProjects();
        });
    }

    // --- Initialize the Page ---
    renderProjects();
});