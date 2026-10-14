export type Locale = 'es' | 'en'

export interface Translations {
  nav: {
    whoami: string
    stack: string
    experience: string
    education: string
    projects: string
    connect: string
  }
  hero: {
    title: string
    command: string
    path: string
    name: string
    role: string
    location: string
    experienceValue: string
    fullstackValue: string
    missionValue: string
    certsLine: string
    bio: string
  }
  stack: {
    title: string
    command: string
    path: string
    groups: {
      folder: string
      files: { name: string; icon: string }[]
    }[]
  }
  experience: {
    title: string
    heading: string
    command: string
    path: string
    jobs: {
      company: string
      role: string
      period: string
      bullets: string[]
    }[]
  }
  education: {
    title: string
    heading: string
    command: string
    path: string
    academicTitle: string
    academic: { institution: string; title: string; date: string }[]
    certTitle: string
    certs: { institution: string; title: string; date: string }[]
    profileTitle: string
    softSkills: string[]
    languagesLabel: string
    languages: string
  }
  projects: {
    title: string
    heading: string
    command: string
    path: string
    totalLabel: string
    items: {
      slug: string
      name: string
      description: string
      stack: string
      repo: string
      language: string
    }[]
  }
  contact: {
    title: string
    heading: string
    command: string
    path: string
    tagline: string
    links: { label: string; href: string }[]
    footer: string
  }
}

