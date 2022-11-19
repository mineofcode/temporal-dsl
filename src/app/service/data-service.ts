import { Injectable } from '@angular/core';
import { CustomStepComponent } from '../designer/custom-step/custom-step.component';
import { NormalStepComponent } from '../designer/custom-step/normal-step/normal-step.component';

@Injectable({ providedIn: 'root' })
export class DataService {

    customOps = [{
        name: 'Activity',
        type: 'execute',
        template: NormalStepComponent,
        data: {
            name: 'Activity Name',
            icon: 'code',
            iconColor: 'rgb(255 0 0)',
            description: 'Execute the activity',
            map: { 'name': 'name', 'description': 'desc' },
            props: [
                { 'id': 'name', 'label': 'Name', 'type': 'text_input', 'default': '', 'value': 'Activity Name' },
                { 'id': 'desc', 'label': 'Short Description', 'type': 'text_input', 'default': '', 'value': 'Execute the activity' },
                { 'id': 'action', 'label': 'Action', 'type': 'text_input', 'default': '', 'value': '' }
            ]
        },
    },
    {
        name: 'Input',
        type: 'input',
        template: NormalStepComponent,
        
        data: {
            name: 'Input Signal',
            icon: 'edit',
            iconColor: 'rgb(1 159 144)',
            description: 'Waiting for input',
            map: { 'name': 'name', 'description': 'desc' },
            props: [
                { 'id': 'name', 'label': 'Name', 'type': 'text_input', 'default': '', 'value': 'Input Signal' },
                { 'id': 'desc', 'label': 'Short Description', 'type': 'text_input', 'default': '', 'value': 'Waiting for input' },
                { 'id': 'evt_name', 'label': 'Event Name', 'type': 'text_input', 'default': '', 'value': '' },
                { 'id': 'expression', 'label': 'JQ Expression', 'type': 'text_area', 'default': '', 'value': '' }

            ]
        },
    },
    {
        name: 'Routing Block',
        template: CustomStepComponent,
        type: 'router',
        data: {
            name: 'Routing Block',
            icon: 'cluster',
            iconColor: 'rgb(255 141 0)',
            description: 'Condition to route group',
            map: { 'name': 'name', 'description': 'desc' },
            props: [
                { 'id': 'name', 'label': 'Name', 'type': 'text_input', 'default': '', 'value': 'Routing Block' },
                { 'id': 'desc', 'label': 'Short Description', 'type': 'text_input', 'default': '', 'value': 'Condition to route group' }

            ],
            subdata: {
                name: 'Route',
                icon: 'branches',
                map: { 'name': 'name', 'description': 'desc' },
                // iconColor: 'rgb(14 10 0)',
                type: 'route',
                description: 'Condition',
                props: [
                    { 'id': 'name', 'label': 'Name', 'type': 'text_input', 'default': '', 'value': 'Route' },
                    { 'id': 'desc', 'label': 'Short Description', 'type': 'text_input', 'default': '', 'value': 'condition' },
                    { 'id': 'expression', 'label': 'JQ Expression', 'type': 'text_area', 'default': '', 'value': '' }

                ]
            },
        },
    },
    {
        name: 'Sleep',
        type: 'sleep',
        template: NormalStepComponent,
        data: {
            name: 'Sleep',
            icon: 'clock-circle',
            iconColor: 'rgb(0 63 204)',
            description: 'Sleep the workflow',
            map: { 'name': 'name', 'description': 'desc' },
            sleep: 'PT2S',
            props: [
                { 'id': 'name', 'label': 'Name', 'type': 'text_input', 'default': '', 'value': 'Sleep' },
                { 'id': 'desc', 'label': 'Short Description', 'type': 'text_input', 'default': '', 'value': 'Sleep the workflow' }

            ]
        },
    },
    {
        name: 'Callback',
        type: 'callback',
        template: NormalStepComponent,
        data: {
            name: 'Callback',
            icon: 'cloud-upload',
            iconColor: 'rgb(204, 0, 0)',
            description: 'Send callback',
            map: { 'name': 'name', 'description': 'desc' },
            props: [
                { 'id': 'name', 'label': 'Name', 'type': 'text_input', 'default': '', 'value': 'Callback' },
                { 'id': 'desc', 'label': 'Short Description', 'type': 'text_input', 'default': '', 'value': 'Send callback' }

            ]
        },
    },
    {
        name: 'Complete',
        type: 'end',
        template: NormalStepComponent,
        data: {
            name: 'Complete',
            icon: 'check-circle',
            iconColor: 'rgb(0 204 53)',
            description: 'Complete the workflow',
            map: { 'name': 'name', 'description': 'desc' },
            props: [
                { 'id': 'name', 'label': 'Name', 'type': 'text_input', 'default': '', 'value': 'Complete' },
                { 'id': 'desc', 'label': 'Short Description', 'type': 'text_input', 'default': '', 'value': 'Complete the workflow' }
            ]
        },
    },
    ];

    constructor() { }

    updateDrawer(drawerData: any) {

        let objProps = Object.keys(drawerData.map);
        for (let i = 0; i < objProps.length; i++) {
            const el:any = objProps[i];
            debugger
            let d = drawerData['props'].find((a: any) => a.id == drawerData.map[el])?.value || drawerData[el];
            console.log(el,d);
            drawerData[el] = d;
        }

    }

}