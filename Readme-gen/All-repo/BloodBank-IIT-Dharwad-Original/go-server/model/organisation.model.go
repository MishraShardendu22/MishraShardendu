package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Organisation struct {
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

interface IOrganisation extends Document {
  name: string;
  password: string;
  email: string;
  phoneNo?: string;
}

const OrganisationSchema = new Schema<IOrganisation>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
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

export { IOrganisation, OrganisationSchema };
*/