import { Client, Account, Databases } from "appwrite";

  export const client = new Client()
    .setEndpoint(process.env.REACT_APP_API_ENDPOINT)
    .setProject(process.env.REACT_APP_PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client);


