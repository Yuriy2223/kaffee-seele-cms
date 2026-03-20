import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoffeeOrigin extends Document {
  id: number;
  country: string;
  region: string;
  description: string;
  characteristics: string[];
  altitude: string;
  harvest: string;
  processing: string;
  varieties: string[];
  ourBlends: string[];
  coordinates: {
    x: number;
    y: number;
  };
  icon: string;
}

const CoffeeOriginSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    description: { type: String, required: true },
    characteristics: [{ type: String }],
    altitude: { type: String },
    harvest: { type: String },
    processing: { type: String },
    varieties: [{ type: String }],
    ourBlends: [{ type: String }],
    coordinates: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    icon: { type: String, required: true },
  },
  { collection: 'coffee_origins', timestamps: true }
);

const CoffeeOrigin: Model<ICoffeeOrigin> =
  mongoose.models.CoffeeOrigin ||
  mongoose.model<ICoffeeOrigin>('CoffeeOrigin', CoffeeOriginSchema);

export default CoffeeOrigin;
