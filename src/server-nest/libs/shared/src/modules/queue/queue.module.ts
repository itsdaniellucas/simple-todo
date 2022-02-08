import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { queue } from '../../appConfig.json'
import constants from '../../constants';
import { QueueService } from './queue.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: constants.kafka,
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: [queue.broker]
                    }
                }
            }
        ]),
    ],
    providers: [QueueService],
    exports: [QueueService]
})
export class QueueModule {}
