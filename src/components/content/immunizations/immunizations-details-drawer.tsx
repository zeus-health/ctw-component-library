import { CodingList } from "@/components/core/coding-list";
import { Details } from "@/components/core/collapsible-data-list-details";
import { Drawer } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { ImmunizationModel } from "@/fhir/models/immunization";

export function useImmunizationDetailsDrawer() {
  const { openDrawer } = useDrawer();

  return (immunization: ImmunizationModel) => {
    openDrawer({
      component: (props) => (
        <ImmunizationDetailsDrawer immunization={immunization} {...props} />
      ),
    });
  };
}

export type ImmunizationDetailsDrawerProps = {
  className?: string;
  immunization: ImmunizationModel;
  isOpen: boolean;
  onClose: () => void;
};

export function ImmunizationDetailsDrawer({
  immunization,
  className,
  isOpen,
  onClose,
}: ImmunizationDetailsDrawerProps) {
  return (
    <Drawer
      className={className}
      title="Immunization Details"
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <div className="ctw-py-2">
          <div className="ctw-text-2xl">{immunization.description}</div>
        </div>

        <Details data={immunizationData(immunization)} />
      </Drawer.Body>
    </Drawer>
  );
}

export const immunizationData = (immunization: ImmunizationModel) => [
  { label: "Description", value: immunization.description },
  {
    label: "Vaccine Code",
    value: immunization.resource.vaccineCode.coding ? (
      <CodingList codings={immunization.resource.vaccineCode.coding} />
    ) : undefined,
  },
];
