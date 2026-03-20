import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBaristaRecommend extends Document {
  baristaName: string;
  baristaTitle: string;
  baristaAvatar: string;
  drinkName: string;
  drinkDescription: string;
  drinkPrice: number;
  specialOffer: string;
}

const BaristaRecommendSchema: Schema = new Schema(
  {
    baristaName: { type: String, required: true },
    baristaTitle: { type: String, required: true },
    baristaAvatar: { type: String, required: true },
    drinkName: { type: String, required: true },
    drinkDescription: { type: String, required: true },
    drinkPrice: { type: Number, required: true },
    specialOffer: { type: String },
  },
  { collection: 'barista_recomend', timestamps: true }
);

const BaristaRecommend: Model<IBaristaRecommend> =
  mongoose.models.BaristaRecommend ||
  mongoose.model<IBaristaRecommend>('BaristaRecommend', BaristaRecommendSchema);

export default BaristaRecommend;
