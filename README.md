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
improve the ctw-component-library and fix issues that might otherwise go unnoticed. Currently, the telemetry
provides a basic logger, a React error boundary to log errors and a few HTML dataset attributes to inform which
elements have trackable events to listen for and the context of which CTW component the event was trigger from.

| Dataset Attribute            | Description                                                                                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-zus-telemetry-namespace | Set a namespace for a component. The namespace value will be displayed for context on any events that occur within this component or its children. \* |
| data-zus-telemetry-click     | Name an action to be tracked when a user clicks an element                                                                                            |
| data-zus-telemetry-focus     | Name an action to be tracked when a user focuses on an element                                                                                        |

> `*` Namespaces resolve based on the HTML DOM, not the React virtual DOM. This means components like
> `Transition.Root` may not use the namespace of the component that renders it in the virtual DOM.

Here is an example of how to use all the dataset attributes to track a click event and a focus event. Namespaces are not
required to exist in the same component as event attributes, this example uses a single React component for readability.

```tsx
function DemoApp(props) {
  return (
    <div data-zus-telemetry-namespace="DemoApp">
      <form data-zus-telemetry-namespace="Form[Your Dinner]">
        <input
          type="text"
          name="favoriteFood"
          data-zus-telemetry-focus="favoriteFood"
        />
        <button type="submit" data-zus-telemetry-click="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
```

When a user focuses on the text input in that component, we will log an event:

```
click event: DemoEvent > Form[Your Dinner] > submit
```

Likewise when the user clicks on the submit button, an event will be logged:

```
focus event: DemoEvent > Form[Your Dinner] > favoriteFood
```

### Using the Telemetry Logger

Contributors may use the Telemetry logger directly _(it's not exported in the released ctw-component-library package)_.
`Telemetry.logger` is an instance of [the DataDog logger](https://docs.datadoghq.com/logs/log_collection/javascript/).

```ts
import Telemetry from "@/utils/telemetry";

Telemetry.logger.info("I'm using telemetry!");
Telemetry.logger.log("This is a message", { reason: "This is some context" });
```

Logging errors is possible with `Telemetry.logger.error`, however, it is recommended that we use the helper
`Telemetry.logError` as it handles sending the stack trace along with the message.

```ts
try {
  throw new Error("Oh no!");
} catch (e) {
  Telemetry.logError(e); // Error message will be "Oh no!"
  Telemetry.logError(e, "Whoopsie."); // Error message will be "Whoopsie."
}
```

### Using the `TelemetryErrorBoundary` Component

The `TelemetryErrorBoundary` component is a React error boundary wrapper that simply renders any children passed into it.
If there is an uncaught error thrown from any descendants of the `TelemetryErrorBoundary`, the boundary will catch the
error and log the error to DataDog. It then renders a friendly error message with a "refresh component" button so the
user may opt to show the component again. The error message sent to DataDog will use the `name` prop to log which
component the error was thrown under. Unlike `data-zus-telemetry-namespace`, we don't log the name of all
`TelemetryErrorBoundary`s in the tree. The error boundary to catch an error is the one to log it.

```tsx
import { TelemetryErrorBoundary } from "@/components/core/telemetry-boundary";

function SomeComponent(props) {
  return (
    <TelemetryErrorBoundary name="SomeComponent">
      <h1>Wow! This is some component!</h1>
      <AnotherComponent />
    </TelemetryErrorBoundary>
  );
}
```

> React error boundaries don't catch all errors. For example, they don't catch errors thrown from event handlers.
> Contributors trying to log errors from event handlers should use the Telemetry logger. Read more about error
> boundaries and their limitations [here](https://reactjs.org/docs/error-boundaries.html)

### Opting out of telemetry

Zus has a BAA with DataDog and we understand that your applications need to meet HIPAA regulations the same as ours.
We take this into account when choosing which telemetry data can be tracked, but we also respect the choice to opt-out
of telemetry collection all together. We encourage you to reach out to the team to discuss which telemetry we collect.
However, you choose to simply opt-out, simply pass the boolean property `disableTelemetry` to the `CTWProvider`
component used in your React app.

```tsx
<CTWProvider disableTelemetry>{/** Application **/}</CTWProvider>
```

# Contributing

## Changesets

In order to run changeset in the project run `npx changeset` and follow the prompts. More information on adding a changeset can be found in [changeset docs](docs/adding-a-changeset.md).

Pushing a PR with a changeset will trigger a github action which will create a PR that if merged will automatically:

- Upgrade our package.json accordingly
- Delete changesets that are no longer needed
- Update our changelog
- Publish our npm package
