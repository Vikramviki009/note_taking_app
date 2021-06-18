const chalk = require('chalk');
const yargs = require('yargs');
const { addNote, removeNote, listNotes, readNote } = require('./notes');

yargs.version('2.2.2');

yargs.command({
    command: "add",
    describe: "add a new note",
    builder:{
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: "remove notes",
    builder: {
        title: {
            describe: "remove title and body",
            demandOption: true,
            type: 'string'
        },
    },
    handler: function(argv){
        removeNote(argv.title)
    }
})

yargs.command({
    command: "list",
    describe: 'list notes',
    handler: () => {
        console.log(chalk.inverse("Your Notes... "))
        listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'read notes',
    builder:{
        title:{
            describe: " Reading Notes ",
            demandOption: true,
            type: 'string'
        }
    },
    handler: ({title}) => {
        readNote(title)
    }
})
// console.log(yargs.argv);
yargs.parse();