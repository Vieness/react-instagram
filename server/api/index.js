import {Router} from 'express';

import auth from './routes/auth';
import posts from './routes/posts';
import user from './routes/user';

export default () => {
    const router = Router();

    auth(router);
    posts(router);
    user(router)

    return router;
}
