import { EventBus } from './EventBus';
import { Indexed, set } from './hellpers/set';

export enum StoreEvents {
	Updated = 'updated',
}
export class Store extends EventBus {
	private state: Indexed = {};
	public set(path: string, value: unknown) {
		set(this.state, path, value);
		this.emit(StoreEvents.Updated, this.getState());
	}

	public getState() {
		return this.state;
	}
}

const store = new Store();

export default store;
