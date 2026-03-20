import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAbout extends Document {
  title: string;
  subtitle: string;
  story: string[];
  images: string[];
}

const AboutSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    story: [{ text: { type: String, required: true } }],
    images: [{ url: { type: String, required: true } }],
  },
  {
    timestamps: true,
    collection: 'about',
  }
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);

export default About;
