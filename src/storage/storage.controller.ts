import {Controller, Get, Param, Res} from "@nestjs/common";
import {StorageService} from "./storage.service";

@Controller('file')
export class StorageController {
    constructor(
        private readonly storageService: StorageService
    ) {
    }

    @Get(':path(*)')
    async getFile(@Param('path') filePath: string, @Res() res: any) {
        return this.storageService.getFile(filePath, res);
    }
}