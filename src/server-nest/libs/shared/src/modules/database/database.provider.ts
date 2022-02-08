import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import * as bcrypt from 'bcrypt'
import constants from '../../constants'
import { db, security } from '../../appConfig.json'
import { User } from '@app/shared/models/database/user.entity'
import { Todo } from '@app/shared/models/database/todo.entity'
import { TodoList } from '@app/shared/models/database/todolist.entity'
import { TodoStats } from '@app/shared/models/database/todostats.entity'

export const databaseProviders = [
    {
        provide: constants.sequelize,
        useFactory: async () => {
            let dbOptions = { ...db } as SequelizeOptions;
            dbOptions.database = 'template1';
            const sequelizeInit = new Sequelize(dbOptions);
            const checkQuery = `SELECT FROM pg_database WHERE datname = '${db.database}'`;
            const createQuery = `CREATE DATABASE ${db.database}`;
            let output = await sequelizeInit.query(checkQuery);
            let result: any = output[1];
            if(result.rowCount == 0) {
                await sequelizeInit.query(createQuery);
            }

            const sequelize = new Sequelize(db as SequelizeOptions);
            sequelize.addModels([User, Todo, TodoList, TodoStats]);
            await sequelize.sync();

            let testUser = await User.findOne({
                where: {
                    username: 'test'
                }
            })
            
            if(!testUser) {
                let testUserModel = {
                    username: 'test',
                    hashedPassword: await bcrypt.hash('test', security.saltRounds)
                }
                User.create(testUserModel)
            }
            
            return sequelize;
        }
    }
]