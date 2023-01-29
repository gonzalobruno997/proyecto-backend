const fs = require("fs")
const saveArchive = async(rute, content) => {
    try{
        await fs.promises.writeFile (rute, JSON.stringify(content))
        console.log("exito")
    }catch(error){
        console.log(error)
    }

}
const readArchive = async (rute) =>{
    try{
        return fs.promises.readFile(rute, "utf-8")
    }catch(error){
        console.log(error)
    }
}

module.exports = {saveArchive, readArchive}