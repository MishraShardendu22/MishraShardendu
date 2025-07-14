package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Admin struct {
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

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  phoneNo?: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    phoneNo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IAdmin, AdminSchema };
*/