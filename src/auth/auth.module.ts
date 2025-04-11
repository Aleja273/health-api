import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule, // Si ya usaste ConfigModule.forRoot() en AppModule, solo importa ConfigModule aquí
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Asegúrate de tener esta variable en .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Exporta el servicio si es necesario en otros módulos
})
export class AuthModule {}