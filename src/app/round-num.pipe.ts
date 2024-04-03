import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNum',
  standalone: true
})
export class RoundNumPipe implements PipeTransform {

  transform(value: number): number {
    return Math.round(value * 100) / 100;
  }

}

