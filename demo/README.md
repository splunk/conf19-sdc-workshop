# DEV2517 Demo Walkthrough

How to replicate step-by-step the demo that highlights keys concepts of **DEV2517 Unlocking all the features of Splunk Developer Program - cloud native app development**.

## Overview

* Key concepts and terminology
* Interact with Splunk Cloud Services via APIs
* Get data in (and out!) of Splunk Cloud Services
* Create apps powered by Splunk Cloud Services APIs

## Key concepts and terminology

_Splunk Cloud Services is a collection of services exposed via REST APIs to enable fast and flexible app development_

The most fundamental concepts we’ll use in this demo are the **platform identities** and their *relationships*.
- **Principals** represent an actor that makes API requests against Splunk Cloud Services.
  - Users, Apps, and Service accounts are all kinds of Principals.
- **Tenants** represent a way to contain and isolate the resources provided by Splunk Cloud Services.
  - Splunk Cloud Services is multi-tenant. There is no separate deployment per customer like in Splunk Enterprise.
  - API requests are all made in the context of a specific tenant.
- Principals are allowed to make API requests against a tenant only if there exists a **membership**.
  - The membership includes specific *permissions* granted to the Principal within the Tenant.

By the end of this demo, you’ll have set up an **App** and **Subscription** to your Tenant--*but those concepts are better explained later!*

<kbd>![SCS Identities Screenshot](./identities.png)</kbd>

## Multiple ways to explore Splunk Cloud Services APIs

Explore the Splunk Cloud Services APIs in multiple ways, depending on your preference. For example, GET information about your Principal and see the Tenants you are a member of.

### Use the `API Console` on the Splunk Developer Portal

```diff
- https://sdc.splunkbeta.com/reference/api/identity/v2beta1#endpoint-getPrincipal
```

Similar to a Postman collection, you can make REST API requests using pre-defined forms and view the formatted results:

<kbd>![API Console Screenshot](./api-console.png)</kbd>

_Note: You are already logged into the Splunk Developer Portal, so your access token is automatically applied to the request_.

### Use the Splunk Cloud CLI (`scloud`) to make the same requests

```diff
- https://sdc.splunkbeta.com/docs/overview/sdctools/tools_scloud/scloud_identity#get-principal
```

For a more programmatic approach, you can use `scloud` to explore the Splunk Cloud Services APIs:

    $ scloud -u <principal> login
    Password: 
    {
        "access_token": "<<REDACTED>>",
        "expires_in": 3600,
        ...
    }
    
    $ scloud identity get-principal <principal>
    {
        "name": "<principal>",
        "tenants": [
            "<TENANT>"
        ]
        ...
    }

## We all know Splunk ~ Ingest, Index, and Search

All incoming data moves through the Splunk Data Stream Processor (DSP). Data from REST API or Splunk Forwarders first flows through the Splunk Firehose. The Firehose aggregates your data into a single stream. From there, your data goes through a data pipeline where you can perform complex transformations and troubleshooting on your data before sending it to your indexers for searching.

Indexes are defined as kind of dataset managed by the Catalog service, along with other datasets such as search job or kvstore lookup. They are all knowledge objects that contain data that can be read or written to.

After events are indexed, they can be searched through an updated and refined SPL2. We’ve added a more natural grammar to the SPL, that more closely resembles SQL. All the same `stats` and `eval` functions are still there, to allow you to create visualizations.

<kbd>![Ingest and Search Screenshot](./ingest-search.png)</kbd>

### 1. Add a passthrough pipeline

Before data can be ingested, your tenant must have a pipeline defined and activated to know how to process the events. For this demo, we will create a simple passthrough pipeline that simply reads events from the `Splunk Firehose` and writes them to the `main` index:

    $ scloud set tenant <TENANT>
    
    $ scloud streams compile-dsl -dsl-file passthrough.dsl > passthrough.upl
    
    $ scloud streams create-pipeline -name passthrough -bypass-validation true -data-file passthrough.upl


