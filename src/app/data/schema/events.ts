export interface IErrorEvent {
  type: string;
  module: string;
  message: string | string[];
}

export interface IPresentationEvent {
  type: string;
  data?: any;
}

export interface IErrorServer {
  application?: IErrorServerMessage[];
  system?: any;
}

export interface IErrorServerMessage {
  message: string;
}
