import { PatientDetailsType } from "@/Types/Patient.types";
import { create } from "zustand";

interface PatientStoreState {
  patient: PatientDetailsType | null;
  setPatient: (patient: PatientDetailsType) => void;
  resetPatient: () => void;
}

export const PatientStore = create<PatientStoreState>((set) => ({
  patient: null,
  setPatient: (patient) => set(() => ({ patient })),
  resetPatient: () => set(() => ({ patient: null })),
}));

