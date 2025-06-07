import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    assistantName: {
      type: String,
    },
    assistantImage: {
      type: String,
    },
    history:[{
        type:String
    }]
  },
  { timestamps: true }
)

//model based on above user schemea

const User=mongoose.model("User",userSchema)

export default User;


