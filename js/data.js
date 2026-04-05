// =============================================
//  MARGDARSHAK DATA — Edit via Admin Panel
//  All content stored in localStorage
// =============================================

const DEFAULTS = {

  contact: {
    address: "Near Collectorate, Main Road, Arrah, Bhojpur, Bihar — 802301",
    phone:   "+91 98765 43210 / +91 87654 32109",
    email:   "info@margdarshak.in",
    timing:  "Mon–Sat: 7:00 AM – 8:00 PM"
  },

  courses: [
    {
      id: 1, icon: "🧬", title: "NEET Preparation", subtitle: "Medical Entrance",
      tags: ["Physics","Chemistry","Biology"],
      features: ["Complete NCERT Coverage","1000+ Practice MCQs","Mock Test Series","Daily Doubt Classes","Previous Year Papers"],
      price: "₹45,000", per: "/ year"
    },
    {
      id: 2, icon: "⚙️", title: "JEE Preparation", subtitle: "Engineering Entrance",
      tags: ["Physics","Chemistry","Maths"],
      features: ["JEE Main + Advanced","Numerical Problem Bank","Weekly Mock Tests","Expert IIT Faculty","Online + Offline Support"],
      price: "₹48,000", per: "/ year"
    },
    {
      id: 3, icon: "📗", title: "Class 10th Board", subtitle: "BSEB / CBSE",
      tags: ["Science","Maths","Social"],
      features: ["All Subjects Covered","Chapter-wise Tests","Model Paper Practice","English Speaking Classes","Board Pattern Focus"],
      price: "₹18,000", per: "/ year"
    },
    {
      id: 4, icon: "📘", title: "Class 12th Board", subtitle: "BSEB / CBSE",
      tags: ["Science","Maths","English"],
      features: ["PCM / PCB Streams","Board Pattern Papers","Practical Guidance","Career Counselling","Revision Crash Course"],
      price: "₹22,000", per: "/ year"
    },
    {
      id: 5, icon: "🏗️", title: "Foundation Course", subtitle: "Class 8, 9, 10",
      tags: ["Maths","Science","English"],
      features: ["Olympiad Preparation","Concept Building","Logical Reasoning","Vedic Maths","Small Batch Size"],
      price: "₹12,000", per: "/ year"
    }
  ],

  fees: [
    {
      id: 1, title: "NEET Full Course", subtitle: "1 Year Program",
      amount: "45,000", period: "Per Year", featured: false,
      includes: ["Study Material Included","Test Series Included","Free Doubt Sessions","Online Access Included","Scholarship Available"]
    },
    {
      id: 2, title: "JEE Full Course", subtitle: "1 Year Program",
      amount: "48,000", period: "Per Year", featured: true, badge: "Most Popular",
      includes: ["JEE Main + Advanced","Study Material Included","Mock Test Series","Free Doubt Sessions","Online Portal Access"]
    },
    {
      id: 3, title: "Board Exam (10th)", subtitle: "Annual Program",
      amount: "18,000", period: "Per Year", featured: false,
      includes: ["All Subjects Covered","Notes Provided","Model Paper Tests","Parent Meetings","EMI Available"]
    },
    {
      id: 4, title: "Board Exam (12th)", subtitle: "Annual Program",
      amount: "22,000", period: "Per Year", featured: false,
      includes: ["PCM / PCB Stream","Complete Notes","Board Practice Papers","Career Counselling","EMI Available"]
    }
  ],

  results: [
    { id:1,  name:"Rahul Kumar",    exam:"NEET 2024",      rank:"AIR 1842",          year:"2024", emoji:"👨‍🎓" },
    { id:2,  name:"Priya Singh",    exam:"NEET 2024",      rank:"AIR 2210",          year:"2024", emoji:"👩‍🎓" },
    { id:3,  name:"Amit Pandey",    exam:"JEE Main 2024",  rank:"99.2 Percentile",   year:"2024", emoji:"👨‍🔬" },
    { id:4,  name:"Sneha Devi",     exam:"BSEB 12th",      rank:"State Topper",      year:"2024", emoji:"👩‍💻" },
    { id:5,  name:"Vikash Rajan",   exam:"JEE Main 2023",  rank:"98.8 Percentile",   year:"2023", emoji:"👨‍🏫" },
    { id:6,  name:"Anjali Kumari",  exam:"NEET 2023",      rank:"AIR 3104",          year:"2023", emoji:"👩‍⚕️" },
    { id:7,  name:"Rohit Sharma",   exam:"BSEB 10th",      rank:"District Topper",   year:"2024", emoji:"🧑‍🎓" },
    { id:8,  name:"Kavita Mishra",  exam:"NEET 2023",      rank:"AIR 4502",          year:"2023", emoji:"👩‍🔬" }
  ],

  facilities: [
    { id:1, icon:"fas fa-chalkboard", title:"Smart Classrooms",   desc:"AC classrooms with projectors, smart boards and digital learning resources." },
    { id:2, icon:"fas fa-book",       title:"Digital Library",     desc:"1000+ books, e-library access and past year question banks." },
    { id:3, icon:"fas fa-flask",      title:"Science Lab",         desc:"Fully equipped Physics, Chemistry and Biology laboratories." },
    { id:4, icon:"fas fa-wifi",       title:"High-Speed WiFi",     desc:"24x7 internet connectivity throughout the entire building." },
    { id:5, icon:"fas fa-home",       title:"Hostel Facility",     desc:"Separate secure hostels available for boys and girls." },
    { id:6, icon:"fas fa-bus",        title:"Transport",           desc:"Daily pickup and drop facility from all areas of the city." },
    { id:7, icon:"fas fa-utensils",   title:"Canteen",             desc:"Clean, affordable and nutritious food served daily." },
    { id:8, icon:"fas fa-video",      title:"CCTV Surveillance",   desc:"24x7 CCTV monitoring — a completely safe environment." }
  ],

  gallery: [
    { id:1, caption:"Annual Result Celebration 2024", img:"" },
    { id:2, caption:"Smart Classroom",                img:"" },
    { id:3, caption:"Science Laboratory",             img:"" },
    { id:4, caption:"Library",                        img:"" },
    { id:5, caption:"Students on Campus",             img:"" },
    { id:6, caption:"Award Ceremony",                 img:"" },
    { id:7, caption:"Sports Day",                     img:"" },
    { id:8, caption:"Faculty Meeting",                img:"" }
  ],

  notices: [
    { id:1, title:"Admission Open 2025-26",           desc:"Admissions are now open for NEET, JEE and Board courses. Enroll now to secure your seat.",        date:"01 Jan 2025", type:"urgent",  icon:"📢" },
    { id:2, title:"Free Demo Class",                  desc:"A free demo class for all courses will be held on 15 Jan. Call us to register your spot.",         date:"10 Jan 2025", type:"normal",  icon:"🎓" },
    { id:3, title:"Scholarship Test — 20 Jan",        desc:"Merit-based scholarship test. Top 10 students will receive up to 50% fee waiver.",                 date:"12 Jan 2025", type:"success", icon:"🏆" },
    { id:4, title:"NEET Mock Test Series Starts",     desc:"Weekly mock test series for the NEET 2025 batch begins from 1st February.",                        date:"15 Jan 2025", type:"normal",  icon:"📝" },
    { id:5, title:"New Batch — JEE Mains Feb 2025",  desc:"Intensive batch for JEE Mains starts 5th Feb. Limited seats available — register soon.",           date:"18 Jan 2025", type:"urgent",  icon:"⚡" }
  ],

  testimonials: [
    { name:"Rahul Kumar",   course:"NEET 2024",      text:"Margdarshak truly changed my life. The teachers are extremely dedicated and patiently clear every doubt without fail.", stars:5, emoji:"👨‍🎓" },
    { name:"Priya Singh",   course:"NEET 2024",      text:"I had never found such good coaching in Bihar before. The study material and test series were incredibly helpful.",      stars:5, emoji:"👩‍🎓" },
    { name:"Amit Pandey",   course:"JEE Main 2024",  text:"I scored 99+ percentile in JEE. This would not have been possible without Margdarshak. The faculty deserves full credit.", stars:5, emoji:"👨‍🔬" },
    { name:"Sneha Devi",    course:"BSEB 12th 2024", text:"I became State Topper and all credit goes to Margdarshak. Regular classes and practice tests built my confidence.",        stars:5, emoji:"👩‍💻" },
    { name:"Vikash Rajan",  course:"JEE 2023",       text:"The entire faculty is very supportive. Doubt sessions were available even on weekends. A truly great experience.",          stars:5, emoji:"👨‍🏫" }
  ]
};

// =============================================
//  STORAGE HELPERS
// =============================================
function getData(key) {
  try {
    const stored = localStorage.getItem('mg_' + key);
    return stored ? JSON.parse(stored) : DEFAULTS[key];
  } catch { return DEFAULTS[key]; }
}
function saveData(key, value) {
  localStorage.setItem('mg_' + key, JSON.stringify(value));
}
function resetAllData() {
  Object.keys(DEFAULTS).forEach(k => localStorage.removeItem('mg_' + k));
}