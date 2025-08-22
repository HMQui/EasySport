import { Module } from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { UploadImageController } from './upload-image.controller';
import { CloudinaryProvider } from 'src/common/cloudinary/cloudinary.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [UploadImageController],
    providers: [UploadImageService, CloudinaryProvider],
    exports: [UploadImageService],
    imports: [ConfigModule],
})
export class UploadImageModule {}
