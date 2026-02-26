import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';
import { EncryptDataRequestDto } from '../dtos/encrypt-data.dto';
import { DecryptDataRequestDto } from '../dtos/decrypt-data.dto';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encryptData', () => {
    it('should encrypt data successfully', () => {
      const payload = 'Hello World';
      const request: EncryptDataRequestDto = { payload };

      const result = service.encryptData(request);

      expect(result.successful).toBe(true);
      expect(result.error_code).toBeNull();
      expect(result.data).toBeDefined();
      expect(result.data?.data1).toBeDefined();
      expect(result.data?.data2).toBeDefined();
      expect(result.data?.data1).toBeTruthy();
      expect(result.data?.data2).toBeTruthy();
    });

    it('should handle empty payload', () => {
      const request: EncryptDataRequestDto = { payload: '' };

      const result = service.encryptData(request);

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('INVALID_PAYLOAD');
      expect(result.data).toBeNull();
    });

    it('should handle payload exceeding max length', () => {
      const oversizedPayload = 'a'.repeat(191);
      const request: EncryptDataRequestDto = { payload: oversizedPayload };

      const result = service.encryptData(request);

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('PAYLOAD_TOO_LONG');
      expect(result.data).toBeNull();
    });

    it('should handle payload within max length boundary', () => {
      const maxPayload = 'a'.repeat(190);
      const request: EncryptDataRequestDto = { payload: maxPayload };

      const result = service.encryptData(request);

      expect(result.successful).toBe(true);
      expect(result.error_code).toBeNull();
      expect(result.data).toBeDefined();
    });

    it('should encrypt different payloads differently', () => {
      const request1: EncryptDataRequestDto = { payload: 'Test 1' };
      const request2: EncryptDataRequestDto = { payload: 'Test 2' };

      const result1 = service.encryptData(request1);
      const result2 = service.encryptData(request2);

      expect(result1.data?.data1).not.toEqual(result2.data?.data1);
      expect(result1.data?.data2).not.toEqual(result2.data?.data2);
    });
  });

  describe('decryptData', () => {
    it('should decrypt data successfully', () => {
      const originalPayload = 'Hello World';
      const encryptRequest: EncryptDataRequestDto = {
        payload: originalPayload,
      };
      const encrypted = service.encryptData(encryptRequest);

      if (encrypted.data) {
        const decryptRequest: DecryptDataRequestDto = {
          data1: encrypted.data.data1,
          data2: encrypted.data.data2,
        };

        const result = service.decryptData(decryptRequest);

        expect(result.successful).toBe(true);
        expect(result.error_code).toBeNull();
        expect(result.data?.payload).toBe(originalPayload);
      }
    });

    it('should handle missing data1', () => {
      const request: DecryptDataRequestDto = {
        data1: '',
        data2: 'some data',
      };

      const result = service.decryptData(request);

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('INVALID_DATA');
      expect(result.data).toBeNull();
    });

    it('should handle missing data2', () => {
      const request: DecryptDataRequestDto = {
        data1: 'some data',
        data2: '',
      };

      const result = service.decryptData(request);

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('INVALID_DATA');
      expect(result.data).toBeNull();
    });

    it('should handle corrupted encrypted data', () => {
      const request: DecryptDataRequestDto = {
        data1: 'corrupted',
        data2: 'data',
      };

      const result = service.decryptData(request);

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('DECRYPTION_FAILED');
      expect(result.data).toBeNull();
    });

    it('should encrypt and decrypt round trip successfully', () => {
      const payloads = ['Test', 'Hello World', 'NestJS RSA Encryption'];

      payloads.forEach((payload) => {
        const encryptRequest: EncryptDataRequestDto = { payload };
        const encrypted = service.encryptData(encryptRequest);

        if (encrypted.data) {
          const decryptRequest: DecryptDataRequestDto = {
            data1: encrypted.data.data1,
            data2: encrypted.data.data2,
          };

          const decrypted = service.decryptData(decryptRequest);

          expect(decrypted.successful).toBe(true);
          expect(decrypted.data?.payload).toBe(payload);
        }
      });
    });
  });
});
