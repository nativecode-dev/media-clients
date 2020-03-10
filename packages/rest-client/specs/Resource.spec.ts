import 'mocha'

import expect from './expect'
import Logger from './logging'

import { URL } from 'url'
import { step } from 'mocha-steps'

import { Resource } from '../src/Resource'
import { ResourceParamType } from '../src/ResourceParamType'

interface Employee {
  email: string
  id: number
  name: string
  username: string
}

class RestApiResource extends Resource {
  constructor() {
    super(new URL('https://jsonplaceholder.typicode.com'), Logger.extend('resource'), {})
  }

  all(): Promise<Employee[]> {
    return this.http_get<Employee[]>('users')
  }

  id(id: number): Promise<Employee> {
    return this.http_get<Employee>('users/{:id}', { key: 'id', type: ResourceParamType.RouteParameter, value: id })
  }
}

describe('when using Resource type', () => {
  const sut: RestApiResource = new RestApiResource()

  step('should create instance', () => {
    expect(sut).to.not.be.undefined
  })

  xstep('should GET all employees', async () => {
    const employees = await sut.all()
    expect(employees).not.empty
  }).timeout(5000)

  xstep('should GET single employee', async () => {
    const employee = await sut.id(1)
    expect(employee).not.empty
  }).timeout(5000)
})
