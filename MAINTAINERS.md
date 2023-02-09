# Telemetry

Telemetry is sent to DataDog from CTW components. This telemetry tracks usage so that Zus can continually
improve the ctw-component-library and fix issues that might otherwise go unnoticed. Currently, the telemetry
provides a basic logger, a React error boundary to log errors and a few HTML dataset attributes to inform which
elements have trackable events to listen for and the context of which CTW component the event was triggered from.

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
