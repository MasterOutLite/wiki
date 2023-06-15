import joi from 'joi';

export const email = joi.string().email({minDomainSegments: 2});
export const id = joi.number();
export const password = joi.string().regex(/[a-zA-Z0-9]{3,30}/);
