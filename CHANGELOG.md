# ctw-component-library

## 0.5.0

### Minor Changes

- 6a8755c: Fixup library packaging, tweak few styles, and make PatientProvider exported.
- 538c409: There's a new PatientProvider that provides a UPID via the user providing either a PatientUPID or a combination of PatientID/SystemUrl.

## 0.4.0

### Minor Changes

- 9d0f29b: Allows the client to pass in a theme object that redefines our overridable CSS variables for more customizability. The client can choose to pass in this obect, or simply make no change to their code and keep the default styling.
- 101ed98: Adds sticky rightmost column that allows consumers to code different actions on a dropdown menu.

### Patch Changes

- 57123f8: Treat more condition statuses as "active".

## 0.3.0

### Minor Changes

- 88d3b2e: filters out confirmed conditions from not reviewed conditions

## 0.2.0

### Minor Changes

- 497847f: Allow headers to be passed into provider.

## 0.1.0

### Minor Changes

- d49a70d: className prop added to all components and applied to their top div / element to provide an intuitive way for consumers to apply CSS classes. Consumers can choose to do things like <Conditions className="…">.

## 0.0.4

### Patch Changes

- b38e2a9: fixes release strategy
- a238bdd: fix publishing issues
- a238bdd: Update readme and adding changeset to set process

## 0.0.2

### Patch Changes

- 54e83e4: Adds the ability to add changeset to this repo and adds MIT license
