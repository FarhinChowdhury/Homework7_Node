const fs = require('fs');
const inquirer = require('inquirer')

// array of questions for user
const questions = [
    {
        type:'input',
        name:'name',
        message:'what is your user name?'
    },
    {
        type:'input',
        name:'email',
        message:'what is your email address?'
    },
    {
        type:'input',
        name:'projectName',
        message:"what is your project's name?"
    },
    {
        type:'input',
        name:'description',
        message:'Please write a breif description:'
    },
    {
        type:'input',
        name:'userName',
        message:'what is your user name?'
    },
    {
        type:'list',
        name:'license',
        message:'What kind of license should your project have?',
        choices:['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'NONE']
    },
    {
        type:'input',
        name:'usingRepo',
        message:'What does the user need to know about using the repo?'
    },
    {
        type:'input',
        name:'contributingRepo',
        message:'What does the user need to know about contributing to the repo?'
    },
    {
        type:'input',
        name:'install',
        message:'What command should be run to install dependencies?',
        default:['npm i']
    },
    {
        type:'input',
        name:'test',
        message:'What command should be run to tests?',
        default:['npm test']
    }

];
let userList =[]
// function to write README file



function writeToFile(data) {
    let descriptionData = `## Description:\n ${data[0].description}\n\n\n`
    
    let tableofConents = `## Table of Content:\n\n* [Installation](*installation)\n* [Usage](#usage)\n* [License](#license)\n* [Contributing](#contributing)\n* [Tests](#tests)\n* [Questions](#questions)\n\n\n`
    
    let installData = `## Installation:\n\n To install necessary dependencies, run the following command:\n\n\n
    ${data[0].install}\n\n\n`
    let usageData = `## Usage:\n\n${data[0].repo1}\n\n\n`
    
    let contributingData = `## Contributing:\n\n${data[0].repo2}\n\n\n`
    let licenseData = `## License\n\nThis project is licensed uder the ${data[1].license} license.\n\n\n`
    
    let testData = `## Tests\n\nTo run tests, run the following command\n\n\n 
    ${data[0].test}

    \n\n\n`
    
    let questionData = `## Questions\n\nIf you have any questions about the repo, open an issue or contact me directly at ${data[0].email}. You can find more of my work at [${data[0].userName}](https://github.com/${data[0].userName})`
   
   
   
    fs.writeFileSync('README.md',`# ${data[0].title}\nby: ${data[0].name}\n\n\n`, 'utf8')
    fs.appendFileSync('README.md',descriptionData )
    fs.appendFileSync('README.md', tableofConents)
    fs.appendFileSync('README.md',installData)  
    fs.appendFileSync('README.md',usageData) 
    fs.appendFileSync('README.md',licenseData) 
    fs.appendFileSync('README.md',testData) 
    fs.appendFileSync('README.md',questionData) 
    fs.appendFileSync('README.md', contributingData)

}

// function to initialize program
async function main() {
    let setup= await inquirer.prompt(questions);
    userList.push({name: setup.name, email:setup.email,title:setup.projectName,
    description:setup.description, userName:setup.userName, 
    repo1: setup.usingRepo, repo2: setup.contributingRepo,install:setup.install,test:setup.test})
    let choice = questions[5].choices
    for(i=0; i<choice.length;i++){
        if(setup.license===choice[i]){
            userList.push({license:setup.license})

        }

    }
    console.log(userList)
   writeToFile(userList)


}
console.log(userList)

// function call to initialize program
main();
