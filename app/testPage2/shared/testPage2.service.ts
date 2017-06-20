import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TestPage2 } from './testPage2.model';

@Injectable()
export class TestPage2Service {

	data: TestPage2[];

	getList(): TestPage2[] {
		this.data = [];
		this.data.push( {id: 1, name: 'One'});
		this.data.push({ id: 2, name: 'Two'} );
		return this.data;
	}
}