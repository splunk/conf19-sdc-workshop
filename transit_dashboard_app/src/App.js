/*
Copyright © 2018 Splunk Inc.
SPLUNK CONFIDENTIAL – Use or disclosure of this material in whole or in part
without a valid written license from Splunk Inc. is PROHIBITED.
*/

import React, { Component } from 'react';
import authClient from './auth';
//import Dashboard from './Dashboard';
import { Center, GlobalStyle } from './styles';

class App extends Component {
    state = {
        loggedIn: false,
        error: null,
    };

    componentDidMount() {
        this.authenticate();
    }

    authenticate = async () => {
        try {
            // authClient will redirect to login page if user is not authenticated.
            const authenticated = await authClient.checkAuthentication();
            this.setState({
                loggedIn: authenticated,
            });
        } catch (ex) {
            this.setState({
                loggedIn: false,
                error: ex.message,
            });
        }
    };

    render() {
        const { loggedIn, error } = this.state;
        if (error) {
            return (
                <React.Fragment>
                <Center>
                    <h2 type="error">{error}</h2>
                </Center>
                <GlobalStyle />
                </React.Fragment>
            );
        }
        if (!loggedIn) {
            return (
                <React.Fragment>
                <Center>
                    <h2>Loading...</h2>
                </Center>
                <GlobalStyle />
                </React.Fragment>
            );
        }
        return (
            /*<Dashboard />*/
            <React.Fragment>
            <h2>Hi!</h2>
            <GlobalStyle />
            </React.Fragment>
        );
    }
}

export default App;