export const translations: Record<Locale, Translations> = {
  es: {
    nav: {
      whoami: 'whoami',
      stack: 'tech-stack',
      experience: 'experience',
      education: 'education',
      projects: 'projects',
      connect: 'connect',
    },
    hero: {
      title: 'Perfil',
      command: 'whoami',
      path: '~/rafarenasdev',
      name: 'rafarenasdev',
      role: 'Full Stack Developer',
      location: 'Dosquebradas, Risaralda, Colombia',
      experienceValue: '3+ años de experiencia profesional en desarrollo de software',
      fullstackValue: 'React · Angular · Node.js · Laravel · Flutter',
      missionValue: 'construir productos seguros, escalables y listos para producción',
      certsLine: 'Cisco (Hacker Ético, CyberOps Associate, Cyber Threat Mgmt)',
      bio: 'Construyo interfaces y APIs con React, Angular, Node.js, Laravel y Flutter, con base sólida en PostgreSQL, SQL Server y SQLite, y experiencia real gestionando incidentes críticos en producción.',
    },
    stack: {
      title: 'Stack Tecnológico',
      command: 'tree tech-stack/ -L 2',
      path: '~/rafarenasdev/tech-stack',
      groups: [
        {
          folder: 'frontend_mobile/',
          files: [
            { name: 'react.tsx', icon: 'react' },
            { name: 'angular.ts', icon: 'angular' },
            { name: 'flutter.dart', icon: 'flutter' },
            { name: 'typescript.ts', icon: 'ts' },
            { name: 'javascript.js', icon: 'js' },
          ],
        },
        {
          folder: 'backend/',
          files: [
            { name: 'node.js', icon: 'nodejs' },
            { name: 'laravel.php', icon: 'laravel' },
            { name: 'zend.php', icon: 'php' },
            { name: 'python.py', icon: 'python' },
            { name: 'csharp.cs', icon: 'cs' },
            { name: 'java.java', icon: 'java' },
          ],
        },
        {
          folder: 'databases/',
          files: [
            { name: 'postgres.sql', icon: 'postgres' },
            { name: 'sqlserver.sql', icon: '' },
            { name: 'sqlite.db', icon: 'sqlite' },
          ],
        },
        {
          folder: 'devops_tools/',
          files: [
            { name: 'git', icon: 'git' },
            { name: 'docker', icon: 'docker' },
            { name: 'deploy.yml', icon: 'githubactions' },
            { name: 'vite.config.js', icon: 'vite' },
          ],
        },
      ],
    },
    experience: {
      title: 'Experiencia',
      heading: '$ cat experience.log',
      command: 'cat experience.log',
      path: '~/rafarenasdev/experience.log',
      jobs: [
        {
          company: 'RAPPI S.A.S',
          role: 'Rappi Maker Tech Support',
          period: '2025-12 .. actualmente',
          bullets: [
            'Gestiono incidentes críticos de producción aplicando SLA por nivel de criticidad (Low, Medium, High, Critical), garantizando la continuidad operativa del negocio.',
            'Ejecuto consultas SQL sobre bases de datos de producción (PostgreSQL) para diagnóstico, validación y resolución de incidencias.',
            'Contribuyo en el desarrollo, actualización y mantenimiento de funcionalidades y workflows operativos, colaborando estrechamente con equipos de ingeniería.',
            'Superviso y priorizo el escalamiento de incidentes críticos entre equipos técnicos multidisciplinarios.',
            'Documento procesos de mejora continua orientados a la eficiencia operativa y la reducción de tiempos de resolución.',
          ],
        },
        {
          company: 'RECAUDOS INTEGRADOS S.A.S',
          role: 'Analista de Soporte',
          period: '2023-07 .. 2025-07',
          bullets: [
            'Desarrollé y mantuve funcionalidades fullstack en aplicativos legacy y modernos utilizando PHP/Zend Framework, Angular y Node.js.',
            'Ejecuté consultas y scripts de optimización sobre PostgreSQL, SQL Server y SQLite para análisis de datos y mejora de rendimiento.',
            'Realicé deployments a producción y administré servidores, asegurando la disponibilidad y estabilidad de los sistemas.',
            'Desarrollé módulos de aplicaciones móviles con Flutter (Dart).',
            'Brindé soporte técnico fullstack, resolviendo incidencias críticas en componentes frontend y backend.',
            'Participé en el levantamiento de requerimientos con clientes y en la documentación técnica de soluciones.',
          ],
        },
        {
          company: 'RECAUDOS INTEGRADOS S.A.S',
          role: 'Aprendiz SENA (Prácticas Profesionales)',
          period: '2023-01 .. 2023-07',
          bullets: [
            'Contribuí en el desarrollo e implementación de nuevas funcionalidades utilizando PHP/Zend Framework, Angular y Node.js.',
            'Realicé mantenimiento y optimización de bases de datos relacionales (PostgreSQL, SQL Server).',
            'Proporcioné soporte técnico a aplicativos internos backend y frontend.',
            'Colaboré en documentación técnica y pruebas funcionales de las aplicaciones desarrolladas.',
          ],
        },
      ],
    },
    education: {
      heading: '$ cat education.yaml',
      title: 'Educación',
      command: 'cat education.yaml',
      path: '~/rafarenasdev/education.yaml',
      academicTitle: 'formal_education:',
      academic: [
        { institution: 'Fundación Universitaria del Área Andina', title: 'Ingeniería de Sistemas', date: '2026-08' },
        { institution: 'SENA', title: 'Tecnología en Análisis y Desarrollo de Sistemas de Información', date: '2023-08' },
      ],
      certTitle: 'certifications:',
      certs: [
        { institution: 'Cisco Networking Academy', title: 'Hacker Ético', date: '2026-01' },
        { institution: 'Cisco Networking Academy', title: 'CyberOps Associate', date: '2026-01' },
      ],
      profileTitle: 'soft_skills:',
      softSkills: [
        'Resolución de problemas y pensamiento analítico',
        'Trabajo en equipo y colaboración multidisciplinaria',
        'Comunicación efectiva y atención al cliente',
        'Adaptabilidad y gestión del cambio',
        'Aprendizaje continuo y autodesarrollo',
      ],
      languagesLabel: 'languages:',
      languages: 'Español (nativo) · Inglés (B1)',
    },
    projects: {
      title: 'Proyectos',
      heading: '$ tree projects/ -L 2',
      command: 'tree projects/ -L 2',
      path: '~/rafarenasdev/projects',
      totalLabel: 'directorios',
      items: [
        {
          slug: 'nestwork',
          name: 'Nestwork',
          description: 'Chat interno B2B en tiempo real para equipos, con cifrado de extremo a extremo en desarrollo.',
          stack: 'Laravel · React · TypeScript',
          repo: 'RafArenasDev/Nestwork',
          language: 'TypeScript',
        },
        {
          slug: 'inventory-manager',
          name: 'Inventory-Manager',
          description: 'Sistema de inventario y punto de venta: roles, categorías, productos, movimientos, pedidos y proveedores.',
          stack: 'Laravel · React · TypeScript',
          repo: 'RafArenasDev/Inventory-Manager',
          language: 'TypeScript',
        },
        {
          slug: 'kardux-battle',
          name: 'Kardux-Battle',
          description: 'Top Trumps de cartas Pokémon multijugador, con rating Elo real y partidas en vivo.',
          stack: 'React · Node.js · TypeScript',
          repo: 'RafArenasDev/Kardux-Battle',
          language: 'TypeScript',
        },
      ],
    },
    contact: {
      title: 'Contacto',
      heading: '$ ./connect.sh --socials',
      command: './connect.sh --socials',
      path: '~/rafarenasdev/connect.sh',
      tagline: 'Abierto a oportunidades como Full Stack Developer.',
      links: [
        { label: 'GitHub', href: 'https://github.com/RafArenasDev' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rafael-arenas-dev/' },
        { label: 'Email', href: 'mailto:rjar326@gmail.com' },
      ],
      footer: 'Hecho con React + TypeScript desde Dosquebradas, Colombia · @RafArenasDev',
    },
  },
  en: {
    nav: {
      whoami: 'whoami',
      stack: 'tech-stack',
      experience: 'experience',
      education: 'education',
      projects: 'projects',
      connect: 'connect',
    },
    hero: {
      title: 'Profile',
      command: 'whoami',
      path: '~/rafarenasdev',
      name: 'rafarenasdev',
      role: 'Full Stack Developer',
      location: 'Dosquebradas, Risaralda, Colombia',
      experienceValue: '3+ years of professional software development experience',
      fullstackValue: 'React · Angular · Node.js · Laravel · Flutter',
      missionValue: 'build secure, scalable, production-ready products',
      certsLine: 'Cisco (Ethical Hacking, CyberOps Associate, Cyber Threat Mgmt)',
      bio: 'I build interfaces and APIs with React, Angular, Node.js, Laravel and Flutter, backed by solid PostgreSQL, SQL Server and SQLite experience, plus hands-on critical-incident management in production.',
    },
    stack: {
      title: 'Tech Stack',
      command: 'tree tech-stack/ -L 2',
      path: '~/rafarenasdev/tech-stack',
      groups: [
        {
          folder: 'frontend_mobile/',
          files: [
            { name: 'react.tsx', icon: 'react' },
            { name: 'angular.ts', icon: 'angular' },
            { name: 'flutter.dart', icon: 'flutter' },
            { name: 'typescript.ts', icon: 'ts' },
            { name: 'javascript.js', icon: 'js' },
          ],
        },
        {
          folder: 'backend/',
          files: [
            { name: 'node.js', icon: 'nodejs' },
            { name: 'laravel.php', icon: 'laravel' },
            { name: 'zend.php', icon: 'php' },
            { name: 'python.py', icon: 'python' },
            { name: 'csharp.cs', icon: 'cs' },
            { name: 'java.java', icon: 'java' },
          ],
        },
        {
          folder: 'databases/',
          files: [
            { name: 'postgres.sql', icon: 'postgres' },
            { name: 'sqlserver.sql', icon: '' },
            { name: 'sqlite.db', icon: 'sqlite' },
          ],
        },
        {
          folder: 'devops_tools/',
          files: [
            { name: 'git', icon: 'git' },
            { name: 'docker', icon: 'docker' },
            { name: 'deploy.yml', icon: 'githubactions' },
            { name: 'vite.config.js', icon: 'vite' },
          ],
        },
      ],
    },
    experience: {
      title: 'Experience',
      heading: '$ cat experience.log',
      command: 'cat experience.log',
      path: '~/rafarenasdev/experience.log',
      jobs: [
        {
          company: 'RAPPI S.A.S',
          role: 'Rappi Maker Tech Support',
          period: '2025-12 .. present',
          bullets: [
            'Manage critical production incidents applying SLAs by severity level (Low, Medium, High, Critical), ensuring business continuity.',
            'Run SQL queries against production databases (PostgreSQL) for diagnosis, validation and incident resolution.',
            'Contribute to the development, updates and maintenance of operational features and workflows alongside engineering teams.',
            'Oversee and prioritize the escalation of critical incidents across multidisciplinary technical teams.',
            'Document continuous-improvement processes aimed at operational efficiency and reduced resolution times.',
          ],
        },
        {
          company: 'RECAUDOS INTEGRADOS S.A.S',
          role: 'Support Analyst',
          period: '2023-07 .. 2025-07',
          bullets: [
            'Built and maintained fullstack features across legacy and modern apps using PHP/Zend Framework, Angular and Node.js.',
            'Ran optimization queries and scripts on PostgreSQL, SQL Server and SQLite for data analysis and performance improvements.',
            'Performed production deployments and server administration, ensuring system availability and stability.',
            'Developed mobile app modules with Flutter (Dart).',
            'Provided fullstack technical support, resolving critical incidents across frontend and backend components.',
            'Took part in requirements gathering with clients and technical documentation of solutions.',
          ],
        },
        {
          company: 'RECAUDOS INTEGRADOS S.A.S',
          role: 'SENA Apprentice (Professional Internship)',
          period: '2023-01 .. 2023-07',
          bullets: [
            'Contributed to the development and implementation of new features using PHP/Zend Framework, Angular and Node.js.',
            'Performed maintenance and optimization of relational databases (PostgreSQL, SQL Server).',
            'Provided technical support for internal backend and frontend applications.',
            'Collaborated on technical documentation and functional testing of the applications built.',
          ],
        },
      ],
    },
    education: {
      title: 'Education',
      heading: '$ cat education.yaml',
      command: 'cat education.yaml',
      path: '~/rafarenasdev/education.yaml',
      academicTitle: 'formal_education:',
      academic: [
        { institution: 'Fundación Universitaria del Área Andina', title: 'Systems Engineering', date: '2026-08' },
        { institution: 'SENA', title: 'Information Systems Analysis & Development', date: '2023-08' },
      ],
      certTitle: 'certifications:',
      certs: [
        { institution: 'Cisco Networking Academy', title: 'Ethical Hacking', date: '2026-01' },
        { institution: 'Cisco Networking Academy', title: 'CyberOps Associate', date: '2026-01' },
      ],
      profileTitle: 'soft_skills:',
      softSkills: [
        'Problem-solving and analytical thinking',
        'Teamwork and multidisciplinary collaboration',
        'Effective communication and client care',
        'Adaptability and change management',
        'Continuous learning and self-development',
      ],
      languagesLabel: 'languages:',
      languages: 'Spanish (native) · English (B1)',
    },
    projects: {
      title: 'Projects',
      heading: '$ tree projects/ -L 2',
      command: 'tree projects/ -L 2',
      path: '~/rafarenasdev/projects',
      totalLabel: 'directories',
      items: [
        {
          slug: 'nestwork',
          name: 'Nestwork',
          description: 'Real-time internal B2B chat for teams, with end-to-end encryption in progress.',
          stack: 'Laravel · React · TypeScript',
          repo: 'RafArenasDev/Nestwork',
          language: 'TypeScript',
        },
        {
          slug: 'inventory-manager',
          name: 'Inventory-Manager',
          description: 'Inventory and point-of-sale system: roles, categories, products, movements, orders and suppliers.',
          stack: 'Laravel · React · TypeScript',
          repo: 'RafArenasDev/Inventory-Manager',
          language: 'TypeScript',
        },
        {
          slug: 'kardux-battle',
          name: 'Kardux-Battle',
          description: 'Multiplayer Pokémon Top Trumps card game, with a real Elo rating and live matches.',
          stack: 'React · Node.js · TypeScript',
          repo: 'RafArenasDev/Kardux-Battle',
          language: 'TypeScript',
        },
      ],
    },
    contact: {
      title: 'Contact',
      heading: '$ ./connect.sh --socials',
      command: './connect.sh --socials',
      path: '~/rafarenasdev/connect.sh',
      tagline: 'Open to opportunities as a Full Stack Developer.',
      links: [
        { label: 'GitHub', href: 'https://github.com/RafArenasDev' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rafael-arenas-dev/' },
        { label: 'Email', href: 'mailto:rjar326@gmail.com' },
      ],
      footer: 'Built with React + TypeScript from Dosquebradas, Colombia · @RafArenasDev',
    },
  },
}
