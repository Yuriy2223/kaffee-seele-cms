import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoffeeQuiz extends Document {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    icon: string;
    weight: Record<string, number>;
  }[];
}

const CoffeeQuizSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    question: { type: String, required: true },
    options: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
        icon: { type: String, required: true },
        weight: { type: Schema.Types.Mixed, required: true },
      },
    ],
  },
  { collection: 'coffee_quizs', timestamps: true }
);

const CoffeeQuiz: Model<ICoffeeQuiz> =
  mongoose.models.CoffeeQuiz ||
  mongoose.model<ICoffeeQuiz>('CoffeeQuiz', CoffeeQuizSchema);

export default CoffeeQuiz;
