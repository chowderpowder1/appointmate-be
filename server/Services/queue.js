import Queue from 'bull';

export const notificationQueue = new Queue ('notifications', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
})
