export default `
# [![Synapse-branding-logo](<INSERT IMAGE URL>)][github]

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

Please install the following if you do not already have each one installed:
- [Node.js and NPM](https://nodejs.org/en/download/)
- [AWS Account](https://portal.aws.amazon.com/billing/signup#/start)
- [AWS CLI configured locally](https://aws.amazon.com/cli/)
- [Docker](https://docs.docker.com/get-docker/)

## Installation

1. To clone the Synapse repository and set up the Gateway Manager run the following command: \`npx @synapse-team/start-synapse\`
2. After running the above command, you will be prompted to input information for establishing a root user for the Gateway Manager
    - By default, the root user will have admin privileges and be able to create and manage users when your gateway is deployed (via AWS Copilot)
    - In development, only the root account can be used for configuring and monitoring your GraphQL gateway
3. Once the repository has been set up on your local environment, start up MongoDB with following command: \`npm run mongo\`
    - This will run MongoDB on your local environment (via Docker container) and be used during development
4. After MongoDB is successfully up and running, launch the Gateway Manager with the following command: \`npm run synapse-manager\`
    - You can read more about the Gateway Manager in the Gateway Manager section below

## Basic Usage

1. Once the Gateway Manager is successfully up and running, visit \`localhost:4005\` to login and start configuring your GraphQL gateway
    - Log in with the root account created during the installation process
2. Within the Data Sources tab, you can select, configure, and add all required data sources to be combined within your gateway
    - For more information on how to add specific sources and what sources are available please see the Adding Data Sources section on the docs
3. After you have added all your required data sources, configure and generate your GraphQL gateway by clicking on the “Create Your Synapse” button
    - Synapse will generate a default GraphQL schema for all your added data sources which can be customized by altering the \`.meshrc\` file located in the \`server\` directory. Once altered, run the following command: \`yarn mesh build\` from the server directory and the Gateway will be reconfigured with your changes. Synapse is powered by GraphQL Mesh under the hood, for more information on customizing your gateway, please visit the [GraphQL Mesh Docs](https://www.graphql-mesh.com/docs/getting-started/introduction).
4. To launch and test your gateway run the following command in the root directory: \`npm run synapse-gateway\`
5. Once the gateway server is running, you can visit \`localhost:6868\` to interact with a GraphQL playground to test out your GraphQL API Gateway
    - All queries and mutations made to the server will be recorded in your local MongoDB and can be viewed on the Gateway Manager. Note, this data will be reset once you’ve deployed your server to AWS
6. Deploy your Synapse GraphQL Gateway to AWS by running the following command: \`npm run synapse-deploy\`
    - Amazon CLI must be downloaded and configured
    - For more information about deployment, read the Deployment section below

---

## Gateway Manager

At its core, The Gateway Manager is an interface to manage the Synapse GraphQL Gateway. In development, the root user will be able to login and add data sources (API endpoints) to configure the gateway from the Data Sources menu tab. Once the data sources have been added, the user clicks on the “Create Your Synapse” button and Synapse automatically creates a unified, stitched GraphQL schema for all of the added data sources.

Synapse will also configure a GraphQL server that implements the generated schema automatically so that the user only needs to run a single command to start testing out their new GraphQL gateway. Every query and mutation made to this GraphQL gateway is then recorded and can be viewed from the Metrics & Logs menu tab in the Gateway Manager.

## Query Monitoring

The user has many choices for how they would like to view and monitor their gateway data. This can be done from the dropdown menu at the top of the monitoring page.

## Frontend vs. Backend Buttons

(INSERT DIFFERENCES)

## Viewing Data Options

- Choose a time frame to view all of the queries or mutations
- View data on root queries
- View data on specific resolvers
- View top ten queries with the highest latency

## Development vs. Production Server

There are two versions of the Gateway Manager, one for development and the other for production. There are some key distinctions between the two as explained below. 

## Managing Users

In development, only the root user is able to log in and no user accounts can be created. Therefore, this version does not have a user management tab. In the production version, however, root/admin users are able to view a “Manage Users” tab which will allow them to create and delete additional users. When creating a user, the admin is able to specify whether the new user will be an admin or not. The difference between an admin and non-admin user is that users with admin privileges are the only ones able to add and manage users in production but all users are able to view metrics/logs in production. 

## Synapse Configuration

The other key distinction between the production and development Gateway Manager is that the Synapse GraphQL Server can only be configured in development. Once in production, the Gateway Manager no longer shows the Data Sources tab and loses the functionality of adding/deleting data sources from the gateway. Only the original root user is able to configure and modify the gateway in development before it is deployed

## Adding Data Sources

Synapse allows the user to add any number of data sources and a variety of API types, currently supporting GraphQL, REST, MongoDB, PostgresQL, and JSON Schema data sources. Depending on the data source, Synapse will prompt you to either type in a URL pointing to the data source (GraphQL, PostgreSQL) or ask you to upload a yaml file with the specification for that data source (OAS specification for REST). Synapse allows you to delete any data sources you’ve added (in development) and then provides a button to “Create Your Synapse”. Once a user clicks that button, Synapse will automatically configure and create the GraphQL Gateway. The user then only needs to run a single command to start the Gateway Server which is powered by GraphQL Mesh.

After the user has added all their data sources, Synapse uses GraphQL Mesh to create a default unified schema for the gateway server. Users can view this unified schema by looking in the .mesh directory that is generated when the gateway is created. If a user would like to further customize the schema and add additional features, they are able to easily do so manually by following the open-source [GraphQL Mesh documentation](https://www.graphql-mesh.com/docs/getting-started/introduction). Additionally, since Synapse uses Apollo to create the gateway server, users are able to take advantage of Apollo-specific features to customize their Apollo server even further.

## Development Flow

After the repository has been set up locally, the user will have a development Gateway Manager server, as well as a \`docker-compose\` file for starting MongoDB locally within the \`server\` directory.

First the user can start running MongoDB locally by running the command \`npm run mongo\` while in the root directory. This will run the \`docker-compose\` file in the \`server\` directory. After MongoDB is up and running, the user can start the Gateway Manager server by running the command \`npm run synapse-manager\`. The Gateway Manager will be running on port 4005 by default. 

The user can then visit \`http://localhost:4005\` and login with the root account they created upon downloading and setting up the Synapse repository. Once logged in, the user can click on the Data Sources tab, add all their data sources and then create their Synapse gateway. The user is now ready to test out the gateway server. 

The gateway server can be run locally by running the command \`npm run synapse-gateway\`. The gateway server will run on port 6868 by default. Navigating to \`http://localhost:6868\` will direct the user to a GraphQL playground where they are able to test out their server with different queries and mutations. If the user wants to make any changes to the gateway or add further customization at this point, they can stop the gateway server on port 6868 and make the necessary changes, either through the Gateway Manager or manually in the repository. After any changes the Synapse Gateway Server must be rebuilt. If changes are made through the Gateway Manager, Synapse takes care of this for you. If changes are made manually through the repository, the user must run \`yarn mesh build\` within the \`server\` directory. The user can then relaunch the server by running the same command, \`npm run synapse-gateway\` from the root directory for further testing. Once the user is satisfied with their gateway, they can deploy their gateway and a production Gateway Manager easily. 

## Deployment

To start, stop both the Gateway server running on port 6868 and the Gateway Manager server running on port 4005. Then, stop the MongoDB container by running the command \`npm run stop-mongo\` in the root directory. It is important at this point to make sure the user has the AWS CLI installed and configured on their local machine. Afterwards, the user can run the command \`npm run synapse-deploy\` and a production Gateway Manager server and the Synapse GraphQL Gateway will be spun up on AWS and connected to MongoDB. 

The deployment happens through the use of AWS CoPilot, which will create and register containers for MongoDB, the production Gateway Manager, and the Synapse GraphQL Gateway onto AWS ECR and then spin them up on AWS ECS.

It is important to note that an AWS user can only create one Synapse through automated deployment per account. If a user would like to create two Synapse applications from the same AWS account they will have to deploy the second one manually through AWS.

---


---
`;
