const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employees = [];

const initQuestions = [
    { type: "list", name: "role", message: "What is the employee's role?",
        choices: [
            {
                name: "Engineer",
                value: "engineer"
            },
            {
                name: "Intern",
                value: "intern"
            },
            {
                name:"Manager",
                value: "manager"
            }
        ]
    }
];

const newEngineerQuestions = [
    { type: "input", name: "name", message: "What is the employee's name?" },
    { type: "input", name: "id", message: "What is the employee's ID?" },
    { type: "input", name: "email", message: "What is the employee's email?" },
    {
        type: "input",
        name: "github",
        message: "What is the Engineer's GitHub username?"
    },
    {
        type: "list",
        name: "addTeamMember",
        message: "Would you like to add another team member?",
        choices: [
            {
                name: "yes",
                value: "yes"
            },
            {
                name: "no",
                value: "no"
            }
        ]
    }
];

const newInternQuestions = [
    { type: "input", name: "name", message: "What is the employee's name?" },
    { type: "input", name: "id", message: "What is the employee's ID?" },
    { type: "input", name: "email", message: "What is the employee's email?" },
    { type: "input", name: "school", message: "What school do they attend?" },
    {
        type: "list",
        name: "addTeamMember",
        message: "Would you like to add another team member?",
        choices: [
            {
                name: "yes",
                value: "yes"
            },
            {
                name: "no",
                value: "no"
            }
        ]
    }
];
const newManagerQuestions = [
    { type: "input", name: "name", message: "What is the employee's name?" },
    { type: "input", name: "id", message: "What is the employee's ID?" },
    { type: "input", name: "email", message: "What is the employee's email?" },
    { type: "input", name: "officeNumber", message: "What is their office number?" },
    {
        type: "list",
        name: "addTeamMember",
        message: "Would you like to add another team member?",
        choices: [
            {
                name: "yes",
                value: "yes"
            },
            {
                name: "no",
                value: "no"
            }
        ]
    }
];

const initTeam = () => {
    inquirer.prompt(initQuestions).then(function(data) {
        if (data.role === "engineer") {
            addNewEngineer();
        } else if (data.role === "intern") {
            addNewIntern();
        } else if (data.role === "manager") {
            addNewManager();
        } 
    });
};

const addNewEngineer = () => {
    inquirer.prompt(newEngineerQuestions).then(function(data) {
        const engineer = new Engineer(
            data.name,
            data.id,
            data.email,
            data.github
        );

        employees.push(engineer);
        if (data.addTeamMember === "yes"){
            initTeam();
        }
        else{
            generateHTML();
        }

    });
};

const addNewIntern = () => {
    inquirer.prompt(newInternQuestions).then(function(data) {
        const intern = new Intern(
            data.name,
            data.id,
            data.email,
            data.school
        );

        employees.push(intern);
        if (data.addTeamMember === "yes"){
            initTeam();
        }
        else{
            generateHTML();
        }

    });
};
const addNewManager= () => {
    inquirer.prompt(newManagerQuestions).then(function(data) {
        const manager = new Manager(
            data.name,
            data.id,
            data.email,
            data.officeNumber
        );

        employees.push(manager);
        if (data.addTeamMember === "yes"){
            initTeam();
        }
        else{
            generateHTML();
        }

    });
};
const generateHTML = () => {
    const htmlString = render(employees)
    fs.writeFile(outputPath, htmlString, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success! HTML created");
    });
}

initTeam();
