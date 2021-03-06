const getTimesStamp = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any[]): void => {
    if (object) {
        console.log(`[${getTimesStamp()}][INFO][${namespace}] ${message}`, object);
    } else {
        console.log(`[${getTimesStamp()}][INFO][${namespace}] ${message}`);
    }
};

const warn = (namespace: string, message: string, object?: any[]): void => {
    if (object) {
        console.warn(`[${getTimesStamp()}][INFO][${namespace}] ${message}`, object);
    } else {
        console.warn(`[${getTimesStamp()}][INFO][${namespace}] ${message}`);
    }
};

const error = (namespace: string, message: string, object?: any[]): void => {
    if (object) {
        console.error(`[${getTimesStamp()}][INFO][${namespace}] ${message}`, object);
    } else {
        console.error(`[${getTimesStamp()}][INFO][${namespace}] ${message}`);
    }
};

const debug = (namespace: string, message: string, object?: any[]): void => {
    if (object) {
        console.debug(`[${getTimesStamp()}][INFO][${namespace}] ${message}`, object);
    } else {
        console.debug(`[${getTimesStamp()}][INFO][${namespace}] ${message}`);
    }
};

export default {
    info,
    warn,
    error,
    debug
};
