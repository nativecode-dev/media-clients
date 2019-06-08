import 'isomorphic-fetch'

import { URL } from 'url'
import { base64StringToBlob } from 'blob-util'

import { ResourceHeader } from './ResourceHeader'
import { ResourceRouteParam, ResourceRouteParams } from './ResourceRouteParam'
import { ResourceRouteParamType } from './ResourceRouteParamType'

export interface ResourceOptions {
  headers: ResourceHeader[]
}

const DefaultOptions: ResourceOptions = {
  headers: [],
}

export class Resource {
  private readonly options: ResourceOptions
  private readonly url: URL

  constructor(url: URL, options: Partial<ResourceOptions> = {}) {
    this.options = { ...DefaultOptions, ...options }

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
      headers: this.headers(),
      method: 'GET',
    })
    const response = await fetch(request)
    return response.json()
  }

  protected async delete<T, R>(route: string, resource: T, params?: ResourceRouteParam[]): Promise<R> {
    const url = this.getFormattedUrl(route, params).href
    const request: RequestInfo = new Request(url, {
      headers: this.headers(),
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
      headers: this.headers(),
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
      headers: this.headers(),
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
      headers: this.headers(),
      method: 'PUT',
    })
    const response = await fetch(request)
    return response.json()
  }

  protected setHeader(name: string, value: string): void {
    this.options.headers.push({ name, value })
  }

  private getFormattedUrl(route: string, params: ResourceRouteParams = []): URL {
    const routeUrl = params
      .filter(param => param.type === ResourceRouteParamType.RouteParameter)
      .reduce((result, param) => {
        const regex = new RegExp(`{:${param.key}}`)
        return result.replace(regex, param.value)
      }, this.getUrl(route))

    const url = new URL(routeUrl)

    url.search = params
      .filter(param => param.type === ResourceRouteParamType.Query)
      .reduce(
        (result, param) => {
          result.push(`${param.key}=${param.value}`)
          return result
        },
        ['?'],
      )
      .join('')

    return url
  }

  private getUrl(route: string): string {
    if (route.startsWith('/')) {
      return `${this.base.href}${route.substring(1)}`
    }

    return `${this.base.href}${route}`
  }

  private headers(): Headers {
    const headers = new Headers()
    this.options.headers.forEach(header => {
      headers.append(header.name, header.value)
    })
    return headers
  }
}
