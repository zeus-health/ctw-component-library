A component library supporting care team workflows.

Library maintained by Zus Health.

# Install & Setup

```
npm i @zus-health/ctw-component-library
```

## Include CSS Stylesheet.

Include the CSS file:

```typescript
import ctwStyles from "@zus-health/ctw-component-library/dist/style.css";
```

## Setup `CTWProvider`

The `CTWProvider` component provides authentication details needed for other components to make API requests to Zus.

1. Add `<CTWProvider>` wrapper at a high level within your application.
2. Pass in the desired environment, either `env="sandbox"` or `env="production"`.
3. Pass in either the Zus `authToken` or the URL of an endpoint that will return one via `authTokenURL`.
4. Optioally pass in a `theme` to overwrite styles across all of the components.

Example:

```typescript
import { CTWProvider } from "@zus-health/ctw-component-library";

function App() {
  return (
    <CTWProvider env="sandbox" authToken={AUTH_TOKEN}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </CTWProvider>
  );
}
```

### Setup `PatientProvider`

The `PatientProvider` component provides patient details needed by other components to fetch patient specific records from Zus.

1. Add `<PatientProvider>` wrapper at a high level within your patient portal (or wherever you have selected down to a single patient).
2. Pass in identifier information for this patient via `patientID` and `systemURL`.

Example:

```typescript
import { PatientProvider, Conditions } from "@zus-health/ctw-component-library";

function PatientPortal({ patientID }: PatientPortalProps) {
  return (
    <PatientProvider patientID={patientID} systemURL="https://www.example.com">
      // Any nested components can now use any patient specific components.
      <Conditions />
    </PatientProvider>
  );
}
```

# Contributing

## Changesets

In order to run changeset in the project run `npx changeset` and follow the prompts. More information on adding a changeset can be found in [changeset docs](docs/adding-a-changeset.md).

Pushing a PR with a changeset will trigger a github action which will create a PR that if merged will automatically:

- Upgrade our package.json accordingly
- Delete changesets that are no longer needed
- Update our changelog
- Publish our npm package

## Storybook

Storybook is a UI component explorer. It provides UI for prop controls.

`npm run storybook`