import mongoose from "mongoose";
import { nanoid } from "nanoid";

const LinksSchema = new mongoose.Schema(
  {
    name: String,
    shortenedLink: {
      type: String,
      default: () => nanoid(10) 
    },
    originalLink: String,
    customLink: String,
    user_id: String,
    clicks: {
      type: Number,
      default: 0
    },
    isCustom:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Links || mongoose.model("Links", LinksSchema);
