const { group, extractNumbers } = require("../utils");

const a = `Monkey 0:
Starting items: 59, 65, 86, 56, 74, 57, 56
Operation: new = old * 17
Test: divisible by 3
  If true: throw to monkey 3
  If false: throw to monkey 6

Monkey 1:
Starting items: 63, 83, 50, 63, 56
Operation: new = old + 2
Test: divisible by 13
  If true: throw to monkey 3
  If false: throw to monkey 0

Monkey 2:
Starting items: 93, 79, 74, 55
Operation: new = old + 1
Test: divisible by 2
  If true: throw to monkey 0
  If false: throw to monkey 1

Monkey 3:
Starting items: 86, 61, 67, 88, 94, 69, 56, 91
Operation: new = old + 7
Test: divisible by 11
  If true: throw to monkey 6
  If false: throw to monkey 7

Monkey 4:
Starting items: 76, 50, 51
Operation: new = old * old
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 5

Monkey 5:
Starting items: 77, 76
Operation: new = old + 8
Test: divisible by 17
  If true: throw to monkey 2
  If false: throw to monkey 1

Monkey 6:
Starting items: 74
Operation: new = old * 2
Test: divisible by 5
  If true: throw to monkey 4
  If false: throw to monkey 7

Monkey 7:
Starting items: 86, 85, 52, 86, 91, 95
Operation: new = old + 6
Test: divisible by 7
  If true: throw to monkey 4
  If false: throw to monkey 5`.split("\n");

const input = group(a, 7);

const monkeys = [];

for (const monkey of input) {
  const m = { inspect: 0 };
  for (var i = 0; i < monkey.length; i++) {
    if (i == 0) {
      m.id = extractNumbers(monkey[i])[0];
    } else if (i == 1) {
      m.items = extractNumbers(monkey[i]);
    } else if (i == 2) {
      m.operation = monkey[i].split(" ").slice(3);
    } else if (i == 3) {
      m.test = parseInt(monkey[i].split(" ")[3]);
    } else if (i == 4) {
      m.true = parseInt(monkey[i].split(" ")[7]);
    } else if (i == 5) {
      m.false = parseInt(monkey[i].split(" ")[7]);
    }
  }
  monkeys.push(m);
}

let divisor = monkeys.reduce((prev, curr) => prev * curr.test, 1);

for (var i = 0; i < 10000; i++) {
  for (const monkey of monkeys) {
    for (const item of monkey.items) {
      monkey.inspect++;
      let worry = item;
      worry = worry % divisor;
      worry = eval(monkey.operation.join(" ").replace(/old/g, "worry"));
      if (worry % monkey.test == 0) {
        monkeys.find((el) => el.id == monkey.true).items.push(worry);
      } else {
        monkeys.find((el) => el.id == monkey.false).items.push(worry);
      }
    }
    monkey.items = [];
  }
}

console.log(monkeys);

const sort = monkeys.sort((a, b) => b.inspect - a.inspect);
console.log(sort[0].inspect * sort[1].inspect);
