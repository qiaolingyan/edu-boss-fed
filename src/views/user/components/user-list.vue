<template>
  <div class="user-list">
    <el-form :model="userForm"
             class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="userForm.phone"
                  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker v-model="userForm.createTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd[T]hh:mm:ss"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="search-btn">
        <el-button @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="isLoading"
              :data="users"
              border
              style="width: 100%">
      <el-table-column type="index"
                       label="编号"
                       width="80">
      </el-table-column>
      <el-table-column prop="id"
                       label="用户ID"
                       width="150">
      </el-table-column>
      <el-table-column prop="portrait"
                       label="头像"
                       width="150">
        <template slot-scope="scope">
          <el-avatar size="small"
                     :src="scope.row.portrait"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="用户名"
                       width="150">
      </el-table-column>
      <el-table-column prop="phone"
                       label="手机号"
                       width="150">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="注册时间"
                       width="150">
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       width="100">
        <template slot-scope="scope">
          <i title="正常"
             class="status"
             :class="scope.row.status === 'ENABLE' ? 'status-success' : 'status-fail'"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-button @click="handleDisabled(scope.row)"
                     type="text"
                     size="small">禁用</el-button>
          <el-button @click="handleAllocRole(scope.row)"
                     type="text"
                     size="small">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="userForm.currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="userForm.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalCount">
    </el-pagination>
    <el-dialog title="分配角色"
               :visible.sync="visible">
      <el-select v-model="userRoles.roleIdList"
                 multiple
                 clearable
                 placeholder="请选择">
        <el-option v-for="item in roles"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary"
                   @click="onSuccess">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, enableUser, forbidUser } from '@/services/user'
import { getAllRole, allocateUserRoles, getUserRoles } from '@/services/role'
export default Vue.extend({
  name: 'UserList',
  data() {
    return {
      users: [],
      userForm: {
        phone: '',
        createTime: '',
        currentPage: 0,
        pageSize: 10
      },
      totalCount: 0,
      isLoading: true,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      visible: false,
      userRoles: {
        userId: '',
        roleIdList: ''
      },
      roles: []
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    async handleSearch() {
      const { phone, createTime, currentPage, pageSize } = this.userForm
      const obj = {
        phone,
        currentPage,
        pageSize,
        startCreateTime: createTime[0],
        endCreateTime: createTime[1]
      }
      this.isLoading = true
      const { data } = await getUserPages(obj)
      if (data.code === '000000') {
        this.users = data.data.records
        this.totalCount = data.data.total
        this.isLoading = false
      }
    },
    handleSizeChange(val: number) {
      this.userForm.pageSize = val
      this.userForm.currentPage = 1
      this.handleSearch()
    },
    handleCurrentChange(val: number) {
      this.userForm.currentPage = val
      this.handleSearch()
    },
    async handleDisabled(item: any) {
      const { data } = await forbidUser(item.id)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.handleSearch()
      }
    },
    async handleAllocRole(item: any) {
      this.userRoles.userId = item.id
      const { data } = await getAllRole()
      if (data.code === '000000') {
        this.roles = data.data
      }

      const { data: userRoles } = await getUserRoles(this.userRoles.userId)
      if (userRoles.code === '000000') {
        this.userRoles.roleIdList = userRoles.data.map((item: any) => item.id)
      }

      this.visible = true
    },
    async onSuccess() {
      const { data } = await allocateUserRoles(this.userRoles)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.visible = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.user-list {
  .el-select {
    width: 100%;
  }
  .demo-form-inline {
    display: flex;
    justify-content: space-around;
    .search-btn {
      padding-top: 40px;
    }
  }
  .status {
    display: inline-block;
    cursor: pointer;
    width: 0.875rem;
    height: 0.875rem;
    vertical-align: middle;
    border-radius: 50%;
    &.status-success {
      background: #51cf66;
    }
    &.status-fail {
      background: gray;
    }
  }
}
</style>
