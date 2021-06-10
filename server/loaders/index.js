import expressLoader from './expressLoader';
import {connectToMongoDb as mongoDBLoader} from './mongodbLoader';


/**
 * @desc Loader app
 **/
export default async function({config, app}) {
    await mongoDBLoader({app, config});
    console.log('✌ MongoDB loaded and connected.');



    await expressLoader({app, config});
    console.log('✌ Express loaded.');


}
