# Project

<img width="959" alt="Screenshot 2023-06-15 043711" src="https://github.com/Nishant891/codingflux/assets/109356848/ccbb333d-b35b-4e1b-8aea-89bfe1bb456f">

# Description 

## What it is about ?

My project is a collaborative code editor for web developers. You go to the website signup and create a room. You'll get a code editor divided into three parts namely HTML, CSS, JS and also an iframe for the display of your written code. At the top, you can see an ID of alphanumeric characters that's your roomId, copy it. Share it with the people you want to collaborate with. These people can enter the roomId and join the room in the home page. Whatever changes you make in the editor will be shared with the people in the room in real-time.

<img width="959" alt="Screenshot 2023-06-15 060233" src="https://github.com/Nishant891/codingflux/assets/109356848/9c77d48d-5835-4353-b9a6-2a703d2751ef">

## Why did I build this?

I am learning web development and just a few weeks back I was working with my friend building a to-do list. Guess what was the difficult part. Well, that was sharing our code. My friend was working on CSS and I was working on javascript and we were sharing our code via WhatsApp. After some time I learned about GitHub. I had this idea in my mind of creating a code editor for new web developers where they could code in real-time while communicating with each other yes much like codepen but they ask you for premium for using their real-time feature. So I built this MVP code editor for people to use.

# Tech Stack

## React.js
I built the whole front end using react.js. Learned a lot about asynchronous functions and how important they are during program execution.

## MUI and TailwindCSS
These make your job much easier with prebuilt components and styling you can use in your project.

## Appwrite Cloud
The whole backend of my app is solely handled by Appwrite. As I am new to web development I just had an idea about node.js and databases. It would have been difficult for me as of now to complete the project without Appwrite. It handles all your backend part for you and also provides other cool features.

### AUTHENTICATION 
I authenticate users of my application using Appwrite. Here you can create a user account as well as create an email session. I did struggle a bit but comparatively, it's much easier and better.

<img width="557" alt="Screenshot 2023-08-02 193945" src="https://github.com/Nishant891/codingflux/assets/109356848/823d62ae-ed82-465c-b8f2-92aa07490fb6">

### DATABASE 
When a user creates a room a document is created in the Appwrite database with a roomId, html, css, js and userIds attribute and whatever you write in the code editor is directly updated in the database. I could achieve this with very few lines of code and even without setting up a node.js server.

### REALTIME 
I struggled here a lot but was able to figure it out by reading appwrite's documentation and after watching some video's on Websocket. I still haven't clearly understood it and due to this my app has some bugs. You can try typing really fast in the editor and you would face some lagging issues. This is probably because the useEffect associated with it is triggered multiple times. I would be really thankful if someone could just give me a hint here.

## Vercel
My hosting platform I learned to deploy projects in it during this hackathon.

# Project Link - (https://codingflux.vercel.app/ "CodingFlux")

# Demo Video Link - (https://youtu.be/vz3yFS3xPM8)

## NOTE - Sign In with any user name or password it doesn't asks for any verification code.


