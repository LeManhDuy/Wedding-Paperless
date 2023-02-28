import { Observable, of } from "rxjs";
export function  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }