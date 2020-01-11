import merge from 'deepmerge'

import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'

import { ResourceOptions } from './ResourceOptions'
import { ResourceRouteParamType } from './ResourceRouteParamType'
import { ResourceRouteParam, ResourceRouteParams } from './ResourceRouteParam'
import { HttpError } from './HttpError'

const DefaultOptions: () => ResourceOptions = () => {
  return {
    headers: [],
  }
}

export abstract class Resource {
  protected readonly logger: Lincoln
  private readonly options: ResourceOptions
  private readonly url: URL

  constructor(url: URL, logger: Lincoln, options: Partial<ResourceOptions> = {}) {
    this.logger = logger
    this.options = merge.all<ResourceOptions>([DefaultOptions(), options])

    if (url.href.endsWith('/')) {
      this.url = url
    } else {
      this.url = new URL(`${url.href}/`)
    }
  }

  public get base(): URL {
    return this.url
  }

  protected async http_get<T>(route: string, ...params: ResourceRouteParams): Promise<T> {
    return this.getResponseJson(route, 'GET', params)
  }

  protected async http_delete<R>(route: string, ...params: ResourceRouteParams): Promise<R> {
    return this.getResponseJson(route, 'DELETE', params)
  }

  protected async http_head(route: string, ...params: ResourceRouteParams): Promise<string> {
    return this.getResponseText(route, 'HEAD', params)
  }

  protected async http_options(route: string, ...params: ResourceRouteParams): Promise<string> {
    return this.getResponseText(route, 'OPTIONS', params)
  }

  protected async http_patch<T, R>(route: string, resource: T, ...params: ResourceRouteParams): Promise<R> {
    return this.getResponseJson(route, 'PATCH', params, resource)
  }

  protected async http_post<T, R>(route: string, resource: T, ...params: ResourceRouteParams): Promise<R> {
    return this.getResponseJson(route, 'POST', params, resource)
  }

  protected async http_put<T, R>(route: string, resource: T, ...params: ResourceRouteParams): Promise<R> {
    return this.getResponseJson(route, 'PUT', params, resource)
  }

  protected async http_trace(route: string, ...params: ResourceRouteParams): Promise<string> {
    return this.getResponseText(route, 'TRACE', params)
  }

  protected setHeader(name: string, value: string): void {
    this.options.headers.push({ name, value })
  }

  protected async getResponseJson<T>(route: string, method: string, params: ResourceRouteParams, resource?: T) {
    try {
      const url = this.getRoute(route, params).href

      const request = new Request(url, {
        body: resource ? this.json(resource) : undefined,
        credentials: this.options.credentials,
        headers: this.headers(),
        method,
      })

      const response = await fetch(request)

      if (response.ok === false) {
        const error = new HttpError(request, response)
        this.logger.error(error, response.statusText)
        throw error
      }

      return response.json()
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  protected async getResponseText(route: string, method: string, params: ResourceRouteParams) {
    try {
      const url = this.getRoute(route, params).href

      const request = new Request(url, {
        credentials: this.options.credentials,
        headers: this.headers(),
        method,
      })

      const response = await fetch(request)

      if (response.ok === false) {
        const error = new HttpError(request, response)
        this.logger.error(error, response.statusText)
        throw error
      }

      return response.text()
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  private getRoute(route: string, params: ResourceRouteParams = []): URL {
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
    return route.startsWith('/') ? `${this.base.href}${route.substring(1)}` : `${this.base.href}${route}`
  }

  private headers(): Headers {
    return this.options.headers.reduce((headers, current) => {
      headers.append(current.name, current.value)
      return headers
    }, new Headers())
  }

  private json<T>(resource: T): string {
    return JSON.stringify(resource)
  }
}
