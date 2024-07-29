import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByYear'
})
export class FilterByYearPipe implements PipeTransform {
  transform(expenses: any[], year: number): any[] {
    return expenses.filter(expense => new Date(expense.month).getFullYear() === year);
  }
}