import { RadioControl } from "@wordpress/components";

function FooRadio( { label, selected, options, onChange } ){
    return (
        <RadioControl
            label={ label }
            options={ options }
            selected={ selected }
            onChange={ onChange }
        />
    );
}

export default FooRadio;