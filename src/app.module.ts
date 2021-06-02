import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule, 
            MongooseModule.forRoot('mongodb+srv://root:j2dkUDSX2NYQqMQI@cluster0.fsugp.mongodb.net/test2', {
              useNewUrlParser: true
            })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
