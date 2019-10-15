# Welcome to the .conf19 DEV2517 workshop

This repo features resources and learning opportunities for participants attending the DEV2517 "Unlocking all the features of the Splunk Developer Program - Cloud Native App Development" workshop at .conf19.


## Overview

Welcome to the workshop and the Splunk Cloud Services beta! Today, you'll get to work with the Splunk Developer Program offering that features tools and guidance to help you efficiently interact with Splunk Cloud Services and build cloud-native, data-driven apps. 

If you get stuck along the way, please get the attention of a Splunker and we'll be happy to provide you with assistance!


## Set up your environment

If you haven't done so already, sign into [Splunk Investigate](https://si.scp.splunk.com) with your Splunk account, accept the Terms Of Service, and choose a name for your Splunk Cloud Services tenant.

Depending on what you choose to do during the workshop, you'll need to ensure your local development environment is set up to successfully submit API requests, and to access and run code examples and applications. Here are the tools you'll use: 

- [Splunk Cloud Services CLI](https://github.com/splunk/splunk-cloud-sdk-go/tree/master/cmd/scloud), or `scloud`, is a command-line tool that makes it easy to submit API requests against Splunk Cloud Services. Download and unpack the scloud binary from [GitHub](https://github.com/splunk/splunk-cloud-sdk-go/releases).
- [cURL](https://curl.haxx.se/dlwiz/?type=bin) is a command-line tool that allows you to transfer data to or from a server. A number of example API requests on the Splunk Developer Portal make use of cURL. 
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) is a source code management tool that allows you to run commands to access projects and keep track of changes to application files.
- [Node.js](https://nodejs.org) is a JavaScript runtime environment that is required for a number of example applications accessed from the Splunk Developer Portal.
- [npm](https://www.npmjs.com/) is package manager that makes it easy for programmers to publish and share source code of Node.js libraries.
  - The npm client is installed with Node.js. 
  - Make sure you are logged into npm via your command prompt before running `npm` or `npx` commands (`npm login`).
- [Yarn](https://yarnpkg.com/en/docs/install) is another package manager that enables additional workflows for JavaScript applications, this is used to install packages and run commands in the Transit Dashboard App.


## Resources

Take a look at the following pages for guidance and experimentation. Log in with your Splunk.com username and password when prompted.

- Visit the [Splunk Developer Portal](https://developer.splunk.com/scs/) for developer documentation.
- Visit [Splunk Investigate](https://si.scp.splunk.com) to:
  - Add and connect your data through pipelines and wizards.
  - Search with SPL2, analyze, investigate, and share your data with Workbooks.
  - Visualize your data with dashboards, which are new and distinct from the Splunk Enterprise dashboards that you might already be familiar with.
  **You only need to set up a pipeline once for a given module/dataset.** 
  Most tutorials and examples will direct you to create a data pipeline, but you won't need to perform this step if you're comfortable with a new dataset flowing into the index via the pipeline you've already activated.


## Challenge yourself!

The first person to complete three (3) of the following challenges at your table will win a prize! Just show a Splunker proof of your work.
- [ ] Get the [Transit Dashboard App](https://github.com/splunk/conf19-scp-workshop/blob/master/README.md) running locally with dashboards.
- [ ] Update the "passthrough" pipeline to perform a simple `eval` on incoming data.
- [ ] Ingest your own dataset (something **not** found on the Splunk Developer Portal or `https://github.com/splunk`) and write it to an index other than "main" and return the data using SPL2.
  - [Amazon customer review data](https://s3.amazonaws.com/amazon-reviews-pds/readme.html)
  - [Data.gov](https://www.data.gov/)
  - [Open Data on AWS](https://registry.opendata.aws/)
- [ ] Visualize insights from your own dataset in a dashboard.
- [ ] Deploy and run an app you've set up locally to somewhere in the cloud (e.g. Heroku). 
      *Hint: you'll need to work with the App Registry service after you've deployed the app and have a new URL its served from.*
- [ ] Find all the datasets in your tenant using the Catalog service, find all the groups you're a member of using the Identity service, and find your permissions in your tenant using the Identity service.


## Best bug!

Whoever finds the *best platform or tool bug* will win a prize! Let a Splunker know if you think you've discovered a bug so we can confirm and consider it for the prize.

*Documentation typos or errors are great and we want to hear about them, but only confirmed bugs will be considered for a prize.*


## Keep it going!

Remember, you're now a member of the Splunk Cloud Services beta, so keep exploring and experimenting with the beta after the workshop is over! 
- <devinfo@splunk.com>
- [#sdc](https://splunkdevplatform.slack.com/messages/CD44RNV7G) channel on Slack
