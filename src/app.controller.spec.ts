import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncryptionService } from './services/encryption.service';
import { EncryptDataRequestDto } from './dtos/encrypt-data.dto';
import { DecryptDataRequestDto } from './dtos/decrypt-data.dto';

describe('AppController', () => {
  let appController: AppController;
  let encryptionService: EncryptionService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, EncryptionService],
    }).compile();

    appController = app.get<AppController>(AppController);
    encryptionService = app.get<EncryptionService>(EncryptionService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('encryptData', () => {
    it('should call encryptionService.encryptData', () => {
      const request: EncryptDataRequestDto = { payload: 'Test Data' };
      const spy = jest.spyOn(encryptionService, 'encryptData');

      appController.encryptData(request);

      expect(spy).toHaveBeenCalledWith(request);
    });

    it('should return encrypted response', () => {
      const request: EncryptDataRequestDto = { payload: 'Test Data' };

      const result = appController.encryptData(request);

      expect(result.successful).toBe(true);
      expect(result.data).toBeDefined();
    });
  });

  describe('decryptData', () => {
    it('should call encryptionService.decryptData', () => {
      const request: DecryptDataRequestDto = {
        data1: 'encrypted1',
        data2: 'encrypted2',
      };
      const spy = jest.spyOn(encryptionService, 'decryptData');

      appController.decryptData(request);

      expect(spy).toHaveBeenCalledWith(request);
    });

    it('should return decrypted response', () => {
      // First encrypt data
      const payload = 'Test Data';
      const encryptRequest: EncryptDataRequestDto = { payload };
      const encrypted = appController.encryptData(encryptRequest);

      // Then decrypt it
      if (encrypted.data) {
        const decryptRequest: DecryptDataRequestDto = {
          data1: encrypted.data.data1,
          data2: encrypted.data.data2,
        };

        const result = appController.decryptData(decryptRequest);

        expect(result.successful).toBe(true);
        expect(result.data?.payload).toBe(payload);
      }
    });
  });
});

