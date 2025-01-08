import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  language: { type: String, required: true },
  lessonNumber: { type: Number, required: true },
  title: { type: String, required: true },
  content: {
    type: [String],   // Array of strings, can contain any number of strings
    required: true
  },
  examples: [
    {
      description: String,
      code: String,
      output: String,
    },
  ],
  questions: [String],
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
