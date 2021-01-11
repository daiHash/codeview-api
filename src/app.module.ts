import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { SnippetsModule } from './snippets/snippets.module';
import typeOrmConfig from './config/typeorm.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [typeOrmConfig],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database')
      })
    }),
    AuthModule,
    SnippetsModule
  ]
})
export class AppModule {}
