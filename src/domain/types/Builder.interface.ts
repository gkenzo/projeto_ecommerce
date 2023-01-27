interface IBuilder {
  build?: (any: any) => unknown;
  tryToBuild?: (any: any) => unknown;
}

export { IBuilder };
