import { Controller, Get } from 'routing-controllers';
import logger from '../utility/logger';

@Controller()
class RootController {
  @Get('/')
  getRoot() {
    logger.info('Root Controller');
    return 'This is message from root';
  }
}

export default RootController;
