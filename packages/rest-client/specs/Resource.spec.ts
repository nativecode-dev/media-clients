import 'mocha'

import expect from './expect'

import { Resource } from '../src/Resource'

export interface Employee {
  id: number
  employee_name: string
  employee_salary: number
  employee_age: number
  profile_image: string
}

class RestApiResource extends Resource {
  constructor() {
    super(new URL('http://dummy.restapiexample.com/api/v1'))
  }

  all(): Promise<Employee[]> {
    return this.get<Employee[]>('employees')
  }

  create(employee: Employee): Promise<Employee> {
    return this.post('create', employee)
  }

  id(id: string): Promise<Employee> {
    return this.get<Employee>('employee/{:id}', [
      {
        key: 'id',
        value: id,
      },
    ])
  }

  update(employee: Employee): Promise<Employee> {
    return this.put('update/{:id}', employee, [{ key: 'id', value: employee.id }])
  }
}

describe('when using Resource type', () => {
  const resource: RestApiResource = new RestApiResource()

  it('should GET all employess', async () => {
    const employees = await resource.all()
    expect(employees).not.empty
  })

  it('should GET single employess', async () => {
    const employees = await resource.all()
    const employee = await resource.id(String(employees[0].id))
    expect(employee).not.empty
  })
})
