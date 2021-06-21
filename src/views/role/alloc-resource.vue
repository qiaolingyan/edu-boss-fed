<template>
  <div class="role-alloc-resource">
    <el-card class="box-card"
             v-for="item in roleResources"
             :key="item.id">
      <div slot="header"
           class="clearfix">
        <el-checkbox :indeterminate="item.isIndeterminate"
                     v-model="item.checkAll"
                     @change="handleCheckAllChange(item.id,$event)">{{item.name}}</el-checkbox>
      </div>
      <el-row>
        <el-col :span="8"
                v-for="resource in item.resourceList"
                :key="resource.id + Math.random()">
          <el-checkbox :label="resource.id"
                       :checked="resource.selected"
                       @change="handleChange(item.id,resource.id,$event)">
            {{resource.name}}
          </el-checkbox>
        </el-col>
      </el-row>

    </el-card>
    <div style="margin-top:20px;">
      <el-button type="primary"
                 @click="submitForm">保存</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoleResources, allocateRoleResources } from '@/services/resource'
const cityOptions = ['上海', '北京', '广州', '深圳']
export default Vue.extend({
  name: 'RoleAllocReaource',
  props: {
    roleId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      isIndeterminate: true,
      roleResources: [],
      checkedResources: []
    }
  },
  created() {
    this.getRoleResources()
  },
  methods: {
    async getRoleResources() {
      const { data } = await getRoleResources(this.roleId)
      if (data.code === '000000') {
        this.roleResources = data.data
        this.roleResources.forEach((item: any) => {
          item.isIndeterminate = true
          const arr = []
          item.resourceList.forEach((i: any) => {
            if (i.selected) {
              arr.push(i.id)
            }
          })
          item.isIndeterminate =
            arr.length > 0 && arr.length < item.resourceList.length

          item.checkAll = arr.length === item.resourceList.length
        })
      }
    },
    handleCheckAllChange(val: any, e: any) {
      this.roleResources.forEach((item: any) => {
        if (item.id === val) {
          item.resourceList.forEach((i: any) => {
            i.selected = e
            this.$set(i, 'selected', e)
          })
          item.isIndeterminate = false
        }
      })
    },
    handleChange(val1: any, val2: any, e: any) {
      this.roleResources.forEach((item: any) => {
        if (item.id === val1) {
          item.resourceList.forEach((i: any) => {
            if (i.id === val2) {
              i.selected = e
            }
          })
        }
        const arr = []
        item.resourceList.forEach((i: any) => {
          if (i.selected) {
            arr.push(i.id)
          }
        })
        item.isIndeterminate =
          arr.length > 0 && arr.length < item.resourceList.length

        item.checkAll = arr.length === item.resourceList.length
      })
    },
    async submitForm() {
      console.log(this.roleResources)
      const resourceIdList = [] as any
      this.roleResources.forEach((item: any) => {
        if (item.selected) {
          resourceIdList.push(item.id)
        }
        item.resourceList.forEach((i: any) => {
          if (i.selected) {
            resourceIdList.push(i.id)
          }
        })
      })
      const { data } = await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList
      })
      if (data.code === '000000') {
        this.$message.success('保存成功')
      }
    },
    resetForm() {
      this.roleResources.forEach((item: any) => {
        item.resourceList.forEach((i: any) => {
          i.selected = false
        })
        item.isIndeterminate = true
        item.checkAll = false
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.role-alloc-resource {
  ::v-deep .el-card__header {
    background: rgb(242, 246, 252);
  }
  ::v-deep .el-card__body {
    overflow: hidden;
    line-height: 2;
  }
}
</style>
