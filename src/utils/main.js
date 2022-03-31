import {v4 as uuid } from 'uuid';


const generateId = () => {
  const id = uuid();
  return id.slice(0,8)
}

const slugify = (string) => {
  return string.toLowerCase().replaceAll(' ', '-') || 'auto-money';
}

export {
  generateId,
  slugify
}