import 'mocha'

import expect from './expect'
import Logger from './logging'

import { URL } from 'url'
import { step } from 'mocha-steps'

import { Resource } from '../src/Resource'
import { ResourceRouteParamType } from '../src/ResourceRouteParamType'

interface Employee {
  id: number
  employee_name: string
  employee_salary: number
  employee_age: number
  profile_image: string
}

class RestApiResource extends Resource {
  constructor() {
    super(new URL('http://dummy.restapiexample.com/api/v1'), Logger.extend('resource'))
  }

  all(): Promise<Employee[]> {
    return this._get<Employee[]>('employees')
  }

  create(employee: Employee): Promise<Employee> {
    return this._post('create', employee)
  }

  id(id: number): Promise<Employee> {
    return this._get<Employee>('employee/{:id}', [
      { key: 'id', type: ResourceRouteParamType.RouteParameter, value: id },
    ])
  }

  update(employee: Employee): Promise<Employee> {
    return this._put('update/{:id}', employee, [
      { key: 'id', type: ResourceRouteParamType.RouteParameter, value: employee.id },
    ])
  }
}

describe('when using Resource type', () => {
  const sut: RestApiResource = new RestApiResource()
  let employees: Employee[]

  step('should GET all employees', async () => {
    employees = await sut.all()
    expect(employees).not.empty
  })

  step('should GET single employee', async () => {
    const employee = await sut.id(employees[0].id)
    expect(employee).not.empty
  })
})
