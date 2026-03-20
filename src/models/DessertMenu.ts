import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDessertMenu extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const DessertMenuSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { collection: 'desserts_menu', timestamps: true }
);

const DessertMenu: Model<IDessertMenu> =
  mongoose.models.DessertMenu ||
  mongoose.model<IDessertMenu>('DessertMenu', DessertMenuSchema);

export default DessertMenu;
