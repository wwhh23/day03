<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <h1>面 经</h1>
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
          text-color="#fff" router>
          <el-menu-item index="/dashboard">
            <el-icon>
              <Clock />
            </el-icon>
            <span>数据看板</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <el-icon>
              <Notebook />
            </el-icon>
            <span>面经管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <p>
            <el-icon @click="$router.go(0)">
              <Refresh />
            </el-icon>
            <el-icon>
              <Platform />
            </el-icon>
          </p>
          <p>
            <span class="span">
              <el-button :icon="Money" circle style="color: #ff8f1d;" />
              <span>{{ names }}</span>
            </span>
            <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF"
              title="您确认退出面运营后台吗?" @confirm="confirmEvent">
              <template #reference>
                <el-button :icon="SwitchButton" circle />
              </template>
            </el-popconfirm>
          </p>
        </el-header>
        <el-main>
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta.title" :key="index">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { Clock, Notebook, SwitchButton, Refresh, Platform, Money, ArrowRight, InfoFilled } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const names = localStorage.getItem('names');
const route = useRoute();
const router = useRouter();
const confirmEvent = () => {
  localStorage.clear();
  router.push('/login');
}
</script>

<style lang="scss" scoped>
h1 {
  color: #fff;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: #545c64;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-breadcrumb {
  margin-bottom: 30px;
}

.span {
  height: 60px;
  width: 150px;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 60px;
  display: inline-block;
  background-color: #fafcfe;

  .el-button {
    margin-left: 10px;
    margin-right: 30px;
  }
}

.el-button {
  margin-left: 20px;
}

.el-menu {
  height: 100vh;
}
</style>