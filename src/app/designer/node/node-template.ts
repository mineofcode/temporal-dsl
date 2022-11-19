import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NodeCommunicateService } from '../../service/communicate-service';

@Component({
    selector: 'node',
    templateUrl: 'node-template.html'
})

export class NodeComponent implements OnInit {

    @Input()
    node: any; 
 
    @Input()
    actions:any = [];



    constructor(private nodecomService: NodeCommunicateService) { }

    ngOnInit() {  }

    _onNodeClick(e:Event){  
        this.nodecomService.sendEvent(this.node);
        this.nodecomService.setSelectedNode(this.node);
    }
}