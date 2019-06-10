import 'mocha'

import expect from './expect'
import Logger from './logging'

import { URL } from 'url'

import { Resource } from '../src/Resource'
import { ResourceRouteParamType } from '../src/ResourceRouteParamType'

export interface Employee {
  id: number
  employee_name: string
  employee_salary: number
  employee_age: number
  profile_image: string
}

class RestApiResource extends Resource {
  constructor() {
    super(new URL('http://dummy.restapiexample.com/api/v1'), Logger.extend('rsource'))
  }

  all(): Promise<Employee[]> {
    return this.get<Employee[]>('employees')
  }

  create(employee: Employee): Promise<Employee> {
    return this.post('create', employee)
  }

  id(id: number): Promise<Employee> {
    return this.get<Employee>('employee/{:id}', [{ key: 'id', type: ResourceRouteParamType.RouteParameter, value: id }])
  }

  update(employee: Employee): Promise<Employee> {
    return this.put('update/{:id}', employee, [
      { key: 'id', type: ResourceRouteParamType.RouteParameter, value: employee.id },
    ])
  }
}

describe('when using Resource type', () => {
  const resource: RestApiResource = new RestApiResource()

  it('should GET all employees', async () => {
    const employees = await resource.all()
    expect(employees).not.empty
  })

  it('should GET single employee', async () => {
    const employees = await resource.all()
    const employee = await resource.id(employees[0].id)
    expect(employee).not.empty
  })
})
