/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Inject } from '@nestjs/common';
import { DeleteApiResponse, UploadApiResponse } from 'cloudinary';
import { getPublicIdFromUrl } from 'src/utils/get-publicid-in-url';
import { Readable } from 'stream';

@Injectable()
export class UploadImageService {
    constructor(@Inject('CLOUDINARY') private cloudinary) {}

    async uploadImage(
        file: Express.Multer.File,
        folder: string,
    ): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = this.cloudinary.uploader.upload_stream(
                { folder },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result as UploadApiResponse);
                },
            );

            Readable.from(file.buffer).pipe(uploadStream);
        });
    }

    async deleteImage(url: string): Promise<DeleteApiResponse> {
        const publicId = getPublicIdFromUrl(url);
        try {
            const result = await this.cloudinary.uploader.destroy(publicId);
            return result as DeleteApiResponse;
        } catch (error) {
            throw new Error(
                `Failed to delete image: ${(error as Error).message}`,
            );
        }
    }
}
