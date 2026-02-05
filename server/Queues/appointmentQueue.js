import Queue from 'bull';

export const notificationQueue = new Queue ('notifications', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
        maxRetriesPerRequest: null,
    },
    defaultJobOptions:{
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 2000,
        },
        removeOnComplete: 100,
        removeOnFail: 200,
    }
})
