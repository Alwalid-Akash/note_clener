
const mongoose = requare("mongoose")

const noteSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, required: true },
  timeStamp: true
})
module.exports = mongoose.model("note", noteSchema)