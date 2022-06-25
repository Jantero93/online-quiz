/** TypeORM */
import AppDataSource from '../config/db/DataSource';

/** Entity */
import { User } from '../model/entity/user';

const UserRepository = AppDataSource.getRepository(User).extend({});

export default UserRepository;
