<template>
    <div>
        <el-card>
            <p class="p">
                <span>共{{ total }}条记录</span>
                <el-button type="primary" @click="addMian">+添加面经</el-button>
            </p>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="stem" label="标题" width="180" />
                <el-table-column prop="creator" label="作者" width="180" />
                <el-table-column prop="likeCount" label="点赞" />
                <el-table-column prop="views" label="浏览数" />
                <el-table-column prop="createdAt" label="更新时间" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-icon @click="look(scope.row.id)">
                            <View />
                        </el-icon>
                        <el-icon @click="edit(scope.row)">
                            <EditPen />
                        </el-icon>
                        <el-icon @click="del(scope.row.id)">
                            <Delete />
                        </el-icon>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:current-page="info.current" v-model:page-size="info.pageSize" :page-sizes="[2, 4, 8, 10]"
                :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="queryList"
                @current-change="queryList" />


            <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="large">
                <p class="p1">预览面经</p>
                <div class="box">
                    <h3>{{ shop.stem }}</h3>
                    <p v-html="shop.content"></p>
                </div>
            </el-drawer>
            <el-drawer v-model="drawer1" title="I am the title" :with-header="false" size="large">
                <p class="p1">添加面经</p>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                    :size="formSize" status-icon>
                    <el-form-item label="标题" prop="name">
                        <el-input v-model="ruleForm.name" />
                    </el-form-item>
                    <el-form-item label="内容" prop="desc">
                        <el-input v-model="ruleForm.desc" type="textarea" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            Create
                        </el-button>
                        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { View, EditPen, Delete } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getList, getshow } from '@/utils/api';
const route = useRoute();
const drawer = ref(false);
const drawer1 = ref(false);
const router = useRouter();
const tableData = ref([]);
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
    name: string
    desc: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    desc: '',
})

const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
    ],
    desc: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const shop = ref<any>({});
const look = (id: number) => {
    drawer.value = true;
    // obj.name = row.stem;
    // obj.cont = row.content;
    getshow({ id }).then(res => {
        console.log(res);
        shop.value = res.data.data;
    })
}
const addMian = () => {
    drawer1.value = true;
}
const edit = (row: any) => {

}
const del = (id: number) => {
    tableData.value = tableData.value.filter((item: any) => item.id != id);
}
const info = reactive({
    current: 1,
    pageSize: 10,
    stem: '1',
    keyWord: '',
    sorter: 'weight_desc',
})
const total = ref(0);
const queryList = () => {
    getList(info).then(res => {
        // console.log(res);
        tableData.value = res.data.data.rows;
        total.value = res.data.data.total;
    })
}
queryList();
</script>

<style lang="scss" scoped>
.p {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 0 30px;
    margin-bottom: 10px;
}

.p1 {
    color: #777;
    margin-bottom: 50px;
}

.box {
    box-sizing: border-box;
    padding: 0 10px;

    h3 {
        text-decoration: underline;
        margin-bottom: 10px;
    }
}
</style>