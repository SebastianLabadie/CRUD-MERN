const notesCtrl= {}
const noteModel=require('../models/Note');

notesCtrl.getNotes=async (req,res) => {
    const notes = await noteModel.find();
    res.json(notes);
}

notesCtrl.getNote=async(req,res) => {
    const note=await noteModel.findById(req.params.id)
    res.json(note);
}

notesCtrl.createNote=async (req,res) =>{ 
    const {title,content,date,author}=req.body

    const newnote=new noteModel({
        title,
        content,
        date,
        author
    })
    await newnote.save();
    res.json({message:'note created'});

}

notesCtrl.updateNote=async(req,res) => {
    const {title,content,author}=req.body
    await noteModel.findOneAndUpdate({_id:req.params.id},{
            title,
            content,
            author
    })

    res.json({message:'note updated'});
}

notesCtrl.deleteNote=async (req,res) => {
    const note=await noteModel.findOneAndDelete(req.params.id);
    res.json({message:'note deleted'})
}
module.exports= notesCtrl;