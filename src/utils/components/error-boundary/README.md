# Component - `ErrorBoundary`

A generic error handling component.

## Props

This component exposes no props.

## Callbacks

### `onDidCatch( Error error, object errorInfo )`

This callback is invoked whenever an error is caught and provides a simple way to render a fallback component.

_Parameters_

* _error_ `Error`: The error that was thrown.
* _errorInfo_ `object`: An object with a componentStack key containing information about which component threw the error.

## Usage

```jsx
import { ErrorBoundary } from ".../utils";

export default function MyComponent() {
    // create a callback to handle rendering the error UI
    const onDidCatch = ( error, errorInfo ) => {
        return (
            <div>This is rendered whenever an error is thrown</div>
        );
    };
    
    return (
        <ErrorBoundary onDidCatch={ onDidCatch }>
            <PossiblyThrowsError/>
        </ErrorBoundary>
    );
};
```