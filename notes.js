const { default: chalk } = require('chalk');
const fs = require('fs');

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter(note => {
        return note.title !== title
    });
    if(notes.length !== notesToKeep.length){
        console.log(chalk.inverse.green("Note Removed"))
    }else{
        console.log(chalk.inverse.red("No Note found with this title"))
    };
    
    saveNotes(notesToKeep)
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find( note => note.title === title )

    if( !duplicateNote ) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("new Note added"))
    } else {
        console.log(chalk.red.inverse("Note title already taken"))
    }
}

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(note => note.title === title );

    if(note) {
        console.log(chalk.inverse.green.bold("title: " + note.title));
        console.log("Body:", note.body)
    }else{
        console.log(chalk.red.inverse("No note found"))
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson)
    } catch (error) {
        return []        
    }
}

const listNotes = () => {
    const notes = loadNotes();
    let n = 0;

    return notes.map(note => console.log(chalk.bold(n +=1 ,  `   ${note.title}`)))
}

module.exports = { addNote, removeNote, listNotes, readNote };