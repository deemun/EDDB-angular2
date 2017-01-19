import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DataService {
    

    constructor(private http: Http){ }
    
    fetchData(){
        return this.http.get('https://eddb-37c12.firebaseio.com/.json').map(
            (res) => res.json()
        );
    }
}