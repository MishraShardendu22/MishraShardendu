import ResponseApi from '../utils/apiResponse.util';
import Inventory from '../models/inventory.model';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

const bloodGroupDetailController = async (req: Request, res: Response) => {
  try {
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const bloodGroupDetail: any = [];
    const organization = new mongoose.Types.ObjectId(req.body._id);

    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        const totalIn = await Inventory.aggregate([
          {
            $match: {
              bloodGroup,
              inventoryType: 'in',
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$quantity' },
            },
          },
        ]);

        const totalOut = await Inventory.aggregate([
          {
            $match: {
              bloodGroup,
              inventoryType: 'out',
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$quantity' },
            },
          },
        ]);

        const availableBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        bloodGroupDetail.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );

    return ResponseApi(res, 200, 'Blood Group Detail', bloodGroupDetail);
  } catch (error) {
    console.error(error);
    return ResponseApi(res, 500, 'Internal Server Error');
  }
};

export { bloodGroupDetailController };
