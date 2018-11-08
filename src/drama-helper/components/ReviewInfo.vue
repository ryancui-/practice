<template>
  <div class="review-info-wrapper">
    <div class="top-panel">
      <div class="title">
        目前是第 {{round}} 回合
      </div>
      <div class="btns">
        <el-button type="primary" size="small" v-if="!finish"
                   @click="toInput">添加操作
        </el-button>
        <el-button type="success" size="small" v-if="!finish"
                   @click="nextRound">下一回合
        </el-button>
        <el-button type="danger" size="small" v-if="!finish"
                   @click="finishGame">结束游戏
        </el-button>
        <el-button type="primary" size="small" v-if="finish"
                   @click="backIndex">回到首页
        </el-button>
      </div>
    </div>

    <div v-for="(op, round) in openData.op" :key="round">
      <h3>回合 {{round + 1}}</h3>
      <p v-for="(operation, index) in filterNotShow(op)" :key="index" class="operation">
        <span class="index">{{index + 1}}</span>
        <span class="composer" v-if="finish || operation.open !== 2">{{operation.composer}}</span>
        <span class="composer" v-else></span>
        <span class="dealer">{{operation.dealer}}</span>
        <span class="desc" v-html="operation.desc"></span>
      </p>
    </div>
  </div>
</template>

<script>
  import storage from '@/storage/storage';
  import { MessageBox } from 'element-ui';

  export default {
    data() {
      return {
        finish: false
      };
    },
    computed: {
      round() {
        return storage.getCurrentRound();
      },
      openData() {
        return storage.getAll();
      },
      opList() {
        return this.openData.op.filter(op => op.open !== 3);
      }
    },
    methods: {
      toInput() {
        this.$router.push('/input');
      },
      finishGame() {
        MessageBox({
          title: '提示',
          message: '是否结束游戏',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.finish = true;
        }).catch(() => {
        });
      },
      nextRound() {
        storage.nextRound();
        this.$router.push('/input');
      },
      filterNotShow(op) {
        return this.finish ? op : op.filter(oper => oper.open !== 3).sort(() => (Math.random() - 0.5));
      },
      backIndex() {
        storage.init();
        this.$router.push('/');
      }
    }
  };
</script>

<style>
</style>