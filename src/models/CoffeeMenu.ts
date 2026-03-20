import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoffeeMenu extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  icon: string;
}

const CoffeeMenuSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { collection: 'coffee_menu', timestamps: true }
);

const CoffeeMenu: Model<ICoffeeMenu> =
  mongoose.models.CoffeeMenu ||
  mongoose.model<ICoffeeMenu>('CoffeeMenu', CoffeeMenuSchema);

export default CoffeeMenu;
