export const quantityLabel = (quantity?: fhir4.Quantity): string =>
  quantity?.value ? `${quantity.value} ${quantity.unit}` : "";
