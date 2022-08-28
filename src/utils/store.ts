import Block from "./block";
import EventBus from "./event-bus";
import { isEqual, set } from "./helpers";
import { IActiveChat, IChats, IUserModel } from "./types";

interface IStoreData {
  user?: IUserModel;
  chats?: IChats[];
  activeChat?: IActiveChat;
  activeChatMessages?: [];
}
export enum StoreEvents {
  Update = "Update",
}

class Store extends EventBus {
  private state: IStoreData = {};

  public getState() {
    return this.state;
  }

  public set(path: keyof IStoreData, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Update);
  }

  public clear() {
    this.state = {};
  }
}

const store = new Store();

export function withStore(
  mapStateToProps: (state: IStoreData) => Record<string, unknown>
) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: any) {
        const state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          store.on(StoreEvents.Update, () => {
            this.setProps({ ...newState });
          });
        }
      }
    };
  };
}

export default store;
