import DrawerButton from "./DrawerButton";
import { getItemsInThisLocation } from "@/utilities/functions";

type Props = {
  appliance: ApplianceProp;
  handleSelect: (items: applianceItem[]) => void;
  modalState: boolean;
  handleModalState: (state: string) => void
  items: applianceItem[]
}

const FreezerCompartment = ({ appliance, handleSelect, modalState, handleModalState, items }: Props) => {
  return (
    <>
      {appliance?.freezerCompartment && appliance.freezerCompartment.map(({ shelves, drawers }: CompartmentProps, index: number) => (
        <div key={index}>
          {/* Drawers */}
          {drawers != undefined &&
            <div className={`grid grid-cols-1 grid-rows-${drawers.length} gap-2 mx-auto mt-2`}>
              {drawers.map((drawer, index) => (
                <DrawerButton key={index} handleSelection={handleSelect} compartment='freezer' type='drawer' loc={drawer} modalState={modalState} handleModalState={handleModalState} items={getItemsInThisLocation(drawer, items, 'drawer')} />
              ))}
            </div>
          }
        </div>

      ))}
    </>
  )
}

export default FreezerCompartment