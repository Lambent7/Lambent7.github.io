export interface Project {
    id: string;
    title: string;
    description: string;
    imagePath: string; 
    videoPath?: string; // Optional
    url: string; 
    hasGithubRepo: boolean;
    isFavorite: boolean;
    datePosted: Date;
    filters: string[];
}

export const myProjects: Project[] = [
    {
        id: "emotion_game",
        title: "Emotion Game",
        description: "A speedrunning game to type sentences that have a sense of the target emotion. An emotion classifying AI decides if you win or lose!",
        imagePath: "assets/emotion_game.jpg",
        videoPath: "assets/emotion_game.mp4",
        url: "https://github.com/Lambent7/Emotion-Game",
        hasGithubRepo: true,
        isFavorite: false,
        datePosted: new Date("2026-03-31"),
        filters: ["TypeScript", "API", ""]
    },
    {
        id: "black_crown",
        title: "Black Crown Game Console",
        description: "Custom gaming console powered by the BC-250 (PS5) APU Board.",
        imagePath: "assets/black_crown.jpg",
        url: "blog/black_crown.html",
        hasGithubRepo: false,
        isFavorite: true,
        datePosted: new Date("2026-03-31"),
        filters: ["Hardware", "Linux", "3D Modeling", ]
    }
];