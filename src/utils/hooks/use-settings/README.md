# Hook - `useSettings( string optionName, object defaults ) : [ state, actions ]`

React hook that wraps working with the WP Backbone API settings.

**NOTE**:

The options must be stored as an object within a single registered WP setting.
This hook provides an interface to work with this extra layer of abstraction.

## _Parameters_

* _optionName_ `string`: The `option_name` used to `register_setting` on the server.
* _defaults_ `object`: The `default` used to `register_setting` on the server.

## _Returns_

* `[ state, actions ]`: An array containing the `state` and `actions` objects.

## 

## State - `[ state ]`

This object exposes the state for the settings.

### `isLoaded`

Whether the settings have been loaded using the Backbone WP API.

* Type: `Boolean`
* Default: `false`

### `hasChanges`

Whether there are changes that can be saved/discarded. i.e. The current in memory settings differ to the last saved.

* Type: `Boolean`
* Default: `false`

### `canReset`

Whether the saved settings differ to the defaults.

* Type: `Boolean`
* Default: `false`



## Actions - `[, actions ]`

This object contains various functions to manipulate the settings.

### `getValue( string path ) : any`

Get the current value for the option path. i.e. The value in memory.

_Parameters_

* _path_ `string`: The path to the property to retrieve. This can use array notation.

_Returns_

* `any|undefined`: The value of the path, or `undefined` if the path does not exist.



### `setValue( string path, any value )`

Set the current value for the option path. i.e. The value in memory.

**NOTE**: If the supplied `value` is the same as the internal value no change will occur. i.e. No state update is triggered.

_Parameters_

* _path_ `string`: The path to the property to set. This can use array notation.
* _value_ `any`: The JSON serializable value to set for the path.

_Returns_

* `boolean`: True if the value was updated, false if the value remained unchanged.



### `getDefault( string path ) : any`

Get the default value for the option path.

_Parameters_

* _path_ `string`: The path to the property to retrieve. This can use array notation.

_Returns_

* `any|undefined`: The value of the path, or `undefined` if the path does not exist.



### `setToDefault( string path )`

Set the current value for the option path back to its default.

**NOTE**: If the default value is the same as the internal value no change will occur. i.e. No state update is triggered.

_Parameters_

* _path_ `string`: The path to the property to set. This can use array notation.

_Returns_

* `boolean`: True if the value was updated, false if the value remained unchanged.



### `getInitial( string path ) : any`

Get the initial value for the option path. i.e. The persisted value.

_Parameters_

* _path_ `string`: The path to the property to retrieve. This can use array notation.

_Returns_

* `any|undefined`: The value of the path, or `undefined` if the path does not exist.



### `setToInitial( string path )`

Set the current value for the option path back to its last saved value.

**NOTE**: If the initial value is the same as the internal value no change will occur. i.e. No state update is triggered.

_Parameters_

* _path_ `string`: The path to the property to set. This can use array notation.

_Returns_

* `boolean`: True if the value was updated, false if the value remained unchanged.



### `save() : Promise`

Saves any changes to the server.

_Returns_

* `Promise`: Resolves once the changes are saved, or rejects with the error response.



### `reset() : Promise`

Resets all options to the defaults and saves them back to the server.

_Returns_

* `Promise`: Resolves once the options are reset and saved, or rejects with the error response.



### `discard() : boolean`

Discards all in memory changes made to the options and resets them back to the last saved state.

_Returns_

* `boolean`: True if changes were successfully discarded.



## Usage

Before this hook can be used the setting must be registered on the WordPress side. Take a look at the [PHP readme](README-PHP.md) for more information. With that implemented in some form, we have access to the option name and the defaults required as parameters to the hook. 

### Basic control component

```jsx
// wordpress imports
import { CheckboxControl } from "@wordpress/components";

// ... global.PLUGIN_ASSETS would be output by the PHP
const { optionName, defaults } = global.PLUGIN_ASSETS;

export default function MyCheckbox() {
    // get the required state and actions
    const [
        // state
        { isLoading },
        // actions
        { getValue, setValue }
    ] = useSettings( optionName, defaults );

    // do nothing before the settings are loaded, this could instead render a placeholder etc.
    if ( isLoading ) {
        return null;
    }

    return (
        <CheckboxControl
            label="Option 1"
            checked={ getValue( 'option1' ) }
            onChange={ ( value ) => setValue( 'option1', value ) }
        />
    );
}
```

