import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {Circle, G, Path, Svg, SVG, Timeline} from '@svgdotjs/svg.js';
import '@svgdotjs/svg.panzoom.js';

import {IPage} from './models/page.interface';
import {IStroke} from './models/stroke.interface';
import {IDot} from './models/dot.interface';

@Component({
  selector: 'hs-handwriting-viewer',
  templateUrl: './handwriting-viewer.component.html',
  styleUrls: ['./handwriting-viewer.component.scss']
})
export class HandwritingViewerComponent implements OnInit, AfterViewInit, OnChanges {

  private _data: IPage;

  // animation state
  private _paused = false;
  private _finished = false;
  private _time = 0;

  // show dots
  private _dots = false;

  // tuning SVG
  private _color = '#000000';
  private _dotColor = '#6aa84f';

  @ViewChild('canvas')
  canvas: ElementRef;

  timeline: Timeline;
  draw: Svg;

  initialized = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.initialized) {
      return; // already initialized
    }

    this.timeline = new Timeline();

    this.draw = SVG().addTo(this.canvas.nativeElement)
      .panZoom({ zoomMin: 0.5, zoomMax: 100 });

    if (this.data) {
      this.buildHandwritingSvg();
    }

    this.timeline.stop();

    this.initialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  /* Input handling */

  get data(): any {
    return this._data;
  }

  @Input()
  set data(data: any) {
    this._data = data;
    if (this.initialized) {
      this.buildHandwritingSvg();
    }
  }

  get paused(): boolean {
    return this._paused;
  }

  @Input()
  set paused(paused: boolean) {
    this._paused = paused;
    if (!this.initialized) {
      return;
    }
    if (paused) {
      this.timeline.pause();
    } else {
      this.timeline.play();
    }
  }

  get finished(): boolean {
    return this._finished;
  }

  @Input()
  set finished(finished: boolean) {
    this._finished = finished;
    if (!this.initialized) {
      return;
    }
    if (finished) {
      this.timeline.time(this.timeline.getEndTime()).finish();
    }
  }

  get time(): number {
    return this._time;
  }

  @Input()
  set time(time: number) {
    this._time = time;
    if (this.initialized) {
      this.timeline.time(time);
    }
  }

  get color(): string {
    return this._color;
  }

  @Input()
  set color(color: string) {
    this._color = color;
    if (this.initialized) {
      this.canvas.nativeElement.style.color = color;
    }
  }

  get dotColor(): string {
    return this._dotColor;
  }

  @Input()
  set dotColor(dotColor: string) {
    this._dotColor = dotColor;
    if (this.initialized) {
      this.canvas.nativeElement
        .querySelectorAll('.stroke-dots')
        .forEach(groupEl => groupEl.style.setProperty('color', this.dotColor));
    }
  }

  get dots(): boolean {
    return this._dots;
  }

  @Input()
  set dots(dots: boolean) {
    this._dots = dots;
    if (this.initialized) {
      this.canvas.nativeElement
        .querySelectorAll('.stroke-dots')
        .forEach(groupEl => groupEl.style.setProperty('display', this.dots ? 'inline' : 'none'));
    }
  }

  /* Helper methods */

  private buildHandwritingSvg(): void {
    if (!this.data) {
      return; // no data
    }

    console.log('building SVG ...');

    this.draw.clear();

    this.draw.viewbox(0, 0, this.data.width, this.data.height);

    const startTime = this.data.strokes[0].startTime;
    let strokeCount = 0;
    for (const stroke of this.data.strokes) {

      const path: Path = this.createStrokePath(strokeCount, stroke);

      path.timeline(this.timeline);

      const length = path.length() + 2;
      path
        .attr({
          'stroke-dasharray': length,
          'stroke-dashoffset': length
        })
        .animate(
          stroke.endTime - stroke.startTime,
          stroke.startTime - startTime,
          'absolute'
        )
        .attr('stroke-dashoffset', '0')
        .persist(true);

      strokeCount++;
    }
  }

  private createStrokePath(index: number, stroke: IStroke): Path {

    const pathId = `p${index}`;

    const pathStr = 'M' + stroke.dots.map(dot => `${dot.x} ${dot.y}`).join(',');

    const path = this.draw.path(pathStr)
      .attr({
        id: pathId,
        stroke: 'currentColor',
        'stroke-width': 56 / 600,
        'shape-rendering': 'geometricPrecision',
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round'
      })
      .fill('none');

    this.createDotGroup(pathId, stroke);

    path.mouseover(() => {
      if (this.dots) {
        return;
      }
      this.canvas.nativeElement
        .querySelector(`#g-${pathId}`)
        .style.setProperty('display', 'inline');
    }).mouseout(() => {
      if (this.dots) {
        return;
      }
      this.canvas.nativeElement
        .querySelector(`#g-${pathId}`)
        .style.setProperty('display', 'none');
    });

    return path;
  }

  private createDotGroup(pathId: string, stroke: IStroke): G {

    // create group
    const group: G = this.draw
      .group()
      .attr({
        id: `g-${pathId}`,
        class: 'stroke-dots'
      });

    group.node.style.display = this.dots ? 'inline' : 'none';
    group.node.style.pointerEvents = 'none';
    group.node.style.color = this.dotColor;

    // create dots
    for (const dot of stroke.dots) {
      this.createDotCircle(group, dot);
    }

    return group;
  }

  private createDotCircle(group: G, dot: IDot): Circle {
    return group
      .circle(2 * 56 / 600)
      .center(dot.x, dot.y)
      .fill('currentColor')
      .stroke({
        color: 'currentColor',
        width: 0.5 * 56 / 600
      })
      .attr({
        'fill-opacity': '50%'
      });
  }
}
