import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from './store/store.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './database/seed/seed.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './database/entities/user.entity';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsModule } from './payments/payments.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Faz o ConfigModule disponível em toda a aplicação
      envFilePath: '.env', // Certifique-se de que está apontando para o arquivo correto
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      //entities: [__dirname + '/**/*.entity.{ts,js}'],
      autoLoadEntities: true,
      synchronize: true, // Desativar em produção
    }),
    TypeOrmModule.forFeature([User]),
    StoreModule,
    SeedModule,
    ProductModule,
    UserModule,
    AuthModule,
    PaymentsModule,
    OrdersModule,
  ],
  controllers: [AppController, PaymentsController, OrdersController],
  providers: [AppService, OrdersService, Logger],
})

export class AppModule {}
