import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHero extends Document {
  firstLine: string;
  secondLine: string;
  subtitle: string;
  backgroundImage: string;
}

const HeroSchema: Schema = new Schema(
  {
    firstLine: { type: String, required: true },
    secondLine: { type: String, required: true },
    subtitle: { type: String, required: true },
    backgroundImage: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'hero',
  }
);

const Hero: Model<IHero> =
  mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema);

export default Hero;
