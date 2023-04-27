type GeneralInfo = {
  name: string;
  contactDetails: string;
};

type ExtendedGeneralInfo = GeneralInfo & {
  relationship?: string;
  time?: string;
  functionCode?: string;
};

type GeneralInfoWithOrg = GeneralInfo & {
  organization: GeneralInfo;
};

export const isGeneralInfoExist = (item: GeneralInfo | undefined): item is GeneralInfo => !!item;

export const isExtendedGeneralInfoExist = (
  item: ExtendedGeneralInfo | undefined
): item is ExtendedGeneralInfo => !!item;

export type { GeneralInfo, ExtendedGeneralInfo, GeneralInfoWithOrg };
