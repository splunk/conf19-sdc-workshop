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

import authClient from './auth';
import { pipeline, tenant } from '../config/config.json';
import { SplunkCloud } from '@splunkdev/cloud-sdk';

export default function newServiceClient() {
    return new ServiceHelperClient({
        tokenSource: authClient.getAccessToken(),
        defaultTenant: tenant,
    });
};

export const PIPELINE_NOT_FOUND = 'PIPELINE NOT FOUND';

class ServiceHelperClient extends SplunkCloud {
    /**
     * Helper method to check if config pipeline is active
     */
    getSamplePipelineStatus() {
        return new Promise((resolve, reject) => {
            this.streams.listPipelines().then((res) => {
                if (!Array.isArray(res.items)) {
                    reject('Malformed response from listPipelines, no items array.');
                }
                for (let i=0; i<res.items.length; i++) {
                    if (res.items[i].name === pipeline.name) {
                        resolve(res.items[i].status);
                        return;
                    }
                }
                reject(PIPELINE_NOT_FOUND);
            }).catch((e) => { reject(e) });
        });
    }
    
    /**
     * Helper method to activate the config pipeline
     */
    activateSamplePipeline() {
        return new Promise((resolve, reject) =>
            this.streams.compileDSL({ pipeline.dsl })
                .then((upl) => this.streams.createPipeline(req))
                .then((res) => this.streams.activatePipeline(id, {}))
                .then(() => { resolve(true) })
                .catch((e) => { reject(e) })
        );
    }
    
    /**
     * Helper method to search for sample ingest data 
     */
    checkForSampleData() {

    }

    /**
     * Helper method to ingest sample data into sample pipeline
     */
    ingestSampleData() {

    }
}