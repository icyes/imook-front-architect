function* g() {
  console.log('read');
  let ch = yield;
  console.log(ch);
  let s = yield;
  console.log(s);
}

const f = g();
f.next();
f.next('a');
f.next('b');
