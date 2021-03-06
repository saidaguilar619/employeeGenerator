// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, githubProfileName) {
        super(name, id, email);
        this.github = githubProfileName;
        this.role = "Engineer"; 
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;