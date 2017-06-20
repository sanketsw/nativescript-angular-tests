import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'testPage',
	moduleId: module.id,
	templateUrl: './testPage.component.html',
	styleUrls: ['./testPage.component.css']
})

export class TestPageComponent implements OnInit {

	data: string = 'sanket'

	constructor() { }

	ngOnInit() { }
}