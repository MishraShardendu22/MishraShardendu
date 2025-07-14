import mongoose from "mongoose";

export const ImageVariant = {
    SQUARE : {
        type : 'SQUARE',
        dimensions : {
            width : 1200,
            height : 1200,
        },
        label : "Square (1:1)",
        aspectRation : "1:1"
    },
    WIDE : {
        type : 'WIDE',
        dimensions : {
            width : 1920,
            height : 1080,
        },
        label : "Widedscreen (16:9)",
        aspectRation : "16:9"
    },
    POTRAIT : {
        type : 'POTRAIT',
        dimensions : {
            width : 1080,
            height : 1440,
        },
        label : "Potrait (3:4)",
        aspectRation : "3:4"
    }
} as const;

export type ImageVariantType =  keyof typeof ImageVariant;

export interface ImageVariant {
    type: ImageVariantType;
    price: number;
    license: 'personal' | 'commercial';
}

export interface IProduct {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    imageUrl: string;
    variants: ImageVariant[];
}