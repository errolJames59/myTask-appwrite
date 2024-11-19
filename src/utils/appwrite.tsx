import { Client, Databases} from 'appwrite';

export const client = new Client();

export const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID as string;
export const ENDPOINT= import.meta.env.VITE_APPWRITE_END_POINT as string;
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID as string;
export const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID as string;

client
    .setEndpoint(ENDPOINT) // Your API Endpoint
    .setProject(PROJECT_ID); // Replace with your project ID

export const databases = new Databases(client);