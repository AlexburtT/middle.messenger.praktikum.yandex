import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

class Block<Props extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

	private _element: HTMLElement | null = null;
  protected props: object;
	public children: Record<string, Block | Block[]>;
	private eventBus: () => EventBus;

  /** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */

  constructor(propsAndChildren: Props) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildren(propsAndChildren);
		this.children = children;
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

	private _render() {
		const fragment = this.render();
		this._removeEvents();
		const newElement = fragment.firstElementChild as HTMLElement;
		if (this._element && newElement) {
			this._element.replaceWith(newElement);
		}
		this._element = newElement;
		this._addEvents();
	}

  _getChildren(childrenAndProps: Props):
		{ props: Props, children: Record<string, Block | Block[]> } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { props: props as Props, children };
  }

	_addEvents() {
		const events: Record<string, () => void> = (this.props as Props).events;
		if (!events) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element?.addEventListener(event, listener);
		});
	}

	_removeEvents() {
		const events: Record<string, () => void> = (this.props as Props).events;

		if (!events || !this._element) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element!.removeEventListener(event, listener);
		});
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
	}

	private _init() {
		this.init();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	protected init() {}

	_componentDidMount() {
		this.componentDidMount();
	}

	componentDidMount() {}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);

		Object.values(this.children).forEach(child => {
			if (Array.isArray(child)) {
				child.forEach(ch => ch.dispatchComponentDidMount());
			} else {
				child.dispatchComponentDidMount();
			}
		});
	}

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  protected compile(template: (context: any) => string, context: any) {
		const contextStub = { ...context };

    Object.entries(this.children).forEach(([key, component]) => {
			if (Array.isArray(component)) {
				contextStub[key] = component.map(child => `<div data-id="id-${child.id}"></div>`);
			} else {
				contextStub[key] = `<div data-id="id-${component.id}"></div>`;
			}
    });

    const htmlString = template(contextStub);
		const temp = document.createElement('template');
    temp.innerHTML = htmlString;

		const replaceStub = (component: Block) => {
			const stub = temp.content.querySelector(`[data-id="id-${component.id}"]`);

			if (!stub) {
				return;
			}

			component.getContent()?.append(...Array.from(stub.childNodes));
			stub.replaceWith(component.getContent()!);
		};

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
				component.forEach(replaceStub);
			} else {
				replaceStub(component);
			}
    });
    return temp.content;
  }

	protected render(): DocumentFragment {
		return new DocumentFragment();
	}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }
}

export default Block;
