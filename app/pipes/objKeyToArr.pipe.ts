import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objKeyToArr',
  pure: false
})

export class ObjKeyToArrPipe implements PipeTransform {
  transform(object:any) {
    let newArr: any[] = [];
    for (var key in object) {
    	object[key]["$key"] = key;
        newArr.push(object[key]);
    }
    return newArr;
  }
}