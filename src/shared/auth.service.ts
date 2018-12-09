import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, distinctUntilChanged, debounceTime, catchError, first } from 'rxjs/operators'
import { of, Observable } from 'rxjs';
import { AuthBearer } from './authBearerInterface';
import { last } from '@angular/router/src/utils/collection';




@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokeyKey = "token";

    constructor(private _http: HttpClient) { }

    public login(userName: string, password: string) {
        let header = new HttpHeaders().set('Content-Type', 'application/json');
        let body = JSON.stringify({ "Username": userName, "Password": password });
        let options = { headers: header };

        return this._http.put<AuthBearer>("http://localhost:61505/api/TokenAuth/Login", body, options).pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(
                res => {
                    let result = res;
                    if (result.state && result.state == 1 && result.data && result.data.accessToken) {
                        sessionStorage.setItem(this.tokeyKey, result.data.accessToken);
                    }
                    return result;
                }
            ),

            catchError(this.handleError<AuthBearer>("login"))
        )
    }


    public register(firstname: string, lastname: string, username: string, password: string) {
        let header = new HttpHeaders().set('Content-Type', 'application/json');
        let body = JSON.stringify({ "Fname": firstname, "Lname": lastname, "Username": username, "Password": password });
        let options = { headers: header };

        return this._http.post("http://localhost:61505/api/TokenAuth/Register", body, options).pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(
                res => {
                    let result = res;
                    return result;
                }
            ),

            // catchError(this.handleError("login"))
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} error: ${error.message}`);
            return of(result as T);
        };
    }
}