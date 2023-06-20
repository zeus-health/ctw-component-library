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
        payload: variantPayload,
      },
    },
  ],
});
