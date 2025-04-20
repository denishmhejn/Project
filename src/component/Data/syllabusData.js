export const syllabusData = [
  {
    id: "1",
    name: "BCA (Bachelor of Computer Application)",
    creditSummary: [
      { category: "Computer Application(Core Courses)", creditHours: "71(4*2+3*21)" },
      { category: "Elective Courses", creditHours: "12(3+3+3+3)" },
      { category: "Mathematics and Statistics", creditHours: "9(3+3+3+3)" },
      { category: "Language Courses", creditHours: "6(3+3)" },
      { category: "Social Science and Management", creditHours: "15(3+3+3+3+3)" },
      { category: "Project and Internships", creditHours: "13(2+2+6+3)" },
      { category: "Total Credit Hours", creditHours: 126, isTotal: true }, // Add a flag for total row
    ],
    semesters: [
      {
        sem: "Semester 1",
        courses: [
          { sn: 1, code: "CACS101", title: "Computer Fundamentals & Applications", creditHrs: 4, lectureHrs: 4, tutorialHrs: 0, labHrs: 4 },
          { sn: 2, code: "CAC0102", title: "Society and Technology", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 0 },
          { sn: 3, code: "CAEN103", title: "English I", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 0 },
          { sn: 4, code: "CAMT104", title: "Mathematics I", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 1 },
          { sn: 5, code: "CACS105", title: "Digital Logic", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 2 },
        ],
      },
      
        
        {
          sem: "Semester 2",
          courses: [
            { sn: 6, code: "CACS151", title: "C Programming", creditHrs: 4, lectureHrs: 4, tutorialHrs: 1, labHrs: 3 },
            { sn: 7, code: "CAAC152", title: "Financial Accounting", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 1 },
            { sn: 8, code: "CAEN153", title: "English II", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 0 },
            { sn: 9, code: "CAMT154", title: "Mathematics II", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 1 },
            { sn: 10, code: "CACS155", title: "Microprocessor & Computer Architecture", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 2 },
          ],
        },
        {
          sem: "Semester 3",
          courses: [
            { sn: 11, code: "CACS201", title: "Data Structures & Algorithms", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 3 },
            { sn: 12, code: "CAST202", title: "Probability & Statistics", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 1 },
            { sn: 13, code: "CACS203", title: "System Analysis & Design", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 0 },
            { sn: 14, code: "CACS204", title: "Object-Oriented Programming in Java", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 2 },
            { sn: 15, code: "CACS205", title: "Web Technology", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 3 },
          ],
        },
        {
          sem: "Semester 4",
          courses: [
            { sn: 16, code: "CACS251", title: "Operating System", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 2 },
            { sn: 17, code: "CACS252", title: "Numerical Methods", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 2 },
            { sn: 18, code: "CACS253", title: "Software Engineering", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 0 },
            { sn: 19, code: "CACS254", title: "Scripting Language", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 3 },
            { sn: 20, code: "CACS255", title: "Database Management System", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 2 },
            { sn: 21, code: "CAPJ256", title: "Project I", creditHrs: 2, lectureHrs: 0, tutorialHrs: 0, labHrs: 4 },
          ],
        },
        {
          sem: "Semester 5",
          courses: [
            { sn: 22, code: "CACS301", title: "Management Information Systems & E-Business", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 2 },
            { sn: 23, code: "CACS302", title: ".NET Technology", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 3 },
            { sn: 24, code: "CACS303", title: "Computer Networking", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 2 },
            { sn: 25, code: "CAMG304", title: "Introduction to Management", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 0 },
            { sn: 26, code: "CACS305", title: "Computer Graphics & Animation", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 2 },
          ],
        },
        {
          sem: "Semester 6",
          courses: [
            { sn: 27, code: "CACS351", title: "Mobile Programming", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 3 },
            { sn: 28, code: "CACS352", title: "Distributed Systems", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 0 },
            { sn: 29, code: "CAEC353", title: "Applied Economics", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 0 },
            { sn: 30, code: "CACS354", title: "Advanced Java Programming", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 3 },
            { sn: 31, code: "CACS355", title: "Network Programming", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 2 },
            { sn: 32, code: "CAPJ356", title: "Project II", creditHrs: 2, lectureHrs: 0, tutorialHrs: 0, labHrs: 4 },
          ],
        },
        {
          sem: "Semester 7",
          courses: [
            { sn: 33, code: "CACS401", title: "Cyber Law & Professional Ethics", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 0 },
            { sn: 34, code: "CACS402", title: "Cloud Computing", creditHrs: 3, lectureHrs: 3, tutorialHrs: 0, labHrs: 3 },
            { sn: 35, code: "CAIN403", title: "Internship", creditHrs: 3, lectureHrs: 0, tutorialHrs: 0, labHrs: 0 },
          ],
        },
        {
          sem: "Semester 8",
          courses: [
            { sn: 36, code: "CAQR451", title: "Operations Research", creditHrs: 3, lectureHrs: 3, tutorialHrs: 1, labHrs: 0 },
            { sn: 37, code: "CAPJ452", title: "Project III", creditHrs: 6, lectureHrs: 0, tutorialHrs: 0, labHrs: 8 },
          ],
        },
      
      
      // Add more semesters as needed (up to Semester 8)
    ],
  },
  // Add more syllabus data as needed
];