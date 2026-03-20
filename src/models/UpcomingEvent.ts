import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUpcomingEvent extends Document {
  title: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  category: string;
  maxParticipants: number;
  currentParticipants: number;
  location: string;
}

const UpcomingEventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    maxParticipants: { type: Number, required: true },
    currentParticipants: { type: Number, default: 0 },
    location: { type: String, required: true },
  },
  { collection: 'upcoming_events', timestamps: true }
);

const UpcomingEvent: Model<IUpcomingEvent> =
  mongoose.models.UpcomingEvent ||
  mongoose.model<IUpcomingEvent>('UpcomingEvent', UpcomingEventSchema);

export default UpcomingEvent;
