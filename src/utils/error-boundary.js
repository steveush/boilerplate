import { Component } from "@wordpress/element";

export default class ErrorBoundary extends Component {
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
        const { children, onError } = this.props;
        const { error, errorInfo } = this.state;
        if ( error ){
            return onError( error, errorInfo );
        }
        return children;
    }
};