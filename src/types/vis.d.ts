export = vis
export as namespace vis

declare namespace vis {

type Render<T> = (props: T) => JSX.Element;
}