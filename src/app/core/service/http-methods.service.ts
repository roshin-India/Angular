import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class HttpMethodsService {
  enpoints = {
    auth: {
      url: environment.authUrl,
      port: environment.authPort
    },
    invester: {
      url: environment.investorUrl,
      port: environment.investorPort
    },
    entrepreneur: {
      url: environment.entrepreneurUrl,
      port: environment.entrepreneurPort
    },
    autocomplete: {
      url: environment.autocompleteUrl,
      port: environment.autocompletePort
    }
  };
  /**
   * Http methods
   */
  method = {
    post: (
      service: string,
      endPoint: string,
      objParam: any,
      port?: string
    ): any =>
      this.http.post(
        `${environment.domain}:${port || this.enpoints[service]?.port}/${
          this.enpoints[service]?.url
        }/${endPoint}`,
        objParam
      ),
    get: (
      service: string,
      endPoint: string,
      objParam: any,
      port?: string
    ): any =>
      this.http.get(
        `${environment.domain}:${port || this.enpoints[service]?.port}/${
          this.enpoints[service]?.url
        }/${endPoint}`,
        objParam
      )
  };

  constructor(private http: HttpClient) {}
}
