import { TestPageComponent } from '../../testPage/testPage.component';

describe('a testPage component', () => {
	let component: TestPageComponent;

	// register all needed dependencies
	beforeEach(() => {
		component = new TestPageComponent();
	});

	it('should have an instance', () => {
		console.log('sanket has an instance')
		expect(component).toBeDefined();
	});

	it('should have correct data', () => {
		expect(component.data).toBe('sanket')
	});
});