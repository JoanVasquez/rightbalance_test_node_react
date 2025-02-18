export default interface IService<T> {
  save?(data: T): Promise<T>;
  update?(id: string, data: T): Promise<T>;
  delete?(id: string): Promise<any>;
  findById?(id: string): Promise<T>;
  findAll?(): Promise<Array<T>>;
  total?(): Promise<number>;
}
