<template>
    <div class="login">
        <div class="el-card">
            <p>积云后台</p>
            <el-form ref="ruleFormRef" :label-position="'top'" :model="ruleForm" :rules="rules" label-width="120px"
                class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" />
                </el-form-item>
                <el-form-item style="padding:0 100px;">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules, ElMessage } from 'element-plus'
import { getLogin } from '@/utils/api'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
interface RuleForm {
    username: string
    password: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: 'admin',
    password: 'admin',
})

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (ruleForm.username == 'admin' && ruleForm.password == 'admin') {
                getLogin(ruleForm).then(res => {
                    console.log(res);
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('names', res.data.data.currentAuthority);
                    router.push('/');
                })
            }
            else {
                // ElMessage.warning('用户名或者密码错误');
                alert('用户名或者密码错误');
            }
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
  
<style lang="scss" scoped>
.login {
    width: 100vw;
    height: 100vh;
    position: relative;

    p {
        width: 100%;
        height: 50px;
        background-color: #7082fb;
        color: #fff;
        text-align: center;
        line-height: 50px;
    }

    .el-card {
        width: 400px;
        height: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .el-form {
            padding: 0 30px;
            margin-top: 20px;
        }
    }
}
</style>