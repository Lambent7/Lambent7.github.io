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
        id: "weather-app",
        title: "(EXAMPLE) Global Weather Tracker",
        description: "A real-time weather dashboard utilizing a public API.",
        imagePath: "assets/weather-static.jpg",
        videoPath: "assets/weather-demo.mp4",
        url: "https://github.com/Lambent7/weather-app",
        hasGithubRepo: true,
        isFavorite: true,
        datePosted: new Date("2025-10-15"),
        filters: ["TypeScript", "API", "Frontend"]
    },
    {
        id: "robotics-build",
        title: "(EXAMPLE) Autonomous RC Car",
        description: "Custom built RC car with obstacle avoidance.",
        imagePath: "assets/rc-car.jpg",
        url: "blog/autonomous-rc-car.html", 
        hasGithubRepo: false,
        isFavorite: false,
        datePosted: new Date("2026-01-10"),
        filters: ["Hardware", "C++", "Robotics"]
    }
];