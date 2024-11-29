import { model, Schema } from "mongoose";

const UserSchema = new Schema({
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
  subsList: {
    type: Schema.Types.ObjectId,
    ref: "subs",
  }
});

const UserModel = model("users", UserSchema);
export default UserModel;