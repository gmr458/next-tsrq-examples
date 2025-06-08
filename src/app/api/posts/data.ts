export type Post = {
    id: number;
    title: string;
    body: string;
};

export type PostsData = {
    [category: string]: Post[];
};

export const posts: PostsData = {
    technology: [
        {
            id: 1,
            title: "Introduction to React",
            body: "React is a JavaScript library for building user interfaces.",
        },
        {
            id: 2,
            title: "Getting Started with TypeScript",
            body: "TypeScript is a typed superset of JavaScript.",
        },
        {
            id: 3,
            title: "Next.js Fundamentals",
            body: "Next.js is a React framework for production.",
        },
        {
            id: 9,
            title: "Understanding GraphQL",
            body: "GraphQL is a query language for your API.",
        },
        {
            id: 10,
            title: "Deno: A Modern Runtime",
            body: "Deno is a secure runtime for JavaScript and TypeScript.",
        },
    ],
    design: [
        {
            id: 4,
            title: "UI Design Principles",
            body: "Good UI design focuses on simplicity and clarity.",
        },
        {
            id: 5,
            title: "Color Theory Basics",
            body: "Understanding color is crucial for effective design.",
        },
        {
            id: 11,
            title: "Typography in Web Design",
            body: "Choosing the right fonts can greatly improve readability.",
        },
        {
            id: 12,
            title: "Creating a Design System",
            body: "A design system ensures consistency across products.",
        },
    ],
    productivity: [
        {
            id: 6,
            title: "Time Management Techniques",
            body: "Effective time management leads to increased productivity.",
        },
        {
            id: 7,
            title: "Goal Setting Strategies",
            body: "Setting SMART goals is key to achieving your objectives.",
        },
        {
            id: 8,
            title: "Building Positive Habits",
            body: "Habits form the foundation of long-term success.",
        },
        {
            id: 13,
            title: "The Pomodoro Technique",
            body: "Work in focused 25-minute intervals with short breaks.",
        },
    ],
    science: [
        {
            id: 14,
            title: "The James Webb Space Telescope",
            body: "JWST is revolutionizing our understanding of the early universe.",
        },
        {
            id: 15,
            title: "CRISPR Gene Editing Explained",
            body: "CRISPR-Cas9 is a powerful tool for editing genomes.",
        },
        {
            id: 16,
            title: "The Power of Mitochondria",
            body: "Mitochondria are the powerhouses of the cell.",
        },
    ],
    lifestyle: [
        {
            id: 17,
            title: "Beginner's Guide to Cooking",
            body: "Learn essential cooking skills to prepare delicious meals.",
        },
        {
            id: 18,
            title: "Mindfulness and Meditation",
            body: "Practice mindfulness to reduce stress and improve focus.",
        },
        {
            id: 19,
            title: "Tips for Better Sleep",
            body: "Quality sleep is essential for physical and mental health.",
        },
    ],
};
