import crypto from 'crypto';
export const uuid = () => crypto.randomUUID({ disableEntropyCache: false });
