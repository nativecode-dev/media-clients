import os from 'os'

import { fs } from '@nofrills/fs'
import { exec } from 'child_process'
import { DictionaryOf } from '@nofrills/collections'

export interface Project {
  location: string
  name: string
  private: boolean
  version: string
}

export interface MonoProject extends Project {
  dependencies: Project[]
  package: any
}

export function lerna(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`lerna ${command}`, (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout)
      }
    })
  })
}

export async function json<T>(command: string): Promise<T> {
  const output = await lerna(command)
  return JSON.parse(output)
}

export async function lines(command: string): Promise<string[]> {
  const output = await lerna(command)
  return output
    .split(os.EOL)
    .filter(line => line.length > 0)
    .map(line => line.trim())
}

export function find(name: string, projects: Project[]): Project {
  return projects.reduce((result, current) => (current.name === name ? current : result))
}

export async function monorepo(): Promise<MonoProject[]> {
  const projects = await json<Project[]>('list --json')
  const graph = await json<DictionaryOf<string[]>>('list --graph --toposort')
  const keys = Object.keys(graph)

  return Promise.all(
    keys.map(async key => {
      const dependencies = graph[key] || []
      const project = projects.reduce((result, current) => (key === current.name ? current : result))
      const path = fs.join(project.location, 'package.json')
      const pkg = await fs.json<any>(path)

      return {
        ...project,
        dependencies: dependencies.filter(dep => keys.includes(dep)).map(dep => find(dep, projects)),
        package: pkg,
      }
    }),
  )
}
