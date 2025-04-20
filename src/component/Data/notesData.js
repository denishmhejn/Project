
import digitalLogic from '../../Data/DigitalLogic.pdf';
import micro from '../../Data/microProcessor.pdf';
import society from '../../Data/society.pdf'
export const notesData = [
    {
      id: "1",
      title: "BCA - Bachelors in Computer Application",
      description: "BCA is an undergraduate degree program focused on computer science, software development, and IT. It typically covers subjects like programming languages, databases, web development, networking, and software engineering.",
      semesters: [
        {
          sem: "Semester 1",
          courses: [
            { 
              name: "Computer Fundamentals & Applications", 
              notesDescription: "Basic computer concepts and applications",
              notesFile: "" // Initially empty
            },
            { 
              name: "Society and Technology", 
              notesDescription: "Impact of technology on society",
              notesFile: society
            },
            {
                name:"Digital Logic",
                notesDescription:" Digital logic",
                notesFile:digitalLogic,
            }
            // ... other courses
          ]
        },
        {
            sem:"Semester 2",
            courses:[
                {
                    name:"C-Programming",
                    notesDescription:"fundamental of C-programming",
                    notesFile:""
                },
                {
                    name:"MicroProcessor and Computer Architecture",
                    notesDescription:"description of 8085 and 8086 microprocessor",
                    notesFile: micro
                }
            ]

        }
        // ... other semesters
      ]
    }
  ];