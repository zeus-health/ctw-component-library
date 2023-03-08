A component library supporting care team workflows.

Library maintained by Zus Health.

Storybook Docs: https://zeus-health.github.io/ctw-component-library/

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
3. Setup `authTokenURL` to point to an endpoint that will return `{access_token: TOKEN}`. This is how we provide seamless logins for your users to access Zus APIs.
4. Optioally pass in a `theme` to overwrite styles across all of the components.
5. Optioally pass in a `locals` to overwrite different words in our glossary or different copy throughout the components.
6. Optioally pass in a `enableTelemetry` to enable telemetry, see details below.

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
3. `<PatientProvider>` also has an `onPatientSave` prop which can be used to override the behavior when saving patient information. `onPatientSave` should be an async function.

An example onPatientSave function could be as follows:

```
const onPatientSave = async (data: PatientFormData) => {
/*
  type PatientFormData = {
    lastName: string;
    firstName: string;
    gender: fhir4.Patient["gender"];
    dateOfBirth: Date;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
};
*/

// Do whatever you want with data (eg, send to server)

  return response
}


```

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

## Telemetry

Telemetry is sent to DataDog from CTW components. This telemetry tracks usage so that Zus can continually
improve the ctw-component-library and fix issues that might otherwise go unnoticed.

### Opting out of telemetry

Zus has a BAA with DataDog and we understand that your applications need to meet HIPAA regulations the same as ours.
We take this into account when choosing which telemetry data can be tracked, but we also respect the choice to not
opt-in to telemetry collection. We encourage you to reach out to the team to discuss which telemetry we collect.
However, if choose not to opt-in, there is no action required on your part, as long as the property `enableTelemetry` is
not passed to the `CTWProvider` component used in your React app, no telemetry will be logged.

```tsx
// Telemetry off:
<CTWProvider>{/** Application **/}</CTWProvider>

// Telemetry on:
<CTWProvider enableTelemetry>{/** Application **/}</CTWProvider>
```

# Contributing

## Changesets

In order to run changeset in the project run `npx changeset` and follow the prompts. More information on adding a changeset can be found in [changeset docs](docs/adding-a-changeset.md).

Pushing a PR with a changeset will trigger a github action which will create a PR that if merged will automatically:

- Upgrade our package.json accordingly
- Delete changesets that are no longer needed
- Update our changelog
- Publish our npm package
