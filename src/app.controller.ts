import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { EncryptionService } from './services/encryption.service';
import {
  EncryptDataRequestDto,
  EncryptDataResponseDto,
} from './dtos/encrypt-data.dto';
import {
  DecryptDataRequestDto,
  DecryptDataResponseDto,
} from './dtos/decrypt-data.dto';

@ApiTags('encryption')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly encryptionService: EncryptionService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Server is running',
    schema: {
      example: 'Hello from NestJS RSA Encryption Service',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('get-encrypt-data')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Encrypt data using RSA public key' })
  @ApiResponse({
    status: 200,
    description: 'Data encrypted successfully',
    type: EncryptDataResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid payload provided',
  })
  encryptData(@Body() request: EncryptDataRequestDto): EncryptDataResponseDto {
    return this.encryptionService.encryptData(request);
  }

  @Post('get-decrypt-data')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Decrypt data using RSA private key' })
  @ApiResponse({
    status: 200,
    description: 'Data decrypted successfully',
    type: DecryptDataResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid encrypted data provided',
  })
  decryptData(@Body() request: DecryptDataRequestDto): DecryptDataResponseDto {
    return this.encryptionService.decryptData(request);
  }
}
