import HTTP from 'constants/http';
import CONFIG from 'constants/config';

class AppController {
  getAppVersion(req, res, next) {
    const {version} = CONFIG;

    res.status(HTTP.ok).json({version});
  }
}

export default new AppController();
