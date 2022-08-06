import EventBus from './event-bus';
import { v4 as makeUUID } from 'uuid';
// Нельзя создавать экземпляр данного класса

interface IBlock {
  init(): void;
  componentDidMount(): void;
  dispatchComponentDidMoun(): void;
  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean;
  render(): void;
  setProps(nextProps: Record<string, any>): void;
  getContent(): HTMLElement;
  show(): void;
  hide(): void;
}

export default class Block implements IBlock {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };
  _data: {
    tagName: string,
    props: Record<string, any>
  };
  _id: string;
  _element: HTMLElement;
  props: Record<string, any>;
  eventBus: () => EventBus;
  children: Record<string, Block>;

  constructor(tagName: string = "div", propsAndChildren: Record<string, any> = {}) {

    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this._data = {
      tagName,
      props
    };

    this._id = makeUUID();

    this.props = this._makePropsProxy({
      ...props,
      __id: this._id,
    });
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  };
  _getChildren(propsAndChildren: Record<string, any>) {
    const children: Record<string, any> = {};
    const props: Record<string, any> = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return {
      children,
      props,
    };
  }
  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  };
  _createResources(): void {
    const { tagName } = this._data;
    this._element = this._createDocumentElement(tagName);
  };
  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  };
  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  };
  _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child: any) => {
      child.dispatchComponentDidMount();
    });
  }
  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
  componentDidMount(): void {

  }
  dispatchComponentDidMoun(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
  _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._render();
    }
  }
  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
    return oldProps !== newProps;
  }
  setProps(nextProps: Record<string, any>): void {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element;
  }
  _render() {
    const block: any = this.render();
    this._deleteEvents();
    this._element.appendChild(block);
    this._addEvents();
  }
  render() { }
  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach(eventName => {
      if (this._element) {
        if (eventName === 'blur') {
          const { children } = this._element;
          if (children !== undefined) {
            const input = children[0].querySelector('input');
            input?.addEventListener(eventName, events[eventName]);
          }
        } else {
          this._element.addEventListener(eventName, events[eventName]);
        }
      }
    });
  }
  _deleteEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      if (this._element) {
        if (eventName === 'blur') {
          const { children } = this._element;
          if (children !== undefined) {
            const input = children[0]?.querySelector('input');
            input?.removeEventListener(eventName, events[eventName]);
          }
        } else {
          this._element.removeEventListener(eventName, events[eventName]);
        }
      }
    });
  }
  compile(template: (context: any) => string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="id-${child._id}"></div>`;
    });

    const fragment = document.createElement('template') as HTMLTemplateElement;
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="id-${child._id}"]`);
      if (!stub) {
        return
      }

      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }
  _makePropsProxy(props: Record<string, any>): Record<string, any> {
    const self = this;
    return new Proxy(props, {

      get(target, prop: string) {
        const value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
      },

      set(target, prop: string, value) {
        if (prop.startsWith('_')) {
          throw new Error("Нет прав");
        }
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, { target });
        return true;
      },

      deleteProperty() {
        throw new Error('Нет прав');
      },

    });
  }
  getContent() {
    return this.element;
  }
  show() {
    this.getContent().style.display = "block";
  }
  hide() {
    this.getContent().remove();
  }

}