export const unleashVariant = (
  toggleName: string,
  variantName: string,
  variantPayload: unknown,
  enabled: boolean
) => ({
  toggles: [
    {
      name: toggleName,
      enabled,
      variant: {
        name: variantName,
        payload: {
          type: "json",
          value: JSON.stringify(variantPayload),
        },
        enabled: true,
      },
    },
  ],
});
