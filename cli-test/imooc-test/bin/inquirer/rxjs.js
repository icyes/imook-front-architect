const { range } = require('rxjs');
const { map, filter } = require('rxjs/operators');

const pipe = range(1, 200).pipe(
  filter(x => x % 2 === 1),
  map(x => x + x),
  filter(x => x % 3 === 0),
  filter(x => x % 6 === 0),
  filter(x => x % 9 === 0),
);

pipe.subscribe(x => console.log(x));
