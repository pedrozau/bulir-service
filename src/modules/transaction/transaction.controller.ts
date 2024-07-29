import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('transaction')
@ApiSecurity('basic')
@Controller('api/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  


  @Get('history/:id')
  @UseGuards(AuthGuard)
  async  getUserTransaction(@Param('id') id: string) {
     return await this.transactionService.getUserTransactions(id)
  }
     
}
