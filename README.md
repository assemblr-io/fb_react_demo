# React Firebase Mobile App

For a solution engineering challenge, i was asked to use an integration platform to provide a RESTful API that is integrated with a SOAP XML endpoint, serving a mobile app for selling tshirts.

This challenge is about the use of the integration platform. This app will be used to demo the underlying platform.

Days to code: 1

## User Features

- Signup and Login using Firebase email only, no socials
- order form for tshirt able to push into the RAML/REST API to SOAP integration pipe
- using React Bootstrap for look and feel.

## Technical Features

- React Bootstrap
- Firebass v9+ Auth and Firestore
- No BCrypt or salting required for demo
- deliberately no API as I am required to show that is fully handled by the API integration platform which is the API layer.

### `npm start`

Runs the React app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run api`

Launches the Node.js Express Server managing the API and server requests on PORT:2020

## Features to be implemented

- Finish off the API integration flow in the required platform and wireup the JSON from the React app
- possibly enable Social Media sign-in and use the Socials data to demonstrate the power of firebase for marketing.
