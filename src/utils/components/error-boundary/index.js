import { Component } from "@wordpress/element";

/**
 * A generic error handling component.
 *
 * @param {object} props - The props for the component.
 * @param {ErrorBoundary~onDidCatch} props.onDidCatch - A callback for rendering the fallback UI.
 *
 * @see {@link https://reactjs.org/docs/error-boundaries.html|React - Error Boundaries}
 */
export default class ErrorBoundary extends Component {
    constructor({ onDidCatch }) {
        // pass all props to the base
        super(...arguments);
        // setup our internal state which allows us to store and pass any thrown errors to the onDidCatch callback.
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    /**
     * Catches the error and updates the internal state to allow the fallback UI to be rendered.
     *
     * @param {Error} error - The error that was thrown.
     * @param {{componentStack: string}} errorInfo - An object with a componentStack key containing information about which component threw the error.
     *
     * @see https://reactjs.org/docs/react-component.html#componentdidcatch
     */
    componentDidCatch( error, errorInfo ){
        this.setState({
            error,
            errorInfo
        });
    }

    /**
     * Performs the rendering for the component.
     */
    render(){
        const { children, onDidCatch } = this.props;
        const { error, errorInfo } = this.state;
        if ( error ){
            // if an error was thrown call the onDidCatch callback and render its result
            return onDidCatch( error, errorInfo );
        }
        // by default simply render the children
        return children;
    }
}

//region Type Definitions

/**
 * A simple callback to allow rendering of the fallback UI.
 *
 * @callback ErrorBoundary~onDidCatch
 *
 * @param {Error} error - The error that was thrown.
 * @param {{componentStack: string}} errorInfo - An object with a componentStack key containing information about which component threw the error.
 */

//endregion