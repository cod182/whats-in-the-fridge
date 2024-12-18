
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

type ShareProps = {
  id: number;
  applianceId: number;
  email: string;
  sharedUserId: number;
  accepted: string;
  ownerEmail: string;
  ownerName: string;
  ownerId: number;
  applianceName: string;
}

type sharedFromProps = {
  ownerName: string;
  ownerId: number;
}

type appliance = {
  id: number;
  ownerid: number;
  name: string;
  type: string;
  sharedWith?: ShareProps[]
  sharedFrom?: sharedFromProps;
}

type applianceItem = {
  id: string;
  applianceid: number;
  ownerid: number;
  name: string;
  quantity: number;
  cookedFromFrozen: string | undefined;
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
  image: string;
  sharedUserId?: number;
}

type selectionProps = {
  items: applianceItem[];
  level: number;
  position: number;
  compartment: string;
  type: string;
}

interface availableItem {
  id: number;
  name: string;
  itemMainType: string;
  itemType: string;
  itemSubType: string;
  image: string;
}

interface userCreatedItem extends availableItem {
  creatorId: number;
}

type customIcons = {
  name: string;
  icon: string;
}

