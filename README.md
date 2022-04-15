# NextJS 

A basic Boilerplate for a NextJS application to ramp up a new project.
...

## Prerequisites

```bash
# clone the repository
git clone git@github.com:JonathanSaudhof/nextjs-typescript-tailwind-boilerplate.git
cd nextjs-typescript-tailwind-boilerplate

# install dependencies
npm i

```

## Development Server

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Jest Tests

```bash
# Run locally
npm run test
# or within CI/CD pipeline
npm run test:ci
```


## Deploy

### selfhosted with Node.JS

```bash
# Build optimized build
npm run build

# Run the buildt server
npm run start
```

### with Docker

The repository provides a basic Dockerfile to provide a

```bash
# Build docker image
docker build -t <Image-Name> .

# Run a container
docker run -p 3000:3000 <Image-Name>
```
