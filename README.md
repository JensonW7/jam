# jam
---
Full-stack web app for Spotify users to follow their friends to view and interact with their live listening activity. Provides weekly listening stats for their own account as well.

## Getting Started
1. Clone this repository on to your local machine <br />
1a. If you are recreating this, using the Spotify API requires making an app on their platform at https://developer.spotify.com/. Use of an app in development mode, like ours, is invite only. After creating an app on Spotify's platform, you can copy the client id and client secret into the relevant fields in the .env folder in the backend. <br />
1b. For the database, one can be created with MongoDB Atlas. Using the connect interface, place the connection string into MONGO_URI in the .env file. <br />
1c. Side note: in production, the .env folder holds sensitive information and should be included in the .gitignore file. <br />
2. Run **npm i** in both the client and backend folders to install dependencies. 
3. In seperate terminal sessions, run **npm run dev** in the backend folder and **npm start** in the client folder.
4. Navigate to http://localhost:3000/ in your browser

**NOTE TO THE TAs:** if you would like to personally run our app, please send your email [here](mailto:kay1inchung@g.ucla.edu?subject=[jam]%20Spotify%20Developers%20Access) so we can grant you access to our Spotify Developers app. 


