import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { keys } from './dev-keys'

/**
 * DB connection config
 */
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  /**
   * Create DB connection config env variables</br>
   * If there is any env variable return a default value
   * @returns TypeOrm connection data
   */
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService()
    return {
      type: 'postgres',
      host: configService.get('DATABASE_HOST', keys.DATABASE_HOST),
      port: Number(configService.get('DATABASE_PORT', keys.DATABASE_PORT)),
      username: configService.get('DATABASE_USERNAME', keys.DATABASE_USERNAME),
      password: configService.get('DATABASE_PASSWORD', keys.DATABASE_PASSWORD),
      database: configService.get('DATABASE_NAME', keys.DATABASE_NAME),
      entities: [join(__dirname + '../**/*.entity{.ts,.js}')],
      synchronize: false
      // synchronize: true
    }
  }
}
