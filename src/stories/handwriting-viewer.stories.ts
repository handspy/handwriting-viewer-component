import {withKnobs, boolean, number, color} from '@storybook/addon-knobs';

import {HandwritingViewerComponent} from '../handwriting-viewer/handwriting-viewer.component';
import {IPage} from '../handwriting-viewer/models/page.interface';

export default {
  title: 'Handwriting Viewer',
  component: HandwritingViewerComponent,
  decorators: [withKnobs]
};

const fullpage = require('../assets/page.json');

const data: IPage = {
  width: 300,
  height: 400,
  strokes: [
    {
      startTime: 0,
      endTime: 1000,
      dots: [
        { x: 5, y: 10, timestamp: 100 },
        { x: 5, y: 11, timestamp: 150 },
        { x: 5, y: 12, timestamp: 200 },
        { x: 5, y: 13, timestamp: 250 },
        { x: 5, y: 14, timestamp: 300 },
        { x: 5, y: 15, timestamp: 350 },
        { x: 5, y: 16, timestamp: 400 },
        { x: 5, y: 17, timestamp: 450 },
        { x: 5, y: 18, timestamp: 500 },
        { x: 5, y: 19, timestamp: 550 },
        { x: 5, y: 20, timestamp: 600 },
        { x: 5, y: 21, timestamp: 650 },
        { x: 5, y: 22, timestamp: 700 },
        { x: 5, y: 23, timestamp: 750 },
        { x: 5, y: 24, timestamp: 800 },
        { x: 5, y: 25, timestamp: 850 },
        { x: 5, y: 26, timestamp: 900 },
        { x: 5, y: 27, timestamp: 950 },
        { x: 5, y: 28, timestamp: 1000 },
      ]
    },
    {
      startTime: 1000,
      endTime: 3000,
      dots: [
        { x: 5, y: 28, timestamp: 2100 },
        { x: 6, y: 28, timestamp: 2150 },
        { x: 7, y: 28, timestamp: 2200 },
        { x: 8, y: 28, timestamp: 2250 },
        { x: 9, y: 28, timestamp: 2300 },
        { x: 10, y: 28, timestamp: 2350 },
        { x: 11, y: 28, timestamp: 2400 },
        { x: 12, y: 28, timestamp: 2450 },
        { x: 13, y: 28, timestamp: 2500 },
        { x: 14, y: 28, timestamp: 2550 },
        { x: 15, y: 28, timestamp: 2600 },
        { x: 16, y: 28, timestamp: 2650 },
        { x: 17, y: 28, timestamp: 2700 },
        { x: 18, y: 28, timestamp: 2750 },
        { x: 19, y: 28, timestamp: 2800 },
        { x: 20, y: 28, timestamp: 2850 },
        { x: 21, y: 28, timestamp: 2900 },
        { x: 22, y: 28, timestamp: 2950 },
        { x: 23, y: 28, timestamp: 3000 },
      ]
    }
  ]
};

export const Default = () => ({
  component: HandwritingViewerComponent,
  props: {
    data: fullpage,
    paused: boolean('paused', true),
    finished: boolean('finished', false),
    time: number('time', 0, { min: 0, max: fullpage.strokes[fullpage.strokes.length - 1].endTime, step: 500 }),
    color: color('color', '#000000'),
    dotColor: color('dotColor', '#6aa84f'),
    dots: boolean('dots', false)
  },
});

