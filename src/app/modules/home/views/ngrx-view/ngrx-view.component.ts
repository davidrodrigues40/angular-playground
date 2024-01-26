import { AfterViewInit, Component } from '@angular/core';

@Component({
    selector: 'app-ngrx-view',
    templateUrl: './ngrx-view.component.html',
    styleUrls: ['./ngrx-view.component.scss']
})
export class NgrxViewComponent implements AfterViewInit
{
    private readonly _componentColor: string = '#3399ff';
    private readonly _serviceColor: string = '#009900';
    private readonly _actionsColor: string = '#ff3300';
    private readonly _selectorsColor: string = '#007399';

    ngAfterViewInit(): void
    {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        const lineLengthPx: number = 10;
        const lineHeightPx: number = 30;
        const paddingPx: number = 5;
        const componentPx: number = this.getPxFromText('component');
        const servicePx: number = this.getPxFromText('service');
        let x: number = 10;
        let y: number = 20;

        if (!context)
        {
            return;
        }

        context.font = '16px Arial';
        this.addComponentText(canvas, x, y);

        x += componentPx / 2;
        y += paddingPx;

        this.addComponentLineToService(canvas, x, y, lineHeightPx, lineLengthPx);

        x += lineLengthPx + paddingPx;
        y += lineHeightPx + paddingPx;
        this.addServiceText(canvas, x, y);

        x += servicePx / 2;
        y += paddingPx;
        this.addServiceLinesToState(canvas, x, y, lineHeightPx, lineLengthPx);

        x += lineLengthPx + paddingPx;
        y += lineHeightPx + paddingPx;
        this.addActionText(canvas, x, y);

        y += lineHeightPx;
        this.addSelectorText(canvas, x, y);
    }

    private addComponentText(canvas: HTMLCanvasElement, currentLinePx: number, y: number): void
    {
        this.drawText(canvas, 'component', currentLinePx, y, this._componentColor);
    }

    private addServiceText(canvas: HTMLCanvasElement, x: number, y: number): void
    {
        this.drawText(canvas, 'service', x, y, this._serviceColor);
    }

    private addActionText(canvas: HTMLCanvasElement, x: number, y: number): void
    {
        this.drawText(canvas, 'actions', x, y, this._actionsColor);
    }

    private addSelectorText(canvas: HTMLCanvasElement, x: number, y: number): void
    {
        this.drawText(canvas, 'selectors', x, y, this._selectorsColor);
    }

    private addServiceLinesToState(canvas: HTMLCanvasElement, x: number, y: number, lineHeightPx: number, lineLengthPx: number): void
    {
        this.drawVerticalLine(canvas, x, y, lineHeightPx * 2, this._serviceColor);
        this.drawHorizontalLine(canvas, x, y - 1 + lineHeightPx, lineLengthPx, this._serviceColor);
        this.drawHorizontalLine(canvas, x, y - 1 + lineHeightPx * 2, lineLengthPx, this._serviceColor);
    }

    private addComponentLineToService(canvas: HTMLCanvasElement, x: number, y: number, lineHeightPx: number, lineLengthPx: number): void
    {
        this.drawVerticalLine(canvas, x, y, lineHeightPx, this._componentColor);
        this.drawHorizontalLine(canvas, x, y - 1 + lineHeightPx, lineLengthPx, this._componentColor);
    }

    private drawHorizontalLine(canvas: HTMLCanvasElement, moveToX: number, y: number, lineLengthPx: number, color: string): void
    {
        const context = canvas.getContext('2d');
        let lineToX: number = moveToX + lineLengthPx;

        if (!context)
        {
            return;
        }
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(moveToX, y);
        context.lineTo(lineToX, y);
        context.stroke();
    }

    private drawVerticalLine(canvas: HTMLCanvasElement, x: number, moveToY: number, lineLengthPx: number, color: string): void
    {
        const context = canvas.getContext('2d');
        let lineToY: number = moveToY + lineLengthPx;

        if (!context)
        {
            return;
        }
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(x, moveToY);
        context.lineTo(x, lineToY);
        context.stroke();
    }

    private drawText(canvas: HTMLCanvasElement, text: string, x: number, y: number, color: string): void
    {
        const context = canvas.getContext('2d');

        if (!context)
        {
            return;
        }

        context.fillStyle = color;
        context.fillText(text, x, y);
    }

    private getPxFromText(text: string): number
    {
        return (text.length * 8);
    }

}
