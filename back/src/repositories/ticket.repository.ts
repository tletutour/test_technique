import {DefaultCrudRepository} from '@loopback/repository';
import {Ticket, TicketRelations} from '../models';
import {DatasourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TicketRepository extends DefaultCrudRepository<
  Ticket,
  typeof Ticket.prototype.id,
  TicketRelations
> {
  constructor(
    @inject('datasources.Datasource') dataSource: DatasourceDataSource,
  ) {
    super(Ticket, dataSource);
  }
}
