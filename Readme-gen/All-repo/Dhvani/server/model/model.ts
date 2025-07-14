import mongoose, { Model } from 'mongoose';
import { AdminSchema, IAdmin } from './schema/admin.schema';
import { UserSchema, IUser } from './schema/user.schema';
import { DonationSchema, IDonation } from './schema/donation.schema';
import { InventorySchema, IInventory } from './schema/inventory.schema';
import { DiseaseDetectionSchema, IDiseaseDetection } from './schema/disease-detection.schema';
import { StrokeReportSchema, IStrokeReport } from './schema/stroke-report.schema';
import { TBReportSchema, ITBReport } from './schema/tb-report.schema';
import { FileSchema, IFile } from './schema/files.schema';
import {
  OrganisationSchema,
  IOrganisation,
} from './schema/organisation.schema';
import {
  BloodRequestSchema,
  IBloodRequest,
} from './schema/blood-request.schema';
import {
  DonationLocationSchema,
  IDonationLocation,
} from './schema/donation-location.schema';

const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', AdminSchema);
const File: Model<IFile> = mongoose.model<IFile>('File', FileSchema);
const StrokeReport: Model<IStrokeReport> = mongoose.model<IStrokeReport>(
  'StrokeReport',
  StrokeReportSchema
);
const TBReport: Model<ITBReport> = mongoose.model<ITBReport>(
  'TBReport',
  TBReportSchema
);
const User: Model<IUser> = mongoose.model<IUser>(
  'User',
  UserSchema
);
const Donation: Model<IDonation> = mongoose.model<IDonation>(
  'Donation',
  DonationSchema
);
const Inventory: Model<IInventory> = mongoose.model<IInventory>(
  'Inventory',
  InventorySchema
);
const Organisation: Model<IOrganisation> = mongoose.model<IOrganisation>(
  'Organisation',
  OrganisationSchema
);
const BloodRequest: Model<IBloodRequest> = mongoose.model<IBloodRequest>(
  'BloodRequest',
  BloodRequestSchema
);
const DonationLocation: Model<IDonationLocation> =
  mongoose.model<IDonationLocation>('DonationLocation', DonationLocationSchema);
const DiseaseDetection: Model<IDiseaseDetection> = mongoose.model<IDiseaseDetection>(
  'DiseaseDetection',
  DiseaseDetectionSchema
);

export {
  Organisation,
  User,
  Admin,
  BloodRequest,
  StrokeReport,
  TBReport,
  DonationLocation,
  DiseaseDetection,
  Donation,
  Inventory,
  File,
};
