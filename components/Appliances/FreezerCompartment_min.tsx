import DrawerButton_min from "./DrawerButton_min";

type Props = {
  appliance: ApplianceProp;

  handleMoveItem: (level: number, compartment: string, locationType: string, position?: number) => void
  currentPlacement: {
    compartment: string;
    locationType: string;
    level: number;
    position?: number;
  }
  rotate?: string;
}

const FreezerCompartment_min = ({ appliance, handleMoveItem, currentPlacement, rotate }: Props) => {

  return (
    <>
      {appliance?.freezerCompartment && appliance.freezerCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
        <div key={index} className="w-full h-full">
          {/* Drawers */}
          {drawers != undefined &&
            <div className={`grid w-full h-full gap-2`} style={{ gridTemplateRows: `repeat(${drawers.length},minmax(0,1fr) )` }}>
              {drawers.map((drawerNum) => (
                <DrawerButton_min key={drawerNum} handleMoveItem={handleMoveItem} compartment='freezer' locationType='drawer' level={drawerNum} currentPlacement={currentPlacement} rotate={rotate} />
              ))}
            </div>
          }
        </div>

      ))}
    </>
  )
}

export default FreezerCompartment_min