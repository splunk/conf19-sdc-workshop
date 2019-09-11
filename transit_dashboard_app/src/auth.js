/*
Copyright © 2018 Splunk Inc.
SPLUNK CONFIDENTIAL – Use or disclosure of this material in whole or in part
without a valid written license from Splunk Inc. is PROHIBITED.
*/

import AuthClient from '@splunkdev/cloud-auth/AuthClient';

import { auth as authConfig } from './config/config.json';

export default new AuthClient({
    ...authConfig,
    redirectUri: window.location.origin, // eslint-disable-line
});
