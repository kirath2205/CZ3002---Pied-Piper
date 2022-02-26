# VolunteerGoWhere

This repo contains the frontend code for the VolunteerGoWhere application.

## Setting up the development Environment

Make sure you have yarn installed.

```bash
npm install --global yarn
```

To install all the required dependencies, run the following command:

```bash
yarn install
```

To start the frontend application, run the following command:

```bash
yarn dev
```

Next.js has [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh) enabled, so you don't need to restart the dev server everytime you update the code, just hit Save (Ctrl + S).

## Folder Strucutre

```

├── .next       # Build files
├── __tests__   # All unit and integration tests
├── components  # All non-page React components
├── pages       # All page components from Next.js
├── interfaces  # All type declarations except for component props
├── utils       # Any util functions
├── public      # All public assets (SVG or favicons)
├── services    # Any code that interacts with API/backend
├── styles      # CSS files (shouldn't need in this project)
├── LICENSE
└── README.md
```

## Dependencies

Consult with the official documentation below if you have any problems

-   [MaterialUI](https://mui.com/)
-   [NextJS](https://nextjs.org/)
-   [Formik](https://formik.org/)

Tutorials if you need:

-   [React.js Docs](https://beta.reactjs.org/)
    -   Read till "Managing State - Preserving and Resetting State" if you can.
    -   At least understand the following: Components, props, useState and useEffect.
-   [Next.js playlist](https://www.youtube.com/watch?v=zktJ8-k0JDc&list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw&index=2)
    -   To part 8, just understand routing as we won't be using much of the other features

## Testing

The folder structure in `__tests__` follows the structure of the `components` folder.

```bash
yarn test
# or
jest
```
