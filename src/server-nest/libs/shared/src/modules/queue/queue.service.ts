import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import constants from '../../constants';

@Injectable()
export class QueueService {
    constructor(@Inject(constants.kafka)private client: ClientKafka) {}

    emit(pattern: any, data: any): Observable<any> {
        return this.client.emit(pattern, data);
    }

    send(pattern: any, data: any): Observable<any> {
        return this.client.send(pattern, data);
    }
}
