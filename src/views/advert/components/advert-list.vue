<template>
  <div class="advert">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <el-button @click="$router.push({name:'addAdvertise'})">添加广告</el-button>
      </div>
      <el-table :data="adverts"
                border
                style="width: 100%">
        <el-table-column prop="id"
                         label="id">
        </el-table-column>
        <el-table-column prop="name"
                         label="广告名称">
        </el-table-column>
        <el-table-column prop="spaceId"
                         label="广告位置">
        </el-table-column>
        <el-table-column label="广告图片">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px"
                      :src="scope.row.img"
                      fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="startTime"
                         label="时间">
          <template slot-scope="scope">
            <p>开始时间：{{scope.row.startTime}}</p>
            <p>结束时间：{{scope.row.endTime}}</p>
            <p>{{}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="status"
                         label="上线下线">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
                       :active-value="1"
                       :inactive-value="0"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       @change="statusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)"
                       type="text"
                       size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdList, saveOrUpdate } from '@/services/advert'

export default Vue.extend({
  name: 'AdvertList',
  data() {
    return {
      adverts: []
    }
  },
  created() {
    this.loadAlladverts()
  },
  methods: {
    async loadAlladverts() {
      const { data } = await getAdList()
      if (data.state === 1) {
        this.adverts = data.content
      }
    },
    handleEdit(item: any) {
      this.$router.push({
        name: 'updateAdvertise',
        query: {
          id: item.id
        }
      })
    },
    statusChange(item: any) {
      this.$confirm('是否要修改上线/下线状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await saveOrUpdate(item)
          if (data.state === 1) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        })
        .catch(() => {
          item.status = item.status === 0 ? 1 : 0
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
