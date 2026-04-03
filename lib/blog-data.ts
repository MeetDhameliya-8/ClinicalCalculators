export interface BlogPost {
  id: string
  title: string
  description: string
  author: {
    name: string
    avatar?: string
  }
  image: string
  date: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "clinical-intelligence-future",
    title: "The Future of Clinical Intelligence: How AI is Transforming Gastroenterology",
    description: "Clinical decisions are becoming more precise through the integration of evidence-based AI tools. Explore how GastroAGI is leading the charge in hepatology and gastroenterology with intelligent clinical suite solutions.",
    author: {
      name: "GastroAGI",
      avatar: "/placeholder-user.jpg"
    },
    image: "/blog/blog-1.png",
    date: "March 24, 2024",
    readTime: "6 min read"
  },
  {
    id: "data-driven-digestive-health",
    title: "Data-Driven Digestive Health: Precision Medicine in Gut Care",
    description: "Precision medical data visualization for human digestive health. We take a deep dive into how abstract data becomes actionable intelligence for clinicians using award-winning digital healthcare design.",
    author: {
      name: "GastroAGI",
      avatar: "/placeholder-user.jpg"
    },
    image: "/blog/blog-2.png",
    date: "March 20, 2024",
    readTime: "8 min read"
  },
  {
    id: "futuristic-lab-ai",
    title: "Sleek Digital Suites: The New Gold Standard for Clinical Labs",
    description: "Futuristic lab environments are no longer just for sci-fi. Modern clinical AI interfaces are bringing a new level of professionalism and efficiency to healthcare practitioners globally.",
    author: {
      name: "GastroAGI",
      avatar: "/placeholder-user.jpg"
    },
    image: "/blog/blog-3.png",
    date: "March 15, 2024",
    readTime: "5 min read"
  }
]
