import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactRequest extends Document {
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
}

const ContactRequestSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
  },
  { timestamps: true }
);

const ContactRequest: Model<IContactRequest> =
  mongoose.models.ContactRequest ||
  mongoose.model<IContactRequest>('ContactRequest', ContactRequestSchema);

export default ContactRequest;