### Advanced control component

A more advanced component that provides the ability to reset a text input back to the last saved value or the default.

```jsx
// wordpress imports
import { TextControl } from "@wordpress/components";

// ... global.PLUGIN_ASSETS is output by the PHP
const { optionName, defaults } = global.PLUGIN_ASSETS;

export default function MyTextbox() {
    // get the required state and actions
    const [
        // state
        { isLoading },
        // actions
        { getValue, setValue, getDefault, getInitial }
    ] = useSettings( optionName, defaults );

    // do nothing before the settings are loaded, this could instead render a placeholder etc.
    if ( isLoading ) {
        return null;
    }
    
    return (
        <div className="my-textbox">
            <TextControl
                label="Option 2"
                value={ getValue( 'child.option2' ) }
                onChange={ ( value ) => setValue( 'child.option2', value ) }
            />
            <Button onClick={ () => setValue( 'child.option2', getDefault( 'child.option2' ) ) }>
                Reset to default
            </Button>
            <Button onClick={ () => setValue( 'child.option2', getInitial( 'child.option2' ) ) }>
                Reset to initial
            </Button>
        </div>
    );
}
```

### Basic settings with save/reset/discard

```js
// wordpress imports
import { Button, CheckboxControl, TextControl } from "@wordpress/components";

// ... global.PLUGIN_ASSETS is output by the PHP
const { optionName, defaults } = global.PLUGIN_ASSETS;

export default function MySettings() {
    // get the required state and actions
    const [
        // state
        {
            isLoading,
            hasChanges,
            canReset
        },
        // actions
        {
            getValue,
            setValue,
            setToDefault,
            setToInitial,
            save,
            reset,
            discard
        }
    ] = useSettings( optionName, defaults );

    // do nothing before the settings are loaded, this could instead render a placeholder etc.
    if ( isLoading ) {
        return null;
    }

    const onSaveClick = () => {
        save().then(/* resolved(), rejected( response ) */);
    };

    const onDiscardClick = () => {
        if ( discard() ){
            // successful
        }
    };

    const onResetClick = () => {
        reset().then(/* resolved(), rejected( response ) */);
    };

    return (
        <div className="my-settings">
            <CheckboxControl
                label="Option 1"
                checked={ getValue( 'option1' ) }
                onChange={ ( value ) => setValue( 'option1', value ) }
            />
            <div className="my-textbox">
                <TextControl
                    label="Option 2"
                    value={ getValue( 'child.option2' ) }
                    onChange={ ( value ) => setValue( 'child.option2', value ) }
                />
                <Button onClick={ () => setToDefault( 'child.option2' ) }>
                    Reset to default
                </Button>
                <Button onClick={ () => setToInitial( 'child.option2' ) }>
                    Reset to initial
                </Button>
            </div>
            <div className="my-settings__actions">
                <Button
                    disabled={ !hasChanges }
                    onClick={ onSaveClick }
                >
                    Save changes
                </Button>
                <Button
                    disabled={ !hasChanges }
                    onClick={ onDiscardClick }
                >
                    Discard changes
                </Button>
                <Button
                    disabled={ canReset }
                    onClick={ onResetClick }
                >
                    Reset to defaults
                </Button>
            </div>
        </div>
    );
};
```

## Advanced settings

Things get a little complicated when we want to refactor the various components out into their own files.
They all need to access the same instance of the settings state. Calling `useSettings` within each 
component will not work as each call would create its own state. 

To work around this we could simply pass the state and actions down to the child components however this 
can quickly lead to a large amount of props being passed around and having to manually pass them to 
children etc.

To work around this use the `SettingsContext` and its accompanying `SettingsProvider` component. 
See the [readme](../../contexts/settings/README.md) for more information.