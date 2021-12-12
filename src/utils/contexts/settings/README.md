# `SettingsContext` & `SettingsProvider`

React context & provider to manage a single WordPress `object` option that contains multiple values across multiple components.

@see https://reactjs.org/docs/context.html

For more information about the `optionName` and `defaults` props take a look at the `useSettings` documentation.

## _Returns_

Array containing the settings state and actions. See the [useSettings](../../hooks/use-settings/README.md) hook for more information.

## Usage

Within the parent component use the `SettingsProvider` and supply it with the `optionName` and `defaults` to use.

```jsx
import { SettingsProvider } from ".../utils";

import { MyComponent } from "./my-component";

export default function MySettings( { optionName, defaults } ) {
    return (
        <SettingsProvider optionName={ optionName } defaults={ defaults } >
            <MyComponent/>
        </SettingsProvider>
    );
}
```

Within any child component, in this case `MyComponent`, we can access the settings API with the `useContext` hook.

```jsx
// wordpress dependenciess
import { useContext } from "@wordpress/element";

// import the settings context
import { SettingsContext } from ".../utils";

export default function MyComponent(){
    
    // get the current state and actions for the settings
    const [ state, actions ] = useContext( SettingsContext );
    
    // ... do something
    return (<div>...</div>);
}
```

For convenience’ sake there is a `useSettingsContext` hook available in the utils which would change the above to instead be.

```jsx
// import the settings context
import { useSettingsContext } from ".../utils";

export default function MyComponent(){
    
    // get the current state and actions for the settings
    const [ state, actions ] = useSettingsContext();
    
    // ... do something
    return (<div>...</div>);
}
```