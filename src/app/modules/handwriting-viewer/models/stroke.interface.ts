import {IDot} from './dot.interface';

export interface IStroke {
  startTime: number;
  endTime: number;
  dots: IDot[];
}
