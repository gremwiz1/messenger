import EventBus from './event-bus';
import {v4 as makeUUID} from 'uuid';

// Нельзя создавать экземпляр данного класса
class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element : HTMLElement
  _meta : {tagName: string, props: any }
  eventBus: EventBus;
  props: any;
  _id: string;
  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", props = {}) {

    this._meta = {
      tagName,
      props
    };
    this._id = makeUUID();
    this.props = this._makePropsProxy(props);

    this.eventBus = new EventBus();

    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents() : void {
    this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() : void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() : void {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() : void {
    this.componentDidMount();
  }

  componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

  _componentDidUpdate(oldProps: any, newProps : any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if(response){
        this._render();
    }
  }

  componentDidUpdate(oldProps: any, newProps : any) {
    return oldProps !== newProps;
  }

  setProps = (nextProps : any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block: any = this.render();
    // Это небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
    this._element.appendChild(block);
  }

    // Переопределяется пользователем. Необходимо вернуть разметку
  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props : any) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

        // Здесь вам предстоит реализовать метод
        return new Proxy(props, {
          get: (props, prop: string) => {
            const value = props[prop];
            return (typeof value === "function") ? value.bind(props) : value;
          },

          set: (props, prop: string, value) => {
            props[prop] = value;
            self.eventBus.emit(Block.EVENTS.FLOW_CDU, { ...props }, props);
            return true;
          },

          deleteProperty: () => {
            throw new Error("Нет доступа");
          }
        });
  }

  _createDocumentElement(tagName : string) : HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default Block;