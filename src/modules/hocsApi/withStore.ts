import store, { StoreEvents } from '../../utills/Store';
import { isEqual } from '../../utills/hellpers/isEqual';

export function withStore(mapStateToProps: (state: any) => any) {
	return function wrap(Component: any) {

		let currentState = null;
		return class WithStore extends Component {
			constructor(props: any) {
				const state = store.getState();
				currentState = mapStateToProps(state);

				super({ ...props, ...currentState });

				store.on(StoreEvents.Updated, () => {
					const state = store.getState();
					const propsFromState = mapStateToProps(state);

					if (isEqual(currentState, propsFromState)) {
						return;
					}

					this.setProps({ ...propsFromState });
				});
			}
		};
	};
}
