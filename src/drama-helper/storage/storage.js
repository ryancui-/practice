// 这里封装了 localStorage.drama_game 的使用
import { decrypt, encrypt } from './secret';

const key = 'drama_game';

class DramaGameStorage {
  constructor() {
  }

  // 清空之前的数据，并重新初始化
  init() {
    this._set({
      round: 1,
      op: [[]]
    });
  }

  // 向某回合添加操作
  add(round, operation) {
    const obj = this._get();
    const op = obj.op;
    const idx = Number(round - 1);
    if (!op[idx] || !Array.isArray(op[idx])) {
      op[idx] = [];
    }

    op[idx].push(operation);

    this._set(obj);
  }

  // 获取当前回合
  getCurrentRound() {
    const obj = this._get();
    return obj.round;
  }

  // 拿到全部数据
  getAll() {
    return this._get();
  }

  // 拿到某一回合的所有数据
  getByRound(round) {
    const obj = this._get();
    const op = obj.op;
    const idx = Number(round - 1);

    return op[idx] || [];
  }

  // 进入下一回合
  nextRound() {
    const obj = this._get();
    obj.round = obj.round + 1;
    obj.op.push([]);
    this._set(obj);
  }

  _get() {
    const saved = localStorage.getItem(key);
    if (!saved) {
      return {};
    }

    const str = decrypt(saved);
    try {
      return JSON.parse(str);
    } catch (_) {
      // 出现了奇怪的错误
    }
  }

  _set(obj) {
    localStorage.setItem(key, encrypt(JSON.stringify(obj)));
  }
}

export default new DramaGameStorage();
