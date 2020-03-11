import os from 'os'
import btoa from 'btoa'

import fetch, { Headers, RequestInit } from 'node-fetch'

import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'

import { Merge } from './utils/Merge'
import { HttpError } from './HttpError'
import { ResourceParams } from './ResourceParam'
import { ResourceOptions } from './ResourceOptions'
import { ResourceParamType } from './ResourceParamType'

const DefaultOptions: ResourceOptions = {
  headers: [
    {
      name: 'User-Agent',
      value: `rest-client/1.0 (${os.platform()}; ${os.arch()}; rv:${os.release()})`,
    },
  ],
}

export abstract class Resource {
  protected readonly logger: Lincoln
  private readonly options: ResourceOptions
  private readonly url: URL

  constructor(url: URL, logger: Lincoln, options: Partial<ResourceOptions> = {}) {
    this.logger = logger
    this.options = Merge<ResourceOptions>(DefaultOptions, options)

    if (url.href.endsWith('/')) {
      this.url = url
    } else {
      this.url = new URL(`${url.href}/`)
    }

    this.logger.trace(this.url, options)
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

  protected async http_head(route: string, ...params: ResourceParams): Promise<Buffer> {
    return this.response(route, 'HEAD', params)
  }

  protected async http_options(route: string, ...params: ResourceParams): Promise<Buffer> {
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

  protected async http_trace(route: string, ...params: ResourceParams): Promise<Buffer> {
    return this.response(route, 'TRACE', params)
  }

  protected btoa(value: string | Buffer): string {
    return btoa(value)
  }

  protected async blob(route: string, method: string, params: ResourceParams): Promise<ArrayBuffer | SharedArrayBuffer> {
    const buffer = await this.response(route, method, params)
    return Uint8Array.from(buffer).buffer
  }

  protected buffer(route: string, method: string, params: ResourceParams) {
    return this.response(route, method, params)
  }

  protected async json<T, R>(route: string, method: string, params: ResourceParams, resource?: T): Promise<R> {
    const buffer = await this.response(route, method, params, resource)
    return JSON.parse(buffer.toString('utf-8'))
  }

  protected async response(route: string, method: string, params: ResourceParams = [], body?: any): Promise<Buffer> {
    try {
      const headers = this.headers(params)
      const url = this.getRoute(route, params).href
      const request: RequestInit = { headers, method, body: body ? JSON.stringify(body) : undefined }

      this.logger.trace(route, request, headers)
      const response = await fetch(url, request)
      this.logger.trace(response)

      if (response.ok === false) {
        const error = new HttpError(request, response)
        this.logger.error(error, response.statusText)
        throw error
      }

      const buffer = await response.buffer()
      this.logger.trace('to-cache', request)
      return buffer
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  protected setHeader(name: string, value: string): void {
    this.options.headers.push({ name, value })
  }

  protected async text(route: string, method: string, params: ResourceParams): Promise<string> {
    const buffer = await this.response(route, method, params)
    return buffer.toString('utf-8')
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
    if (route.startsWith('http')) {
      return route
    }

    return route.startsWith('/') ? `${this.base.href}${route.substring(1)}` : `${this.base.href}${route}`
  }

  private headers(params: ResourceParams = []): Headers {
    const headers = new Headers()
    params.map(param => headers.set(param.key, param.value))

    return this.options.headers.reduce((headers, current) => {
      headers.append(current.name, current.value)
      return headers
    }, headers)
  }
}
