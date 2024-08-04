import _ from 'lodash';

interface Item {
  id: number;
}

export const mergeAndDeduplicate = (arrFirst: Item[], arrSecond: Item[]): Item[] => {
  return _.unionBy(arrFirst, arrSecond, 'id');
};