const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  name:{
    type: "string",
   
  },

  favouriteGenre: [String],
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  resetToken:"string",
  expireToken:"Date",
  pic:{
type:"string",
default:"https://res.cloudinary.com/dpsvrdlmt/image/upload/v1716791095/profile_f6qcu8.png"
  },
  favourite:[{ type: ObjectId, ref: "Movie"  }],
  
});

mongoose.model("UserData", userSchema)