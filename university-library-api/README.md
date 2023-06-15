# API

## Configuration
Copy from `.env.dist` to `.env`

## Local development

##### Clone and install dependencies
```
% git clone git@github.com:westanvv/university-library-api.git

% cd university-library-api && yarn
```

##### Docker
For local environment Docker and Docker-compose must be installed.

For Mac: Install [Docker for Mac](https://docs.docker.com/docker-for-mac/)
For Windows: Install [Docker for Windows](https://docs.docker.com/docker-for-windows/)

The installation provides Docker Engine, Docker CLI client, Docker Compose, and Docker Machine.

Configuration in `compose.yml` and `Dockerfile` files.

To start DB `docker compose up` or `docker compose up -d` command must be used.
This command create 1 service: **database-university-library**
Check services status with `docker compose ps` command.

##### Running in development mode
```
% yarn dev
```
Local api url: [http://localhost:3030](http://localhost:3030)<br />


##### Commands for managing DB:
```
% yarn run db:sync
% yarn run db:drop
% yarn run db:migration:run
% yarn run db:migration:undo
% yarn run db:seed:all
% yarn run db:seed:undo
% yarn sequelize migration:generate --name migration-skeleton
% yarn sequelize db:migrate
% yarn sequelize db:migrate:undo
% yarn sequelize db:migrate:undo:all || sequelize-cli db:migrate:undo:all --to=20190916154403-add-column-tokeniat-to-user-table.js
```

## Structure

```
.
├── /cmd                  # Helpful scripts
├── /node_modules         # 3rd-party packages
├── /src                  # Application source code
│   ├── /constants        # Core constants
│   ├── /controllers      # Route handlers
│   ├── /db               # Database components
│   ├── /helpers          # Core helpers
│   ├── /middlewares      # Route middleware
│   ├── /public           # Public
│   ├── /routes           # HTTP endpoints
│   ├── /services         # General application services
│   ├── /validation       # Joi validation schemas
│   ├── /views            # Templates
└── index.js              # Index file
```

## First start
```
% docker compose up -d
% yarn
% yarn run db:sync
% yarn run db:seed:all
% yarn run dev
```
