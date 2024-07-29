import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByMonth'
})
export class SortByMonthPipe implements PipeTransform {
  transform(expenses: any[], monthOrder: string[]): any[] {
    return expenses.sort((a, b) => 
      monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );
  }
}