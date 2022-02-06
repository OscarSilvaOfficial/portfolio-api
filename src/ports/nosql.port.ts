interface NoSQLPort {
  all(filter: any): any;
  create(data: any): any;
  update(filter: any, data: any): any;
  delete(filter: any): any;
}

export { NoSQLPort };
