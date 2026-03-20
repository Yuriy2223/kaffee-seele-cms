import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactsDocument extends Document {
  phone: string;
  email: string;
  address: string;
  city: string;
  workHoursWeek: string;
  workHoursWeekend: string;
  instagram: string;
  facebook: string;
  telegram: string;
}

const ContactsSchema = new Schema<IContactsDocument>(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    workHoursWeek: { type: String, required: true },
    workHoursWeekend: { type: String, required: true },
    instagram: { type: String, required: true },
    facebook: { type: String, required: true },
    telegram: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'contacts',
  }
);

const Contacts: Model<IContactsDocument> =
  mongoose.models.Contacts ||
  mongoose.model<IContactsDocument>('Contacts', ContactsSchema);

export default Contacts;
