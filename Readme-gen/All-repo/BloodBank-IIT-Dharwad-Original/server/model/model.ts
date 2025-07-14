import mongoose, { Model } from 'mongoose';
import { AdminSchema, IAdmin } from './schema/admin.schema';
import { DonorSchema, IDonor } from './schema/donor.schema';
import { PatientSchema, IPatient } from './schema/patient.schema';
import { DonationSchema, IDonation } from './schema/donation.schema';
import { InventorySchema, IInventory } from './schema/inventory.schema';
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
const Donor: Model<IDonor> = mongoose.model<IDonor>('Donor', DonorSchema);
const Patient: Model<IPatient> = mongoose.model<IPatient>(
  'Patient',
  PatientSchema
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

  
export {
  Organisation,
  Patient,
  Admin,
  BloodRequest,
  DonationLocation,
  Donation,
  Donor,
  Inventory,
};
