export default `
# [![Synapse-branding-logo](<INSERT IMAGE URL>)][github]

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installion](#installation)
- [Basic Usage](#basic-usage)
- [Gateway Manager](#gateway-manager)
- [Development Flow](#development-flow)
- [Deployment](#deployment)
- [The Team](#the-team)

---

## Introduction

Synapse allows a developer to easily and quickly spin up a GraphQL gateway for multiple existing APIs. It does so by providing an easy to use GUI (the Gateway Manager) to set up and configure your gateway with just a few clicks. The Synapse Gateway Manager offers monitoring for all queries and mutations made to the Gateway, allowing the developer to view queries that can be filtered by individual resolvers and view the latency of each query or resolver. Synapse also offers easy deployment, allowing the developer to deploy their created gateway with a single command onto AWS.

### GraphQL in Front of Your APIs

Synapse does not replace your existing APIs/data sources with GraphQL, but rather creates a GraphQL schema that utilizes and stitches your existing sources together. You can think of the Synapse GraphQL Gateway as a separate server sitting in front of all your APIs and requesting the necessary information from them to fulfill different queries. This means that from the client’s perspective the gateway is just a single GraphQL endpoint, but from a backend perspective, the gateway is still making requests to get information from all your existing APIs and data sources. This allows you to use your existing APIs while providing a better client experience. To read more about how Synapse works under the hood and the problems it solves please view our Case Study (INSERT LINK HERE).

## Prerequisites:

- NPM
- AWS Account
- AWS CLI configured locally
- Docker

---

## Installation:

1. To clone the Synapse repository and set up the Gateway Manager run the following command: \`<INSERT COMMAND>\`
2. After running the above command, you will be prompted to input information for establishing a root user for the Gateway Manager
    - By default, the root user will have admin privileges and be able to create and manage users when your gateway is deployed (via AWS Copilot)
    - In development, only the root account can be used for configuring and monitoring your GraphQL gateway
3. Once the repository has been set up on your local environment, from within the \`server\` directory, start up MongoDB with following command: \`<INSERT COMMAND>\`
    - This will run MongoDB on your local environment (via Docker container) and be used during development
4. After MongoDB is successfully up and running, launch the Gateway Manager with the following command: \`<INSERT COMMAND>\`
    - You can read more about the Gateway Manager in the Gateway Manager section below

## Basic Usage:

1. Once the Gateway Manager is successfully up and running, visit \`localhost:4005\` to login and start configuring your GraphQL gateway
    - Log in with the root account created during the installation process
3. Within the Data Sources tab, you can select, configure, and add all required data sources to be combined within your gateway
    - For more information on how to add specific sources and what sources are available please see the Adding Data Sources section on the docs
4. After you have added all your required data sources, configure and generate your GraphQL gateway by clicking on the “Create Your Synapse” button
    - Synapse will generate a default GraphQL schema for all your added data sources which can be customized by altering the \`.meshrc\` file located in the \`server\` directory. Once altered, run the following command: \`<INSERT COMMAND>\`. Synapse is powered by GraphQL Mesh under the hood, for more information on customizing your gateway, please visit the [GraphQL Mesh Docs](https://www.graphql-mesh.com/docs/getting-started/introduction).
6. To launch and test your gateway run the following command: \`<INSERT COMMAND>\`
7. Once the gateway server is running, you can visit \`localhost:5000\` to interact with a GraphiQL playground to test out your GraphQL API Gateway
    - All queries and mutations made to the server will be recorded in your local MongoDB and can be viewed on the Gateway Manager. Note, this data will be reset once you’ve deployed your server to AWS
10. Deploy your Synapse GraphQL Gateway to AWS by running the following command: \`<INSERT COMMAND>\`
    - Amazon CLI must be downloaded and configured
    - For more information about deployment, read the Deployment section below

---

## Gateway Manager

The Gateway Manager is essentially an interface to manage the Synapse GraphQL Gateway. In development, the root user will be able to login and add data sources to configure the gateway with as many sources as they desire from the Data Sources tab. Once the user clicks on the  “Create Your Synapse” button after the data sources have been added, Synapse will automatically create a default unified, stitched GraphQL schema for all of the added data sources. Synapse will also configure a GraphQL server that implements the generated schema automatically for the user so that they only need to run a command to start testing out their new GraphQL gateway. Every query and mutation made to this GraphQL gateway will be recorded and can be viewed from the Metrics & Logs tab in the Gateway Manager. The user has many options for how they would like to view their gateway data. They can pick a time frame to view all of the queries or mutations that happened in that time frame, as well as their latencies. Additionally, the user can view data on root queries or even resolvers. The Gateway manager will also track the top 10 queries with the highest latency and when they occurred. Whenever a user logs in, the homepage will default to the Metrics & Logs tab. 

There are two versions of the Gateway Manager: the production one as well as the development one. There are some key distinctions between the two. In development, only the root user is able to log in and no user accounts can be created. Therefore, the development version does not have a user management tab. In production, however, admin users are able to view a User Management tab upon logging that will allow them to create and delete users. When creating a user, the admin user is able to specify whether the new user will be an admin or not. The difference between an admin and non-admin user is that users with admin privileges are the only ones able to add and manage users in production. Both admin and non-admin users, however, are able to view metrics/logs in production. 

The other key distinction between the production and development Gateway Manager is that the Synapse GraphQL Server can only be configured in development. Once in production, the Gateway manager no longer shows the Data Sources tab and loses the functionality of adding/deleting data sources from the gateway. This means only the root user is able to configure and modify the gateway in development. 

## Adding Data Sources

Synapse allows the user to add any number of data sources, supporting GraphQL, REST, MongoDB, PostgresQL, and JSON Schema data sources at the moment. Depending on the data source, Synapse will prompt you to either type in a URL pointing to the data source (eg. GraphQL, PostgreSQL) or upload a yaml file with the specification for that data source (eg. OAS specification for REST). Synapse allows you to delete any data sources you’ve added and then provides a button to “Create your Synapse”. Once a user clicks that button, Synapse will automatically configure the GraphQL Gateway for the user and build it so that the user only needs to type a command in to start the Gateway Server. This is all possible because Synapse is powered by GraphQL Mesh under the hood. After the user has added all their data sources, Synapse will use GraphQL Mesh to create a default unified schema for the gateway server. Users can view this unified schema by looking in the .mesh directory that is generated when the gateway is created. If a user would like to further customize the schema more and add additional features, they are able to easily do so manually by following the open-source GraphQL Mesh documentation. Additionally, because Synapse uses Apollo to create the gateway server, users are able to take advantage of Apollo-specific features to customize their Apollo server more if they desire. 

## Development Flow

After the repository has been set up locally, the user will have a development Gateway Manager server, as well as a docker-compose file for starting MongoDB locally in the SERVER DIRECTORY directory. First the user can start running MongoDB locally by running the command docker-compose up while in the SERVER DIRECTORY directory. After mongoDB is up and running, the user can start the Gateway Manager server by running the command npm run start-gui. The Gateway Manager will be running on port 4005 by default. The user can then go to http://localhost:4005 and login with the root account they created upon downloading and setting up the repository. Once logged in, the user can click on the data sources tab and add all their data sources. Once they create the synapse from this tab, the user is now ready to test out the gateway server. The gateway server can be run locally by running the command npm run start-apollo. The gateway server will run on port 5000 by default. If the user navigates to http://localhost:5000 they will be directed to a GraphiQL playground where they are able to test out their server with different queries and mutations. If the user wants to make any changes to the gateway or add further customization at this point, the user can kill the gateway server on port 5000 and make the changes, either through the Gateway Manager, or manually in the repository and then can launch the server again by running the same command to test it out again. Once the user is happy with the server they can deploy their gateway and a production Gateway Manager easily. 


## Deployment

To start, the user can kill the Gateway server running on port 5000 and the Gateway Manager server running on port 4005. Then, they can kill the MongoDB container by running the command docker-compose down. It is important at this point to make sure the user has the AWS CLI installed and configured on their local machine. Afterwards, the user can run the command DEPLOYMENT COMMAND and a production Gateway manager server and the Synapse GraphQL Gateway will be spun up and put on AWS connected to MongoDB. 

The deployment happens through the use of AWS CoPilot, which will create and register containers for MongoDB, the production Gateway Manager, and the Synapse GraphQL Gateway onto AWS ECR and then spin them up on AWS ECS. 

---

## The Team

**[Jay Gudsson](https://www.linkedin.com/in/jay/)** _Software Engineer_ Narnia, Narnia

**[Justin Gustafson](https://www.linkedin.com/in/justin/)** _Software Engineer_ Narnia, Narnia

**[Aneesh Patel](https://www.linkedin.com/in/aneesh/)** _Software Engineer_ Narnia, Narnia

**[Dylan Jones](https://www.linkedin.com/in/dylan/)** _Software Engineer_ Narnia, Narnia`;
