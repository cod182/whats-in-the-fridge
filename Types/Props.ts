
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
  handleSelection: (items: applianceItem[], level: number, compartment: string, type: string, position: number) => void;
  compartment: string;
  type: string;
  level: number;
  position?: number;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void
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

type applianceItem = {
  id: string;
  applianceid: number;
  ownerid: number;
  name: string;
  quantity: number;
  addedDate: string;
  expiryDate: string;
  itemType: string;
  itemMainType: string;
  itemSubType: string;
  compartment: string;
  locationType: string;
  level: number;
  position: number;
  comment: string;
}

type selectionProps = {
  items: applianceItem[];
  level: number;
  position: number;
  compartment: string;
  type: string;
}

interface availableItem {
  name: string;
  itemMainType: string;
  itemType: string;
  itemSubType: string;
  image: string;
}

interface userCreatedItem extends availableItem {
  creatorId: number;
}