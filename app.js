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

    // Updated Categories & Course Generation
    const categories = ['Business', 'Marketing', 'Design', 'Tech', 'Vocational Skills', 'Visual Design', 'Cloud Architecture', 'Software Engineering'];
    const titlesByCategory = {
        'Business': ['MBA Essentials', 'Startup Scaling', 'Operational Management', 'Financial Modeling', 'Strategic Leadership', 'Supply Chain', 'Business Analytics', 'Project Management', 'Risk Assessment', 'Corporate Law'],
        'Marketing': ['Digital Marketing', 'Content Strategy', 'SEO & SEM', 'Social Media Growth', 'Brand Storytelling', 'Influencer Marketing', 'Email Automation', 'Market Research', 'Growth Hacking', 'Public Relations'],
        'Design': ['UX/UI Principles', 'Interaction Design', 'Design Thinking', 'User Research', 'Mobile App Design', 'Prototyping', 'Service Design', 'Accessibility', 'Motion Design', 'Info Architecture'],
        'Tech': ['AI & ML', 'Cybersecurity', 'Blockchain Dev', 'Internet of Things', 'Robotics', 'Quantum Computing', 'Game Development', 'Tech Management', 'VR/AR Development', 'Embedded Systems'],
        'Vocational Skills': ['Modern Carpentry', 'Professional Pest Control', 'Sustainable Farming', 'Electrical Install', 'Plumbing', 'Welding', 'Tailoring', 'Masonry', 'Auto Repair', 'Solar Install'],
        'Visual Design': ['Advanced Typography', 'Logo & Branding', 'Illustration', 'Print Production', 'Editorial Design', 'Color Theory', 'Packaging Design', 'Vector Art', 'Creative Direction', 'Digital Painting'],
        'Cloud Architecture': ['AWS Solutions', 'Azure Infra', 'Google Cloud', 'DevOps Practices', 'Serverless', 'Cloud Security', 'Docker & K8s', 'Hybrid Cloud', 'Disaster Recovery', 'Cloud Migration'],
        'Software Engineering': ['Fullstack Web Dev', 'Mobile Development', 'Backend Engineering', 'Database Architecture', 'API Design', 'System Design', 'Frontend Mastery', 'Software QA', 'Rust Programming', 'Java Enterprise']
    };
    const outcomesByCategory = {
        'Business': [
            [
                'Develop a strategic mindset for business growth and market positioning.',
                'Master financial analysis and budgeting for informed decision-making.',
                'Lead and motivate cross-functional teams effectively.',
                'Understand global market dynamics and competitive landscapes.',
                'Formulate and execute robust business plans.',
                'Enhance communication and negotiation skills for corporate environments.'
            ],
            [
                'Design and implement scalable operational frameworks for rapid growth.',
                'Secure venture capital and manage investor relations.',
                'Build and lead high-performing startup teams.',
                'Develop effective go-to-market strategies for new products.',
                'Optimize customer acquisition and retention in competitive markets.',
                'Navigate legal and regulatory challenges in startup ecosystems.'
            ],
            [
                'Streamline complex business processes for maximum efficiency.',
                'Implement lean methodologies to reduce waste and improve productivity.',
                'Manage supply chain logistics and inventory effectively.',
                'Utilize data analytics to optimize operational performance.',
                'Develop robust quality control and assurance protocols.',
                'Lead change management initiatives within organizations.'
            ],
            [
                'Construct accurate financial models for valuation and forecasting.',
                'Perform sensitivity analysis and scenario planning.',
                'Evaluate investment opportunities and capital allocation.',
                'Master Excel and specialized financial software.',
                'Present complex financial data clearly to stakeholders.',
                'Understand corporate finance principles and applications.'
            ],
            [
                'Cultivate visionary leadership and inspire organizational change.',
                'Develop and articulate compelling strategic visions.',
                'Build resilient organizational cultures.',
                'Master conflict resolution and team dynamics.',
                'Drive innovation and foster a growth mindset.',
                'Implement effective performance management systems.'
            ],
            [
                'Optimize end-to-end supply chain operations.',
                'Implement logistics and distribution network design.',
                'Manage inventory and demand forecasting.',
                'Mitigate supply chain risks and disruptions.',
                'Utilize supply chain analytics for performance improvement.',
                'Develop sustainable and ethical sourcing strategies.'
            ],
            [
                'Extract, transform, and load (ETL) data for analysis.',
                'Perform descriptive, predictive, and prescriptive analytics.',
                'Utilize statistical tools and programming languages (e.g., Python, R).',
                'Create compelling data visualizations and dashboards.',
                'Translate data insights into actionable business strategies.',
                'Communicate analytical findings to non-technical audiences.'
            ],
            [
                'Plan, execute, and close projects using industry best practices.',
                'Manage project scope, time, cost, and quality.',
                'Lead project teams and stakeholder communication.',
                'Identify and mitigate project risks.',
                'Utilize Agile and Waterfall methodologies.',
                'Achieve project objectives within constraints.'
            ],
            [
                'Identify, analyze, and evaluate business risks.',
                'Develop risk mitigation and contingency plans.',
                'Implement enterprise risk management (ERM) frameworks.',
                'Understand regulatory compliance and governance.',
                'Conduct quantitative and qualitative risk assessments.',
                'Communicate risk profiles to executive leadership.'
            ],
            [
                'Understand legal frameworks governing business operations.',
                'Navigate contract law, intellectual property, and corporate governance.',
                'Advise on legal compliance and risk management.',
                'Draft and review legal documents.',
                'Manage corporate disputes and litigation.',
                'Ensure ethical business practices and regulatory adherence.'
            ]
        ],
        'Marketing': [
            [
                'Develop and execute comprehensive digital marketing strategies.',
                'Master SEO, SEM, social media, and email marketing.',
                'Analyze campaign performance using analytics tools.',
                'Optimize conversion funnels and user journeys.',
                'Manage digital advertising budgets and ROI.',
                'Stay current with emerging digital marketing trends.'
            ],
            [
                'Create engaging and valuable content across various platforms.',
                'Develop content calendars and editorial guidelines.',
                'Optimize content for search engines and user engagement.',
                'Measure content performance and audience reach.',
                'Craft compelling narratives that resonate with target audiences.',
                'Manage content distribution and promotion strategies.'
            ],
            [
                'Conduct keyword research and competitive analysis.',
                'Optimize website content and technical SEO elements.',
                'Manage paid search campaigns (PPC) on platforms like Google Ads.',
                'Analyze search performance and identify growth opportunities.',
                'Implement local SEO strategies for businesses.',
                'Stay updated with algorithm changes and best practices.'
            ],
            [
                'Develop and execute effective social media strategies.',
                'Grow audience engagement and community interaction.',
                'Manage social media advertising campaigns.',
                'Analyze social media metrics and ROI.',
                'Create viral content and trend-jacking strategies.',
                'Build brand presence and reputation across platforms.'
            ],
            [
                'Craft compelling brand narratives that connect with audiences.',
                'Develop brand voice, tone, and messaging guidelines.',
                'Utilize storytelling techniques across marketing channels.',
                'Build emotional connections between brands and consumers.',
                'Manage brand perception and public relations.',
                'Create memorable brand experiences.'
            ],
            [
                'Identify and vet suitable influencers for campaigns.',
                'Negotiate contracts and manage influencer relationships.',
                'Develop creative briefs and campaign strategies.',
                'Measure campaign effectiveness and ROI.',
                'Understand legal and ethical guidelines for influencer marketing.',
                'Build authentic brand partnerships.'
            ],
            [
                'Design and implement automated email marketing funnels.',
                'Segment audiences for targeted communication.',
                'Craft high-converting email copy and designs.',
                'Analyze email campaign metrics (open rates, click-throughs).',
                'Utilize A/B testing for continuous optimization.',
                'Integrate email marketing with CRM systems.'
            ],
            [
                'Design and conduct quantitative and qualitative research studies.',
                'Analyze market trends, consumer behavior, and competitive landscapes.',
                'Utilize survey tools, focus groups, and data analysis.',
                'Identify unmet customer needs and market opportunities.',
                'Present research findings and strategic recommendations.',
                'Understand ethical considerations in market research.'
            ],
            [
                'Implement rapid experimentation and iterative growth strategies.',
                'Identify and optimize growth levers across the customer lifecycle.',
                'Utilize A/B testing, data analysis, and automation.',
                'Develop viral loops and referral programs.',
                'Focus on scalable and cost-effective acquisition channels.',
                'Drive exponential user and revenue growth.'
            ],
            [
                'Develop and execute strategic PR campaigns.',
                'Build relationships with media, journalists, and key stakeholders.',
                'Craft compelling press releases and media kits.',
                'Manage crisis communications and reputation.',
                'Secure media coverage and brand mentions.',
                'Measure PR impact and brand sentiment.'
            ]
        ],
        'Design': [
            [
                'Apply fundamental UX/UI principles to digital product design.',
                'Conduct user research and create user personas.',
                'Design intuitive wireframes and interactive prototypes.',
                'Perform usability testing and iterate on designs.',
                'Master visual hierarchy, typography, and color theory.',
                'Create accessible and inclusive user interfaces.'
            ],
            [
                'Design engaging and intuitive user interactions.',
                'Create micro-interactions and animations that enhance user experience.',
                'Map user flows and define interaction patterns.',
                'Utilize prototyping tools to demonstrate dynamic interfaces.',
                'Understand cognitive psychology principles in design.',
                'Ensure seamless and delightful user journeys.'
            ],
            [
                'Apply the Design Thinking methodology to solve complex problems.',
                'Empathize with users and define their core needs.',
                'Ideate innovative solutions through brainstorming and sketching.',
                'Build and test prototypes rapidly.',
                'Collaborate effectively in interdisciplinary teams.',
                'Drive user-centered innovation from concept to implementation.'
            ],
            [
                'Plan and conduct various user research methods (interviews, surveys, usability tests).',
                'Analyze qualitative and quantitative data to uncover insights.',
                'Create user personas, journey maps, and empathy maps.',
                'Present research findings and actionable recommendations.',
                'Understand ethical considerations in user research.',
                'Validate design decisions with user feedback.'
            ],
            [
                'Design native mobile applications for iOS and Android platforms.',
                'Apply platform-specific design guidelines (Material Design, Human Interface Guidelines).',
                'Create responsive layouts and adaptive interfaces.',
                'Optimize for mobile gestures, touch targets, and performance.',
                'Utilize mobile prototyping tools.',
                'Understand mobile app development workflows.'
            ],
            [
                'Create interactive prototypes using industry-standard tools (Figma, Adobe XD, Sketch).',
                'Simulate user flows and test design concepts.',
                'Communicate design ideas effectively through interactive models.',
                'Gather user feedback on prototypes for iteration.',
                'Develop high-fidelity and low-fidelity prototypes.',
                'Master animation and transition design for prototypes.'
            ],
            [
                'Map end-to-end customer and service provider journeys.',
                'Identify touchpoints and pain points across service ecosystems.',
                'Design holistic service experiences that integrate digital and physical interactions.',
                'Utilize service blueprints and stakeholder maps.',
                'Improve operational efficiency and customer satisfaction.',
                'Innovate new service offerings.'
            ],
            [
                'Design digital products that are usable by people with disabilities.',
                'Apply Web Content Accessibility Guidelines (WCAG) standards.',
                'Conduct accessibility audits and testing.',
                'Implement inclusive design principles from the outset.',
                'Understand assistive technologies and their impact on user experience.',
                'Create accessible color palettes, typography, and interaction patterns.'
            ],
            [
                'Create engaging animations and transitions for user interfaces.',
                'Utilize motion to guide user attention and provide feedback.',
                'Master animation principles (timing, easing, anticipation).',
                'Work with tools like After Effects, Principle, or Figma\'s animation features.',
                'Enhance brand personality and user delight through motion.',
                'Integrate motion design into development workflows.'
            ],
            [
                'Organize and structure complex information for clarity and findability.',
                'Develop sitemaps, navigation systems, and content models.',
                'Conduct card sorting and tree testing for optimal structure.',
                'Improve user comprehension and task completion.',
                'Design intuitive categorization and labeling systems.',
                'Ensure information is logically presented and easily discoverable.'
            ]
        ],
        'Tech': [
            [
                'Develop and deploy machine learning models for various applications.',
                'Understand core AI concepts, algorithms, and data preprocessing.',
                'Utilize Python libraries (TensorFlow, PyTorch, Scikit-learn).',
                'Evaluate model performance and interpret results.',
                'Implement AI solutions for real-world problems.',
                'Understand ethical considerations in AI development.'
            ],
            [
                'Identify and mitigate common cybersecurity threats and vulnerabilities.',
                'Implement secure coding practices and network defense strategies.',
                'Conduct penetration testing and vulnerability assessments.',
                'Understand incident response and digital forensics.',
                'Comply with data protection regulations (e.g., GDPR, CCPA).',
                'Protect organizational assets from cyber attacks.'
            ],
            [
                'Develop decentralized applications (dApps) on blockchain platforms.',
                'Write and deploy smart contracts using Solidity.',
                'Understand blockchain fundamentals, consensus mechanisms, and cryptography.',
                'Integrate dApps with frontend interfaces.',
                'Secure smart contracts and manage blockchain transactions.',
                'Explore Web3 development tools and ecosystems.'
            ],
            [
                'Design and implement IoT solutions from sensor to cloud.',
                'Understand IoT architectures, protocols, and communication.',
                'Program microcontrollers and embedded systems.',
                'Manage data from IoT devices and build data pipelines.',
                'Address security and privacy concerns in IoT deployments.',
                'Develop applications for smart environments and industrial IoT.'
            ],
            [
                'Program robotic systems for automation and control.',
                'Understand kinematics, dynamics, and motion planning.',
                'Utilize robotic operating systems (ROS) and simulation tools.',
                'Integrate sensors and actuators for robotic perception and action.',
                'Develop algorithms for autonomous navigation and manipulation.',
                'Design human-robot interaction interfaces.'
            ],
            [
                'Understand the fundamentals of quantum mechanics and quantum computing.',
                'Program quantum algorithms using Qiskit or other frameworks.',
                'Explore quantum gates, superposition, and entanglement.',
                'Identify potential applications of quantum computing.',
                'Work with quantum simulators and hardware.',
                'Analyze the future impact of quantum technologies.'
            ],
            [
                'Design and develop interactive 2D and 3D games.',
                'Master game engines like Unity or Unreal Engine.',
                'Implement game mechanics, physics, and AI.',
                'Create engaging user interfaces and sound design.',
                'Understand game design principles and player psychology.',
                'Publish and optimize games for various platforms.'
            ],
            [
                'Lead and manage technical teams and projects.',
                'Develop technology strategies aligned with business goals.',
                'Manage software development lifecycles (SDLC).',
                'Optimize engineering processes and team productivity.',
                'Foster innovation and a culture of continuous improvement.',
                'Communicate technical concepts to non-technical stakeholders.'
            ],
            [
                'Develop immersive virtual and augmented reality experiences.',
                'Utilize platforms like Unity, Unreal Engine, or A-Frame.',
                'Design 3D environments, assets, and interactions.',
                'Understand spatial computing principles and user experience.',
                'Optimize performance for VR/AR hardware.',
                'Explore applications in training, entertainment, and industry.'
            ],
            [
                'Design and program embedded systems for specific functions.',
                'Work with microcontrollers, sensors, and actuators.',
                'Understand real-time operating systems (RTOS).',
                'Develop firmware and hardware-software interfaces.',
                'Debug and test embedded applications.',
                'Apply embedded systems in IoT, automotive, and industrial control.'
            ]
        ],
        'Vocational Skills': [
            [
                'Master advanced woodworking techniques and joinery.',
                'Read blueprints and execute complex structural framing.',
                'Utilize power tools and machinery safely and effectively.',
                'Construct custom furniture and architectural elements.',
                'Understand material properties and sustainable practices.',
                'Manage project timelines and client expectations.'
            ],
            [
                'Identify common pests and their life cycles.',
                'Apply integrated pest management (IPM) strategies.',
                'Utilize safe and effective pesticide application techniques.',
                'Comply with health, safety, and environmental regulations.',
                'Conduct thorough inspections and develop treatment plans.',
                'Provide client education on pest prevention.'
            ],
            [
                'Implement organic and regenerative farming practices.',
                'Manage soil health, crop rotation, and water conservation.',
                'Utilize sustainable pest and disease management.',
                'Understand agricultural economics and market access.',
                'Develop resilient food systems and reduce environmental impact.',
                'Apply modern farming technologies and data.'
            ],
            [
                'Install, maintain, and repair electrical wiring and systems.',
                'Read electrical blueprints and schematics.',
                'Comply with electrical codes and safety regulations.',
                'Troubleshoot electrical faults and perform diagnostics.',
                'Work with various electrical components and circuits.',
                'Ensure safe and reliable electrical infrastructure.'
            ],
            [
                'Install, repair, and maintain plumbing systems.',
                'Understand water supply, drainage, and waste disposal.',
                'Work with various piping materials and fixtures.',
                'Diagnose and fix plumbing issues (leaks, clogs).',
                'Comply with plumbing codes and safety standards.',
                'Provide efficient and reliable plumbing solutions.'
            ],
            [
                'Master various welding techniques (MIG, TIG, Stick).',
                'Read welding blueprints and specifications.',
                'Fabricate and repair metal structures and components.',
                'Ensure weld quality and structural integrity.',
                'Comply with safety protocols and industry standards.',
                'Work with different metals and alloys.'
            ],
            [
                'Design and construct custom garments from start to finish.',
                'Take accurate measurements and create patterns.',
                'Master sewing techniques and fabric manipulation.',
                'Perform alterations and repairs.',
                'Understand fashion trends and client preferences.',
                'Operate industrial sewing machines and equipment.'
            ],
            [
                'Construct and repair structures using bricks, blocks, and stone.',
                'Mix mortar and lay masonry units accurately.',
                'Read architectural drawings and specifications.',
                'Ensure structural stability and aesthetic quality.',
                'Comply with building codes and safety practices.',
                'Work with various masonry tools and materials.'
            ],
            [
                'Diagnose and repair automotive mechanical and electrical systems.',
                'Perform routine maintenance and inspections.',
                'Utilize diagnostic tools and equipment.',
                'Understand engine, transmission, brake, and suspension systems.',
                'Comply with safety procedures and environmental regulations.',
                'Provide reliable vehicle maintenance and repair services.'
            ],
            [
                'Design and install solar photovoltaic (PV) systems.',
                'Understand solar energy principles and system components.',
                'Perform site assessments and energy audits.',
                'Comply with electrical codes and safety standards for solar.',
                'Troubleshoot and maintain solar installations.',
                'Provide clean and renewable energy solutions.'
            ]
        ],
        'Visual Design': [
            [
                'Master the art and science of type selection and pairing.',
                'Apply advanced typographic principles to print and digital media.',
                'Create compelling visual hierarchies with type.',
                'Understand the history and evolution of typefaces.',
                'Design custom lettering and logotypes.',
                'Optimize typography for readability and aesthetic impact.'
            ],
            [
                'Develop comprehensive brand identities from concept to execution.',
                'Design memorable logos and visual brand assets.',
                'Create brand guidelines and style guides.',
                'Understand brand strategy and market positioning.',
                'Present brand concepts to clients effectively.',
                'Ensure brand consistency across all touchpoints.'
            ],
            [
                'Develop unique illustration styles and techniques.',
                'Create digital and traditional illustrations for various media.',
                'Master drawing, painting, and rendering skills.',
                'Utilize illustration software (Adobe Illustrator, Procreate).',
                'Communicate concepts and narratives through visual art.',
                'Build a professional illustration portfolio.'
            ],
            [
                'Prepare designs for professional print production.',
                'Understand color management (CMYK, Spot Colors) and file formats.',
                'Manage pre-press, printing, and finishing processes.',
                'Troubleshoot common print issues and ensure quality.',
                'Design for various print materials (brochures, packaging, posters).',
                'Work with print vendors and understand industry terminology.'
            ],
            [
                'Design layouts for magazines, books, and digital publications.',
                'Master grid systems, typography, and image placement.',
                'Create compelling covers and spreads.',
                'Understand editorial workflows and content integration.',
                'Utilize software like Adobe InDesign.',
                'Develop a strong sense of visual storytelling in long-form content.'
            ],
            [
                'Understand the psychological and physiological effects of color.',
                'Apply color theory principles to create harmonious palettes.',
                'Utilize color to evoke emotions and communicate meaning.',
                'Work with color models (RGB, CMYK, HSL) effectively.',
                'Conduct color accessibility checks (contrast ratios).',
                'Develop a sophisticated understanding of color in design.'
            ],
            [
                'Design innovative and functional packaging solutions.',
                'Understand material science, structural design, and print finishes.',
                'Create compelling visual branding for product packaging.',
                'Comply with regulatory labeling requirements.',
                'Develop 3D mockups and prototypes.',
                'Consider sustainability and consumer experience in packaging.'
            ],
            [
                'Master vector illustration techniques using tools like Adobe Illustrator.',
                'Create scalable graphics for logos, icons, and illustrations.',
                'Understand Bézier curves and path manipulation.',
                'Develop clean and precise vector artwork.',
                'Apply vector art in branding, web design, and print.',
                'Build a portfolio of professional vector illustrations.'
            ],
            [
                'Lead and inspire creative teams to deliver impactful campaigns.',
                'Develop overarching creative strategies and concepts.',
                'Provide constructive feedback and guide visual execution.',
                'Manage client relationships and project vision.',
                'Understand market trends and cultural insights.',
                'Articulate and defend creative decisions.'
            ],
            [
                'Master digital painting techniques and software (e.g., Photoshop, Procreate).',
                'Develop skills in color, light, composition, and anatomy.',
                'Create concept art, character designs, and environmental illustrations.',
                'Utilize digital brushes and layers effectively.',
                'Build a portfolio of professional digital paintings.',
                'Understand workflows for various digital art industries.'
            ]
        ],
        'Cloud Architecture': [
            [
                'Design and deploy scalable, highly available, and fault-tolerant solutions on AWS.',
                'Master core AWS services (EC2, S3, RDS, Lambda, VPC).',
                'Implement security best practices and cost optimization.',
                'Automate infrastructure with CloudFormation or Terraform.',
                'Monitor and troubleshoot AWS environments.',
                'Prepare for AWS certification exams.'
            ],
            [
                'Design and implement cloud infrastructure solutions on Microsoft Azure.',
                'Manage Azure compute, storage, networking, and identity services.',
                'Implement Azure security, governance, and monitoring.',
                'Automate deployments with Azure Resource Manager (ARM) templates.',
                'Migrate on-premises workloads to Azure.',
                'Prepare for Azure certification exams.'
            ],
            [
                'Design and deploy scalable and secure applications on Google Cloud Platform (GCP).',
                'Master core GCP services (Compute Engine, Cloud Storage, BigQuery, Kubernetes Engine).',
                'Implement GCP security, networking, and operations.',
                'Automate infrastructure with Deployment Manager or Terraform.',
                'Manage data analytics and machine learning on GCP.',
                'Prepare for Google Cloud certification exams.'
            ],
            [
                'Implement CI/CD pipelines for automated software delivery.',
                'Master version control (Git), containerization (Docker), and orchestration (Kubernetes).',
                'Automate infrastructure as code (IaC) with tools like Terraform.',
                'Implement continuous monitoring and logging.',
                'Foster collaboration between development and operations teams.',
                'Improve release frequency and system reliability.'
            ],
            [
                'Design and deploy serverless applications using AWS Lambda, Azure Functions, or Google Cloud Functions.',
                'Understand event-driven architectures and FaaS (Function as a Service).',
                'Optimize serverless costs and performance.',
                'Integrate serverless functions with other cloud services.',
                'Develop API gateways and backend services.',
                'Build scalable and cost-effective cloud solutions.'
            ],
            [
                'Implement robust security measures for cloud environments.',
                'Understand identity and access management (IAM) in the cloud.',
                'Protect data at rest and in transit.',
                'Conduct cloud security assessments and compliance audits.',
                'Respond to security incidents in cloud infrastructure.',
                'Master cloud-native security tools and services.'
            ],
            [
                'Containerize applications using Docker.',
                'Deploy and manage containerized workloads with Kubernetes.',
                'Understand Kubernetes architecture, pods, deployments, and services.',
                'Implement scaling, self-healing, and load balancing.',
                'Utilize Helm for package management.',
                'Orchestrate complex microservices architectures.'
            ],
            [
                'Design and implement hybrid cloud strategies.',
                'Integrate on-premises infrastructure with public cloud services.',
                'Manage data migration and synchronization between environments.',
                'Implement consistent networking and security policies.',
                'Optimize resource utilization and cost across hybrid setups.',
                'Develop disaster recovery and business continuity plans.'
            ],
            [
                'Develop and implement comprehensive disaster recovery (DR) plans.',
                'Design resilient architectures for business continuity.',
                'Utilize cloud services for backup, replication, and failover.',
                'Conduct DR testing and validation.',
                'Minimize downtime and data loss in critical events.',
                'Understand RTO (Recovery Time Objective) and RPO (Recovery Point Objective).'
            ],
            [
                'Plan and execute successful cloud migration strategies.',
                'Assess existing workloads and identify migration candidates.',
                'Choose appropriate migration patterns (rehost, refactor, re-platform).',
                'Manage data transfer, application refactoring, and testing.',
                'Optimize migrated applications for cloud performance and cost.',
                'Ensure minimal disruption during the migration process.'
            ]
        ],
        'Software Engineering': [
            [
                'Build complete web applications from frontend to backend.',
                'Master modern JavaScript frameworks (React, Angular, Vue).',
                'Develop robust backend APIs with Node.js, Python, or Ruby.',
                'Manage databases (SQL/NoSQL) and server deployments.',
                'Implement authentication, authorization, and security.',
                'Deploy and maintain fullstack applications in production.'
            ],
            [
                'Develop native or cross-platform mobile applications.',
                'Master Swift/Kotlin for native or React Native/Flutter for cross-platform.',
                'Design intuitive mobile user interfaces and experiences.',
                'Integrate with device features (camera, GPS, notifications).',
                'Test, debug, and deploy mobile apps to app stores.',
                'Understand mobile app lifecycle and performance optimization.'
            ],
            [
                'Design and implement scalable and performant backend services.',
                'Master programming languages like Python, Java, Go, or Node.js.',
                'Develop RESTful APIs and microservices architectures.',
                'Manage databases, caching, and message queues.',
                'Implement security, logging, and monitoring for backend systems.',
                'Optimize backend performance and reliability.'
            ],
            [
                'Design and optimize relational and NoSQL database schemas.',
                'Master SQL and advanced database querying.',
                'Implement database security, backup, and recovery strategies.',
                'Manage database performance tuning and scaling.',
                'Understand data modeling, warehousing, and ETL processes.',
                'Choose appropriate database technologies for specific use cases.'
            ],
            [
                'Design clear, consistent, and scalable RESTful and GraphQL APIs.',
                'Document APIs using OpenAPI/Swagger.',
                'Implement API authentication, authorization, and versioning.',
                'Understand API security best practices.',
                'Develop API gateways and rate limiting.',
                'Ensure API usability and developer experience.'
            ],
            [
                'Design large-scale, distributed software systems.',
                'Understand concepts like scalability, availability, and fault tolerance.',
                'Choose appropriate architectural patterns (microservices, event-driven).',
                'Design for data consistency, caching, and load balancing.',
                'Evaluate trade-offs between different design choices.',
                'Communicate complex system designs effectively.'
            ],
            [
                'Build highly interactive and responsive user interfaces.',
                'Master advanced JavaScript, HTML, and CSS techniques.',
                'Utilize modern frontend frameworks and libraries (React, Vue, Angular).',
                'Optimize web performance and accessibility.',
                'Implement state management and component-based architectures.',
                'Develop cross-browser compatible and pixel-perfect designs.'
            ],
            [
                'Develop and execute comprehensive test plans and test cases.',
                'Perform manual and automated testing (unit, integration, end-to-end).',
                'Utilize testing frameworks and tools.',
                'Identify, report, and track software defects.',
                'Implement continuous integration and continuous testing.',
                'Ensure software quality and reliability.'
            ],
            [
                'Master the Rust programming language for systems development.',
                'Understand memory safety, ownership, and borrowing.',
                'Develop high-performance, concurrent applications.',
                'Utilize Rust\'s package manager (Cargo) and ecosystem.',
                'Apply Rust in WebAssembly, embedded systems, and blockchain.',
                'Write robust and error-free code.'
            ],
            [
                'Develop robust and scalable enterprise applications using Java.',
                'Master Spring Framework, Spring Boot, and Hibernate.',
                'Design and implement microservices with Java.',
                'Work with relational databases and ORM tools.',
                'Understand Java EE concepts and application servers.',
                'Build secure and high-performance backend systems.'
            ]
        ]
    };
    const toolsList = ['Figma', 'VS Code', 'Python', 'Jira', 'Tableau', 'Slack', 'React', 'AWS', 'Docker', 'Kubernetes'];
    const courses = [];
    
    categories.forEach(cat => {
        titlesByCategory[cat].forEach((title, idx) => {
            courses.push({
                id: courses.length + 1,
                title: title,
                category: cat,
                duration: `${Math.floor(Math.random() * 8) + 4} Weeks`,
                type: idx % 2 === 0 ? 'Live Online' : 'Hybrid',
                tools: [toolsList[idx % toolsList.length], toolsList[(idx + 2) % toolsList.length]],
                outcome: outcomesByCategory[cat][idx],
                internship: idx % 3 === 0 ? 'Guaranteed 3-month internship' : 'Career placement support'
            });
        });
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

        const categoryImages = {
            'Business': '1460925895917-afdab827c52f',
            'Marketing': '1460925895917-afdab827c52f',
            'Design': '1586717791821-3f44a563eb4c',
            'Tech': '1519389950473-47ba0277781c',
            'Vocational Skills': '1504148455328-497c70107d93',
            'Visual Design': '1626785774573-4b799315345d',
            'Cloud Architecture': '1451187580459-43490279c0fa',
            'Software Engineering': '1555066931-4365d14bab8c'
        };

        const filtered = courses.filter(course => {
            const matchesCategory = currentCategory === 'All' || course.category === currentCategory;
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        coursesGrid.innerHTML = filtered.map(course => `
            <div class="bento-card p-6 rounded-[2.5rem] hover:shadow-xl hover:shadow-zinc-200/50 hover:border-yellow-400/50 transition-all duration-500 group cursor-pointer flex flex-col h-full relative overflow-hidden" data-id="${course.id}">
                <div class="aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100 border border-gray-100">
                    <img src="https://images.unsplash.com/photo-${categoryImages[course.category] || '1516321318423-f06f85e504b3'}?auto=format&fit=crop&q=80&w=800" 
                         class="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="${course.title}">
                </div>
                <div class="flex justify-between items-center mb-3">
                    <span class="bg-yellow-400 text-black text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest">${course.category}</span>
                    <span class="text-zinc-400 text-[10px] font-bold uppercase tracking-tighter">${course.duration}</span>
                </div>
                <h4 class="text-zinc-900 font-bold text-lg leading-tight group-hover:text-yellow-600 transition-colors mb-2">${course.title}</h4>
                <p class="text-zinc-500 text-sm mb-4 line-clamp-2">${course.outcome[0]}</p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${course.tools.map(tool => `<span class="bg-zinc-100 px-3 py-1 rounded-full text-xs font-medium text-zinc-600">${tool}</span>`).join('')}
                </div>

                <div class="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <a href="https://app.sabicrest.cc" class="text-yellow-600 text-[10px] font-black uppercase tracking-widest hover:underline">See Price</a>
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
        const detailContent = document.getElementById('detail-content');
        
        detailContent.innerHTML = `
            <div class="grid lg:grid-cols-3 gap-12">
                <div class="lg:col-span-2">
                    <span class="text-yellow-600 font-bold uppercase text-xs tracking-[0.2em] mb-4 block">${course.category}</span>
                    <h3 class="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tighter mb-4 md:mb-6">${course.title}</h3>
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
                        <div class="bg-zinc-50 border border-zinc-100 p-3 md:p-4 rounded-2xl">
                            <p class="text-[10px] uppercase font-bold text-zinc-400 mb-1">Duration</p>
                            <p class="font-bold text-zinc-900">${course.duration}</p>
                        </div>
                        <div class="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl">
                            <p class="text-[10px] uppercase font-bold text-zinc-400 mb-1">Format</p>
                            <p class="font-bold text-zinc-900">${course.type}</p>
                        </div>
                    </div>

                    <div class="space-y-8 md:space-y-12">
                        <section>
                            <h4 class="text-xl font-bold mb-3 italic">What you'll become</h4>
                            <ul class="list-disc pl-5 text-sm md:text-base text-zinc-600 leading-relaxed space-y-3">
                                ${course.outcome.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </section>

                        <section>
                            <h4 class="text-xl font-bold mb-3 italic">Tools you'll master</h4>
                            <div class="flex flex-wrap gap-2">
                                ${course.tools.map(tool => `<span class="bg-zinc-100 px-4 py-2 rounded-xl text-sm font-medium">${tool}</span>`).join('')}
                            </div>
                        </section>

                        <section class="bg-yellow-50 p-6 md:p-8 rounded-[2rem] border border-yellow-100">
                            <h4 class="text-xl font-bold mb-2">The Sabicrest Edge</h4>
                            <p class="text-yellow-800">${course.internship}. We don't just teach; we place you in the industry.</p>
                        </section>
                    </div>
                </div>

                <div class="lg:col-span-1">
                    <div class="bg-white border border-zinc-200 p-6 md:p-8 rounded-[2.5rem] lg:sticky lg:top-8 shadow-2xl shadow-zinc-200/50">
                        <p class="text-[10px] uppercase font-bold text-zinc-400 mb-4 tracking-widest">Admission Status</p>
                        <div class="mb-6">
                            <p class="text-2xl font-extrabold text-zinc-900">Open for Enrollment</p>
                        </div>
                        <a href="https://app.sabicrest.cc" class="block text-center w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all mb-4">See Price & Enroll</a>

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
            window.location.href = 'https://app.sabicrest.cc';
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
