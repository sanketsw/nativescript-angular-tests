import { Component, OnInit } from '@angular/core';

import { TestPage2 } from './shared/testPage2.model';
import { TestPage2Service } from './shared/testPage2.service';

@Component({
	selector: 'testPage2',
	moduleId: module.id,
	templateUrl: './testPage2.component.html',
	providers: [TestPage2Service]
})

export class TestPage2Component implements OnInit {
	testPage2: TestPage2[] = [];

	constructor(private testPage2Service: TestPage2Service) { }

	ngOnInit() {
		console.log('here')
			this.testPage2 = this.testPage2Service.getList();

			console.log(JSON.stringify(this.testPage2));
	
		
	}
}