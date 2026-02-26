import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncryptionService } from './services/encryption.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule {}
