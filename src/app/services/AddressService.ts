import { plainToClass } from "class-transformer";
import { Address } from "../entities/Address";
import { AddressRepository } from "../repository/AddressRepository";

export class AddressService {
    constructor(
        private AddressRepository: AddressRepository
    ) {}
    public async createAddress(addressInput : any){
        const addressData  = plainToClass(Address,{
            "address": addressInput.address,
            "state": addressInput.state,
        })
        const savedDet = await this.AddressRepository.createAddress(addressData);
        return savedDet;
    }
    public async getAddressById(addressId: string) {
        return await this.AddressRepository.getAddressById(addressId);
    }
}