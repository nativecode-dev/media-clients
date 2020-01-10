import 'mocha'

import expect from './expect'
import Logger from './logging'

import { URL } from 'url'
import { step } from 'mocha-steps'

import { Resource } from '../src/Resource'
import { ResourceRouteParamType } from '../src/ResourceRouteParamType'

interface Employee {
  id: number
  name: string
  username: string
  email: string
}

class RestApiResource extends Resource {
  constructor() {
    super(new URL('https://jsonplaceholder.typicode.com'), Logger.extend('resource'))
  }

  all(): Promise<Employee[]> {
    return this._get<Employee[]>('users')
  }

  id(id: number): Promise<Employee> {
    return this._get<Employee>('users/{:id}', [{ key: 'id', type: ResourceRouteParamType.RouteParameter, value: id }])
  }
}

describe('when using Resource type', () => {
  const sut: RestApiResource = new RestApiResource()
  let employees: Employee[]

  step('should GET all employees', async () => {
    employees = await sut.all()
    expect(employees).not.empty
  }).timeout(5000)

  step('should GET single employee', async () => {
    const employee = await sut.id(1)
    expect(employee).not.empty
  }).timeout(5000)
})
