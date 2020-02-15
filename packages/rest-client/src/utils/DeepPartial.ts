// https://gist.github.com/isthatcentered/7ea87582044f22b74a6d66e9e9262391

export type DeepPartial<T> = {
  [P in keyof T]?: T extends T[P] | undefined
    ? T[P] | undefined
    : unknown extends T
    ? T
    : T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
}
