package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Patient struct {
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

interface IPatient extends Document {
  name: string;
  phoneNo?: string;
  email: string;
  password: string;
}



const PatientSchema = new Schema<IPatient>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    phoneNo: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IPatient, PatientSchema };
*/