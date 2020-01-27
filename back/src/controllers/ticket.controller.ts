// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';

import {inject} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {
  del,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Ticket} from '../models';
import {TicketRepository} from '../repositories';


export class TicketController {
  constructor(
      @repository(TicketRepository) protected ticketRepo: TicketRepository,
  ) {}

  @post('/tickets', {
    responses: {
      '200': {
        description: 'Ticket model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ticket)}},
      },
    },
  })
  async createTicket(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ticket, {title: 'NewTicket', exclude: ['id']}),
          },
        },
      })
          ticket: Omit<Ticket, 'id'>,
  ): Promise<Ticket> {

    return this.ticketRepo.create(ticket);
  }

  @get('/tickets/{id}', {
    responses: {
      '200': {
        description: 'Ticket model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ticket)}},
      },
    },
  })
  async findTicketById(
      @param.path.number('id') id: number,
      @param.query.boolean('items') items?: boolean,
  ): Promise<Ticket> {
    return this.ticketRepo.findById(id);
  }

  @get('/tickets', {
    responses: {
      '200': {
        description: 'Array of Ticket model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ticket)},
          },
        },
      },
    },
  })
  async findTickets(
      @param.query.object('filter', getFilterSchemaFor(Ticket))
          filter?: Filter<Ticket>,
  ): Promise<Ticket[]> {
    return this.ticketRepo.find(filter);
  }

  @put('/tickets/{id}', {
    responses: {
      '204': {
        description: 'Ticket PUT success',
      },
    },
  })
  async replaceTicket(
      @param.path.number('id') id: number,
      @requestBody() ticket: Ticket,
  ): Promise<void> {
    await this.ticketRepo.replaceById(id, ticket);
  }

  @patch('/tickets/{id}', {
    responses: {
      '204': {
        description: 'Ticket PATCH success',
      },
    },
  })
  async updateTicket(
      @param.path.number('id') id: number,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ticket, {partial: true}),
          },
        },
      })
          ticket: Partial<Ticket>,
  ): Promise<void> {
    await this.ticketRepo.updateById(id, ticket);
  }

  @del('/tickets/{id}', {
    responses: {
      '204': {
        description: 'Tickets DELETE success',
      },
    },
  })
  async deleteTicket(@param.path.number('id') id: number): Promise<void> {
    await this.ticketRepo.deleteById(id);
  }
}
