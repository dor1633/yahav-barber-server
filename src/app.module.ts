import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './appointments/appointments.module';
import { BarbersModule } from './barbers/barbers.module';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URL,
      }),
    }),
    ConfigModule.forRoot(),
    UsersModule,
    BarbersModule,
    AppointmentsModule
  ],
  controllers: [],
  providers: [FirebaseAuthStrategy],
})
export class AppModule { }
