import "./index.scss";

import { Icon } from "@wordpress/components";
import { Component } from "@wordpress/element";

export default class SettingsCatchError extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch( error, errorInfo ){
        this.setState({
            error,
            errorInfo
        });
    }

    render(){
        if ( this.state.error ){
            const json = JSON.stringify( this.props.component, null, '\t' );
            return (
                <div className="fp-settings-error">
                    <div className="fp-settings-error__title"><Icon icon="flag" />An error occurred rendering a component!</div>
                    <pre className="fp-settings-error__component">{ json }</pre>
                    <pre className="fp-settings-error__stack">{ this.state.error.stack }</pre>
                    <pre className="fp-settings-error__react-stack">{ this.state.errorInfo.componentStack }</pre>
                </div>
            );
        }
        return this.props.children;
    }
};