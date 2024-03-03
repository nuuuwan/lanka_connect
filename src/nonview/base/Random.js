export default class Random {
  static float() {
    return Math.random();
  }
  static int(min, max) {
    return Math.floor(Random.float() * (max - min) + min);
  }
  static indices(n, nSample) {
    let i = 0;
    let iArr = [];
    while (i < nSample) {
      let j = Random.int(0, n);
      if (iArr.includes(j)) {
        continue;
      }
      iArr.push(j);
      i++;
    }
    return iArr;
  }
  static sample(arr, nSample) {
    const iArr = Random.indices(arr.length, nSample);
    return iArr.map((i) => arr[i]);
  }

  static shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
