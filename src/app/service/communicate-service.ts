import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NodeCommunicateService {
  private selectedNode: any = {};

  private _events: BehaviorSubject<any> = new BehaviorSubject({});

  public readonly events: Observable<any> = this._events.asObservable();

  constructor() {}

  sendEvent(node: any) {
    this._events.next(node);
  }

  setSelectedNode(node: any) {
    this.selectedNode.selected = false;
    this.selectedNode = node;
    this.selectedNode.selected = true;
  }

  deselectNode() {
    this.selectedNode.selected = false; 
  }

  deleteSelectedNode(canvas: any, withchild: boolean) {
    canvas.getFlow().getStep(this.selectedNode.id).destroy(withchild);
  }
}
