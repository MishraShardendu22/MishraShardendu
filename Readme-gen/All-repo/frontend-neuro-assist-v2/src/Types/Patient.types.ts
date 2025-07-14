interface Symptoms {
  Weakness: boolean;
  Numbness: boolean;
  FacialDroop: boolean;
  LossOfBalance: boolean;
  SpeechDifficulties: boolean;
  SuddenVisionChanges: boolean;
}

interface VitalSigns {
  BP: string;
  HeartRate: string;
  Temperature: string;
  OxygenSaturation: string;
}

interface PatientExclusionList {
  anticoagulantMedicationsLast48Hours: {
    xarelto: boolean;
    pradaxa: boolean;
    coumadin: boolean;
    apixaban: boolean;
    edoxaban: boolean;
    therapeuticLovenox: boolean;
  };
  historyIntracranialHemorrhage: boolean;
  gastrointestinalBleedLast21Days: boolean;
  intracranialIntraspinalSurgeryLast3Months: boolean;
}

interface PatientDetailsType {
  symptoms: Symptoms;
  patientDOB: string;
  patientEmail: string;
  patientWeight: string;
  vitalSigns: VitalSigns;
  patientMedicalHistory: string;
  patientLastKnownNormal: string;
  exclusionList: PatientExclusionList;
}


export type {
    Symptoms,
    VitalSigns,
    PatientDetailsType,
    PatientExclusionList,
}