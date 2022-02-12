interface NoSQLPort {
  getLast(): any;
  all(filter: any): any;
  create(data: any): any;
}

export { NoSQLPort };
