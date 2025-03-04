import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

const users = [
  {
    id: 1,
    name: "David McHenry",
    designation: "UI/UX Designer",
    phone: "1234567890",
    color: "primary",
    email: "david@skote.com",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 2,
    img: avatar2,
    name: "Frank Kirk",
    designation: "Frontend Developer",
    email: "frank@skote.com",
    phone: "1234567890",
    projects: "132",
    tags: ["Html", "Css", "Php"],
  },
  {
    id: 3,
    img: avatar3,
    name: "Rafael Morales",
    designation: "Backend Developer",
    phone: "1234567890",
    email: "Rafael@skote.com",
    projects: "1112",
    tags: ["Php", "Java", "Python", "Html"],
  },
  {
    id: 4,
    name: "Mark Ellison",
    designation: "Full Stack Developer",
    color: "success",
    phone: "1234567890",
    email: "mark@skote.com",
    projects: "121",
    tags: ["Ruby", "Php", "UI/UX Designer"],
  },
  {
    id: 5,
    img: avatar4,
    name: "Minnie Walter",
    designation: "Frontend Developer",
    phone: "1234567890",
    email: "minnie@skote.com",
    projects: "145",
    tags: ["Html", "Css", "Java"],
  },
  {
    id: 6,
    img: avatar5,
    name: "Shirley Smith",
    designation: "UI/UX Designer",
    email: "shirley@skote.com",
    phone: "1234567890",
    projects: "136",
    tags: ["Photoshop", "illustrator"],
    phone: "1234567890",
  },
  {
    id: 7,
    name: "John Santiago",
    designation: "Full Stack Developer",
    color: "info",
    email: "john@skote.com",
    projects: "125",
    phone: "1234567890",
    tags: ["Ruby", "Php", "Java"],
  },
  {
    id: 8,
    img: avatar7,
    name: "Colin Melton",
    designation: "Backend Developer",
    color: "",
    email: "colin@skote.com",
    phone: "1234567890",
    projects: "136",
    tags: ["Php", "Java", "Python"],
  },
]
const userProfile1 = {
  id: 1,
  name: "Cynthia Price",
  designation: "UI/UX Designer",
  img: avatar1,
  projectCount: 125,
  revenue: 1245,
  personalDetail:
    "Hi I'm Cynthia Price,has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.",
  phone: "(123) 123 1234",
  email: "cynthiaskote@gmail.com",
  location: "California, United States",
  experiences: [
    {
      id: 1,
      iconClass: "bx-server",
      link: "#",
      designation: "Back end Developer",
      timeDuration: "2016 - 19",
    },
    {
      id: 2,
      iconClass: "bx-code",
      link: "#",
      designation: "Front end Developer",
      timeDuration: "2013 - 16",
    },
    {
      id: 3,
      iconClass: "bx-edit",
      link: "#",
      designation: "UI /UX Designer",
      timeDuration: "2011 - 13",
    },
  ],
  projects: [
    {
      id: 1,
      name: "Skote admin UI",
      startDate: "2 Sep, 2019",
      deadline: "20 Oct, 2019",
      budget: "$506",
    },
    {
      id: 2,
      name: "Skote admin Logo",
      startDate: "1 Sep, 2019",
      deadline: "2 Sep, 2019",
      budget: "$94",
    },
    {
      id: 3,
      name: "Redesign - Landing page",
      startDate: "21 Sep, 2019",
      deadline: "29 Sep, 2019",
      budget: "$156",
    },
    {
      id: 4,
      name: "App Landing UI",
      startDate: "29 Sep, 2019",
      deadline: "04 Oct, 2019",
      budget: "$122",
    },
    {
      id: 5,
      name: "Blog Template",
      startDate: "05 Oct, 2019",
      deadline: "16 Oct, 2019",
      budget: "$164",
    },
    {
      id: 6,
      name: "Redesign - Multipurpose Landing",
      startDate: "17 Oct, 2019",
      deadline: "05 Nov, 2019",
      budget: "$192",
    },
    {
      id: 7,
      name: "Logo Branding",
      startDate: "04 Nov, 2019",
      deadline: "05 Nov, 2019",
      budget: "$94",
    },
  ],
}

const Candidate = [
  {
      id: 1,
      img: avatar1,
      name: "Steven Franklin",
      designation: "UI/UX Designer",
      location: "Louisiana",
      experience: "38",
      skills: ["Bootstrap", "HTML", "CSS"],
      type: "Full Time",
  },
  {
      id: 2,
      img: avatar2,
      name: "Dolores Minter",
      designation: "Assistant / Shope Keeper",
      location: "Hong-Kong",
      experience: "25",
      skills: ["Shope", "Assistant"],
      type: "Freelance",
  },
  {
      id: 3,
      img: avatar3,
      name: "Charles Brown",
      designation: "Web Designer",
      location: "Finlande",
      experience: "24",
      skills: ["Bootstrap", "HTML", "SASS"],
      type: "Part Time",
  },
  {
      id: 4,
      img: avatar4,
      name: "Bonnie Harney",
      designation: "Web Developer",
      location: "France",
      experience: "47",
      skills: ["MYSQL", "PHP", "Laravel"],
      type: "Internship",
  },
  {
      id: 5,
      img: avatar5,
      name: "Stephen Hadley",
      designation: "Graphic Designer",
      location: "Danemark",
      experience: "83",
      skills: ["Figma", "Adobe XD", "Sketch"],
      type: "Internship",
  },
  {
      id: 6,
      img: avatar6,
      name: "Henry Wells",
      designation: "Executive, HR Operations",
      location: "Danemark",
      experience: "65",
      skills: ["HR", "Executive", "Professional"],
      type: "Internship",
  },
  {
      id: 7,
      img: avatar7,
      name: "Adam Miller",
      designation: "Education Training",
      location: "Colombie",
      experience: "38",
      skills: ["Teaching", "React", "Training"],
      type: "Full Time",
  },
  {
      id: 8,
      img: avatar8,
      name: "Keith Gonzales",
      designation: "Product Manager",
      location: "Brazil",
      experience: "50",
      skills: ["Manager", "Business", "Product"],
      type: "Freelance",
  },
];

export { users, userProfile1 ,Candidate}