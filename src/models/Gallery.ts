import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGallery extends Document {
  src: string;
  alt: string;
  category: string;
}

const GallerySchema: Schema = new Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'gallery',
  }
);

const Gallery: Model<IGallery> =
  mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

export default Gallery;
