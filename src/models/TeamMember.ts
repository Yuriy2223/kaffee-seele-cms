import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  position: string;
  description: string;
  image: string;
  specialty: string;
  favoriteCoffee: string;
  quote: string;
  experience: string;
  achievements: string[];
  hobbies: string[];
}

const TeamMemberSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    specialty: { type: String, required: true },
    favoriteCoffee: { type: String, required: true },
    quote: { type: String, required: true },
    experience: { type: String, required: true },
    achievements: [{ type: String }],
    hobbies: [{ type: String }],
  },
  { timestamps: true }
);

const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);

export default TeamMember;
