import { readFile, writeFile } from "node:fs/promises"

const path = 'db/projects.json'

export async function getProjects() {
    const jsonData = await readFile(path, 'utf8')
    return JSON.parse(jsonData)
}

export async function addProject(p) {
    const newProject = { id: Math.random().toString(16).slice(2), ...p }
    const projects = [newProject, ...await getProjects()]
    await writeFile(path, JSON.stringify(projects))
    return newProject
}

export async function deleteProjectById(id) {
    const projectsList = await getProjects()
    await writeFile(path, JSON.stringify(projectsList.filter(project => project.id != id)))
    const newProjectsList = await getProjects()
    return newProjectsList
}