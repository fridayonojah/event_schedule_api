import {DeleteResult, FindManyOptions, Repository, UpdateResult} from 'typeorm';
import {BaseInterfaceRepository} from './base.interface.repository';
import {FindOneOptions} from 'typeorm/browser';
import { connect } from 'databases/Connection'

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
  private readonly entity: any;

  protected constructor(entity: any) {
    this.entity = entity;
  }

  protected async getRepository(): Promise<Repository<T>>{
    const connection = await connect()
    return connection.getRepository(this.entity)
  }

  public async create(data: T | any): Promise<T> {
    try {
      const init_repo = await this.getRepository();
      return init_repo.save(data)
    } catch (err) {
      throw err;
    }
  }

  public async update(data: T | any, id: number): Promise<T | UpdateResult> {
    try {
      const init_repo = await this.getRepository();
      return init_repo.update(id, data);
    } catch (err) {
      throw err;
    }
  }

  public async multipleCreate(data: T[] | any[]): Promise<T[]> {
    try {
      const init_repo = await this.getRepository();
      return init_repo.save(data);
    } catch (err) {
      throw err;
    }
  }

  public async findOneById(id: number): Promise<T> {
    try {
      const init_repo = await this.getRepository();
      return  init_repo.findOne(id as any);
    } catch (err) {
      throw err;
    }
  }

  public async findByCondition(filterCondition: FindOneOptions): Promise<T> {
    try {
      const init_repo = await this.getRepository();  
      return init_repo.findOne({where: filterCondition} as any);
    } catch (err) {
      throw err;
    }
  }

  public async findWithRelations(relations: FindManyOptions): Promise<T[]> {
    try {
      const init_repo = await this.getRepository();
      return init_repo.find(relations);
    } catch (err) {
      throw err;
    }
  }

  public async findAll(): Promise<[T[], number]> {
    try {
      const init_repo = await this.getRepository();
      return  init_repo.findAndCount();
    } catch (err) {
      throw err;
    }
  }

  public async remove(id: string): Promise<DeleteResult> {
    try {
      const init_repo = await this.getRepository();
      return init_repo.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
