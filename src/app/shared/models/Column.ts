type EnumType = { [s: number]: string };

export class Column {
  field: string;
  header: string;

  sortable?: boolean = true;
  type?: Columntype = Columntype.String;
  value?: any;
  width?: any;
}
export enum Columntype {
  Number,
  Currency,
  String,
  date,
  image,
  time,
  list,
  listObjectCount,
  daysOfWeek,
  statusNumber,
  Compine2Field,
  progress,
  booleanIcon,
  ActionMenu,
  array1,
  array2,
  dateTime,
  expanded

}
export function enumToArray(data: EnumType) {
  Object.keys(data)
    .filter((key) => Number.isNaN(+key))
    .map((key: string) => ({
      key,
      value: data[key],
    }));
}
export function mapEnum(enumerable: EnumType, fn: Function): any[] {
  // get all the members of the enum
  let enumMembers: any[] = Object.keys(enumerable).map(key => enumerable[key]);

  // we are only interested in the numeric identifiers as these represent the values
  let enumValues: number[] = enumMembers.filter(v => typeof v === "number");

  // now map through the enum values
  return enumValues.map(m => fn(m));
}
