package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Donor struct {
	ID        primitive.ObjectID `json:"id" bson:"_id"`
	Name      string             `json:"name" bson:"name"`
	Email     string             `json:"email" bson:"email"`
	Password  string             `json:"password" bson:"password"`
	PhoneNo   string             `json:"phoneNo" bson:"phoneNo"`
	CreatedAt primitive.DateTime `json:"createdAt" bson:"createdAt"`
	UpdatedAt primitive.DateTime `json:"updatedAt" bson:"updatedAt"`
}

/*JS Schema
import { Schema, Document } from 'mongoose';

interface IDonor extends Document {
  name: string;
  email: string;
  phoneNo?: string;
  password: string;
}



const DonorSchema = new Schema<IDonor>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
    },
    phoneNo: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  }
);

export { IDonor, DonorSchema };
*/