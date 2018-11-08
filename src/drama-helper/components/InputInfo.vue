<template>
  <div class="input-info-wrapper">
    <div class="top-panel">
      <div class="title">
        目前是第 {{round}} 回合
      </div>
      <div class="btns">
        <el-button type="primary" size="small"
                   @click="backReviewInfo">回到展示
        </el-button>
      </div>
    </div>

    <div>
      <h3>你的角色</h3>
      <el-radio-group v-model="composer">
        <el-radio-button v-for="name in composers" :key="name" :label="name"></el-radio-button>
      </el-radio-group>
      <h3>你要对谁搞事情</h3>
      <el-radio-group v-model="dealer">
        <el-radio-button v-for="name in dealers" :key="name" :label="name"></el-radio-button>
      </el-radio-group>
      <h3>你要搞什么事情</h3>
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="desc">
      </el-input>
      <h3>公开程度</h3>
      <div>
        <el-select v-model="open" placeholder="请选择">
          <el-option :key="1" :label="'全部公开'" :value="1"></el-option>
          <el-option :key="2" :label="'公开部分'" :value="2"></el-option>
          <el-option :key="3" :label="'全部隐藏'" :value="3"></el-option>
        </el-select>
      </div>
      <div style="margin-top: 10px;">
        <el-button type="success" @click="save" :disabled="!composer || !dealer || !desc">添加
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  import storage from '@/storage/storage';

  const characters = [
    '钟朗', '马浮根', '童阿四', '范云洪', '谢雨', '黄克明', '竹内云子', '小青'
  ];

  export default {
    data() {
      return {
        composer: '',
        dealer: '',
        desc: '',
        open: 1
      };
    },
    computed: {
      round() {
        return storage.getCurrentRound();
      },
      composers() {
        return characters;
      },
      dealers() {
        return characters.concat(['法官/咖啡馆老板']);
      }
    },
    methods: {
      save() {
        const op = {
          composer: this.composer,
          dealer: this.dealer,
          desc: this.processInputContent(this.desc),
          open: this.open
        };

        storage.add(this.round, op);

        Message({
          message: '添加成功',
          type: 'success'
        });

        this.desc = '';
      },
      backReviewInfo() {
        this.$router.push('/review');
      },
      // 处理换行符
      processInputContent(content) {
        return content.replace(/\n/g, '<br/>').replace(/\s/g, ' ');
      }
    }
  };
</script>

<style>

</style>