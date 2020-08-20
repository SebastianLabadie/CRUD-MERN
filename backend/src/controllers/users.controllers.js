const usersCtrl= {}

const userModel=require('../models/User');

usersCtrl.getUsers=async (req,res) => {
    const users=await userModel.find();
    res.json(users);

}
usersCtrl.createUser=async (req,res) => {
    const {username}=req.body;
    const newUser= new userModel({username});
    await newUser.save();
    res.json({message:'user created'});

}
usersCtrl.deleteUser=async (req,res) => {
    await userModel.findOneAndDelete({_id:req.params.id}) 
    res.json({message:'user deleted'})
}

module.exports= usersCtrl;