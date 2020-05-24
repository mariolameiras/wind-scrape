import { WindguruData } from './interfaces/windguru';
declare function windguru(spot: number | string): Promise<WindguruData>;
export { windguru, WindguruData, };
