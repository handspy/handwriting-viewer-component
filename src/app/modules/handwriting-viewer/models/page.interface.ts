import {IStroke} from './stroke.interface';

export interface IPage {
  width: number;
  height: number;
  strokes: IStroke[];
}
