# YouTube Videos Sharing App
## Project structure
```
├── node_modules (.gitignore)
├── public
│ ├── favicon.ico
│ ├── index.html
│ └── manifest.tson
├── src
│ ├── assets
│ │ │ └── images
│ │ │  
│ ├── api
| | ├──user
│ │ | ├── userApi.ts
| | | └──type.d.ts
| | ├── ...
│ │ └── clientApi.ts
│ ├── components
│ │ ├── header
│ │ │ ├── Header.tsx
│ │ │ └── ...
| | └─ ...
| ├── layouts
| | ├── MainLayout.tsx
| | └── ...
| ├── pages
| | ├── HomePage.tsx
| | └── ...
| ├── redux
| | ├── store.tsx
| | └── slices
| |   ├── user
| |   | ├── userSlice.tsx
| |   | └── user.tye.ts
| |   └── ...
| ├── routes
│ ├── utils
│ │ ├── ...
│ │ └── index.ts
│ ├── index.css
│ ├── index.tsx
│ └── setupTests.ts
│  
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
└── yarn.lock
```
## Setup and run it
### Setup

Please create a .env file according to the available template.
Make sure make sure API_URL is correct server's url

```shell script
npm install
```
Or

```shell script
yarn install
```

### Run it

First, Run server 

After running the server successfully, run this script:

```shell script
npm run dev
```
Or

```shell script
yarn run dev
```

### Test