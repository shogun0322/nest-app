import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class EncryptDataRequestDto {
  @ApiProperty({
    description: 'Payload to encrypt (max 190 characters due to RSA 2048 limitations)',
    minLength: 1,
    maxLength: 190,
    example: 'Hello World',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(190)
  payload: string;
}

export class EncryptDataDto {
  @ApiProperty({
    description: 'First part of encrypted data',
    example: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...',
  })
  data1: string;

  @ApiProperty({
    description: 'Second part of encrypted data',
    example: 'SGVsbG8gV29ybGQ=',
  })
  data2: string;
}

export class EncryptDataResponseDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  successful: boolean;

  @ApiProperty({
    description: 'Error code',
    example: null,
    nullable: true,
  })
  error_code: string | null;

  @ApiProperty({
    description: 'Encrypted data',
    example: {
      data1: 'encrypted data part 1',
      data2: 'encrypted data part 2',
    },
    nullable: true,
    type: EncryptDataDto,
  })
  data: EncryptDataDto | null;
}
