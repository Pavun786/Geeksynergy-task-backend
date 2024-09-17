const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async(req,res) =>{
  console.log("edit-R")
    try{
        const { Name,Email,Mobile,Password,Profession} = req.body;

        if(!Name || !Email || !Mobile || !Password || !Profession ){
             res.status(500).send({message : "All fields required..!"})
       }

       const verifyEmail = await userModel.findOne({Email : Email})

      if(verifyEmail){
          res.status(500).send({message : "User already exist..!"})
      }else{
       
        const NO_OF_ROUNDS = 10;
        const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
        const hashedPassword = await bcrypt.hash(Password,salt)
    
        const newUser =  new userModel({
            
            Name : Name,
            Email : Email,
            Mobile : Mobile,
            Password : hashedPassword,
            Profession : Profession
           })

        await newUser.save();

        res.status(200).send(newUser)

      }

        
     }catch(err){
        res.status(500).send({message : err.message})
    }

    
}


const Login = async(req,res) =>{
  console.log("edit-L")
    try{
        const { Email,Password} = req.body;

        if( !Email || !Password ){
             res.status(500).send({message : "All fields required..!"})
       }

       const findUser = await userModel.findOne({Email : Email})

      if(!findUser){
          res.status(500).send({message : "UnAuthorized..!"})
      }else{
       
        const checkpassword = await bcrypt.compare(Password,findUser.Password)

        if(!checkpassword){
            res.status(500).send({message : "The Invaild User credentials"})
        }
        else{
             const token = await jwt.sign({id:findUser._id},process.env.SECRET_KEY)
             res.status(200).send({
                message : "User Logined Successfully",
                token,
                Role :findUser.Role,
                Name : findUser.Name,
                Email : findUser.Email
             })
        }

      }

 }catch(err){
        res.status(500).send({message : err.message})
    }

}

const GetAllUser = async (req, res) => {
  console.log("edit-GetAl")
    try {
      const users = await userModel.find({}); 
  
      if (users.length > 0) {  
        res.status(200).send(users);
      } else {
        res.status(404).send({ message: "Users not found" });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  const GetSingleUser = async(req,res)=>{
    console.log("edit-sing")
     
      try{

        const {userId} = req.params;

       const check = await userModel.findOne({_id : userId})

       if(!check){
       res.status(400).send({message: "User not found"})
       }else{
       res.status(200).send(check)
     }

      }catch(err){
         res.status(500).send({message : err.message})
      }
  }


  const editUser = async(req,res)=>{

    console.log("edit")

   try{
    const {userId} = req.params;
    const data = req.body;

    const check = await userModel.findOne({_id : userId})

    if(!check){
      res.status(400).send({message: "User not found"})
    }else{
      const updateData = await userModel.findByIdAndUpdate(userId,data)
      res.status(200).send({message : "Data updated successfully"})
    }
   }catch(err){
     res.status(500).send({message : err.message})
   }

  }

  const deleteUser = async(req,res)=>{
    try{
    const {userId} = req.params;
   

    const check = await userModel.findOne({_id : userId})

    if(!check){
      res.status(400).send({message: "User not found"})
    }else{
      const deleteData = await userModel.findByIdAndDelete(userId)
      res.status(200).send({message : "Data deleted successfully"})
    }
   }catch(err){
     res.status(500).send({message : err.message})
   }

  }
  



module.exports = {Register,Login,GetAllUser,GetSingleUser,editUser,deleteUser}