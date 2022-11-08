import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TemporalWorkflowService {
    constructor(private httpClient : HttpClient) { 

    }

    uploadWorkflow(workflow:any){

       return this.httpClient.put("http://localhost:8088/uploadWorkflow", workflow, {
        headers: {
            "Content-Type" : "application/json"
        }
       })

    }

    getWorkflowList(){

    }

}