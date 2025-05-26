import { readFile, writeFile } from 'fs/promises';

const path = './db/users.json';
export async function getUsers(hide = false) {
    try {
        const data = await readFile(path, 'utf-8');
        if(hide) {
            return JSON.parse(data).map(obj => [{...obj, pass: '********'}]);
        }else {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Error reading users file:", error);
        throw error;
    }
    
}