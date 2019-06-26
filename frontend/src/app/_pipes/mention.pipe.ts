import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mentionPipe'
})
export class MentionPipe implements PipeTransform {

  transform(str: string) {
    console.log(str);
  }

}
