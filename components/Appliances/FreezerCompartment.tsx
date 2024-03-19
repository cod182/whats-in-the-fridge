import DrawerButton from "./DrawerButton";
import { getItemsInThisLocation } from "@/utilities/functions";

type Props = {
  appliance: ApplianceProp;
  handleSelect: (items: applianceItem[], level: number, compartment: string, type: string, position: number) => void;
  handleModalState: (state: string, toDisplay?: 'add' | 'view') => void
  items: applianceItem[]
}

const FreezerCompartment = ({ appliance, handleSelect, handleModalState, items }: Props) => {
  return (
    <>
      {appliance?.freezerCompartment && appliance.freezerCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
        <div key={index}>
          {/* Drawers */}
          {drawers != undefined &&
            <div className={`grid grid-cols-1 grid-rows-${drawers.length} gap-2 mx-auto mt-2`}>
              {drawers.map((drawerNum, index) => (
                <DrawerButton key={index} handleSelection={handleSelect} compartment='freezer' type='drawer' level={drawerNum} handleModalState={handleModalState} items={getItemsInThisLocation(drawerNum, items, 'drawer', 'freezer', 128)} />
              ))}
            </div>
          }
        </div>

      ))}
    </>
  )
}

export default FreezerCompartment