import DrawerButton from "./DrawerButton";
import { getItemsInThisLocation } from "@/utilities/functions";

type Props = {
  appliance: ApplianceProp;
  handleSelect: (items: applianceItem[], level: number, compartment: string, type: string, position: number) => void;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void
  items: applianceItem[]
  rotate?: string;
}

const FreezerCompartment = ({ appliance, handleSelect, handleModalState, items, rotate }: Props) => {

  return (
    <>
      {appliance?.freezerCompartment && appliance.freezerCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
        <div key={index} className="w-full h-full">
          {/* Drawers */}
          {drawers != undefined &&
            <div className={`grid w-full h-full gap-2`} style={{ gridTemplateRows: `repeat(${drawers.length},minmax(0,1fr) )` }}>
              {drawers.map((drawerNum, index) => (
                <DrawerButton key={index} handleSelection={handleSelect} compartment='freezer' type='drawer' level={drawerNum} handleModalState={handleModalState} items={getItemsInThisLocation(drawerNum, items, 'drawer', 'freezer', 128)} rotate={rotate} />
              ))}
            </div>
          }
        </div>

      ))}
    </>
  )
}

export default FreezerCompartment