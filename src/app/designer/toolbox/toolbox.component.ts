import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-toolbox',
    templateUrl: './toolbox.component.html',
    styleUrls:['toolbox.component.scss']
})

export class ToolBoxComponent implements OnInit {
    @Input()
    customOps = [];

    filterterm = '';
    constructor() { }

    ngOnInit() { }
}

 
 