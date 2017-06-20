import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TestPage2Component } from '../../testPage2/testPage2.component';
import { TestPage2Service } from '../../testPage2/shared/testPage2.service';
import { TestPage2 } from '../../testPage2/shared/testPage2.model';

describe('a testPage2 component', () => {
	let component: TestPage2Component;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: TestPage2Service, useClass: MockTestPage2Service },
				TestPage2Component
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([TestPage2Component], (TestPage2Component) => {
		component = TestPage2Component;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
		component.ngOnInit();
		expect(component.testPage2.length).toBe(2);
	});
});

// Mock of the original testPage2 service
class MockTestPage2Service extends TestPage2Service {
	getList(): any {
		return [ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ];
	}
}
