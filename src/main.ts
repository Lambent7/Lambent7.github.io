import { myProjects, Project } from './projects';

// wait for HTML to load before running script
document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("project-grid");

    if (!gridContainer) return; // check

    // generate HTML for a single project tile
    function createTileHTML(project: Project): string {
        // HTML for tags
        const tagsHTML = project.filters.map(tag => `<span class="filter-tag">${tag}</span>`).join('');
        
        // build HTML for media (include video only if it exists)
        const mediaHTML = project.videoPath 
            ? `<video src="${project.videoPath}" loop muted playsinline></video>
               <img src="${project.imagePath}" alt="${project.title}">`
            : `<img src="${project.imagePath}" alt="${project.title}">`;

        // favorite icon
        const starHTML = project.isFavorite ? `<span class="favorite-star">★</span>` : '';

        // Check if there is a video to add our special hover class
        const videoClass = project.videoPath ? 'has-video' : '';

        // return full HTML string for tile
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

    // 1. render all projects to the grid
    gridContainer.innerHTML = myProjects.map(createTileHTML).join('');

    // 2. handle video playback on hover
    // videos only play when actively hovering
    const tiles = document.querySelectorAll('.project-tile');
    
    tiles.forEach(tile => {
        const video = tile.querySelector('video') as HTMLVideoElement | null;
        
        if (video) {
            tile.addEventListener('mouseenter', () => {
                video.play().catch(e => console.error("Video play prevented:", e));
            });
            
            tile.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Reset video to the beginning
            });
        }
    });

    // --- placeholder for sorting logic ---

});