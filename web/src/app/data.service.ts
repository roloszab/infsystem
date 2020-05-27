import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Member, Stock } from "src/models";
import { retry, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
    providedIn: "root"
})
export class DataService {



    private REST_API_SERVER = "http://localhost:8080/InfoSys/resources";

    constructor(private httpClient: HttpClient) { }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            "Something bad happened; please try again later.");
    }

    public getMembers() {
        return this.httpClient.get<Member[]>(this.REST_API_SERVER + "/member/all")
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public updateMember(member: Member) {
        const url = this.REST_API_SERVER + "/member/update/" + member.id;
        return this.httpClient.put<any>(url, JSON.stringify(member), { headers: { "Content-Type": "application/json" } })
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public deleteMember(member: Member) {
        const url = this.REST_API_SERVER + "/member/delete/" + member.id;
        return this.httpClient.delete<any>(url)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public addMember(member: Member) {
        const url = this.REST_API_SERVER + "/member/add";
        return this.httpClient.post<any>(url, JSON.stringify(member), { headers: { "Content-Type": "application/json" } })
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public getStocks() {
        const url = this.REST_API_SERVER + "/stock/all";
        return this.httpClient.get<Stock[]>(url)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public updateStock(stock: { id: string, title: string, author: string, type: string, sourceDate: string }) {
        const url = this.REST_API_SERVER + "/stock/update/" + stock.id;
        console.log(JSON.stringify(stock));
        return this.httpClient.put<any>(url, JSON.stringify(stock), { headers: { "Content-Type": "application/json" } })
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public deleteStock(stock: Stock) {
        const url = this.REST_API_SERVER + "/stock/delete/" + stock.id;
        return this.httpClient.delete<any>(url)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public addStock(stock: Stock) {
        const url = this.REST_API_SERVER + "/stock/add";
        return this.httpClient.post<any>(url, JSON.stringify(stock), { headers: { "Content-Type": "application/json" } })
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public getRents() {
        const url = this.REST_API_SERVER + "/rent/all";
        return this.httpClient.get<{ stock: Stock, member: Member }[]>(url)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public addRent(rent: { stock: Stock, member: Member }) {
        const url = this.REST_API_SERVER + "/rent/add";
        return this.httpClient.post<any>(url, JSON.stringify(rent), { headers: { "Content-Type": "application/json" } })
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public deleteRent(stock: Stock) {
        const url = this.REST_API_SERVER + "/rent/delete/" + stock.id;
        console.log(JSON.stringify(stock));
        return this.httpClient.delete<any>(url, { headers: { "Content-Type": "application/json" } })
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

}
