# CODINGFLUX - A REALTIME COLLABORATIVE CODE EDITOR

## WEBSITE - _[CODING FLUX]_(https://codingflux.vercel.app/)

### Dummy Test Users

1. email : test01@gmail.com
   password : Asdfghj@13

2. email : test02@gmail.com
   password : Qwertyu@13

## GETTING STARTED

### Development

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

8. Create a new collection as Rooms and paste the collection id in REACT_APP_COLLECTION_ID in .env and then create it's attribute xml, css, js with size 20000 respectively and userId with size 500 all of type string.

9. In the same collection go to it's setting, scroll down to the permissions section and add permission Users and select all the CRUD operations.

10. Then 

```
npm run start
```


### Backend

11. run

```
cd server
```


12. and then run

```
npm install
```


13. now run 

```
npm start
```


14. Copy and paste your localhost url in REACT_APP_BACKEND_URL

## SNAPSHOTS

### HOME PAGE 

<img width="960" alt="Screenshot 2023-11-29 204026" src="https://github.com/Nishant891/CodingFlux/assets/109356848/b83cc6db-b72e-4c04-b5c3-f49838cbae5b">

### SIGNUP PAGE

<img width="960" alt="Screenshot 2023-11-29 204044" src="https://github.com/Nishant891/CodingFlux/assets/109356848/76670a3e-6f24-46c8-8b1c-913216e007a0">

### LOGIN PAGE

<img width="960" alt="Screenshot 2023-11-29 204059" src="https://github.com/Nishant891/CodingFlux/assets/109356848/3b6ab5bf-c664-4ae9-99d4-69f14eaf9620">

### DASHBOARD

<img width="960" alt="Screenshot 2023-11-29 204121" src="https://github.com/Nishant891/CodingFlux/assets/109356848/f3975169-d147-4707-bdec-9557690168c2">

### CODE EDITOR

<img width="960" alt="Screenshot 2023-11-22 111544" src="https://github.com/Nishant891/CodingFlux/assets/109356848/6a251b0e-717c-4b9d-8b3c-5531643ba0d8">

## FEATURES

1. Multiple people can type and edit code simultaneously in the editor while seeing the live preview. Great for long-distance pair programming and conducting interviews.

2. It includes user authentication elements, such as a secure logout mechanism and a smooth sign-up and login process.

3. Code written in the editor is automatically saved in the database.

4. Exceptionally crafted user interface with code highlighting, toggleable sidebars, and a dynamic view panel.

5. Users have the option to save the code on their local machines.

6. The system incorporates a robust notification system, form validation, and tooltips.

User onboarding is simple. Create an account to navigate to the dashboard. In the dashboard, create a room to open your code editor, copy the roomId, and send it to other collaborators. Voilà! Now you are all connected, able to see their edits and work together.

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

###  My Experience

I have acquired great knowledge and learned to stay persistent. I learned that the best way to learn is to go and do it yourself. In April 2023, I had an idea to build a real-time collaborative code editor and started working on it. I participated in my college hackathon, during which I learned React.js. I used React Hooks such as useState, useEffect, useRef, useContext, and useCallback to create a minimal frontend. Additionally, I learned Socket.io for real-time data transfer.

Later, I participated in the Appwrite month-long hackathon in June. Here, I developed the signup/login and logout mechanism using Appwrite BaaS, incorporating proper form validation with Formik and Yup. I utilized Appwrite's database for data storage. I replaced my Express-Socket server with Appwrite's real-time feature, though it wasn't a great success.

Subsequently, I enhanced the frontend by splitting a page into different sections, creating individual components, organizing the project with dedicated folders, adding comments, and writing documentation. I redeveloped the backend using Express and Socket.io. Along the way, I learned to use other libraries like react-router-dom, CodeMirror, react-toastify, react-tooltip, react-icons, MUI, and nodemon. I realized how important it is to read documentation thoroughly when using a library or framework.


