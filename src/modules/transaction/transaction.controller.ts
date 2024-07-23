import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transaction')
@Controller('api/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  


  @Get('history/:id')
  async  getUserTransaction(@Param('id') id: string) {
     return await this.transactionService.getUserTransactions(id)
  }
     
}
