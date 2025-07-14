import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
"url":
{   type: String,
    required : true
},
"validity":{
    type: Number,
    default: 30
},
"shortcode":{
     type: String,
    required : true
}
})
export default mongoose.model("url", urlSchema);
