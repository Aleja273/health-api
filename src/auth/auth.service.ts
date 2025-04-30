import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService, private jwtService: JwtService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL') || '',
      this.configService.get<string>('SUPABASE_KEY')  || '',
    );
  }

  async register(email: string, password: string, fullname: string, mobile_phone: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await this.supabase
      .from('users')
      .insert([{ email, password: hashedPassword, fullname, mobile_phone }]);

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, data.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ email: data.email, id: data.id });

    return { access_token: token };
  }
}
