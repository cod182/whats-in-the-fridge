type ApplianceProp = {
  name: string;
  description: string[];
  fridgeCompartments?: number;
  freezerCompartments?: number;
  doorCompartments?: number;
  fridgeCompartmentsShelves?: number;
  fridgeCompartmentsDrawers?: number;
  freezerCompartmentsDrawers?: number;
  doorCompartmentsShelves?: number;
};

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