import { atom } from 'recoil';

export const studentDataAtom = atom({
  key: 'studentData',
  default: [],
});

export const eventNameState = atom({
  key: 'eventNameState',
  default: '',
});

export const eventCompleted = atom({
  key: 'eventCompleted',
  default: '',
});

