export const mockEvents = [
  {
    id: 1,
    name: "TechFest 2025",
    college: "MIT Manipal",
    price: 299,
    date: "2025-11-15",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    description: "Annual technical festival featuring hackathons, workshops, and tech talks from industry leaders.",
    organizer: "IEEE Student Chapter",
    venue: "MIT Auditorium, Manipal",
    stages: [
      { name: "Registration Open", date: "2025-10-15", status: "completed" },
      { name: "Team Formation Deadline", date: "2025-11-01", status: "completed" },
      { name: "Prelims - Day 1", date: "2025-11-15", status: "upcoming" },
      { name: "Semi-Finals - Day 2", date: "2025-11-16", status: "upcoming" },
      { name: "Finals - Day 3", date: "2025-11-17", status: "upcoming" }
    ],
    lat: 13.3489,
    lng: 74.7930,
    category: "Technical",
    requiresTeam: true,
    teamSize: { min: 2, max: 4 },
    attachments: [
      {
        name: "Event RuleBook",
        url: "/images/RuleBook (2).pdf",
        pages: 12,
        description: "Complete rules and regulations for TechFest 2025"
      }
    ]
  },
  {
    id: 2,
    name: "Cultural Carnival",
    college: "Christ University",
    price: 199,
    date: "2025-11-20",
    time: "6:00 PM",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    description: "A vibrant celebration of art, music, dance, and drama featuring performances from across the country.",
    organizer: "Cultural Committee",
    venue: "Christ University Campus, Bangalore",
    stages: [
      { name: "Early Bird Registration", date: "2025-10-01", status: "completed" },
      { name: "Opening Ceremony", date: "2025-11-20", status: "upcoming" },
      { name: "Competitions", date: "2025-11-21", status: "upcoming" },
      { name: "Grand Finale", date: "2025-11-22", status: "upcoming" }
    ],
    lat: 12.9352,
    lng: 77.6072,
    category: "Cultural",
    requiresTeam: false
  },
  {
    id: 3,
    name: "Startup Summit",
    college: "IIT Bombay",
    price: 499,
    date: "2025-11-25",
    time: "9:00 AM",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
    description: "Connect with entrepreneurs, investors, and industry experts. Pitch competitions and networking sessions.",
    organizer: "E-Cell IIT Bombay",
    venue: "Convocation Hall, IIT Bombay",
    stages: [
      { name: "Registration Opens", date: "2025-10-10", status: "completed" },
      { name: "Team Registration Closes", date: "2025-11-10", status: "completed" },
      { name: "Registration & Networking", date: "2025-11-25", status: "upcoming" },
      { name: "Pitch Sessions", date: "2025-11-25", status: "upcoming" },
      { name: "Awards Ceremony", date: "2025-11-26", status: "upcoming" }
    ],
    lat: 19.1334,
    lng: 72.9133,
    category: "Academic",
    requiresTeam: true,
    teamSize: { min: 3, max: 5 }
  },
  {
    id: 4,
    name: "Hackathon 48",
    college: "BITS Pilani",
    price: 0,
    date: "2025-12-01",
    time: "8:00 AM",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    description: "48-hour coding marathon with exciting prizes and mentorship from tech giants.",
    organizer: "ACM BITS Chapter",
    venue: "Computer Science Block, BITS Pilani",
    stages: [
      { name: "Registration Begins", date: "2025-11-01", status: "active" },
      { name: "Team Formation Deadline", date: "2025-11-25", status: "upcoming" },
      { name: "Problem Statement Release", date: "2025-12-01", status: "upcoming" },
      { name: "Development Phase", date: "2025-12-02", status: "upcoming" },
      { name: "Final Presentations", date: "2025-12-03", status: "upcoming" }
    ],
    lat: 28.3636,
    lng: 75.5850,
    category: "Technical",
    requiresTeam: true,
    teamSize: { min: 2, max: 4 }
  },
  {
    id: 5,
    name: "Music Fest Live",
    college: "Delhi University",
    price: 349,
    date: "2025-12-05",
    time: "5:00 PM",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    description: "Live performances by indie bands, classical musicians, and DJ sets throughout the night.",
    organizer: "Music Society DU",
    venue: "North Campus Grounds, Delhi",
    stages: [
      { name: "Ticket Sales Open", date: "2025-11-01", status: "active" },
      { name: "Opening Acts", date: "2025-12-05", status: "upcoming" },
      { name: "Main Performances", date: "2025-12-05", status: "upcoming" },
      { name: "DJ Night", date: "2025-12-05", status: "upcoming" }
    ],
    lat: 28.6884,
    lng: 77.2134,
    category: "Cultural",
    requiresTeam: false
  },
  {
    id: 6,
    name: "Robotics Workshop",
    college: "NIT Trichy",
    price: 149,
    date: "2025-12-10",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    description: "Hands-on workshop on robotics, automation, and AI. Build your own robot!",
    organizer: "Robotics Club NIT",
    venue: "Engineering Lab, NIT Trichy",
    stages: [
      { name: "Registration Opens", date: "2025-11-15", status: "active" },
      { name: "Introduction to Robotics", date: "2025-12-10", status: "upcoming" },
      { name: "Hands-on Building", date: "2025-12-10", status: "upcoming" },
      { name: "Competition Round", date: "2025-12-11", status: "upcoming" }
    ],
    lat: 10.7554,
    lng: 78.7133,
    category: "Technical",
    requiresTeam: false
  }
];