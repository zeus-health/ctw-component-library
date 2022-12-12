type CCSChapterNameMapType = Record<
  string,
  { fullName: string; shortName: string } | undefined
>;

export const CCSChapterName: CCSChapterNameMapType = {
  INF: {
    fullName: "Certain Infectious and Parasitic Diseases",
    shortName: "Infectious and Parasitic Diseases",
  },
  NEO: { fullName: "Neoplasms", shortName: "Neoplasms" },
  BLD: {
    fullName:
      "Diseases of the Blood and Blood Forming Organs and Certain Disorders Involving the Immune Mechanism",
    shortName: "Blood Diseases",
  },
  END: {
    fullName: "Endocrine, Nutritional and Metabolic Diseases",
    shortName: "Endocrine, Nutritional and Metabolic",
  },
  MBD: {
    fullName: "Mental, Behavioral and Neurodevelopmental Disorders",
    shortName: "Mental and Behavioral",
  },
  NVS: {
    fullName: "Diseases of the Nervous System",
    shortName: "Nervous System",
  },
  EYE: {
    fullName: "Diseases of the Eye and Adnexa",
    shortName: "Eye and Adnexa",
  },
  EAR: {
    fullName: "Diseases of the Ear and Mastoid Process",
    shortName: "Ear and Mastoid Process",
  },
  CIR: {
    fullName: "Diseases of the Circulatory System",
    shortName: "Circulatory System",
  },
  RSP: {
    fullName: "Diseases of the Respiratory System",
    shortName: "Respiratory System",
  },
  DIG: {
    fullName: "Diseases of the Digestive System",
    shortName: "Digestive System",
  },
  SKN: {
    fullName: "Diseases of the Skin and Subcutaneous Tissue",
    shortName: "Skin and Subcutaneous Tissue",
  },
  MUS: {
    fullName: "Diseases of the Musculoskeletal System and Connective Tissue",
    shortName: "Musculoskeletal System",
  },
  GEN: {
    fullName: "Diseases of the Genitourinary System",
    shortName: "Genitourinary System",
  },
  PRG: {
    fullName: "Pregnancy, Childbirth and the Puerperium",
    shortName: "Pregnancy & Childbirth",
  },
  PNL: {
    fullName: "Certain Conditions Originating in the Perinatal Period",
    shortName: "Perinatal Conditions",
  },
  MAL: {
    fullName:
      "Congenital Malformations, Deformations and Chromosomal Abnormalities",
    shortName: "Malformations and Chromosomal Abnormalities",
  },
  SYM: {
    fullName: "Symptoms, Signs and Abnormal Clinical and Laboratory Findings",
    shortName: "Clinical Findings",
  },
  INJ: {
    fullName:
      "Injury, Poisoning and Certain Other Consequences of External Causes",
    shortName: "External Causes Injury",
  },
  EXT: {
    fullName: "External Causes of Morbidity",
    shortName: "External Morbidity",
  },
  FAC: {
    fullName:
      "Factors Influencing Health Status and Contact with Health Services",
    shortName: "Health Status Influences",
  },
  XXX: {
    fullName:
      "Unacceptable principal diagnosis (inpatient data) or first-listed diagnosis (outpatient data)",
    shortName: "Unacceptable principal diagnosis",
  },
};
