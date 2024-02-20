type ApplianceProp = {
  name: string;
  description: string[];
  fridgeCompartments?: number;
  fridgeCompartment?: CompartmentProps[]
  freezerCompartments?: number;
  freezerCompartment?: CompartmentProps[]
  doorCompartments?: number;
  doorCompartment?: CompartmentProps[]
};

type CompartmentProps = {
  shelves?: number[];
  drawers?: number[];
}

type itemProps = {
  id: number;
  name: string;
  shelf: number;
  position: number;
  addedOn: Date;
  expiry: Date;
  amount: number;
  addedBy: string;
  compartment: number;
  applianceId: number;
  owner: number;
}

type PositionProps = {
  handleSelection: (items: applianceItem[], level: number, compartment: string, position?: number) => void;
  compartment: string;
  type: string;
  level: number;
  position?: number;
  handleModalState: (state: string) => void;
  modalState: boolean;
  items: applianceItem[]
}

type userProps = {
  name: string;
  email: string;
  password: string;
}

type appliance = {
  id: number;
  ownerid: number;
  name: string;
  type: string;
}

type applianceItems = {
  item: applianceItem[];
}

type applianceItem = {
  id: number;
  applianceid: number;
  ownerid: number;
  name: string;
  quantity: number;
  addedDate: string;
  expiryDate: string;
  type: string;
  compartment: string;
  locationType: string;
  level: number;
  position: number;
}

type selectionProps = {
  items: applianceItem[];
  level: number;
  position?: number;
  compartment: string;
}