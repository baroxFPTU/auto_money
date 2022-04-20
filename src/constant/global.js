import { generateId } from 'utils/main';

const CURRENCY_OPTIONS = [
  {value: 'VND', label: 'VND'},
  {value: 'USD', label: 'USD'},
  {value: 'EUR', label: 'EUR'}
];

const BUDGET_CONFIG_DEFAULT = [
  {
    name: 'Foods',
    id: `foods-${generateId()}`,
    percent: 50
  },
  {
    name: 'Save & Invest',
    id: `save-invest-${generateId()}`,
    percent: 20
  },
  {
    name: 'Self Invest',
    id: `self-invest-${generateId()}`,
    percent: 10
  },
  {
    name: 'Hang out',
    id: `hangout-${generateId()}`,
    percent: 10
  },
  {
    name: 'Gas',
    id: `gas-${generateId()}`,
    percent: 10
  },
];

export {
  CURRENCY_OPTIONS,
  BUDGET_CONFIG_DEFAULT
}