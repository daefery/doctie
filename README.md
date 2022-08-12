# Getting Started with doctie

## Setup Project

### `Link`
https://doctie.natakraf.com/ \
https://62f60b7c86007d0e8bcbb9ab--capable-piroshki-ba2ce4.netlify.app/

### `Login Credential`

- username : patient
- password : 12345

### `Create .env`

Contains 2 variables\
REACT_APP_API_URL=['https://fe-assignment-api.herokuapp.com/'](https://fe-assignment-api.herokuapp.com/) \
REACT_APP_TOKEN='d3cd7486-fc8c-48a6-aa5e-5e5f9c1c94a6'

### `npm install`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Choice of Package
### `chakra-ui`

[Source](https://chakra-ui.com/)\
Contains some dependencies package such as <b>emotion</b> and <b>framer-motion</b>\
this package is for ui kit on the apps

### `typescript`

[Source](https://www.typescriptlang.org/)
- Safer Code : can help to static type-checking\
- Clean Code
- Easy to use and maintenance

### `react router v6`

[Source](https://reactrouter.com/)
- Easy navigation

## Other Section

### `Potential Improvement`

- Sign Up feature
- Doctor portal feature : doctor can access the app and checking all the appointment request from patient and they can update the schedule or update their info
- Doctor Info can be modified to add some extra object such as doctor by category(Dental or General) and other related info instead of simple one
- Patient Profile : can be have medical history, so the doctor can see through that info using the app
- Doctor List & Booking List endpoints can using pagination for performance matter

### `Assumptions`

- When booking, patient can using login info or custom patient this can be used when booking for someone
- Calender form : to display date and list of available time for patient to choose
- Putting appointment count on user dropdown profile
- Creating appointment feature : user can see list of appointment and can cancel each item
- Adding login feature
- Putting some section on landing page

### `Testing`
- Checking all pages and the components
- Using snapshot to make sure the UI and style implemented well
- End to end testing for all features such as Browse Doctor, Booking, See Appointment & Login
