import 'isomorphic-fetch'
import { base64StringToBlob } from 'blob-util'

export interface ResourceOptions {
  params: ResourceRouteParam[]
}

export interface ResourceRouteParam {
  key: string
  value: any
}

export type ResourceRouteParams = ResourceRouteParam[]

export class Resource {
  private readonly url: URL

  constructor(url: URL) {
    if (url.href.endsWith('/')) {
      this.url = url
    } else {
      this.url = new URL(`${url.href}/`)
    }
  }

  public get base(): URL {
    return this.url
  }

  protected async get<T>(route: string, params?: ResourceRouteParam[]): Promise<T> {
    const url = this.getFormattedUrl(route, params).href
    const request: RequestInfo = new Request(url, {
      method: 'GET',
    })
    const response = await fetch(request)
    return response.json()
  }

  protected async delete<T, R>(route: string, resource: T, params?: ResourceRouteParam[]): Promise<R> {
    const url = this.getFormattedUrl(route, params).href
    const request: RequestInfo = new Request(url, {
      method: 'DELETE',
    })
    const response = await fetch(request)
    return response.json()
  }

  protected async patch<T, R>(route: string, resource: T, params?: ResourceRouteParam[]): Promise<R> {
    const url = this.getFormattedUrl(route, params).href
    const contents = btoa(JSON.stringify(resource))
    const request: RequestInfo = new Request(url, {
      body: base64StringToBlob(contents),
      method: 'PATCH',
    })
    const response = await fetch(request)
    return response.json()
  }

  protected async post<T, R>(route: string, resource: T, params?: ResourceRouteParam[]): Promise<R> {
    const url = this.getFormattedUrl(route, params).href
    const contents = btoa(JSON.stringify(resource))
    const request: RequestInfo = new Request(url, {
      body: base64StringToBlob(contents),
      method: 'POST',
    })
    const response = await fetch(request)
    return response.json()
  }

  protected async put<T, R>(route: string, resource: T, params?: ResourceRouteParam[]): Promise<R> {
    const url = this.getFormattedUrl(route, params).href
    const contents = btoa(JSON.stringify(resource))
    const request: RequestInfo = new Request(url, {
      body: base64StringToBlob(contents),
      method: 'PUT',
    })
    const response = await fetch(request)
    return response.json()
  }

  private getFormattedUrl(route: string, params: ResourceRouteParams = []): URL {
    const url = params.reduce((result, param) => {
      const regex = new RegExp(`{:${param.key}}`)
      return result.replace(regex, param.value)
    }, this.getUrl(route))

    return new URL(url)
  }

  private getUrl(route: string): string {
    if (route.startsWith('/')) {
      return `${this.base.href}${route.substring(1)}`
    }

    return `${this.base.href}${route}`
  }
}
