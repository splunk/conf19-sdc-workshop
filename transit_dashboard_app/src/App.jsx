/**
 * Copyright 2019 Splunk, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"): you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';
import authClient from './auth';
import Dashboard from './Dashboard';
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
            <React.Fragment>
            <h2>Hi!</h2>
            <Dashboard />
            <GlobalStyle />
            </React.Fragment>
        );
    }
}

export default App;
