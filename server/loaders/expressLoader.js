import routes from '../api';
import cors from 'cors';
import bodyParser from 'body-parser';
import StatusService from '../api/services/StatusService';
import express from 'express'
import path from 'path';
const allowedOrigins = [
    'http://localhost:3000'
];

/**
 * @desc Express loader
 **/
export default function ({config, app}) {
    
    app.use(bodyParser.json());

    // Load API routes
    app.use(`${config.SERVICE_PREFIX}/v${config.VERSION}`, routes());
    
    // if (process.env.NODE_ENV === "production") {
    //     app.use(express.static(path.join(__dirname, "..","..", "client", "build")))
    //   }
    //   app.get("/*", function (req, res) {
    //     res.sendFile(path.join(__dirname, "..","..", "client", "build", "index.html"));
    //   });
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb', extended: true}))
    

    app.use(cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';

                return callback(new Error(msg), false);
            }

            return callback(null, true);
        },
        credentials: true
    }));

   

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;

        next(err);
    });



    /// error handlers
    app.use((
        err,
        request,
        response, next
    ) => {
        let statusCode = typeof err === 'object' && err.status > 0
            ? err.status
            : 500;

        const {
            status = statusCode,
            name = '',
            message: error = 'Internal Application Error'
        } = err;

        const customResponse = response
            .status(statusCode)
            .json(StatusService.buildError(error, statusCode));

        return name === 'UnauthorizedError'
            ? customResponse.end()
            : customResponse;
    });
}
