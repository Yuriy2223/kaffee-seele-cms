import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  name: string;
  rating: number;
  text: string;
  date: Date;
  avatar?: string;
  isReviewOfTheWeek?: boolean;
}

const ReviewSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, index: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now, index: true },
    avatar: { type: String },
    isReviewOfTheWeek: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ReviewSchema.pre('save', async function () {
  if (this.isModified('isReviewOfTheWeek') && this.isReviewOfTheWeek) {
    await mongoose.models.Review.updateMany(
      { _id: { $ne: this._id } },
      { $set: { isReviewOfTheWeek: false } }
    );
  }
});

ReviewSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate() as any;

  const isTargetingReviewOfWeek =
    update?.isReviewOfTheWeek === true ||
    update?.$set?.isReviewOfTheWeek === true;

  if (isTargetingReviewOfWeek) {
    const query = this.getQuery();
    await this.model.updateMany(
      { _id: { $ne: query._id } },
      { $set: { isReviewOfTheWeek: false } }
    );
  }
});

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
