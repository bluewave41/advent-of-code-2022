const input = `addx 2
addx 4
noop
noop
addx 17
noop
addx -11
addx -1
addx 4
noop
noop
addx 6
noop
noop
addx -14
addx 19
noop
addx 4
noop
noop
addx 1
addx 4
addx -20
addx 21
addx -38
noop
addx 7
noop
addx 3
noop
addx 22
noop
addx -17
addx 2
addx 3
noop
addx 2
addx 3
noop
addx 2
addx -8
addx 9
addx 2
noop
noop
addx 7
addx 2
addx -27
addx -10
noop
addx 37
addx -34
addx 30
addx -29
addx 9
noop
addx 2
noop
noop
noop
addx 5
addx -4
addx 9
addx -2
addx 7
noop
noop
addx 1
addx 4
addx -1
noop
addx -19
addx -17
noop
addx 1
addx 4
addx 3
addx 11
addx 17
addx -23
addx 2
noop
addx 3
addx 2
addx 3
addx 4
addx -22
noop
addx 27
addx -32
addx 14
addx 21
addx 2
noop
addx -37
noop
addx 31
addx -26
addx 5
addx 2
addx 3
addx -2
addx 2
addx 5
addx 2
addx 3
noop
addx 2
addx 9
addx -8
addx 2
addx 11
addx -4
addx 2
addx -15
addx -22
addx 1
addx 5
noop
noop
noop
noop
noop
addx 4
addx 19
addx -15
addx 1
noop
noop
addx 6
noop
noop
addx 5
addx -1
addx 5
addx -14
addx -13
addx 30
noop
addx 3
noop
noop`
  .split("\n")
  .map(function (el) {
    const split = el.split(" ");
    return [split[0], parseInt(split[1])];
  });

let cycles = 0;
let x = 1;
let sum = 0;

const crt = [[], [], [], [], [], []];

for (const instr of input) {
  switch (instr[0]) {
    case "noop":
      increaseCycle();
      break;
    case "addx":
      increaseCycle();
      increaseCycle();
      x += instr[1];
      break;
  }
}

let str = "";
for (var a = 0; a < 6; a++) {
  for (var y = 0; y < 40; y++) {
    str += crt[a][y] ? crt[a][y] : ".";
  }
  str += "\n";
}

console.log(str);

function increaseCycle() {
  const care = [40, 80, 120, 160, 200, 240];
  const y = Math.floor(cycles / 40);
  if (cycles % 40 == x - 1 || cycles % 40 == x || cycles % 40 == x + 1) {
    console.log("draw at " + y, cycles % 40);
    crt[y][cycles % 40] = "#";
  }
  cycles++;
  if (care.indexOf(cycles) != -1) {
    sum += x * cycles;
  }
}
