import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DecryptDataRequestDto {
  @ApiProperty({
    description: 'First part of encrypted data',
    example: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...',
  })
  @IsString()
  @IsNotEmpty()
  data1: string;

  @ApiProperty({
    description: 'Second part of encrypted data',
    example: 'SGVsbG8gV29ybGQ=',
  })
  @IsString()
  @IsNotEmpty()
  data2: string;
}

export class DecryptedDataDto {
  @ApiProperty({
    description: 'Decrypted payload',
    example: 'Hello World',
  })
  payload: string;
}

export class DecryptDataResponseDto {
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
    description: 'Decrypted data',
    example: {
      payload: 'Hello World',
    },
    nullable: true,
    type: DecryptedDataDto,
  })
  data: DecryptedDataDto | null;
}
