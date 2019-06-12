import 'isomorphic-fetch'

import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'

import { ResourceHeader } from './ResourceHeader'
import { ResourceRouteParam, ResourceRouteParams } from './ResourceRouteParam'
import { ResourceRouteParamType } from './ResourceRouteParamType'

export interface ResourceOptions {
  headers: ResourceHeader[]
}

const DefaultOptions: () => ResourceOptions = () => {
  return {
    headers: [],
  }
}

export class Resource {
  protected readonly logger: Lincoln
  private readonly options: ResourceOptions
  private readonly url: URL

  constructor(url: URL, logger: Lincoln, options: Partial<ResourceOptions> = {}) {
    this.logger = logger
    this.options = { ...DefaultOptions(), ...options }

    if (url.href.endsWith('/')) {
      this.url = url
    } else {
      this.url = new URL(`${url.href}/`)
    }
  }

  public get base(): URL {
    return this.url
  }

  protected async _get<T>(route: string, params?: ResourceRouteParam[]): Promise<T> {
    try {
      const url = this.getFormattedUrl(route, params).href
      const request: RequestInfo = new Request(url, {
        headers: this.headers(),
        method: 'GET',
      })
      const response = await fetch(request)

      if (response.ok === false) {
        this.logger.error(JSON.stringify(request, null, 2))
        return Promise.reject(new Error(`${response.status}: ${response.statusText} @ ${url}`))
      }

      return response.json()
    } catch (error) {
      this.logger.error(error)
      return Promise.reject(error)
    }
  }

  protected async _delete<R>(route: string, params?: ResourceRouteParam[]): Promise<R> {
    try {
      const url = this.getFormattedUrl(route, params).href
      const request: RequestInfo = new Request(url, {
        headers: this.headers(),
        method: 'DELETE',
      })
      const response = await fetch(request)

      if (response.ok === false) {
        this.logger.error(JSON.stringify(request, null, 2))
        return Promise.reject(new Error(`${response.status}: ${response.statusText} @ ${url}`))
      }

      return response.json()
    } catch (error) {
      this.logger.error(error)
      return Promise.reject(error)
    }
  }

  protected async _patch<T, R>(route: string, resource: T, params?: ResourceRouteParam[]): Promise<R> {
    try {
      const url = this.getFormattedUrl(route, params).href
      const request: RequestInfo = new Request(url, {
        body: this.json(resource),
        headers: this.headers(),
        method: 'PATCH',
      })
      const response = await fetch(request)

      if (response.ok === false) {
        this.logger.error(JSON.stringify(request, null, 2))
        return Promise.reject(new Error(`${response.status}: ${response.statusText} @ ${url}`))
      }

      return response.json()
    } catch (error) {
      this.logger.error(error)
      return Promise.reject(error)
    }
  }

  protected async _post<T, R>(route: string, resource: T, params?: ResourceRouteParam[]): Promise<R> {
    try {
      const url = this.getFormattedUrl(route, params).href
      const request: RequestInfo = new Request(url, {
        body: this.json(resource),
        headers: this.headers(),
        method: 'POST',
      })
      const response = await fetch(request)

      if (response.ok === false) {
        this.logger.error(JSON.stringify(request, null, 2))
        return Promise.reject(new Error(`${response.status}: ${response.statusText} @ ${url}`))
      }

      return response.json()
    } catch (error) {
      this.logger.error(error)
      return Promise.reject(error)
    }
  }

  protected async _put<T, R>(route: string, resource: T, params?: ResourceRouteParam[]): Promise<R> {
    try {
      const url = this.getFormattedUrl(route, params).href
      const request: RequestInfo = new Request(url, {
        body: this.json(resource),
        headers: this.headers(),
        method: 'PUT',
      })
      const response = await fetch(request)

      if (response.ok === false) {
        this.logger.error(JSON.stringify(request, null, 2))
        return Promise.reject(new Error(`${response.status}: ${response.statusText} @ ${url}`))
      }

      return response.json()
    } catch (error) {
      this.logger.error(error)
      return Promise.reject(error)
    }
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
      .filter(param => param.value)
      .reduce<string[]>((result, param) => {
        result.push(`${param.key}=${param.value}`)
        return result
      }, [])
      .join('&')

    this.logger.debug(url.href)

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

  private json<T>(resource: T): string {
    return JSON.stringify(resource)
  }
}
