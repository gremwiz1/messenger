import Block from "./block";
import { renderBlock } from "./render-block";

interface IProps {
  rootQuery: string;
}
export class Route {
  private pathName;
  private blockClass: any;
  private block: Block | null;
  private props: IProps;
  private root: HTMLElement | null;

  constructor(pathName: string, view: unknown, props: IProps) {
    this.pathName = pathName;
    this.blockClass = view;
    this.block = null;
    this.props = props;
    this.root = document.querySelector(this.props.rootQuery);
  }

  public navigate(pathName: string): void {
    if (this.match(pathName)) {
      this.pathName = pathName;
      this.render();
    }
  }

  public leave(): void {
    if (this.block) {
      this.block = null;
      if (!this.root) return;
      this.root.innerHTML = "";
    }
  }

  public match(pathName: string): boolean {
    return this.isEqual(pathName, this.pathName);
  }

  public isEqual(lhs: unknown, rhs: unknown): boolean {
    return lhs === rhs;
  }

  public render(): void {
    console.log(this.block);
    if (!this.block) {
      this.block = new this.blockClass(this.props);
      //render(this.props.rootQuery, this.block);
    }
    renderBlock(this.props.rootQuery, this.block);
    if (this.block) {
      this.block.componentDidMount();
    }
  }
}
