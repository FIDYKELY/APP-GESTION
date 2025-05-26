import { json } from 'node:stream/consumers';
import { getUsers } from '../entities/users.js';

export async function readUsers() {
    try {
        const users = await getUsers(true);
        return users;
    } catch (error) {
        console.error("Error reading users:", error);
        return json({ error: 'Failed to read users' }, { status: 500 });
    }
}