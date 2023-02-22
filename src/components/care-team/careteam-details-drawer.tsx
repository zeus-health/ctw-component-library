import { Details } from "@/components/core/collapsible-data-list-details";
import { Drawer } from "@/components/core/drawer";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { CareTeamModel } from "@/fhir/models/careteam";

export function useCareTeamDetailDrawer() {
  const { openDrawer } = useDrawer();

  return (careteam: CareTeamModel) => {
    openDrawer({
      component: (props) => (
        <CareTeamDetailDrawer careteam={careteam} {...props} />
      ),
    });
  };
}

export type CareTeamDetailsDrawerProps = {
  className?: string;
  careteam: CareTeamModel;
  isOpen: boolean;
  onClose: () => void;
};

export function CareTeamDetailDrawer({
  careteam,
  className,
  isOpen,
  onClose,
}: CareTeamDetailsDrawerProps) {
  return (
    <Drawer
      className={className}
      title="CareTeam Details"
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <div className="ctw-py-2">
          <div className="ctw-text-2xl">{careteam.status}</div>
        </div>

        <Details data={careTeamData(careteam)} />
      </Drawer.Body>
    </Drawer>
  );
}

export const careTeamData = (careTeam: CareTeamModel) => [
  { label: "Status", value: careTeam.status },
];
