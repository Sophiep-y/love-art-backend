import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Client} from "./client.entity";

@Injectable()
export class ClientService {

    constructor(
        @Inject("CLIENT_REPOSITORY")
        private readonly clientRepository: Repository<Client>
    ) {
    }

    findByEmail(email: string): Promise<Client> {
        return this.clientRepository.findOne({where: {email: email}})
    }

    findByUsername(username: string): Promise<Client> {
        return this.clientRepository.findOne({where: {webusername: username}})
    }


    //update only the specified fields
    async update(id: number, client: Partial<Client>) {
        await this.clientRepository.update(id, client);
        return this.clientRepository.findOne({
            where: {
                id
            }
        });
    }

}
