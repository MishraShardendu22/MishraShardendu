import { create } from "zustand";

interface DocStoreState {
  documentUrl: string;
  documentName: string;
  setDocumentUrl: (documentUrl: string) => void;
  setDocumentName: (documentName: string) => void;
}

export const DocStore = create<DocStoreState>((set) => ({
  documentUrl: "",
  documentName: "",
  setDocumentUrl: (documentUrl: string) => set({ documentUrl }),
  setDocumentName: (documentName: string) => set({ documentName }),
}));