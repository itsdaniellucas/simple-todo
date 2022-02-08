import { Controller, Get } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { EventPattern } from '@nestjs/microservices';
import constants from '@app/shared/constants'

@Controller()
export class KafkaController {
    constructor(private readonly kafkaService: KafkaService) {}

    @EventPattern(constants.computeStats)
    async computeTodoStats(data: Record<string, any>) {
        const todoListId = data.value.todoListId;
        const userId = data.value.userId;
        await this.kafkaService.computeTodoStats(todoListId, userId);
    }
}
