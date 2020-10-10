const fs = require('fs');
const inquirer = require('inquirer')

// array of questions for user
const questions = [
    {
        type:'input',
        name:'name',
        message:'what is your name?'
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
        message:'what is your GitHub user name?'
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
//array for all the user inputs
let userList =[]



// function to write README file

function writeToFile(data) {
    let descriptionData = `## Description:\n ${data.description}\n\n\n`  
    let tableofConents = `## Table of Content:\n\n* [Installation](*installation)\n* [Usage](#usage)\n* [License](#license)\n* [Contributing](#contributing)\n* [Tests](#tests)\n* [Questions](#questions)\n\n\n`
    let installData = `## Installation:\n\n To install necessary dependencies, run the following command:\n\n\n
    ${data.install}\n\n\n`
    
    let usageData = `## Usage:\n\n${data.repo1}\n\n\n`
    
    let contributingData = `## Contributing:\n\n${data.repo2}\n\n\n`
    let licenseData = `## License\n\nThis project is licensed uder the ${data.license} license.\n\n\n`
    
    let testData = `## Tests\n\nTo run tests, run the following command\n\n\n 
    ${data.test}

    \n\n\n`
    
    let questionData = `## Questions\n\nIf you have any questions about the repo, open an issue or contact me directly at ${data.email}. You can find more of my work at [${data.userName}](https://github.com/${data.userName})`
   
   
   
    fs.writeFileSync('README.md',`# ${data.title}\nby: ${data.name}\n\n\n![GitHub license](https://img.shields.io/badge/javascript-100%25-blue)\n\n\n`, 'utf8')
    fs.appendFileSync('README.md',descriptionData )
    fs.appendFileSync('README.md', tableofConents)
    fs.appendFileSync('README.md',installData)  
    fs.appendFileSync('README.md',usageData) 
    fs.appendFileSync('README.md',licenseData)
    fs.appendFileSync('README.md', contributingData) 
    fs.appendFileSync('README.md',testData) 
    fs.appendFileSync('README.md',questionData) 
    

}

// function to initialize program
async function main() {
    let setup= await inquirer.prompt(questions);
    //loop through the options for licenses to push the one the user chose into userList
    var choice = questions[5].choices
    for(i=0; i<choice.length;i++){
        if(setup.license===choice[i]){
            choice = setup.license
        }

    }
    //pushing all the user inputs into userList
    userList.push({name: setup.name, email:setup.email,title:setup.projectName,
        description:setup.description, userName:setup.userName, 
        repo1: setup.usingRepo, repo2: setup.contributingRepo,install:setup.install,test:setup.test, license:choice})


    //calling writetoFile to write the file with the information from userList.
    //since userList is an object with in array have to call userList[0].
   writeToFile(userList[0])

   console.log('Generating README.....')
   console.log('Completed!')
}



// function call to initialize program
main();
