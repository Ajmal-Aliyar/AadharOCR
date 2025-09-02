export interface AadharData {
  name?: string;
  aadharNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  fatherName?: string;
  frontText?: string;
  backText?: string;
}

export interface ProcessingState {
  front: boolean;
  back: boolean;
}