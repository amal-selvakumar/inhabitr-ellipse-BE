import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/messages/appmessages';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto;
    const companyNames = ['pumexinfotech', 'inhabitr'];

    const isValidEmail = companyNames.some((name) => email.includes(name));

    if (!isValidEmail) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_EMAIL_ID);
    }

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.DUPLICATE_USER_MSG);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.prismaService.user.create({
      data: {
        email: email,
        password: hashedPassword,
        roleType: 2,
        status: 1,
      },
    });

    return user;
  }

  async signin(dto: AuthDto) {
    const { email, password } = dto;

    const companyNames = ['pumexinfotech', 'inhabitr'];

    const isValidEmail = companyNames.some((name) => email.includes(name));

    if (!isValidEmail) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_EMAIL_ID);
    }

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (user === null) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND_MSG);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_CREDENTIALS_MSG);
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (user && user.password === pass) {
      return user;
    }
    return 'user name password invlid';
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
