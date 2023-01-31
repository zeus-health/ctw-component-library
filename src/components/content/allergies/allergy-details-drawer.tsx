import { Details } from "@/components/core/collapsible-data-list-details";
import { Drawer } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { AllergyModel } from "@/fhir/models/allergies";

export function useAllergyDetailsDrawer() {
  const { openDrawer } = useDrawer();

  return (allergy: AllergyModel) => {
    openDrawer({
      component: (props) => (
        <AllergyDetailsDrawer allergy={allergy} {...props} />
      ),
    });
  };
}

export type AllergyDetailsDrawerProps = {
  className?: string;
  allergy: AllergyModel;
  isOpen: boolean;
  onClose: () => void;
};

export function AllergyDetailsDrawer({
  allergy,
  className,
  isOpen,
  onClose,
}: AllergyDetailsDrawerProps) {
  return (
    <Drawer
      className={className}
      title="Allergy Details"
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <div className="ctw-py-2">
          <div className="ctw-text-2xl">{allergy.display}</div>
        </div>

        <Details data={allergyData(allergy)} />
      </Drawer.Body>
    </Drawer>
  );
}

export const allergyData = (allergy: AllergyModel) => [
  { label: "Onset", value: allergy.onset },
  { label: "Description", value: allergy.display },
  { label: "Type", value: allergy.type },
  { label: "Category", value: allergy.categories },
  { label: "Manifestations", value: allergy.manifestations },
];
