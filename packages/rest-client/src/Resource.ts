import merge from 'deepmerge'

import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'

import { HttpError } from './HttpError'
import { ResourceParams } from './ResourceParam'
import { ResourceOptions } from './ResourceOptions'
import { ResourceParamType } from './ResourceParamType'

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

  protected async http_get<T>(route: string, ...params: ResourceParams): Promise<T> {
    return this.json(route, 'GET', params)
  }

  protected async http_delete<R>(route: string, ...params: ResourceParams): Promise<R> {
    return this.json(route, 'DELETE', params)
  }

  protected async http_head(route: string, ...params: ResourceParams): Promise<Response> {
    return this.response(route, 'HEAD', params)
  }

  protected async http_options(route: string, ...params: ResourceParams): Promise<Response> {
    return this.response(route, 'OPTIONS', params)
  }

  protected async http_patch<T, R>(route: string, resource: T, ...params: ResourceParams): Promise<R> {
    return this.json(route, 'PATCH', params, resource)
  }

  protected async http_post<T, R>(route: string, resource: T, ...params: ResourceParams): Promise<R> {
    return this.json(route, 'POST', params, resource)
  }

  protected async http_put<T, R>(route: string, resource: T, ...params: ResourceParams): Promise<R> {
    return this.json(route, 'PUT', params, resource)
  }

  protected async http_trace(route: string, ...params: ResourceParams): Promise<Response> {
    return this.response(route, 'TRACE', params)
  }

  protected setHeader(name: string, value: string): void {
    this.options.headers.push({ name, value })
  }

  protected async response(route: string, method: string, params: ResourceParams, body?: any) {
    try {
      const url = this.getRoute(route, params).href

      const request = new Request(url, {
        body,
        method,
        credentials: this.options.credentials,
        headers: this.headers(),
      })

      this.logger.trace(route, request)
      const response = await fetch(request)
      this.logger.trace(response)

      if (response.ok === false) {
        const error = new HttpError(request, response)
        this.logger.error(error, response.statusText)
        throw error
      }

      return response
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  protected async blob(route: string, method: string, params: ResourceParams) {
    const response = await this.response(route, method, params)
    return response.blob()
  }

  protected async buffer(route: string, method: string, params: ResourceParams) {
    const response = await this.response(route, method, params)
    return new Promise(async (resolve, reject) => {
      const blob = await response.arrayBuffer()
      return Buffer.from(blob)
    })
  }

  protected async json<T, R>(route: string, method: string, params: ResourceParams, resource?: T): Promise<R> {
    const response = await this.response(route, method, params, resource)
    return response.json()
  }

  protected async text(route: string, method: string, params: ResourceParams): Promise<string> {
    const response = await this.response(route, method, params)
    return response.text()
  }

  private getRoute(route: string, params: ResourceParams = []): URL {
    const routeUrl = params
      .filter(param => param.type === ResourceParamType.RouteParameter)
      .reduce((result, param) => {
        const regex = new RegExp(`{:${param.key}}`)
        return result.replace(regex, param.value)
      }, this.getUrl(route))

    const url = new URL(routeUrl)

    url.search = params
      .filter(param => param.type === ResourceParamType.Query)
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
}
