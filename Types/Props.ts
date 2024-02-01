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
  shelves?:number[];
  drawers?:number[];
}

type itemProps = {
  id:number;
  name:string;
  shelf:number;
  position:number;
  addedOn:Date;
  expiry:Date;
  amount:number;
  addedBy:string;
  compartment:number;
  applianceId:number;
  owner:number;
}


type userProps = {
  name:string;
  email:string;
  password:string;
}