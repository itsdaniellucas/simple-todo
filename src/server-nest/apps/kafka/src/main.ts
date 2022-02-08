import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { KafkaModule } from './kafka.module';
import { queue, ports } from '@app/shared/appConfig.json';

async function bootstrap() {

    const app = await NestFactory.create(KafkaModule);

    const microservice = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: [queue.broker]
            }
        }
    })

    await app.startAllMicroservices();
    await app.listen(ports.queue);
}
bootstrap();
