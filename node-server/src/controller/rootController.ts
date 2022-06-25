import { Get, JsonController } from 'routing-controllers';
import logger from '../utility/logger';

@JsonController()
class RootController {
  @Get('/')
  getRoot() {
    logger.info('Root Controller');
    return { msg: 'Root endpoint' };
  }
}

export default RootController;
