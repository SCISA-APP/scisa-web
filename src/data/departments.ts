export interface FacultyMember {
    id: string;
    name: string;
    role: string;
    image: string;
    bio: string;
}

export interface Programme {
    id: string;
    title: string;
    level: 'BSc' | 'MSc' | 'PhD';
    description: string;
}

export interface Department {
    id: string;
    slug: string;
    name: string;
    heroImage: string;
    description: string;
    headOfDepartment: {
        name: string;
        message: string;
        image: string;
    };
    stats: {
        students: number;
        faculty: number;
        researchPapers: number;
    };
    faculty: FacultyMember[];
    programmes: Programme[];
}

export const DEPARTMENTS: Department[] = [
    {
        id: 'cs',
        slug: 'computer-science',
        name: 'Department of Computer Science',
        heroImage: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80',
        description: 'The Department of Computer Science prepares students for careers in software development, artificial intelligence, cybersecurity, and data science through cutting-edge curriculum and hands-on experience.',
        headOfDepartment: {
            name: 'Dr. John Doe',
            message: 'Welcome to the forefront of digital innovation. Our department is committed to shaping the tech leaders of tomorrow.',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
        },
        stats: {
            students: 800,
            faculty: 35,
            researchPapers: 120
        },
        faculty: [
            {
                id: '1',
                name: 'Dr. Alan Turing',
                role: 'Professor',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
                bio: 'Specialist in Algorithms and AI.'
            },
            {
                id: '2',
                name: 'Dr. Ada Lovelace',
                role: 'Senior Lecturer',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
                bio: 'Focus on Software Engineering and History of Computing.'
            }
        ],
        programmes: [
            {
                id: 'bsc-cs',
                title: 'BSc Computer Science',
                level: 'BSc',
                description: 'A comprehensive program covering algorithms, software engineering, and systems.'
            },
            {
                id: 'bsc-it',
                title: 'BSc Information Technology',
                level: 'BSc',
                description: 'Focused on the practical application of technology in business environments.'
            },
            {
                id: 'phd-cs',
                title: 'PhD Computer Science',
                level: 'PhD',
                description: 'Advanced research in theoretical and applied computer science.'
            }
        ]
    },
    {
        id: 'chem',
        slug: 'chemistry',
        name: 'Department of Chemistry',
        heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80',
        description: 'Exploring the fundamental building blocks of matter. Our chemistry department excels in organic, inorganic, and physical chemistry research.',
        headOfDepartment: {
            name: 'Prof. Marie Curie',
            message: 'Chemistry is the central science. Join us in discovering new materials and medicines.',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80'
        },
        stats: {
            students: 450,
            faculty: 28,
            researchPapers: 200
        },
        faculty: [],
        programmes: []
    },
    {
        id: 'phys',
        slug: 'physics',
        name: 'Department of Physics',
        heroImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80',
        description: 'From quantum mechanics to astrophysics, we probe the laws that govern the universe.',
        headOfDepartment: {
            name: 'Dr. Richard Feynman',
            message: 'Nature uses only the longest threads to weave her patterns.',
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80'
        },
        stats: {
            students: 300,
            faculty: 22,
            researchPapers: 150
        },
        faculty: [],
        programmes: []
    },
    {
        id: 'math',
        slug: 'mathematics',
        name: 'Department of Mathematics',
        heroImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80',
        description: 'The language of the universe. We offer rigorous training in pure and applied mathematics.',
        headOfDepartment: {
            name: 'Prof. Katherine Johnson',
            message: 'Mathematics is the key to understanding the world around us.',
            image: 'https://images.unsplash.com/photo-1594824476961-b7aa5a1c6756?auto=format&fit=crop&q=80'
        },
        stats: {
            students: 350,
            faculty: 18,
            researchPapers: 90
        },
        faculty: [],
        programmes: []
    },
    {
        id: 'biochem',
        slug: 'biochemistry',
        name: 'Department of Biochemistry',
        heroImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80',
        description: 'Bridging biology and chemistry to understand life at the molecular level.',
        headOfDepartment: {
            name: 'Dr. Rosalind Franklin',
            message: 'Unlocking the secrets of life, one molecule at a time.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'
        },
        stats: {
            students: 400,
            faculty: 25,
            researchPapers: 110
        },
        faculty: [],
        programmes: []
    },
    {
        id: 'bio',
        slug: 'biology',
        name: 'Department of Biology',
        heroImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80',
        description: 'Studying life in all its forms, from microscopic organisms to complex ecosystems.',
        headOfDepartment: {
            name: 'Prof. Charles Darwin',
            message: 'It is not the strongest of the species that survives, but the one most adaptable to change.',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80'
        },
        stats: {
            students: 600,
            faculty: 40,
            researchPapers: 180
        },
        faculty: [],
        programmes: []
    }
];
