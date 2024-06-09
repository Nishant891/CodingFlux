# CODINGFLUX - A REALTIME COLLABORATIVE CODE EDITOR

## WEBSITE - _[CODING FLUX]_(https://codingflux.vercel.app/)

### How to use ?

User onboarding is simple. Create an account to navigate to the dashboard. In the dashboard, create a room to open your code editor, copy the roomId, and send it to other collaborators. Voilà! Now you are all connected, able to see their edits and work together.

### Dummy Test Users

1. email : test01@gmail.com
   password : Asdfghj@13

2. email : test02@gmail.com
   password : Qwertyu@13

## Setup

1. Clone the project in your local machine run

```
git clone "https://github.com/Nishant891/CodingFlux.git"
```

### Frontend

2. run

```
cd client
```


3. and then run 

```
npm install
```

4. Create a .env file and copy the contents of .env.example in it.

5. Go to appwrite create an account and create an new organization.

6. Create a new project and go to it's setting get the API ENDPOINT and PROJECT ID and paste it in REACT_APP_API_ENDPOINT and REACT_APP_PROJECT_ID in .env file respectively.

7. In the database section create a new database and paste the database id in REACT_APP_DATABASE_ID in .env.

8. Create a new collection as Rooms and paste the collection id in REACT_APP_COLLECTION_ID in .env 

9. Then create it's attribute in the Attribute tab xml, css, js with size 20000 respectively and userId with size 500 all of type string.

10. In the same Settings tab scroll down to the permissions section and add permission Users and select all the CRUD operations.

11. Then 

```
npm run start
```


### Backend

12. run

```
cd server
```


13. and then run

```
npm install
```


14. now run 

```
npm start
```

15. Copy and paste your localhost url in REACT_APP_BACKEND_URL

## FEATURES

1. Multiple people can type and edit code simultaneously in the editor while seeing the live preview. Great for long-distance pair programming and conducting interviews.

2. It includes user authentication elements, such as a secure logout mechanism and a smooth sign-up and login process.

3. Code written in the editor is automatically saved in the database.

4. Exceptionally crafted user interface with code highlighting, toggleable sidebars, and a dynamic view panel.

5. Users have the option to save the code on their local machines.

6. The system incorporates a robust notification system, form validation, and tooltips.

## TECH STACK

### The code sample is written entirely in JavaScript and utilizes the following frameworks:

1. React.js (Frontend)
2. Express.js (Backend)
3. Socket.io (Real-time high-speed data transfer between collaborators)
4. Appwrite

### Libraries Used 

1. react-router-dom 
2. CodeMirror 
3. react-toastify 
4. react-tooltip 
5. react-icons 
6. MUI
5. nodemon
6. formik
7. yup


