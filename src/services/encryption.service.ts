import { Injectable } from '@nestjs/common';
import {
  createPublicKey,
  createPrivateKey,
  publicEncrypt,
  privateDecrypt,
} from 'crypto';
import { RSA_PUBLIC_KEY, RSA_PRIVATE_KEY } from '../config/rsa-keys';
import {
  EncryptDataRequestDto,
  EncryptDataResponseDto,
} from '../dtos/encrypt-data.dto';
import {
  DecryptDataRequestDto,
  DecryptDataResponseDto,
} from '../dtos/decrypt-data.dto';

@Injectable()
export class EncryptionService {
  private publicKey = createPublicKey(RSA_PUBLIC_KEY);
  private privateKey = createPrivateKey(RSA_PRIVATE_KEY);

  encryptData(request: EncryptDataRequestDto): EncryptDataResponseDto {
    try {
      // Validate payload length
      if (!request.payload || request.payload.length === 0) {
        return {
          successful: false,
          error_code: 'INVALID_PAYLOAD',
          data: null,
        };
      }

      if (request.payload.length > 190) {
        return {
          successful: false,
          error_code: 'PAYLOAD_TOO_LONG',
          data: null,
        };
      }

      // Encrypt the payload
      const encrypted = publicEncrypt(
        this.publicKey,
        Buffer.from(request.payload),
      );
      const encryptedBase64 = encrypted.toString('base64');

      // Split the encrypted data into data1 and data2
      const midPoint = Math.ceil(encryptedBase64.length / 2);
      const data1 = encryptedBase64.substring(0, midPoint);
      const data2 = encryptedBase64.substring(midPoint);

      return {
        successful: true,
        error_code: null,
        data: {
          data1,
          data2,
        },
      };
    } catch (error) {
      return {
        successful: false,
        error_code: 'ENCRYPTION_FAILED',
        data: null,
      };
    }
  }

  decryptData(request: DecryptDataRequestDto): DecryptDataResponseDto {
    try {
      // Validate input
      if (!request.data1 || !request.data2) {
        return {
          successful: false,
          error_code: 'INVALID_DATA',
          data: null,
        };
      }

      // Combine data1 and data2
      const encryptedBase64 = request.data1 + request.data2;

      // Decrypt the data
      const encrypted = Buffer.from(encryptedBase64, 'base64');
      const decrypted = privateDecrypt(this.privateKey, encrypted);
      const payload = decrypted.toString('utf-8');

      return {
        successful: true,
        error_code: null,
        data: {
          payload,
        },
      };
    } catch (error) {
      return {
        successful: false,
        error_code: 'DECRYPTION_FAILED',
        data: null,
      };
    }
  }
}
