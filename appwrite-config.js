// Appwrite Configuration
import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6887870800286c98a528');

export const databases = new Databases(client);
export const account = new Account(client);

export default client;