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
    about: string[];  // Array of paragraphs for rich text
    vision: string;
    researchAreas: string[];
    contact: {
        email: string;
        phone: string;
        location: string;
    };
    spotlight: {
        name: string;
        role: string;
        quote: string;
        image: string;
    };
    gallery: string[];
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
        about: [
            "Established to lead the digital revolution in West Africa, the Department of Computer Science at KNUST has evolved into a hub of technological innovation and excellence. We believe that computer science is not just about writing code; it's about solving the world's most complex problems through logic, creativity, and technology.",
            "Our curriculum is rigorously designed to bridge the gap between theoretical foundations and practical application. From building scalable software systems to securing critical national infrastructure, our students are trained to be architects of the digital future.",
            "We foster a culture of collaboration where students, faculty, and industry partners work together on groundbreaking research in AI, data science, and cybersecurity. Join us, and be part of a community that is coding a better tomorrow."
        ],
        vision: 'To be a global leader in computer science education and research, driving innovation and societal impact.',
        researchAreas: ['Artificial Intelligence', 'Cybersecurity', 'Data Science', 'Software Engineering'],
        contact: {
            email: 'cs@knust.edu.gh',
            phone: '+233 3220 12345',
            location: 'College of Science Building, 2nd Floor'
        },
        spotlight: {
            name: "Sarah Konadu",
            role: "Software Engineering Alumna at Google",
            quote: "The practical approach to coding at KNUST CS gave me the edge I needed to compete globally.",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80"
        ],
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
        description: 'Our Chemistry Department offers comprehensive training in analytical, organic, inorganic, and physical chemistry with state-of-the-art laboratories and research facilities.',
        about: [
            "Chemistry is often called the 'central science' because it connects the physical sciences with life sciences and applied sciences. At KNUST, we embrace this centrality by offering a program that is as diverse as it is deep.",
            "Our department is home to award-winning researchers who are pushing the boundaries of material science, sustainable energy, and medicinal chemistry. We provide our students with hands-on access to advanced instrumentation, ensuring they graduate not just with knowledge, but with the technical competence to thrive in global laboratories.",
            "Beyond the test tubes and spectrometers, we are a community dedicated to using chemical principles to solve environmental and industrial challenges facing Africa and the world."
        ],
        vision: 'To advance chemical sciences through innovative research and quality education.',
        researchAreas: ['Organic Synthesis', 'Analytical Chemistry', 'Environmental Chemistry', 'Pharmaceutical Chemistry'],
        contact: {
            email: 'chemistry@knust.edu.gh',
            phone: '+233 3220 54321',
            location: 'Science Complex, Block C'
        },
        spotlight: {
            name: "David Mensah",
            role: "PhD Candidate in Material Science",
            quote: "Our labs are equipped with world-class instruments that make advanced research possible.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1581093458791-9f302e683c9c?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80"
        ],
        headOfDepartment: {
            name: 'Prof. Marie Curie',
            message: 'Chemistry is the central science. Join us in discovering new materials and medicines.',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80'
        },
        stats: {
            students: 600,
            faculty: 28,
            researchPapers: 200
        },
        faculty: [],
        programmes: [
            {
                id: 'bsc-chem',
                title: 'BSc Chemistry',
                level: 'BSc',
                description: 'Foundational training in modern chemical sciences.'
            },
            {
                id: 'msc-ind-chem',
                title: 'MSc Industrial Chemistry',
                level: 'MSc',
                description: 'Advanced study of chemical processes in industry.'
            },
            {
                id: 'phd-chem',
                title: 'PhD Chemistry',
                level: 'PhD',
                description: 'Cutting-edge research in specialized chemical fields.'
            }
        ]
    },
    {
        id: 'phys',
        slug: 'physics',
        name: 'Department of Physics',
        heroImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80',
        description: 'From quantum mechanics to astrophysics, we probe the laws that govern the universe.',
        about: [
            "Physics is the quest to understand the fundamental laws of nature, from the smallest subatomic particles to the vastness of the cosmos. Our department is a place of deep inquiry and rigorous exploration.",
            "We offer a dynamic learning environment where students are encouraged to question established paradigms and validate theories through experimentation. Our research groups in geophysics and solid-state physics are actively contributing to solutions in energy and resource management.",
            "Whether you aspire to be a theoretical physicist unraveling the mysteries of quantum mechanics or an applied physicist developing new technologies, our department provides the mentorship and resources to launch your journey."
        ],
        vision: 'To unravel the mysteries of the universe through rigorous inquiry and experimentation.',
        researchAreas: ['Quantum Mechanics', 'Astrophysics', 'Solid State Physics', 'Geophysics'],
        contact: {
            email: 'physics@knust.edu.gh',
            phone: '+233 3220 98765',
            location: 'Science Complex, Block A'
        },
        spotlight: {
            name: "Dr. Kusi Appiah",
            role: "Astrophysicist at NASA",
            quote: "The physics department taught me to question everything and find answers in the data.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80"
        ],
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
        programmes: [
            {
                id: 'bsc-phys',
                title: 'BSc Physics',
                level: 'BSc',
                description: 'Study of matter, energy, and the fundamental forces of nature.'
            },
            {
                id: 'msc-geophys',
                title: 'MSc Geophysics',
                level: 'MSc',
                description: 'Application of physics to study the Earth.'
            },
            {
                id: 'phd-phys',
                title: 'PhD Physics',
                level: 'PhD',
                description: 'Original research in theoretical or experimental physics.'
            }
        ]
    },
    {
        id: 'math',
        slug: 'mathematics',
        name: 'Department of Mathematics',
        heroImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80',
        description: 'The language of the universe. We offer rigorous training in pure and applied mathematics.',
        about: [
            "Mathematics is the bedrock of modern science and industry. In our department, we view mathematics not as an abstract discipline, but as a powerful tool for modeling reality and solving practical problems.",
            "Our program balances pure mathematical theory with applied techniques in statistics, customized modeling, and computational analysis. We prepare our graduates to be critical thinkers who can analyze complex data and drive decision-making in finance, technology, and engineering.",
            "We are committed to demystifying mathematics and showing its beauty and utility. Our faculty are passionate educators who guide students to discover the patterns that govern our world."
        ],
        vision: 'To be a center of excellence in mathematical sciences and applications.',
        researchAreas: ['Applied Mathematics', 'Pure Mathematics', 'Statistics', 'Computational Modeling'],
        contact: {
            email: 'math@knust.edu.gh',
            phone: '+233 3220 11223',
            location: 'Mathematics Building'
        },
        spotlight: {
            name: "Fatima Alhassan",
            role: "Senior Data Analyst",
            quote: "Mathematics is everywhere. KNUST helped me see the patterns that drive business success.",
            image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80"
        ],
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
        programmes: [
            {
                id: 'bsc-math',
                title: 'BSc Mathematics',
                level: 'BSc',
                description: 'Rigorous training in mathematical theories and applications.'
            },
            {
                id: 'msc-actuarial',
                title: 'MSc Actuarial Science',
                level: 'MSc',
                description: 'Statistical and mathematical methods for risk assessment.'
            }
        ]
    },
    {
        id: 'biochem',
        slug: 'biochemistry',
        name: 'Department of Biochemistry',
        heroImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80',
        description: 'Bridging biology and chemistry to understand life at the molecular level.',
        about: [
            "Biochemistry sits at the exciting interface of biology and chemistry, exploring the molecular mechanisms that sustain life. It is a field of endless discovery, critical for advancements in medicine, agriculture, and biotechnology.",
            "At KNUST, our Biochemistry department focuses on training students to understand the chemical processes within living organisms. Our research in clinical biochemistry and drug discovery is aimed at tackling diseases relevant to our region and beyond.",
            "We empower our students with the analytical skills to become pioneers in the biotech industry, healthcare, and research institutions globally."
        ],
        vision: 'To reveal the molecular mechanisms of life and improve health and sustainability.',
        researchAreas: ['Molecular Biology', 'Clinical Biochemistry', 'Biotechnology', 'Drug Discovery'],
        contact: {
            email: 'biochem@knust.edu.gh',
            phone: '+233 3220 33445',
            location: 'Biosciences Complex'
        },
        spotlight: {
            name: "Kwame Osei",
            role: "Biotech Entrepreneur",
            quote: "From the lab bench to the boardroom, Biochemistry gave me the foundation to innovate.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80"
        ],
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
        programmes: [
            {
                id: 'bsc-biochem',
                title: 'BSc Biochemistry',
                level: 'BSc',
                description: 'Chemical processes within and related to living organisms.'
            },
            {
                id: 'msc-biotech',
                title: 'MSc Biotechnology',
                level: 'MSc',
                description: 'Technological applications using biological systems.'
            }
        ]
    },
    {
        id: 'bio',
        slug: 'biological-science',
        name: 'Department of Biological Science',
        heroImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80',
        description: 'Studying life in all its forms, from microscopic organisms to complex ecosystems.',
        about: [
            "Biology is the study of life in all its vibrant complexity. Our department is dedicated to exploring the living world, from the molecular interactions within cells to the dynamics of vast ecosystems.",
            "We place a strong emphasis on biodiversity and conservation, leveraging Ghana's rich natural heritage as a living laboratory. Our students gain extensive field experience, learning to observe, catalog, and protect our biological resources.",
            "Whether your interest lies in microbiology, botany, or zoology, our department offers a supportive environment to grow as a scientist and a guardian of our planet."
        ],
        vision: 'To advance understanding of the living world and conserve biodiversity.',
        researchAreas: ['Ecology', 'Microbiology', 'Zoology', 'Botany'],
        contact: {
            email: 'biology@knust.edu.gh',
            phone: '+233 3220 55667',
            location: 'Biosciences Complex'
        },
        spotlight: {
            name: "Ama Serwaa",
            role: "Conservationist",
            quote: "Studying Biology here opened my eyes to the incredible biodiversity of our country.",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1516205651411-a8531c535780?auto=format&fit=crop&q=80"
        ],
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
        programmes: [
            {
                id: 'bsc-bio',
                title: 'BSc Biological Sciences',
                level: 'BSc',
                description: 'Broad study of living organisms and their interactions.'
            },
            {
                id: 'msc-env-bio',
                title: 'MSc Environmental Biology',
                level: 'MSc',
                description: 'Study of organisms in relation to their environment.'
            }
        ]
    },
    {
        id: 'stat',
        slug: 'statistics',
        name: 'Department of Statistics',
        heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
        description: 'Transforming data into insight through probabilistic modelling, inference, and applied statistical methods.',
        about: [
            "In an increasingly data-driven world, statisticians are the architects of evidence. Our department trains students to collect, analyse, and interpret data to guide decisions across industry, government, and research.",
            "We combine rigorous mathematical theory with real-world application in areas such as biostatistics, econometrics, and machine learning. Our graduates are highly sought after by financial institutions, health organisations, and technology companies.",
            "We believe every dataset has a story. Our mission is to equip you with the tools to tell it accurately and compellingly."
        ],
        vision: 'To be a leading centre for statistical sciences, producing graduates who drive evidence-based decision-making.',
        researchAreas: ['Biostatistics', 'Econometrics', 'Statistical Computing', 'Probability Theory'],
        contact: {
            email: 'statistics@knust.edu.gh',
            phone: '+233 3220 22334',
            location: 'Mathematics Building, 1st Floor'
        },
        spotlight: {
            name: "Abena Boateng",
            role: "Lead Data Scientist, MTN Ghana",
            quote: "Statistics taught me how to turn noise into knowledge. It is the most versatile skill I have.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
        ],
        headOfDepartment: {
            name: 'Prof. Florence Nightingale',
            message: 'Data is the foundation of progress. We teach our students to build on it wisely.',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80'
        },
        stats: { students: 320, faculty: 20, researchPapers: 85 },
        faculty: [],
        programmes: [
            { id: 'bsc-stat', title: 'BSc Statistics', level: 'BSc', description: 'Foundations of statistical theory and applications.' },
            { id: 'msc-stat', title: 'MSc Statistics', level: 'MSc', description: 'Advanced statistical modelling and inference.' },
            { id: 'phd-stat', title: 'PhD Statistics', level: 'PhD', description: 'Original research in statistical methodology.' }
        ]
    },
    {
        id: 'actuarial',
        slug: 'actuarial-science',
        name: 'Department of Actuarial Science',
        heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
        description: 'Applying mathematics, probability, and financial theory to assess and manage risk in insurance and finance.',
        about: [
            "Actuarial Science is one of the most in-demand professional fields in the world. Our programme trains students to quantify financial risk using advanced mathematical and statistical techniques.",
            "Our curriculum is aligned with the professional examination syllabus of the Institute and Faculty of Actuaries (IFoA), giving our graduates a head start on achieving Fellowship status.",
            "With Ghana's insurance and pension sectors growing rapidly, KNUST actuaries are at the heart of building a financially resilient nation."
        ],
        vision: 'To produce world-class actuaries who lead the management of risk across Africa.',
        researchAreas: ['Life Insurance', 'General Insurance', 'Pension Mathematics', 'Financial Risk Modelling'],
        contact: {
            email: 'actuarial@knust.edu.gh',
            phone: '+233 3220 44556',
            location: 'Mathematics Building, 2nd Floor'
        },
        spotlight: {
            name: "Kwabena Frimpong",
            role: "Chief Actuary, SIC Insurance",
            quote: "KNUST gave me the technical grounding to pass professional exams and thrive in the industry.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80"
        ],
        headOfDepartment: {
            name: 'Prof. John Nash',
            message: 'Risk is inevitable. Our job is to measure it and make it manageable.',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
        },
        stats: { students: 280, faculty: 16, researchPapers: 60 },
        faculty: [],
        programmes: [
            { id: 'bsc-act', title: 'BSc Actuarial Science', level: 'BSc', description: 'Risk assessment using mathematics, statistics, and finance.' },
            { id: 'msc-act', title: 'MSc Actuarial Science', level: 'MSc', description: 'Advanced actuarial techniques and professional exam preparation.' }
        ]
    },
    {
        id: 'meteo',
        slug: 'meteorology-and-climate-science',
        name: 'Department of Meteorology and Climate Science',
        heroImage: 'https://images.unsplash.com/photo-1504608524841-42584120d693?auto=format&fit=crop&q=80',
        description: 'Understanding atmospheric processes and climate systems to predict weather and address climate change.',
        about: [
            "As climate change reshapes our planet, meteorologists and climate scientists have never been more important. Our department stands at the forefront of atmospheric research in West Africa.",
            "We combine observational science with advanced numerical modelling to understand weather patterns, seasonal forecasting, and long-term climate trends. Our students work with data from ground stations, satellites, and global reanalysis datasets.",
            "Our graduates serve in Ghana Meteorological Agency, international organisations, and academia, contributing to the global effort to understand and mitigate the effects of climate change."
        ],
        vision: 'To be Africa\'s leading centre for atmospheric and climate research, informing policy and protecting lives.',
        researchAreas: ['Weather Forecasting', 'Climate Modelling', 'Atmospheric Chemistry', 'Hydroclimatology'],
        contact: {
            email: 'meteorology@knust.edu.gh',
            phone: '+233 3220 66778',
            location: 'Science Complex, Block D'
        },
        spotlight: {
            name: "Dr. Yaw Asante",
            role: "Senior Forecaster, Ghana Meteorological Agency",
            quote: "The skills I gained here allow me to protect lives by predicting severe weather events.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1504608524841-42584120d693?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80"
        ],
        headOfDepartment: {
            name: 'Dr. James Hansen',
            message: 'The atmosphere does not lie. We train our students to listen to what it says.',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80'
        },
        stats: { students: 200, faculty: 15, researchPapers: 75 },
        faculty: [],
        programmes: [
            { id: 'bsc-meteo', title: 'BSc Meteorology and Climate Science', level: 'BSc', description: 'Atmospheric science, weather systems, and climate dynamics.' },
            { id: 'msc-meteo', title: 'MSc Climate Science', level: 'MSc', description: 'Advanced climate modelling and environmental policy.' }
        ]
    },
    {
        id: 'optom',
        slug: 'optometry',
        name: 'Department of Optometry',
        heroImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80',
        description: 'Training eye care professionals to diagnose, manage, and treat visual disorders across Ghana and beyond.',
        about: [
            "Vision is one of our most precious senses, yet millions across Africa suffer from preventable blindness. The Department of Optometry at KNUST is committed to changing that.",
            "Our programme is one of the few accredited optometry programmes in West Africa, training students in primary eye care, refractive management, contact lens practice, and ocular disease. We combine clinical training with community outreach to address the eye care needs of underserved populations.",
            "Our graduates are registered optometrists who serve in hospitals, private practice, and international health missions, restoring sight and transforming lives."
        ],
        vision: 'To eliminate preventable blindness in Africa through excellence in optometric education and research.',
        researchAreas: ['Community Eye Health', 'Refractive Error', 'Ocular Disease', 'Contact Lens Science'],
        contact: {
            email: 'optometry@knust.edu.gh',
            phone: '+233 3220 77889',
            location: 'School of Allied Health Sciences'
        },
        spotlight: {
            name: "Dr. Akosua Mensah",
            role: "Principal Optometrist, Komfo Anokye Teaching Hospital",
            quote: "Giving someone their sight back is the most rewarding thing I will ever do.",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80"
        ],
        headOfDepartment: {
            name: 'Prof. Helen Keller',
            message: 'We do not just restore vision — we restore possibility.',
            image: 'https://images.unsplash.com/photo-1594824476961-b7aa5a1c6756?auto=format&fit=crop&q=80'
        },
        stats: { students: 250, faculty: 18, researchPapers: 55 },
        faculty: [],
        programmes: [
            { id: 'boptom', title: 'BOptom Optometry', level: 'BSc', description: 'Clinical training in primary eye care and refractive management.' },
            { id: 'msc-optom', title: 'MSc Clinical Optometry', level: 'MSc', description: 'Advanced ocular disease and specialist practice.' }
        ]
    },
    {
        id: 'foodsci',
        slug: 'food-science',
        name: 'Department of Food Science',
        heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
        description: 'Applying science to ensure safe, nutritious, and sustainable food systems for Ghana and Africa.',
        about: [
            "Food security is one of the defining challenges of our era. The Department of Food Science equips students with the knowledge to improve the safety, quality, and nutritional value of food from farm to table.",
            "Our programme integrates food chemistry, microbiology, processing technology, and sensory science. Students gain hands-on experience in our food processing pilot plant and analytical laboratories.",
            "Our graduates work across the food industry — in product development, quality assurance, regulatory affairs, and entrepreneurship — helping to build a stronger, healthier food system for Ghana."
        ],
        vision: 'To lead innovation in food science and technology for a food-secure and healthy Africa.',
        researchAreas: ['Food Safety', 'Food Biotechnology', 'Post-Harvest Technology', 'Nutritional Science'],
        contact: {
            email: 'foodscience@knust.edu.gh',
            phone: '+233 3220 88990',
            location: 'Food Science Building'
        },
        spotlight: {
            name: "Esi Agyeman",
            role: "Food Technologist, Nestlé Ghana",
            quote: "KNUST gave me the scientific foundation to develop products that nourish millions of people.",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80"
        ],
        headOfDepartment: {
            name: 'Prof. Louis Pasteur',
            message: 'Safe food is not a luxury. Our department makes it a science.',
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80'
        },
        stats: { students: 380, faculty: 22, researchPapers: 95 },
        faculty: [],
        programmes: [
            { id: 'bsc-foodsci', title: 'BSc Food Science', level: 'BSc', description: 'Science of food composition, processing, safety, and quality.' },
            { id: 'msc-foodtech', title: 'MSc Food Technology', level: 'MSc', description: 'Advanced food processing and product development.' },
            { id: 'phd-foodsci', title: 'PhD Food Science', level: 'PhD', description: 'Cutting-edge research in food systems and nutrition.' }
        ]
    },
    {
        id: 'envsc',
        slug: 'environmental-science',
        name: 'Department of Environmental Science',
        heroImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80',
        description: 'Studying the interactions between humans and the natural environment to build a sustainable future.',
        about: [
            "Environmental Science is a discipline born of urgency. At KNUST, we study the complex relationships between human activity and the natural world — from pollution and deforestation to climate adaptation and sustainable development.",
            "Our interdisciplinary programme draws on ecology, geology, chemistry, and social sciences to produce graduates who understand environmental problems holistically and can design solutions that are both scientifically sound and socially just.",
            "Our students engage directly with communities, industries, and government agencies, applying classroom knowledge to real environmental challenges facing Ghana."
        ],
        vision: 'To produce environmental scientists who lead sustainable development and conservation across Africa.',
        researchAreas: ['Pollution Control', 'Conservation Biology', 'Environmental Impact Assessment', 'Climate Adaptation'],
        contact: {
            email: 'envscience@knust.edu.gh',
            phone: '+233 3220 99001',
            location: 'Science Complex, Block E'
        },
        spotlight: {
            name: "Nana Yaw Darko",
            role: "Environmental Consultant, EPA Ghana",
            quote: "My training here gave me the tools to protect Ghana's natural resources for future generations.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
        },
        gallery: [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80"
        ],
        headOfDepartment: {
            name: 'Dr. Jane Goodall',
            message: 'Every individual matters. Every action matters. That is the spirit of environmental science.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'
        },
        stats: { students: 290, faculty: 19, researchPapers: 80 },
        faculty: [],
        programmes: [
            { id: 'bsc-envsc', title: 'BSc Environmental Science', level: 'BSc', description: 'Interdisciplinary study of environmental systems and human impact.' },
            { id: 'msc-envmgt', title: 'MSc Environmental Management', level: 'MSc', description: 'Strategic management of natural resources and environmental policy.' },
            { id: 'phd-envsc', title: 'PhD Environmental Science', level: 'PhD', description: 'Advanced research in environmental systems and sustainability.' }
        ]
    }
];
