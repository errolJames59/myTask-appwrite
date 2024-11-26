import { databases } from "../lib/appwrite";
import { DATABASE_ID, COLLECTION_ID } from "../lib/appwrite";
import { ID } from "appwrite";

/* ADDING A DOCUMENT */
export async function addTask(content: string): Promise<Task> {
    const newTask = {content: content}
    const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        newTask
    )

    const task = {
        $id: response.$id,
        $createdAt: response.$createdAt,
        content: response.content
    }

    return task;
}

/* FETCHING ALL DOCUMENTS */
export async function getTasks(): Promise<Task[]> {
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
    )

    const tasks: Task[] = response.documents.map((doc) => ({
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        content: doc.content
    }))

    return tasks;
}

/* DELETING A DOCUMENT */
export async function deleteTask(taskID: string) {
    await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        taskID
    )
}

/* UPDATING A DOCUMENT */
export async function updateTask(taskID: string, content: string) {
    const updateTask = {content: content}
    await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        taskID,
        updateTask
    )
}