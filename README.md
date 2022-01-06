<p align="center">
    <img src='./images/synapse-logo-3.png' alt='synapse branding logo' width=''/>
</p>

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/synapse.svg)](https://npmjs.org/package/synapse)
[![Downloads/week](https://img.shields.io/npm/dw/synapse.svg)](https://npmjs.org/package/synapse)

## The Team

**[Jay Gudsson](https://www.linkedin.com/in/gudsson/)** _Software Engineer_ (Vancouver, Canada)

**[Justin Gustafson](https://www.linkedin.com/in/justin-gustafson-98063945/)** _Software Engineer_ (Grand Rapids, Michigan)

**[Aneesh Patel](https://www.linkedin.com/in/aneesh-patel-62172b91/)** _Software Engineer_ (Virginia Beach, Virginia)

**[Dylan Jones](https://www.linkedin.com/in/dylan-jones-053310218/)** _Software Engineer_ (Vancouver, Canada)

---

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Gateway Manager](#gateway-manager)
- [Query Monitoring](#query-monitoring)
- [Frontend vs. Backend Buttons](#frontend-vs-backend-buttons)
- [Viewing Data Options](#viewing-data-options)
- [Development vs. Production Server](#development-vs-production-server)
- [Managing Users](#managing-users)
- [Synapse Configuration](#synapse-configuration)
- [Adding Data Sources](#adding-data-sources)
- [Development Flow](#development-flow)
- [Deployment](#deployment)

---

## Introduction

Synapse was designed to facilitate the efficient creation of a single GraphQL gateway for multiple existing APIs. It does so by providing an intuitive user interface (the Gateway Manager) to set up and configure your gateway in just a few steps. The Synapse Gateway Manager includes monitoring for all queries and mutations made to the Gateway, allowing the developer to view and filter queries by individual resolvers and in addition to view the latency of each query or resolver. Synapse also offers easy deployment, allowing the developer to deploy their created gateway to Amazon Web Services with a single command.

## GraphQL in Front of Your APIs

Synapse does not replace your existing APIs/data sources with GraphQL, but rather creates a single GraphQL schema that stitches your existing sources together. You can think of the Synapse GraphQL Gateway as a separate server sitting in front of your APIs with the ability to request specific information from them to fulfill different queries from the client. From the client’s perspective, the gateway is just a single GraphQL endpoint, but from the backend perspective, the gateway is making requests to all your existing APIs and data sources, enabling it to respond with the requested data. This allows you to use your existing APIs while providing a better client experience. To read more about how Synapse works under the hood and the problems it solves please view our Case Study (INSERT LINK HERE).

---

## Prerequisites

Please have all of the following configured and ready to use on your local machine:
- [Node.js and NPM](https://nodejs.org/en/download/)
- [AWS Account](https://portal.aws.amazon.com/billing/signup#/start)
- [AWS CLI configured locally](https://aws.amazon.com/cli/)
- [Docker](https://docs.docker.com/get-docker/)

## Installation

1. To clone the Synapse repository and set up the Gateway Manager run the following command: `npx @synapse-team/start-synapse`
2. After running the above command, you will be prompted to input information for establishing a root user for the Gateway Manager
    - By default, the root user will have admin privileges and be able to create and manage users when your gateway is deployed (via AWS Copilot)
    - During configuration, only the root account can be used for configuring and monitoring your GraphQL gateway
3. Once the repository has been set up on your local environment, start up Synapse with following command: `synapse up`
    - This will run the Synapse architecture on your local machine, which includes starting up and running the Gateway Manager, the GraphQL Gateway, as well as a local instance of MongoDB
4. If you ever need to stop or tear down Synapse, use the command `synapse down`

## Basic Usage

### Two States of Synapse
1. Configuration
- During configuration, Synapse runs on the user's local machine and the GraphQL Gateway is configured through an intuitive GUI interface, known as the Gateway Manager. The developer is then able to test out their newly configured Gateway with a GraphQL Playground, as well as being able to view latencies of all requests and error data through the Gateway Manager.
2. Production
- In production, Synapse runs on AWS and the user is no longer able to configure their gateway through the deployed Gateway Manager. The production Gateway Manager instead allows admin and root user to be able manage users that are able to log onto the Gateway Manager to view monitoring data for the Gateway. 
- Further changes to the Gateway must be made locally on the user's local machine and then can be reflected in the production version by the user running `synapse redeploy`.

### Walkthrough

1. Once the Gateway Manager is successfully up and running, visit `localhost:4005` to login and start configuring your GraphQL gateway
    - Log in with the root account created during the installation process
2. Within the Data Sources tab, you can select, configure, and add all required data sources to be combined within your gateway
    - For more information on how to add specific sources and what sources are available please see the Adding Data Sources section on the docs
3. After you have added all your required data sources, configure and generate your GraphQL gateway by clicking on the “Create Your Synapse” button
    - Synapse will generate a default GraphQL schema for all your added data sources which can be customized by altering the `.meshrc` file located in the `server` directory. Once manually altered, run the following command: `synapse restart` and the Gateway will be reconfigured with your changes. Synapse is powered by GraphQL Mesh under the hood, for more information on customizing your gateway, please visit the [GraphQL Mesh Docs](https://www.graphql-mesh.com/docs/getting-started/introduction).
4. To test your gateway you can navigate to `http://localhost:6868`, where you will see a GraphQL playground you can use to test queries, mutations, and errors.
    - All queries and mutations made to the server will be recorded in your local MongoDB and can be viewed on the Gateway Manager. Note, this data will be reset once you’ve deployed your server to AWS.
6. Deploy your Synapse GraphQL Gateway to AWS by running the following command: `synapse deploy`
    - Amazon CLI must configured with your credentials on your local machine
    - For more information about deployment, read the [Deployment](#deployment) section below

---

## Gateway Manager

At its core, The Gateway Manager is an interface to manage the Synapse GraphQL Gateway. During configuration, the root user will be able to login and add data sources (API endpoints) to configure the gateway from the Data Sources menu tab. Once the data sources have been added, the user clicks on the “Create Your Synapse” button and Synapse automatically creates a unified, stitched GraphQL schema for all of the added data sources.

Synapse will also configure a GraphQL server that implements the generated schema automatically so that the user can immediately start testing out their new GraphQL gateway. Every query and mutation made to this GraphQL gateway is recorded and can be viewed from the Dashboard tab in the Gateway Manager.

### Query Monitoring

The user has many choices for how they would like to view and monitor their gateway data. This can be done from the dropdown menu at the top of the dashboard page.

### Client Requests vs. API Resolvers

At the top of the dashboard page, there are two buttons: Client Requests and API Resolvers. Client Requests will show data that encompasses the latencies of entire queries or mutations made to the Gateway. These can be further filtered by the root fields of those queries/mutations.

API Resolvers will show data that encompasses the latencies of each individual resolver function that retrieves data on the backend. This data can be further filtered to just show an individual resolver or many combined.


### Viewing Data Options

- Choose a time frame to view all of the queries or mutations
- View data on root queries
- View data on specific resolvers
- View top ten queries with the highest latency

## Configuration vs. Production Server

There are two versions of the Gateway Manager, one for configuration and the other for production. There are some key distinctions between the two as explained below. 

### Managing Users

During configuration, only the root user is able to log in and no user accounts can be created. Therefore, this version does not have a user management tab. In the production version, however, root/admin users are able to view a “Manage Users” tab which will allow them to create and delete additional users. When creating a user, the admin is able to specify whether the new user will be an admin or not. The difference between an admin and non-admin user is that users with admin privileges are the only ones able to add and manage users in production, but all users are able to view metrics/logs in production. 

### Synapse Configuration

The other key distinction between the production and configuration Gateway Manager is that the Synapse GraphQL Server can only be configured during configuration on your local machine. Once in production, the Gateway Manager no longer shows the Data Sources tab and loses the functionality of adding/deleting data sources from the gateway. Only the original root user is able to configure and modify the gateway in configuration locally before it is deployed

## Adding Data Sources

Synapse allows the user to add any number of data sources and a variety of API types, currently supporting GraphQL, REST, MongoDB, PostgresQL, and JSON Schema data sources. Depending on the data source, Synapse will prompt you to either type in a URL pointing to the data source (GraphQL, PostgreSQL) or ask you to upload a yaml file with the specification for that data source (OAS specification for REST). Synapse allows you to delete any data sources you’ve added (in development) and then provides a button to “Create Your Synapse”. Once a user clicks that button, Synapse will automatically configure and create the GraphQL Gateway. The user is then able to navigate to their Gateway to test it out.

After the user has added all their data sources, Synapse uses GraphQL Mesh to create a default unified schema for the gateway server. Users can view this unified schema by looking in the .mesh directory that is generated when the gateway is created. If a user would like to further customize the schema and add additional features, they are able to easily do so manually by following the open-source [GraphQL Mesh documentation](https://www.graphql-mesh.com/docs/getting-started/introduction). Additionally, since Synapse uses Apollo to create the gateway server, users are able to take advantage of Apollo-specific features to customize their Apollo server even further.

## Development Flow

After the repository has been downloaded and set up on the user's local machine, the user can start up Synapse for configuration on their local machine by running the command `synapse up`.

### Configuration

The Gateway Manager will be running on port 4005 by default. 

The user can visit `http://localhost:4005` and login with the root account they created upon downloading and setting up the Synapse repository. Once logged in, the user can click on the Data Sources tab, add all their data sources and then create their Synapse gateway. The user is now ready to test out the gateway server.

### Testing

The gateway server will run on port 6868 by default. Navigating to `http://localhost:6868` will direct the user to a GraphQL playground where they are able to test out their server with different queries and mutations. If the user wants to make any changes to the gateway or add further customization at this point, they can do so, either through the Gateway Manager or manually in the repository. If changes are made manually in the repository, the user must run the command `synapse restart` for the changes to take effect. The user can then navigate back to their Gateway for further testing. Once the user is satisfied with their gateway, they can deploy their gateway and a production Gateway Manager.

### Stopping or tearing down Synapse on Local Machine

If the user ever wants to stop Synapse running on their local machine, they only need to run the command `synapse down`. Synapse can then be started back up later with `synapse up`.

## Deployment

To start, the user must make sure to teardown and stop running Synapse on their local machine. This can be done by running the command `synapse down`. It is important at this point to make sure the user has the AWS CLI configured on their local machine with their AWS credentials. Afterwards, the user can run the command `synapse deploy` and a production Gateway Manager server and the Synapse GraphQL Gateway will be spun up on AWS and connected to MongoDB. 

The deployment happens through the use of AWS CoPilot, which will create and register containers for MongoDB, the production Gateway Manager, and the Synapse GraphQL Gateway onto AWS ECR and then spin them up on AWS ECS.

It is important to note that an AWS user can only create one Synapse through automated deployment per account. If a user would like to create two Synapse applications from the same AWS account they will have to deploy the second one manually through AWS.

### Making further changes to the Gateway after deployment

If the user would like to make further changes to their Gateway after it has been deployed, these changes must be made on the user's local machine. This can be done through the configuration Gateway Manager or manually, running the command `synapse restart` after manual changes are made. Once changes have been made on the local machine and the user is ready to have these changes reflected in their production Synapse, they must first tear down Synapse on their local machine with `synapse down`. Then, they just need to run the command `synapse redeploy` to have the changes take effect in production.

---
