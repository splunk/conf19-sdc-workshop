# Unlocking all the features of the Splunk Developer Program

This repo features resources and learning opportunities for participants attending the DEV2517 "Unlocking all the features of the Splunk Developer Program - cloud native app development" workshop at .conf19.


## Overview

Welcome to the workshop and the Splunk Cloud Services beta! Today, you'll get to work with the Splunk Developer Program offering that features tools and guidance to help you efficiently interact with Splunk Cloud Services and build cloud-native, data-driven apps. If anything goes awry along the way, please get the attention of a Splunker, and we'll be happy to provide you with assistance!

## Orientation
If you haven't done so already, [sign into Splunk Investigate](https://si.scp.splunk.com) with your Splunk account, accept the Terms Of Service, and choose a name for your Splunk Cloud Services tenant!

```diff
- Log into the [Splunk Developer Portal](https://sdc.splunkbeta.com) with your splunk.com credentials.
- Navigate to the [API Reference](https://sdc.splunkbeta.com/reference/) page.
- Select the **Identity** API and find the [`GET /principals`](https://sdc.splunkbeta.com/reference/api/identity/v2beta1#endpoint-listPrincipals) endpoint.
```
- Click **Console**. 
- Click **Show** to reveal your Authorization token value.
  - Copy the value and store it for later use.
  - *Each API request requires a valid token, for example, when using cURL directly.*
- Click **Submit** to make the API request and observe the response on the right.
  - Copy the value of the principal name that is displayed for use in the next API request.
```diff
- Find the [`GET /principals/{p}`](https://sdc.splunkbeta.com/reference/api/identity/v2beta1#endpoint-getPrincipal) endpoint.
```
- Click **Console**.
- Enter the value of the principal name in the form field. 
- Click **Submit** to make the API request and observe the response on the right.
  - Copy the value in the `tenants` array and store it for later use.
  - *Each API request will need to target a specific tenant.*

***If you cannot complete these steps, please contact a Splunker and let them know where you're getting stuck!***

## Get set up

Depending on what you choose to do during the workshop, you'll need to ensure your local development environment is set up to successfully submit API requests, and to access and run code examples and applications.

- [Splunk Cloud CLI](https://github.com/splunk/splunk-cloud-sdk-go/tree/master/cmd/scloud), or `scloud`, is a command-line tool that makes it easy to submit API requests against Splunk Cloud Services.
- [cURL](https://curl.haxx.se/dlwiz/?type=bin) is a command-line tool that allows you to transfer data to or from a server. A number of example API requests on the Splunk Developer Portal make use of cURL. 
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) is a source code management tool that allows you to run commands to access projects and keep track of changes to application files.
- [Node.js](https://nodejs.org) is a JavaScript runtime environment that is required for a number of example applications accessed from the Splunk Developer Portal.
- [npm](https://www.npmjs.com/) is package manager that makes it easy for programmers to publish and share source code of Node.js libraries.
  - The npm client is installed with Node.js. 
  - Make sure you are logged into npm via your command prompt before running `npm` or `npx` commands (`npm login`).
- [Yarn](https://yarnpkg.com/en/docs/install) is another package manager that enables additional workflows for JavaScript applications. A number of commands on the Splunk Developer Portal make use of Yarn. 

## Reproduce the demo!

1. Create a folder on your computer where you want your project files to reside.

2. Clone this repo to create the `conf19-scp-workshop` folder:
    ``` 
    $ git clone https://github.com/splunk/conf19-scp-workshop
    ```

3. Follow the steps at [./demo/README.md](https://github.com/splunk/conf19-scp-workshop/blob/master/demo/README.md) to set up your tenant with a pipeline and to ingest sample data.

4. Continue to [./transit_dashboard_app/README.md](https://github.com/splunk/conf19-scp-workshop/blob/master/transit_dashboard_app/README.md) to develop, build, and run the application.

## Resources

Take a look at the following pages for guidance and experimentation, and log in with your splunk.com username and password if/when prompted.

```diff
- Visit the Splunk Developer Portal at https://sdc.splunkbeta.com.
```
- Visit Splunk Investigate at https://si.scp.splunk.com to:
  - Add/connect your data through pipelines and wizards.
  - Search (with SPL2), analyze, investigate, and share your data with Workbooks.
  - Visualize your data with Dashboards. These are new and distinct from the Splunk Enterprise dashboards that you might already be familiar with.
- **You only need to set up a pipeline once for a given module/dataset.** 
- Most tutorials and examples will direct you to create a data pipeline, but you won't need to perform this step if you're comfortable with a new dataset flowing into the index via the pipeline you've already activated.


## Challenge yourself!

The first person to complete three (3) of the following challenges at your table will win a prize! Just show a Splunker proof of your work.
- [ ] Complete the [demo exercises](https://github.com/splunk/conf19-scp-workshop/tree/master/demo) and get the Seattle Transit app running locally with dashboards.
- [ ] Update the "passthrough" pipeline to perform a simple `eval` on incoming data.
- [ ] Ingest your own dataset (something **not** found on the Splunk Developer Portal or https://github.com/splunk) and write it to an index other than `main`... and return the data via SPL2.
  - [Amazon customer review data](https://s3.amazonaws.com/amazon-reviews-pds/readme.html).
  - [Data.gov](https://www.data.gov/).
  - [Open Data on AWS](https://registry.opendata.aws/).
- [ ] Visualize insights from your own dataset in a dashboard.
- [ ] Deploy and run an app you've set up locally to somewhere in the cloud (e.g. Heroku). *Hint: you'll need to work with the App Registry service after you've deployed the app and have a new URL its served from.*
- [ ] Find all the datasets in your tenant using the Catalog service, find all the groups you're a member of using the Identity service, and find your permissions in your tenant using the Identity service.

## Best bug!

Whoever finds the *best platform or tool bug* will win a prize! Let a Splunker know if you think you've discovered a bug so we can confirm and consider it for the prize.

*Documentation typos or errors are great and we want to hear about them, but only confirmed bugs will be considered for a prize.*

## Keep it going!

Remember, you're now a member of the Splunk Cloud Services beta, so keep exploring and experimenting with the beta after the workshop is over! 
- <sdcbeta@splunk.com>
- [#sdc](https://splunkdevplatform.slack.com/messages/CD44RNV7G) channel on Slack
