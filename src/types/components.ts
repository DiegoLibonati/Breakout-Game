export interface Component {
  cleanup?: () => void;
}

export interface BallComponent extends Component, HTMLDivElement {}
export interface BlockComponent extends Component, HTMLDivElement {}
export interface UserComponent extends Component, HTMLDivElement {}
