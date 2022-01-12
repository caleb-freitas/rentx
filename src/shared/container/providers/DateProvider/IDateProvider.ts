interface IDateProvider {
  compareHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  compareDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
}

export { IDateProvider };
