type Tcallback = (...args: any) => void;
export default class EventBus {
  listeners: { [key: string]: Tcallback[] };
  constructor() {
      this.listeners = {};
  }

  on(event: string, callback: Tcallback):void {
      if (!this.listeners[event]) {
          this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
}

  off(event: string, callback: Tcallback):void {
      if (!this.listeners[event]) {
    throw new Error(`Нет события: ${event}`);
  }

  this.listeners[event] = this.listeners[event].filter(
    listener => listener !== callback
  );
}

  emit(event: string, ...args: unknown[]):void {
      if (!this.listeners[event]) {
              throw new Event(`Нет события: ${event}`);
      }

      this.listeners[event].forEach(listener => {
          listener(...args);
      });
  }
}