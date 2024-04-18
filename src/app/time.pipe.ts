import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: string): string {
    let date = new Date(value);
    let time = date.toTimeString().split(' ')[0];
    return time;
  }

}


