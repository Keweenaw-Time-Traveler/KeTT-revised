# Getting Started with KETT _ App Revised Version

This project was bootstrapped React and Redux.
<li>Tailwind CSS as Styling.</li>
<li>Redux as Middleware(Customized).</li>
<li>Reselect JS For Memoization.</li>
<li>Jest and Enjyme for Component and Integration Testing.</li>
<li>Redux-Dev-Tools Extension for Troubleshooting the Redux Store and API Calls.</li>


## File Structure


    ├── ...
    │
    ├── public
    ├── src                                                     # Starting Directory
    │   ├── components
    │   │            ├──  assets                                # All the public accessible files can be placed here
    │   │            │          ├──  images
    │   │            │          ├──  fonts
    │   │            │          ├──  icons                      # All the icons are abstracted here from
    │   │            │          ├──  styles(Optional)    
    │   │            │          └──....
    │   │            ├──  component_folder
    │   │            │          ├──  index.js                   # Index file represents the start of the component
    │   │            │          ├──  component_name.spec.js     # Test file for the file is represented here.
    │   │            │          └──.....
    │   │            ├──  store                                 # All the Redux files are handled here
    │   │            │      ├── middleware                      # All Loggers and Interceptors are Configured in this folder.
    │   │            │      ├── reducer                         # Reducer and their Configurations are stored in this folder.
    │   │            │      ├── store.js                        # Redux Store configuration goes here
    │   │            │      └──...
    │   │            └──...  
    │   ├── App.js
    │   ├── index.js                                            # App Root structure starts from here.
    └──....
    






## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed