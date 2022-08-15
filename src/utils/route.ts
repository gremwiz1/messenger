import { renderBlock } from "./render-block";

export class Route {
  private pathName;
  private blockClass;
  private block;
  private props;

  constructor(pathName, view, props) {
    this.pathName = pathName;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  public navigate(pathName: string): void {
    if (this.match(pathName)) {
      this.pathName = pathName;
      this.render();
    }
  }

  public leave(): void {
    if (this.block) {
      this.block.hide();
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
  }
}
