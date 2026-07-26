import { Test, TestingModule } from '@nestjs/testing';
import { PrismamodService } from './prismamod.service';

describe('PrismamodService', () => {
  let service: PrismamodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismamodService],
    }).compile();

    service = module.get<PrismamodService>(PrismamodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
