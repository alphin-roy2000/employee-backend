import { getConnection, Repository } from "typeorm";
import { Address } from "../entities/Address";

export class AddressRepository extends Repository<Address> {
    public async createAddress(addressDetails : Address){
        const addressConnection  = getConnection().getRepository(Address);
        const saveedDetails = await addressConnection.save(addressDetails);
        return saveedDetails;
    }
    public async getAddressById(id: string) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.findOne(id);
    }
}