import { model, Schema } from "mongoose";

const SubsSchema = new Schema({
  subs: [
    {
      title: {
        type: String,
        required: true,
      },
      expiresOn: {
        type: Date,
        required: true,
      },
      price: {
        value: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          required: true,
        },
      },
      isPaid: {
        type: String,
        default: false,
      },
      company: {
        type: String,
        required: true,
      },
    },
  ],
});

const SubsModel = model("subs", SubsSchema);
export default SubsModel;
