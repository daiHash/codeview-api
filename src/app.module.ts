import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './config/typeorm.config.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
      // ignoreEnvFile: true, <- Remove comment when importing env vars
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // Define Service class that creates the connection options
      useClass: TypeOrmConfigService
    })
  ]
})
export class AppModule {}