_Make note of the `<PIPELINE_ID>` that is returned. You'll need it for the next command._

    
    $ scloud streams activate-pipelines <PIPELINE_ID>

    
### 2. Ingest sample transit data

Once you have a pipeline activated, you can simply start sending events to your tenants using the Ingest service. The data ingested below represented some of the current transit agencies in Seattle providing service, as well as the arrival and depature data for the routes the agencies provide during a set period of time. 

On *nix:

    $ tail agencies-with-coverage.json \
        | scloud ingest post-events \
            -host localhost \
            -source agencies_with_coverage_json \
            -sourcetype json_no_timestamp \
            -format raw
    
    $ tail arrivals-and-departures.json \
        | scloud ingest post-events \
            -host localhost \
            -source arrivals_and_departures_json \
            -sourcetype json_no_timestamp \
            -format raw

On Windows: 

    more arrivals-and-departures.json | scloud ingest post-events -host localhost -source arrivals_and_departures_json -sourcetype json_no_timestamp -format raw

    more agencies-with-coverage.json | scloud ingest post-events -host localhost -source agencies_with_coverage_json -sourcetype json_no_timestamp -format raw


### 3. Explore the data through search

After the data is ingested and passed through the pipeline, it will be indexed and available for search. For example, we can see how many routes are currently active for each transit agency:

On *nix:

    $ scloud search "| from index:main where source=\"arrivals_and_departures_json\" \
        | stats count() as refCount \
        by 'data.references.agencies{}.name'" \
          -earliest 0 \
          -latest now

On Windows: 

    scloud search "from index:main where source=\"arrivals_and_departures_json\" | stats count() as refCount by 'data.references.agencies{}.name' " -earliest 0 -latest now


### Use Splunk Investigate to get data in

* Check out https://si.playground.scp.splunk.com/system/gdi/wizard for wizards to help you get data in, set up and configure pipelines, and preview live data streaming into your pipeline!

_Note: After data has been ingested, you can even see the number of events passing through each node in your pipeline!_

## Bring it all together with a Splunk App

**Apps** are *self-hosted*, and run in isolation from Splunk Cloud Services. This is different from Splunk Enterprise, where apps are installed to run alongside Splunk Enterprise itself. 

**Apps** are *use-case driven*, where the use case doesn’t have to be just about Splunk - apps *use* Splunk Cloud Services to solve problems. 

**Apps** are developed with *consistent integration* points to Splunk Cloud Services. There aren’t a million ways to configure, run, and develop apps--they all use the same REST APIs.

**Subscriptions** represent an authorization grant between an app and a tenant, and are required before any API requests can be made. Every subscription results in a *webhook* call back to the app, so that it knows it can start.

<kbd>![App Info Screenshot](./app-info.png)</kbd>

### 1. Define your app and create a subscription to your tenant

Apps are defined in a "home tenant" so that Splunk Cloud Services knows about metadata such as name, description, required permissions, and webhooks that get triggered on subscription events.

_Note: App names and titles are unique across all tenants, so for this example include your tenant name in `<TENANT>`._

Create the app with a unique name and title:

    $ scloud appreg create-app transit.demo.<TENANT> web \
        -redirect-urls http://localhost:3000 \
        -login-url https://auth.scp.splunk.com \
        -title "Transit Dashboard Demo App for <TENANT>" \
        -description "Copy of the transit dashboard demo app"

_Make note of the `<CLIENT_ID>` that is returned. You'll need it when configuring the Transit Dashboard App_

Create a subscription to the app:

    $ scloud appreg create-subscription transit.demo.<TENANT>


### 2. Set up the Transit Dashboard App

The demo app located at `../transit_dashboard_app` is a follow-up example of how to define and configure an app to run against Splunk Cloud Services once the pipelines above have been activated and transit data has been ingested. Jump to the [README instructions there](https://github.com/splunk/conf19-scp-workshop/blob/master/transit_dashboard_app/README.md) to finish off the demo!

