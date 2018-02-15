import { injectParameters } from './urls'

class Api {
  constructor() {
    this.GET = this._makeMethod('get')
    this.POST = this._makeMethod('post', true)
    this.PUT = this._makeMethod('put', true)
    this.DELETE = this._makeMethod('delete')
  }

  _makeMethod(method, hasBody = false) {
    return (urlTemplate, withAuth = false) => {
      return data => {
        const url = injectParameters(urlTemplate, data, hasBody)

        let headers = {
          Accept: 'application/json',
        }

        let body
        if (hasBody) {
          headers['Content-Type'] = 'application/json'
          body = JSON.stringify(data)
        }

        return this._makeRequest(method, url, headers, body)
      }
    }
  }

  _makeRequest(method, url, headers, body) {
    return fetch(url, { method, headers, body }).then(response => {
      return new Promise(resolve => resolve(response.text()))
        .catch(err =>
          Promise.reject({
            type: 'NetworkError',
            status: response.status,
            message: err,
          }),
        )
        .then(responseBody => {
          try {
            const parsedJSON = JSON.parse(responseBody)
            if (response.ok) return parsedJSON
            if (response.status >= 500) {
              return Promise.reject({
                type: 'ServerError',
                status: response.status,
                body: parsedJSON,
              })
            }
            if (response.status <= 501) {
              return Promise.reject({
                type: 'ApplicationError',
                status: response.status,
                body: parsedJSON,
              })
            }
          } catch (e) {
            return Promise.reject({
              type: 'InvalidJSON',
              status: response.status,
              body: responseBody,
            })
          }
        })
    })
  }
}

export default new Api()
