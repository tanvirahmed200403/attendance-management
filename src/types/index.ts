export interface PhoneNumber {
  id: string;
  label: string;
  number: string;
  isPrimary: boolean;
}

export interface Participant {
  id: string;
  name: string;
  ward: string;
  man: string;
  uposhakha: string;
  bloodGroup: string;
  institute: string;
  level: string;
  rollId: string;
  classYearSemester: string;
  tags: string[];
  phones: PhoneNumber[];
  arrivalTime: string;
  departureTime: string;
  chuti: string;
  status: 'not-arrived' | 'present' | 'left';
}

export interface ProgramInfo {
  type: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface DropdownOptions {
  programTypes: string[];
  wards: string[];
  mans: string[];
  tags: string[];
  uposhakhas: string[];
  chutis: string[];
  levels: string[];
}

export interface FilterState {
  ward: string;
  name: string;
  man: string;
  uposhakha: string;
  tags: string[];
}
