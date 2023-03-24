import { IAddress } from "./Address.interface";

interface IShipping {
  buyerAddress: IAddress;
  storageAddress: IAddress;
  deliveryCompany: string;
  distanceInKm: number;
  volume: number;
  total: number;
}

export { IShipping };
